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
    const dateObj = new Date(data);
    const ano = dateObj.getFullYear();
    const mes = String(dateObj.getMonth() + 1).padStart(2, "0");
    const dia = String(dateObj.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
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
      validade: produto.validade ? formatarData(produto.validade) : "",
    });
    setShowEditModal(true);
  };


  const cancelarEdicao = () => {
    setShowEditModal(false);
    setProdutoEditar(null);
  };

  const confirmarEdicao = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3001/produtos/produto/${produtoEditar.id}`, produtoEditar, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProdutos(
        produtos.map((produto) =>
          produto.id === produtoEditar.id ? produtoEditar : produto
        )
      );

      setShowEditModal(false);
      setProdutoEditar(null);
    } catch (error) {
      console.error("Erro ao editar produto:", error);
      alert("Erro ao editar o produto. Tente novamente.");
    }
  };


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Produtos Cadastrados</h2>
        <button
          className="btn btn-outline-primary"
          onClick={() => setViewMode(viewMode === "cards" ? "lista" : "cards")}
        >
          <i className={`bi ${viewMode === "cards" ? "bi-list" : "bi-grid-fill"}`}></i>
        </button>
      </div>

      {erro && <p className="text-danger">{erro}</p>}

      {produtos.length === 0 ? (
        <p className="text-center">Não há nenhum produto cadastrado.</p>
      ) : viewMode === "cards" ? (
        <div className="row justify-content-center">
          {produtos.map((produto) => (
            <div className="col-md-3 mb-4" key={produto.id}>
              <div className="card" style={{ borderRadius: "8px", border: "1px solid #ddd", height: "auto" }}>
                {produto.img_url && (
                  <img
                    src={produto.img_url}
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
                  <div className="d-flex justify-content-center">
                    <button
                      onClick={() => handleViewComments(produto)}
                      className="btn btn-info btn-sm mx-1"
                      title="Comentários"
                    >
                      <i className="bi bi-chat"></i>
                    </button>

                    <button
                      onClick={() => handleEdit(produto)}
                      className="btn btn-warning btn-sm mx-1"
                      title="Editar"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>

                    <button
                      onClick={() => handleDelete(produto.id)}
                      className="btn btn-danger btn-sm mx-1"
                      title="Excluir"
                    >
                      <i className="bi bi-trash"></i>
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
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>{produto.categoria}</td>
                <td>R$ {produto.preco}</td>
                <td>{formatarData(produto.validade)}</td>
                <td>
                  <button
                    onClick={() => handleViewComments(produto)}
                    className="btn btn-info btn-sm me-2"
                    title="Comentários"
                  >
                    <i className="bi bi-chat"></i>
                  </button>

                  <button
                    onClick={() => handleEdit(produto)}
                    className="btn btn-warning btn-sm me-2"
                    title="Editar"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>

                  <button
                    onClick={() => handleDelete(produto.id)}
                    className="btn btn-danger btn-sm"
                    title="Excluir"
                  >
                    <i className="bi bi-trash"></i>
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
                value={produtoEditar?.validade || ""}
                onChange={(e) =>
                  setProdutoEditar({ ...produtoEditar, validade: e.target.value })
                }
              />
            </div>
            <div className="form-group mb-3">
              <label>URL da Imagem</label>
              <input
                type="url"
                className="form-control"
                value={produtoEditar?.img_url || ""}
                onChange={(e) => setProdutoEditar({ ...produtoEditar, img_url: e.target.value })}
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
    </div>
  );
}

export default HistoricoProdutos;
