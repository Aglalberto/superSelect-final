import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HistoricoProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState("");
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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Histórico de Produtos</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <div className="produtos-list">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="produto-item"
            style={{
              marginBottom: "20px",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            {produto.img_url && (
              <img
                src={produto.img_url}
                alt={produto.nome}
                style={{ width: "100%", maxHeight: "200px", objectFit: "cover", marginBottom: "10px" }}
              />
            )}
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
            <button onClick={() => handleViewComments(produto)}>Ver Comentários</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoricoProdutos;
