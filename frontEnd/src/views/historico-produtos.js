import React, { useState } from "react";

function HistoricoProdutos() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Histórico de Produtos</h2>

      <div className="produtos-list">
        <div
          className="produto-item"
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <h3>Nome do produto</h3>
          <p>
            <strong>Descrição:</strong> 
          </p>
          <p>
            <strong>Categoria:</strong>
          </p>
          <p>
            <strong>Preço:</strong>
          </p>
          <p>
            <strong>Validade:</strong> 
          </p>
          <button>
            Ver Comentários
          </button>
          <div style={{ marginTop: "10px" }}>
            <h4>Comentários:</h4>
            <ul>
              <li>Comentario aqui</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoricoProdutos;
