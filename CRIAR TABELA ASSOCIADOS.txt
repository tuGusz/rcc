CREATE TABLE associados (    
	 cpf CHAR(11),      
	 nome VARCHAR(100) NOT NULL,     
	 endereco VARCHAR(200),     
	 email VARCHAR(100) UNIQUE,      
	 telefone VARCHAR(20),     
	 status ENUM('Ativo', 'Inativo') DEFAULT 'Ativo',    
     data_nascimento DATE,     
	 foto text(255),
     data_cadastro datetime DEFAULT current_timestamp,  # Mudei aqui alternativa de uso isso ja salva na hora que insere
	 constraint pk_associado primary key (cpf)
);