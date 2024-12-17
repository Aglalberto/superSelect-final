CREATE DATABASE ecommerce_a;

USE ecommerce_a;

CREATE TABLE produtos ( id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(100) NOT NULL, descricao TEXT, categoria VARCHAR(50), preco DECIMAL(10, 2) NOT NULL, img_url VARCHAR(800) );

CREATE TABLE users ( id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(100) NOT NULL, email TEXT, senha VARCHAR(500) );

CREATE TABLE comentarios ( id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(100) NOT NULL, comentario VARCHAR(200) NOT NULL );

INSERT INTO produtos (nome, descricao, categoria, preco, img_url) VALUES ('vestido', 'preto', 'longo', '88.99', '20/04/2025');

SELECT * FROM produtos;

SELECT * FROM users;

SELECT * FROM comentarios;

DESC produtos;

DROP TABLE produtos;

DROP TABLE users;

DROP DATABASE catalogo;