import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function HistoricoProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [produtoExcluir, setProdutoExcluir] = useState(null);
  const [viewMode, setViewMode] = useState("cards");
  const navigate = useNavigate();
  const [produtoEditar, setProdutoEditar] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [validadeIndeterminada, setValidadeIndeterminada] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(
    (filteredProducts.length > 0 ? filteredProducts : produtos).length / itemsPerPage
  );

  const currentProducts = (filteredProducts.length > 0 ? filteredProducts : produtos).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  useEffect(() => {
    if (viewMode === "cards") {
      document.body.classList.add("cards-mode");
    } else {
      document.body.classList.remove("cards-mode");
    }
    return () => document.body.classList.remove("cards-mode");
  }, [viewMode]);


  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:3001/produtos/produtos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setErro("Erro ao carregar o histórico de produtos. Verifique se você está logado.");
      }
    };

    fetchProdutos();
  }, []);

  const handleViewComments = (produto) => {
    navigate("/comentarios", { state: { produto } });
  };

  const formatarData = (data) => {
    if (!data || data === "Indeterminada") {
      return "Indeterminada";
    }

    const dateObj = new Date(data);
    if (isNaN(dateObj)) {
      return "Indeterminada";
    }

    const ano = dateObj.getFullYear();
    const mes = String(dateObj.getMonth() + 1).padStart(2, "0");
    const dia = String(dateObj.getDate()).padStart(2, "0");
    return `${dia}-${mes}-${ano}`;
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProducts([]);
    } else {
      const results = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    }
  };


  const handleDelete = (produtoId) => {
    setProdutoExcluir(produtoId);
    setShowModal(true);
  };

  const confirmarExclusao = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/produtos/produto/${produtoExcluir}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProdutos(produtos.filter((produto) => produto.id !== produtoExcluir));
      setShowModal(false);
      setProdutoExcluir(null);
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert("Erro ao excluir o produto. Tente novamente.");
    }
  };

  const cancelarExclusao = () => {
    setShowModal(false);
    setProdutoExcluir(null);
  };

  const handleEdit = (produto) => {
    setProdutoEditar({
      ...produto,
      validade: produto.validade === "Indeterminada" ? "" : produto.validade,
    });
    setValidadeIndeterminada(produto.validade === "Indeterminada");
    setShowEditModal(true);
  };



  const cancelarEdicao = () => {
    setShowEditModal(false);
    setProdutoEditar(null);
  };

  const confirmarEdicao = async () => {
    let validadeCorrigida = produtoEditar.validade;
    if (validadeCorrigida && !validadeIndeterminada) {
      const ano = parseInt(validadeCorrigida.split("-")[0], 10);
      if (ano < 1000 || ano > 9999) {
        alert("Ano da validade deve ter 4 dígitos.");
        return;
      }
    }

    const formData = new FormData();
    formData.append('nome', produtoEditar.nome);
    formData.append('descricao', produtoEditar.descricao);
    formData.append('categoria', produtoEditar.categoria);
    formData.append('preco', produtoEditar.preco.replace(',', '.'));
    formData.append('validade', validadeIndeterminada ? 'Indeterminada' : validadeCorrigida);

    // Adicionar imagem apenas se for alterada
    if (produtoEditar.imagem && produtoEditar.imagem instanceof File) {
      formData.append('imagem', produtoEditar.imagem);
    }

    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(
        `http://localhost:3001/produtos/produto/${produtoEditar.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const updatedProduto = response.data; // Produto atualizado retornado do backend

      setProdutos((prevProdutos) =>
        prevProdutos.map((produto) =>
          produto.id === produtoEditar.id
            ? {
              ...produto,
              ...updatedProduto, // Atualiza com os novos dados, incluindo `img_path`
            }
            : produto
        )
      );

      setShowEditModal(false);
      setProdutoEditar(null);
    } catch (error) {
      console.error('Erro ao editar produto:', error);
      alert('Erro ao editar o produto. Tente novamente.');
    }
  };




  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Produtos Cadastrados</h2>
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => setViewMode(viewMode === "cards" ? "lista" : "cards")}
          >
            <i className={`bi ${viewMode === "cards" ? "bi-list" : "bi-grid-fill"}`}></i>
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => setSearchBarVisible(!searchBarVisible)}
          >
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>

      {searchBarVisible && (
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar produto..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {filteredProducts.length > 0 && (
            <ul className="list-group mt-2">
              {filteredProducts.map((produto) => (
                <li
                  key={produto.id}
                  className="list-group-item"
                  onClick={() => navigate(`/produto/${produto.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  {produto.nome}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}



      {erro && <p className="text-danger">{erro}</p>}

      {(filteredProducts.length > 0 ? filteredProducts : produtos).length === 0 ? (
        <p className="text-center">Não há nenhum produto cadastrado.</p>
      ) : viewMode === "cards" ? (
        <div
          className={`row justify-content-start ${viewMode === "cards" ? "cards-mode" : ""
            }`}
        >

          {currentProducts.map((produto) => (
            <div className="col-md-3 mb-4" key={produto.id}>
              <div className="card" style={{ borderRadius: "8px", border: "1px solid #ddd", height: "auto" }}>
                {produto.img_path && (
                  <img
                    src={`http://localhost:3001${produto.img_path}`}
                    alt={produto.nome}
                    className="card-img-top"
                    style={{
                      height: "250px",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                )}

                <div className="card-body">
                  <h2 className="card-title mb-4">{produto.nome}</h2>
                  <p className="card-text">
                    <strong>Descrição:</strong> {produto.descricao}
                  </p>
                  <p className="card-text">
                    <strong>Categoria:</strong> {produto.categoria}
                  </p>
                  <p className="card-text">
                    <strong>Preço:</strong> R$ {produto.preco}
                  </p>
                  <p className="card-text">
                    <strong>Validade:</strong> {formatarData(produto.validade)}
                  </p>
                  <div className="d-flex justify-content-end">
                    <button
                      onClick={() => handleViewComments(produto)}
                      className="btn btn-sm mx-1"
                      title="Comentários"
                    >
                      <box-icon name="chat" color="#3a506b"></box-icon>
                    </button>

                    <button
                      onClick={() => handleEdit(produto)}
                      className="btn btn-sm mx-1"
                      title="Editar"
                    >
                      <box-icon name="edit" color="#3a506b"></box-icon>
                    </button>

                    <button
                      onClick={() => handleDelete(produto.id)}
                      className="btn btn-sm mx-1"
                      title="Excluir"
                    >
                      <box-icon name="trash" color="#3a506b"></box-icon>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Validade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {(filteredProducts.length > 0 ? filteredProducts : produtos).map((produto) => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>{produto.categoria}</td>
                <td>R$ {produto.preco}</td>
                <td>{formatarData(produto.validade)}</td>
                <td>
                  <button
                    onClick={() => handleViewComments(produto)}
                    className="btn btn-sm"
                    title="Comentários"
                  >
                    <box-icon name='chat' color='#3a506b' ></box-icon>
                  </button>

                  <button
                    onClick={() => handleEdit(produto)}
                    className="btn btn-sm"
                    title="Editar"
                  >
                    <box-icon name='edit' color='#3a506b'></box-icon>
                  </button>

                  <button
                    onClick={() => handleDelete(produto.id)}
                    className="btn btn-sm"
                    title="Excluir"
                  >
                    <box-icon name='trash' color='#3a506b'></box-icon>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal show={showEditModal} onHide={cancelarEdicao}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group mb-3">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                value={produtoEditar?.nome || ""}
                onChange={(e) => setProdutoEditar({ ...produtoEditar, nome: e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <label>Descrição</label>
              <textarea
                className="form-control"
                value={produtoEditar?.descricao || ""}
                onChange={(e) => setProdutoEditar({ ...produtoEditar, descricao: e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <label>Categoria</label>
              <input
                type="text"
                className="form-control"
                value={produtoEditar?.categoria || ""}
                onChange={(e) => setProdutoEditar({ ...produtoEditar, categoria: e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <label>Preço</label>
              <input
                type="number"
                className="form-control"
                value={produtoEditar?.preco || ""}
                onChange={(e) => setProdutoEditar({ ...produtoEditar, preco: e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <label>Validade</label>
              <input
                type="date"
                className="form-control"
                value={validadeIndeterminada ? "" : produtoEditar?.validade || ""}
                onChange={(e) => {
                  const inputDate = e.target.value;

                  const isValidDate = /^\d{4}-\d{0,2}-\d{0,2}$/.test(inputDate);

                  if (isValidDate) {
                    setProdutoEditar({
                      ...produtoEditar,
                      validade: inputDate,
                    });
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

            <div className="form-group mb-3">
              <label>Imagem</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) =>
                  setProdutoEditar({ ...produtoEditar, imagem: e.target.files[0] })
                }
              />
            </div>

          </form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelarEdicao}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmarEdicao}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={showModal} onHide={cancelarExclusao}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você tem certeza de que deseja excluir este produto? Esta ação não pode ser desfeita.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelarExclusao}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarExclusao}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                Anterior
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                Próximo
              </button>
            </li>
          </ul>
        </nav>
      </div>

    </div>

  );
}

export default HistoricoProdutos;
