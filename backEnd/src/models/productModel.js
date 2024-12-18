// models/productModel.js
import pool from '../db_config/connection.js';

export const cadastrarProduto = async (produto) => {
  const { nome, descricao, categoria, preco, validade, img_url } = produto;

  try {
    const sql = 'INSERT INTO produtos (nome, descricao, categoria, preco, validade, img_url) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await pool.query(sql, [nome, descricao, categoria, preco, validade, img_url]);
    return result;
  } catch (err) {
    console.error('Erro ao cadastrar produto:', err);
    throw err;  // Relançar o erro para ser tratado no controller
  }
};
