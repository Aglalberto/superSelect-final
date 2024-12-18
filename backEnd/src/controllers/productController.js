import pool from '../db_config/connection.js';  // Certifique-se de que está importando corretamente

export const cadastrarProduto = async (req, res) => {
    const { nome, descricao, categoria, preco, validade, img_url } = req.body;

    if (!nome || !descricao || !categoria || !preco || !validade) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    try {
        console.log('Dados recebidos:', { nome, descricao, categoria, preco, validade, img_url });

        const sql = 'INSERT INTO produtos (nome, descricao, categoria, preco, validade, img_url) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await pool.query(sql, [nome, descricao, categoria, preco, validade, img_url]);
        console.log('Produto inserido com sucesso:', result);

        res.status(201).send('Produto cadastrado com sucesso!');
    } catch (err) {
        console.error('Erro ao cadastrar produto:', err);  // Verifique o erro completo aqui
        res.status(500).send('Erro ao cadastrar produto');
    }
};

export const listarProdutos = async (req, res) => {
    try {
        const sql = 'SELECT * FROM produtos';
        const [produtos] = await pool.query(sql);

        res.status(200).json(produtos);
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
  
// Exemplo de código no controlador
export const adicionarComentario = async (req, res) => {
  const { produto_id, nome, comentario } = req.body;

  // Certifique-se de que produto_id está sendo recebido
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

  