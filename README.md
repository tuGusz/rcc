# 🧑‍💻 Projeto [RRC – Rotaract Rancharia Connect]

# 📘 Sistema RRC – Rotaract Rancharia Connect
Este repositório contém o desenvolvimento do sistema **RRC – Rotaract Rancharia Connect**, criado como parte do projeto de software aplicado à comunidade para o **Rotary Club de Rancharia**. O trabalho foi realizado pelos alunos do curso de **Análise e Desenvolvimento de Sistemas da FIPP – Universidade do Oeste Paulista (UNOESTE)**, no segundo semestre de 2024.

### 📚 Integrantes

| Nome Completo                 | RA          |
|-------------------------------|-------------|
| Cristian Marai Negrizolli     | 10482325580 |
| Luan Henrique da Silva Bonfim | 10482326424 |
| Tulio Augusto Soares Gusmão   | 10482326596 |

---

## 💡 Descrição do Projeto
O sistema **RRC – Rotaract Rancharia Connect** tem como objetivo informatizar e facilitar a gestão administrativa do Rotaract Club de Rancharia, promovendo maior controle e transparência em suas atividades.

Principais funcionalidades:
- Gerenciamento de campanhas, doações e associados.
- Controle de comissões, cargos, mensalidades e frequência em eventos.
- Registro financeiro com controle de caixa, entrada e saída de produtos.
- Área pública com páginas de "Quem Somos", "Transparência", "Doações" e "Campanhas".

O sistema segue os princípios da LGPD e incorpora boas práticas de segurança digital.

---

## 📁 Organização do Repositório

A estrutura do repositório foi organizada para facilitar a navegação e entendimento do projeto:
## 📁 Organização do Repositório

A estrutura do repositório foi organizada para facilitar a navegação e entendimento do projeto:
```text
📦 rrc/
├── 📁 Backend/                 # Backend do sistema (API Node.js)
│   ├── 📁 Controller/         # Controladores das rotas
│   ├── 📁 Model/              # Definição dos modelos de dados
│   ├── 📁 Routes/             # Definição de rotas da API
│   ├── 📁 Services/           # Lógica de negócio e serviços
│   ├── 📄 server.js           # Ponto de entrada da aplicação backend
│   ├── 📄 .env                # Variáveis de ambiente (ocultas)
│   └── 📄 package.json        # Dependências e scripts do backend
│
├── 📁 frontend/               # Frontend da aplicação (React)
│   ├── 📁 public/             # Recursos públicos do frontend
│   ├── 📁 src/                # Código-fonte principal do React
│   ├── 📄 package.json        # Dependências e scripts do frontend
│   └── 📄 README.md           # Documentação do frontend
│
├── 📄 rotaract_db.SQL         # Script SQL com estrutura do banco de dados
├── 📄 estrutura.txt           # Documento com estrutura do projeto ou tabelas
├── 📄 CRIAR TABELA *.txt      # Scripts separados para criação de tabelas no banco
├── 📄 .gitignore              # Arquivos/pastas ignorados pelo Git



