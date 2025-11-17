import React from 'react';

export default function VagaModal({ vaga, onClose }) {
  
  // ATUALIZADO: O prazo é o único dado que não vem da API
  const prazoEstatico = '30/11/2025';

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleApply = () => {
    alert(`Candidatura para a vaga "${vaga.nome}" enviada com sucesso! (Simulado)`);
    onClose();
  };

  return (
    <div className="modal" style={{ display: 'block' }} onClick={handleOverlayClick}>
      <div className="modal-content">
        
        <span className="close-btn" onClick={onClose}>&times;</span>

        {/* --- Dados Dinâmicos (da API) --- */}
        <h2>{vaga.nome}</h2>
        <p><strong>Professor Responsável:</strong> {vaga.professor_nome}</p>
        <p><strong>Prazo Final:</strong> {prazoEstatico}</p>
        <p><strong>Código:</strong> {vaga.curso_codigo}</p>
        <p><strong>Curso:</strong> {vaga.curso_nome}</p>

        {/* ATUALIZADO: Estes dados agora vêm da vaga! */}
        <div className="modal-section">
          <h3>Pré-requisitos</h3>
          {/* Usa o preRequisito da vaga ou um texto padrão */}
          <p>{vaga.preRequisitos || 'Não especificado.'}</p>
        </div>

        <div className="modal-section">
          <h3>Descrição das Atividades</h3>
          {/* Usa a descricao da vaga ou um texto padrão */}
          <p>{vaga.descricao || 'Não especificado.'}</p>
        </div>

        <button 
          className="btn btn-primary btn-full" 
          style={{marginTop: '20px'}}
          onClick={handleApply}
        >
          Quero me candidatar
        </button>
      </div>
    </div>
  );
}