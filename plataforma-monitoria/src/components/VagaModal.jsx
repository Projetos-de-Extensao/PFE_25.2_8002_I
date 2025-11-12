import React from 'react';

export default function VagaModal({ vaga, onClose }) {
  
  const dadosEstaticos = {
    prazo: '30/11/2025',
    preRequisitos: 'CR > 7.0, Aprovado na matéria base.',
    descricao: 'Auxiliar os alunos com listas de exercícios e plantões de dúvidas semanais.'
  };

  return (
    <div className="modal" style={{ display: 'block' }} onClick={onClose}>
      
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <span className="close-btn" onClick={onClose}>&times;</span>

        {/* --- Dados Dinâmicos (da API) --- */}
        <h2>{vaga.nome}</h2> 
        
        <p><strong>Professor Responsável:</strong> {vaga.professor_nome}</p>

        {/* --- Dados Estáticos (Fixos) --- */}
        <p><strong>Prazo Final:</strong> {dadosEstaticos.prazo}</p>

        {/* --- Dados Dinâmicos (da API) --- */}
        <p><strong>Código:</strong> {vaga.codigo}</p>
        <p><strong>Curso:</strong> {vaga.curso_nome}</p>

        {/* --- Dados Estáticos (Fixos) --- */}
        <div className="modal-section">
          <h3>Pré-requisitos</h3>
          <p>{dadosEstaticos.preRequisitos}</p>
        </div>

        <div className="modal-section">
          <h3>Descrição das Atividades</h3>
          <p>{dadosEstaticos.descricao}</p>
        </div>

        <button 
          className="btn btn-primary btn-full" 
          style={{marginTop: '20px'}}
        >
          Quero me candidatar
        </button>
      </div>
    </div>
  );
}