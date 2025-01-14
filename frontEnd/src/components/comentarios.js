import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, Form, ListGroup } from "react-bootstrap";

function Comentarios({ setIsLoggedIn }) {
  const { state } = useLocation();
  const { produto } = state;
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchComentarios = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token não encontrado.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/produtos/${produto.id}/comentarios`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComentarios(response.data);
    } catch (error) {
      console.error("Erro ao carregar comentários:", error);
    }
  };

  useEffect(() => {
    fetchComentarios();
  }, [produto.id]);

  const handleAddComentario = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para adicionar um comentário.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/produtos/${produto.id}/comentarios`,
        {
          produto_id: produto.id,
          nome: "Usuário",
          comentario: novoComentario,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      fetchComentarios();
      setNovoComentario("");
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
      if (error.response && error.response.status === 401) {
        alert("Token inválido ou expirado. Por favor, faça login novamente.");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      } else {
        alert("Erro ao adicionar o comentário. Tente novamente.");
      }
    }
  };

  const formatarData = (data) => {
    if (!data || data === "Indeterminada") {
      return "Indeterminada";
    }

    const dateObj = new Date(data);
    if (isNaN(dateObj.getTime())) {
      return "Indeterminada"; // Retorna "Indeterminada" se a data for inválida
    }

    const ano = dateObj.getFullYear();
    const mes = String(dateObj.getMonth() + 1).padStart(2, "0");
    const dia = String(dateObj.getDate()).padStart(2, "0");
    return `${dia}-${mes}-${ano}`;
  };


  return (

    <div className="container mt-4 mb-4 ">
      <div class="d-flex">
        <div className="mb-4">
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            style={{ borderRadius: "8px" }}
          >
            <i className="bi bi-arrow-left"></i> Voltar
          </Button>

        </div>
        <div>
          <h2 className="mb-4 ms-4">Comentários do Produto</h2>
        </div>
      </div>

      <Card style={{ borderRadius: "8px", border: "1px solid #ddd", padding: "20px" }}>
        <Card.Body>


          <h1 className="mb-4">{produto.nome}</h1>
          <p>
            <strong>Descrição:</strong> {produto.descricao}
          </p>
          <p>
            <strong>Categoria:</strong> {produto.categoria}
          </p>
          <p>
            <strong>Preço:</strong> R$ {produto.preco}
          </p>
          <p>
            <strong>Validade:</strong> {produto.validade ? formatarData(produto.validade) : "Indeterminada"}
          </p>

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

          <div style={{ marginTop: "20px" }}>
            <h4>Comentários:</h4>
            <ListGroup>
              {comentarios.map((c) => (
                <ListGroup.Item key={c.id} style={{ borderRadius: "8px", border: "1px solid #ddd", marginBottom: "10px" }}>
                  <strong>{c.nome}: </strong>
                  {c.comentario}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Form.Control
              as="textarea"
              rows={2}
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              placeholder="Adicione um comentário"
              style={{ borderRadius: "8px", marginBottom: "10px", padding: "10px" }}
            />
            <Button
              onClick={handleAddComentario}
              variant="primary"
              style={{ width: "100%", borderRadius: "8px", padding: "10px" }}
            >
              Enviar Comentário
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div >
  );
}

export default Comentarios;
