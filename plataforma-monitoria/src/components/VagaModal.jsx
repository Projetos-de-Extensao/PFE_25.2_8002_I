// src/components/VagaModal.jsx

import React from 'react';
import './style.css'; // Vamos criar este CSS em breve

// O 'vaga' é o objeto da vaga que foi clicada
// O 'onClose' é a função que será chamada para fechar o modal
export default function VagaModal({ vaga, onClose }) {
  return (
    // O Fundo escuro (overlay)
    <div className="modal-overlay" onClick={onClose}>
      {/* Evita que o clique no conteúdo feche o modal */}
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Botão de Fechar (X) */}
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>

        <h2>{vaga.materia}</h2>
        <p><strong>Professor Responsável:</strong> {vaga.professor}</p>
        <p><strong>Prazo Final:</strong> {vaga.prazo}</p>

        <div className="modal-section">
          <h3>Pré-requisitos</h3>
          <p>{vaga.preRequisitos}</p>
        </div>

        <div className="modal-section">
          <h3>Descrição das Atividades</h3>
          <p>{vaga.descricao}</p>
        </div>

        <button className="modal-apply-btn">
          Quero me candidatar
        </button>
      </div>
    </div>
  );
}