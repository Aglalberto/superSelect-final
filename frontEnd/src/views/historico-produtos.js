import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";  // Importando os componentes do react-bootstrap

function HistoricoProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState("");
  const [showModal, setShowModal] = useState(false);  // Estado para controlar a exibição do modal
  const [produtoExcluir, setProdutoExcluir] = useState(null);  // Produto selecionado para exclusão
  const navigate = useNavigate();

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
        setErro("Erro ao carregar o histórico de produtos.");
      }
    };

    fetchProdutos();
  }, []);

  const handleViewComments = (produto) => {
    navigate("/comentarios", { state: { produto } });
  };

  // Função para formatar a data
  const formatarData = (data) => {
    const dateObj = new Date(data);  // Converte a string de data para um objeto Date
    const ano = dateObj.getFullYear();
    const mes = String(dateObj.getMonth() + 1).padStart(2, '0');  // Mes começa em 0, então somamos 1
    const dia = String(dateObj.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`; // Retorna a data no formato YYYY-MM-DD
  };

  // Função para excluir um produto do frontend
  const handleDelete = (produtoId) => {
    setProdutoExcluir(produtoId);  // Define o produto para exclusão
    setShowModal(true);  // Abre o modal de confirmação
  };

  // Função que confirma a exclusão do produto
  const confirmarExclusao = () => {
    setProdutos(produtos.filter((produto) => produto.id !== produtoExcluir));  // Remove o produto
    setShowModal(false);  // Fecha o modal
    setProdutoExcluir(null);  // Reseta o produto selecionado para exclusão
  };

  // Função que cancela a exclusão
  const cancelarExclusao = () => {
    setShowModal(false);  // Fecha o modal sem excluir
    setProdutoExcluir(null);  // Reseta o produto selecionado
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Produtos Cadastrados</h2>
      {erro && <p className="text-danger">{erro}</p>}

      {/* Verifica se não há produtos cadastrados */}
      {produtos.length === 0 ? (
        <p className="text-center">Não há nenhum produto cadastrado.</p>
      ) : (
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
                  <button
                    onClick={() => handleViewComments(produto)}
                    className="btn btn-info w-100 mb-2"
                  >
                    Ver Comentários
                  </button>
                  {/* Botão de exclusão */}
                  <button
                    onClick={() => handleDelete(produto.id)}
                    className="btn btn-danger w-100"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
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
