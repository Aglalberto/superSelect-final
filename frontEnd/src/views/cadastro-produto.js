import React, { useState } from 'react';
import axios from 'axios';

function CadastroProduto() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState('');
  const [validade, setValidade] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imgPreview, setImgPreview] = useState(null); // Estado para armazenar o preview da imagem
  const [erro, setErro] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [validadeIndeterminada, setValidadeIndeterminada] = useState(false);

  const formatPreco = (value) => {
    let formattedValue = value.replace(/\D/g, '');
    formattedValue = (formattedValue / 100).toFixed(2).replace('.', ',');
    return formattedValue.startsWith(',') ? `0${formattedValue}` : formattedValue;
  };

  const handlePrecoChange = (e) => {
    const value = e.target.value;
    const formattedValue = formatPreco(value);
    setPreco(formattedValue);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgUrl(file);
      setImgPreview(URL.createObjectURL(file)); // Cria uma URL temporária para exibir a imagem
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('categoria', categoria);
    formData.append('preco', preco.replace(',', '.')); // Converter preço para ponto flutuante
    formData.append('validade', validadeIndeterminada ? 'Indeterminada' : validade);
    formData.append('imagem', imgUrl); // Certifique-se de que imgUrl é um arquivo (File)

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/produtos/produto', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Resetar o formulário após o sucesso
      setNome('');
      setDescricao('');
      setCategoria('');
      setPreco('');
      setValidade('');
      setImgUrl(null);
      setImgPreview(null); // Reseta o preview da imagem
      setErro('');

      // Configurar e exibir o toast
      setToastMessage('Produto cadastrado com sucesso!');
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false); // Fechar o toast automaticamente após alguns segundos
      }, 3000);
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      setErro('Erro ao cadastrar produto. Tente novamente.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Cadastro de Produto</h2>
      {erro && <div className="alert alert-danger">{erro}</div>}

      <div
        className={`toast bg-success position-fixed bottom-0 end-0 p-2 m-3 ${showToast ? 'show' : ''}`}
        style={{ zIndex: 1050 }}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header bg-success d-flex justify-content-between border-0 text-light">
          <span className="fw-bold fs-5">{toastMessage}</span>
          <button
            type="button"
            className="btn-close btn-close-custom"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={() => setShowToast(false)}
          ></button>
        </div>
      </div>

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
            type="text"
            className="form-control"
            id="preco"
            value={preco}
            onChange={handlePrecoChange}
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
            value={validadeIndeterminada ? '' : validade}
            onChange={(e) => setValidade(e.target.value)}
            disabled={validadeIndeterminada}
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="validadeIndeterminada"
            checked={validadeIndeterminada}
            onChange={(e) => setValidadeIndeterminada(e.target.checked)}
          />
          <label htmlFor="validadeIndeterminada" className="form-check-label">
            Indeterminada
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="imagem" className="form-label">Imagem:</label>
          <input
            type="file"
            className="form-control"
            id="imagem"
            onChange={handleImageChange} // Alterado para gerenciar o preview
          />
        </div>

        {imgPreview && (
          <div className="mb-3">
            <img
              src={imgPreview}
              alt="Preview do Produto"
              style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '8px' }}
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100 btn-lg mb-4">Cadastrar Produto</button>
      </form>
    </div>
  );
}

export default CadastroProduto;
