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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatValidade = validade && validade.match(/^\d{4}-\d{2}-\d{2}$/) ? validade : null;

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3001/produtos/produto",
        {
          nome,
          descricao,
          categoria,
          preco,
          validade: validadeIndeterminada ? "Indeterminada" : formatValidade,
          img_url: imgUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setToastMessage("Produto cadastrado com sucesso!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000); 

      // Limpar os campos
      setNome("");
      setDescricao("");
      setCategoria("");
      setPreco("");
      setValidade("");
      setImgUrl("");
      setImgPreview("");
      setErro("");
      setValidadeIndeterminada(false); 
    } catch (error) {
      console.error("Erro ao cadastrar produto: ", error);
      setErro("Erro ao cadastrar produto. Tente novamente.");
    }
  };




  const handleImagePreview = () => {
    setImgPreview(imgUrl);
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
            value={validadeIndeterminada ? "" : validade}
            onChange={(e) => {
              const inputDate = e.target.value;

              const isValidDate = /^\d{4}-\d{0,2}-\d{0,2}$/.test(inputDate);

              if (isValidDate) {
                setValidade(inputDate);
              }
            }}
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
