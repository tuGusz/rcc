CREATE DATABASE IF NOT EXISTS rotaract_db;

USE rotaract_db;

CREATE TABLE IF NOT EXISTS associados (    
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

CREATE TABLE IF NOT EXISTS CAMPANHA (
    c_id INT AUTO_INCREMENT PRIMARY KEY,
    c_nome VARCHAR(100),
    c_local VARCHAR(150),
    c_descricao VARCHAR(255),
    c_data_inicio DATETIME,
    c_data_fim DATETIME
);

CREATE TABLE IF NOT EXISTS produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  quantidade INT NOT NULL,
  unidade VARCHAR(50),
  detalhes TEXT,
  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comissoes (
    id_comissao INT(11) NOT NULL AUTO_INCREMENT,
    valor DECIMAL(10,2) NOT NULL,
    data_pagamento DATE NOT NULL,
    status ENUM('pix', 'credito') NOT NULL,
    id_associado CHAR(11) NOT NULL,  
    PRIMARY KEY (id_comissao),
    FOREIGN KEY (id_associado) REFERENCES associados(cpf)  
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS frequencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cpf_associado CHAR(11) NOT NULL,
    campanha_id INT NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cpf_associado) REFERENCES associados(cpf),
    FOREIGN KEY (campanha_id) REFERENCES campanha(C_id)
);

CREATE TABLE IF NOT EXISTS MENSALIDADES (
  id INT AUTO_INCREMENT PRIMARY KEY,
  categoria TEXT NOT NULL,
  descricao TEXT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  dataVencimento DATETIME NOT NULL,
  status VARCHAR(20) DEFAULT 'Pendente'
);

CREATE TABLE IF NOT EXISTS doacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_doador VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    tipo VARCHAR(50) NOT NULL,
    descricao TEXT,
    valor DECIMAL(10, 2),
    data_entrega DATE,
    local_entrega VARCHAR(150),
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

