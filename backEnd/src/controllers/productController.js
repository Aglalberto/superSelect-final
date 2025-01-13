import pool from '../db_config/connection.js';  // Certifique-se de que está importando corretamente
import multer from 'multer';
import path from 'path';


export const cadastrarProduto = async (req, res) => {
  const { nome, descricao, categoria, preco, validade, img_url } = req.body;

  if (!nome || !descricao || !categoria || !preco) {
    return res.status(400).send('Os campos nome, descrição, categoria e preço são obrigatórios.');
  }


  try {
    console.log('Dados recebidos:', { nome, descricao, categoria, preco, validade, img_url });

    const sql = 'INSERT INTO produtos (nome, descricao, categoria, preco, validade, img_url) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await pool.query(sql, [
      nome,
      descricao,
      categoria,
      preco,
      validade && validade.trim() !== "" ? validade : "Indeterminada",
      img_url,
    ]);

    console.log('Produto inserido com sucesso:', result);

    res.status(201).send('Produto cadastrado com sucesso!');
  } catch (err) {
    console.error('Erro ao cadastrar produto:', err);
    res.status(500).send('Erro ao cadastrar produto');
  }
};

export const listarProdutos = async (req, res) => {
  try {
    const sql = 'SELECT * FROM produtos';
    const [produtos] = await pool.query(sql);

    const produtosComValidadeFormatada = produtos.map((produto) => ({
      ...produto,
      validade: produto.validade === "Indeterminada" || !produto.validade ? "Indeterminada" : produto.validade,
    }));

    res.status(200).json(produtosComValidadeFormatada);
  } catch (err) {
    console.error('Erro ao listar produtos:', err);
    res.status(500).send('Erro ao listar produtos');
  }
};



export const listarComentarios = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = "SELECT * FROM comentarios WHERE produto_id = ?";
    const [comentarios] = await pool.query(sql, [id]);
    res.status(200).json(comentarios);
  } catch (err) {
    console.error("Erro ao listar comentários:", err);
    res.status(500).send("Erro ao listar comentários.");
  }
};

export const adicionarComentario = async (req, res) => {
  const { produto_id, nome, comentario } = req.body;

  if (!produto_id) {
    return res.status(400).json({ message: "O produto_id é obrigatório." });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO comentarios (produto_id, nome, comentario) VALUES (?, ?, ?)",
      [produto_id, nome, comentario]
    );
    res.status(201).json({ id: result.insertId, nome, comentario });
  } catch (error) {
    console.error("Erro ao adicionar comentário:", error);
    res.status(500).json({ message: "Erro ao adicionar comentário." });
  }
};

export const editarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, categoria, preco, validade, img_url } = req.body;

  if (!id || !nome || !descricao || !categoria || !preco || !validade) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }

  try {
    const sql = `
    UPDATE produtos 
    SET nome = ?, descricao = ?, categoria = ?, preco = ?, validade = ?, img_url = ?
    WHERE id = ?
  `;
    const [result] = await pool.query(sql, [
      nome,
      descricao,
      categoria,
      preco,
      validade === "Indeterminada" ? "Indeterminada" : validade,
      img_url,
      id,
    ]);



    if (result.affectedRows === 0) {
      return res.status(404).send('Produto não encontrado');
    }

    res.status(200).send('Produto atualizado com sucesso!');
  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    res.status(500).send('Erro ao atualizar produto');
  }
};

export const excluirProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const sql = 'DELETE FROM produtos WHERE id = ?';
    const [result] = await pool.query(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).send('Produto não encontrado');
    }

    res.status(200).send('Produto excluído com sucesso!');
  } catch (err) {
    console.error('Erro ao excluir produto:', err);
    res.status(500).send('Erro ao excluir produto');
  }
};


