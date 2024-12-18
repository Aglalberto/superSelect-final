import React, { useState } from 'react';

function CadastroProduto() {

  return (
<div className='App'>
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      
      <h2>Cadastro de Produto</h2>
      <form>
        <div>
          <label>Nome do Produto:</label>
          <input
            type="text"
            name="nome"
            required
            placeholder="Nome do produto"
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            required
            placeholder="Descrição do produto"
          />
        </div>
        <div>
          <label>Categoria:</label>
          <input
            type="text"
            name="categoria"
            required
            placeholder="Categoria do produto"
          />
        </div>
        <div>
          <label>Preço:</label>
          <input
            type="number"
            name="preco"
            required
            placeholder="Preço do produto"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label>Validade:</label>
          <input
            type="date"
            name="validade"
        
            required
          />
        </div>
        <button type="submit">Cadastrar Produto</button>
      </form>
    </div>
    </div>
  );
};

export default CadastroProduto;