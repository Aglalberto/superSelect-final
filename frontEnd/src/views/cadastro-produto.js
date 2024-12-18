import React, { useState } from 'react';
import axios from 'axios';

function CadastroProduto() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState('');
  const [validade, setValidade] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:3001/produtos/produto', // URL correta
        { nome, descricao, categoria, preco, validade, img_url: imgUrl },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      

      alert('Produto cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar produto: ', error);
      setErro('Erro ao cadastrar produto. Tente novamente.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Cadastro de Produto</h2>
      {erro && <div style={{ color: 'red' }}>{erro}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do Produto:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            placeholder="Nome do produto"
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            placeholder="Descrição do produto"
          />
        </div>
        <div>
          <label>Categoria:</label>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            placeholder="Categoria do produto"
          />
        </div>
        <div>
          <label>Preço:</label>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
            placeholder="Preço do produto"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label>Validade:</label>
          <input
            type="date"
            value={validade}
            onChange={(e) => setValidade(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Imagem (URL):</label>
          <input
            type="text"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            placeholder="URL da imagem"
          />
        </div>
        <button type="submit">Cadastrar Produto</button>
      </form>
    </div>
  );
}

export default CadastroProduto;
