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
  const [imgPreview, setImgPreview] = useState('');

  // Função para formatar o preço com vírgulas e duas casas decimais
  const formatPreco = (value) => {
    // Remover tudo que não é número
    let formattedValue = value.replace(/\D/g, '');

    // Adicionar a vírgula para separação de milhar e manter 2 casas decimais
    formattedValue = (formattedValue / 100).toFixed(2).replace('.', ',');

    // Se começar com uma vírgula, remove
    return formattedValue.startsWith(',') ? `0${formattedValue}` : formattedValue;
  };

  // Manipulador de mudança no preço com formatação automática
  const handlePrecoChange = (e) => {
    const value = e.target.value;
    const formattedValue = formatPreco(value);
    setPreco(formattedValue);
  };

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

  // Função para exibir a imagem pré-visualizada
  const handleImagePreview = () => {
    setImgPreview(imgUrl);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Cadastro de Produto</h2>
      {erro && <div className="alert alert-danger">{erro}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome do Produto:</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            placeholder="Nome do produto"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">Descrição:</label>
          <textarea
            className="form-control"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            placeholder="Descrição do produto"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoria:</label>
          <input
            type="text"
            className="form-control"
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            placeholder="Categoria do produto"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="preco" className="form-label">Preço:</label>
          <input
            type="text" // Mudar de 'number' para 'text' para aplicar a máscara
            className="form-control"
            id="preco"
            value={preco}
            onChange={handlePrecoChange} // Usar o manipulador de mudança
            required
            placeholder="Preço do produto"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="validade" className="form-label">Validade:</label>
          <input
            type="date"
            className="form-control"
            id="validade"
            value={validade}
            onChange={(e) => setValidade(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imgUrl" className="form-label">Imagem (URL):</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="imgUrl"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              placeholder="URL da imagem"
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleImagePreview}
            >
              Visualizar
            </button>
          </div>
          {imgPreview && (
            <div className="mt-3">
              <img src={imgPreview} alt="Preview" className="img-fluid" style={{ maxWidth: '400px', maxHeight: '400px', objectFit: 'cover' }} />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100 btn-lg mb-4">Cadastrar Produto</button>
      </form>
    </div>
  );
}

export default CadastroProduto;
