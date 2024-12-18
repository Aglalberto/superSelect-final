CREATE DATABASE ecommerce_a;

USE ecommerce_a;

CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255),
  descricao TEXT,
  categoria VARCHAR(255),
  preco DECIMAL(10, 2),
  validade DATE,
  img_url VARCHAR(255)
);

CREATE TABLE users ( id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(100) NOT NULL, email TEXT, senha VARCHAR(500) );

CREATE TABLE comentarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  produto_id INT NOT NULL,
  nome VARCHAR(100) NOT NULL,
  comentario VARCHAR(200) NOT NULL,
  FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
);


INSERT INTO produtos (nome, descricao, categoria, preco, img_url) VALUES ('vestido', 'preto', 'longo', '88.99', '20/04/2025');

SELECT * FROM produtos;

SELECT * FROM users;

SELECT * FROM comentarios;

DESC produtos;

DROP TABLE produtos;

DROP TABLE users;

DROP TABLE comentarios;

DROP DATABASE catalogo;

DELETE FROM comentarios WHERE id IN (10, 11, 12, 13, 14);