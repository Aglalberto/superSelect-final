import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import axios from "axios";

function Comentarios({ setIsLoggedIn }) {
  const { state } = useLocation();
  const { produto } = state;
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redireciona para a página de login se não houver token
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
          Authorization: `Bearer ${token}` // Envia o token no cabeçalho
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
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
          },
        }
      );
      
      // Após adicionar o comentário, recarrega a lista de comentários
      fetchComentarios();
      setNovoComentario(""); // Limpa o campo de comentário
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
    const dateObj = new Date(data);  // Converte a string de data para um objeto Date
    const ano = dateObj.getFullYear();
    const mes = String(dateObj.getMonth() + 1).padStart(2, '0');  // Mes começa em 0, então somamos 1
    const dia = String(dateObj.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`; // Retorna a data no formato YYYY-MM-DD
  };

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <h2>Comentários do Produto</h2>
        <h3>{produto.nome}</h3>
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
          <strong>Validade:</strong> {formatarData(produto.validade)}  {/* Chamando a função para formatar a data */}
        </p>
        {produto.img_url && <img src={produto.img_url} alt={produto.nome} style={{ width: "100%", maxHeight: "200px" }} />}
        <div style={{ marginTop: "20px" }}>
          <h4>Comentários:</h4>
          <ul>
            {comentarios.map((c) => (
              <li key={c.id}>
                <strong>{c.nome}: </strong>
                {c.comentario}
              </li>
            ))}
          </ul>
          <textarea
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            placeholder="Adicione um comentário"
          ></textarea>
          <button onClick={handleAddComentario}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default Comentarios;
