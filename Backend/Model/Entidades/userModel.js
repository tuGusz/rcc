import DataBase from "../database.js";
const database = new DataBase();

export class User {
  /** @type {number} */
  id;
  /** @type {string} */
  nome;
  /** @type {string} */
  email;
  /** @type {string} */
  password_hash;
  /** @type {string | null} */
  reset_password_token;  
  /** @type {Date | null} */
  reset_password_expires;  
  /** @type {string} */
  role;

  /**
   * Cria uma nova instância de User.
   * @param {Object} obj - Objeto de inicialização para o usuário.
   * @param {number} [obj.id=0] - O ID do usuário.
   * @param {string} [obj.nome=""] - O nome do usuário.
   * @param {string} [obj.email=""] - O email do usuário.
   * @param {string} [obj.password_hash=""] - A senha com hash do usuário.
   * @param {string} [obj.role="Membro"] - O role do usuário.
   * @param {string | null} [obj.reset_password_token=null] - Token para reset de senha
   * @param {Date | null} [obj.reset_password_expires=null] - Data de expiração do token
   */
  constructor({
    id = 0,
    nome = "",
    email = "",
    password_hash = "",
    role = "Membro",
    reset_password_token = null,
    reset_password_expires = null,
  }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.password_hash = password_hash;
    this.role = role;
    this.reset_password_token = reset_password_token;
    this.reset_password_expires = reset_password_expires;
  }


  /**
   * Retorna todos os usuários.
   * @returns {Promise<Array<User>>}
   */
  static async obterTodos() {
    try {
      const [rows] = await database.ExecutaComando("SELECT * FROM user");
      return rows.map((row) => new User({
        id: row.id,
        nome: row.nome,
        email: row.email,
        password_hash: row.password_hash,
        role: row.role,
        reset_password_token: row.reset_password_token, // Inclui token na consulta
        reset_password_expires: row.reset_password_expires, // Inclui expiração na consulta
      }));
    } catch (err) {
      throw new Error('Erro ao obter usuários: ' + err.message);
    }
  }


  /**
   * Retorna um User que tem o email igual ao especificado, ou null
   * se não houver nenhum.
   * @param {string} email - o email a ser procurado
   * @returns {Promise<User | null>}
   */
  static async getUserByEmail(email) {
    try {
      const result = await database.ExecutaComando("SELECT * FROM user WHERE email = ?", [email]);

      if (!result.rows || result.rows.length === 0) return null;

      const row = result.rows[0];

      // Verifique se as colunas existem antes de acessá-las
      return new User({
        id: row.id || 0,
        nome: row.nome || "",
        email: row.email || "",
        password_hash: row.password_hash || "",
        role: row.role || "Membro",
        reset_password_token: row.reset_password_token, // Inclui token
        reset_password_expires: row.reset_password_expires, // Inclui expiração
      });
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
      throw new Error('Erro ao obter usuário pelo email');
    }
  }


  /**
   * Cria um novo Usuario no banco de dados ou atualiza um existente.
   * @returns {Promise<void>} - o resultado da query
   */
  async save() {
    const values = [
      this.nome,
      this.email,
      this.password_hash,
      this.role,
      this.reset_password_token,  // Adiciona token aos valores
      this.reset_password_expires, // Adiciona expiração aos valores
    ];
    let query;

    if (this.id) {
      values.push(this.id);
      query = "UPDATE user SET nome=?, email=?, password_hash=?, role=?, reset_password_token=?, reset_password_expires=? WHERE id=?";
    } else {
      query = "INSERT INTO user (nome, email, password_hash, role, reset_password_token, reset_password_expires) VALUES (?, ?, ?, ?, ?, ?)";
    }

    try {
      // Chama a query no banco de dados
      const result = await database.ExecutaComando(query, values);

      // Depuração: Verificar o que está sendo retornado
      console.log("Resultado da query:", result);

      if (!this.id && result && result.insertId) {
        this.id = result.insertId;
      }
    } catch (err) {
      console.error("Erro ao salvar o usuário:", err);
      throw new Error("Erro ao salvar o usuário: " + err.message);
    }
  }



  /**
   * Exclui um usuário do banco de dados.
   * @param {number} id - ID do usuário a ser excluído.
   * @returns {Promise<void>}
   */
  static async excluir(id) {
    if (!id) {
      throw new Error('ID do usuário inválido');
    }

    try {
      const result = await database.ExecutaComando('DELETE FROM user WHERE id = ?', [id]);
      return result; // Retorna o resultado da exclusão
    } catch (err) {
      throw new Error('Erro ao excluir usuário: ' + err.message);
    }
  }
}
