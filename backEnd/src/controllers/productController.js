import pool from '../db_config/connection.js';  // Certifique-se de que está importando corretamente
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('src', 'uploads')); // Defina o caminho absoluto correto para 'uploads'
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Gera o nome único para o arquivo
  },
});

const upload = multer({ storage });

export const cadastrarProduto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Imagem não enviada.');
    }

    const { nome, descricao, categoria, preco, validade } = req.body;
    const imgPath = `/uploads/${path.basename(req.file.path)}`; // Apenas o caminho relativo

    if (!nome || !descricao || !categoria || !preco) {
      return res.status(400).send('Os campos nome, descrição, categoria e preço são obrigatórios.');
    }

    const sql = 'INSERT INTO produtos (nome, descricao, categoria, preco, validade, img_path) VALUES (?, ?, ?, ?, ?, ?)';
    await pool.query(sql, [nome, descricao, categoria, preco, validade || null, imgPath]);

    res.status(201).send('Produto cadastrado com sucesso!');
  } catch (err) {
    console.error('Erro ao cadastrar produto:', err);
    res.status(500).send('Erro ao cadastrar produto.');
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
  const { nome, descricao, categoria, preco, validade } = req.body;
  const produtoId = req.params.id;
  let imgPath = req.file ? `/uploads/${path.basename(req.file.path)}` : null;

  if (!nome || !descricao || !categoria || !preco) {
    return res.status(400).send('Os campos nome, descrição, categoria e preço são obrigatórios.');
  }

  try {
    // Recuperar o produto atual para acessar o caminho da imagem antiga
    const [produtoAtual] = await pool.query('SELECT img_path FROM produtos WHERE id = ?', [produtoId]);

    if (produtoAtual.length === 0) {
      return res.status(404).send('Produto não encontrado.');
    }

    const imagemAntiga = produtoAtual[0].img_path;

    // Atualizar o produto no banco de dados
    const sql = `
      UPDATE produtos
      SET nome = ?, descricao = ?, categoria = ?, preco = ?, validade = ?, img_path = IFNULL(?, img_path)
      WHERE id = ?
    `;
    const params = [nome, descricao, categoria, preco, validade || null, imgPath, produtoId];
    const [result] = await pool.query(sql, params);

    if (result.affectedRows === 0) {
      return res.status(404).send('Produto não encontrado.');
    }

    // Excluir a imagem antiga do sistema de arquivos se uma nova imagem for enviada
    if (req.file && imagemAntiga) {
      const caminhoAbsoluto = path.resolve('src', imagemAntiga.replace('/uploads', 'uploads'));
      fs.unlink(caminhoAbsoluto, (err) => {
        if (err) {
          console.error(`Erro ao excluir a imagem antiga: ${err.message}`);
        }
      });
    }

    // Retornar o produto atualizado
    const [produtoAtualizado] = await pool.query('SELECT * FROM produtos WHERE id = ?', [produtoId]);
    res.status(200).json(produtoAtualizado[0]);
  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    res.status(500).send('Erro ao atualizar produto.');
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



