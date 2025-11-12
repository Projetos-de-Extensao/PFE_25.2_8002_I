// src/components/VagaModal.jsx
import React from 'react';

export default function VagaModal({ vaga, onClose }) {
  
  // Dados estáticos que não vêm da API
  const dadosEstaticos = {
    prazo: '30/11/2025',
    preRequisitos: 'CR > 7.0, Aprovado na matéria base.',
    descricao: 'Auxiliar os alunos com listas de exercícios e plantões de dúvidas semanais.'
  };

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
        <h2>{vaga.nome}</h2> {/* Vem de nomeDisciplina */}
        
        <p><strong>Professor Responsável:</strong> {vaga.professor_nome}</p> {/* Vem de professorResponsavel */}
        
        {/* --- Dados Estáticos --- */}
        <p><strong>Prazo Final:</strong> {dadosEstaticos.prazo}</p>
        
        {/* --- Dados Dinâmicos (da API) --- */}
        {/* ATUALIZADO: Usando 'curso_codigo' que definimos */}
        <p><strong>Código:</strong> {vaga.curso_codigo}</p>
        <p><strong>Curso:</strong> {vaga.curso_nome}</p>

        {/* --- Dados Estáticos --- */}
        <div className="modal-section">
          <h3>Pré-requisitos</h3>
          <p>{dadosEstaticos.preRequisitos}</p>
        </div>

        <div className="modal-section">
          <h3>Descrição das Atividades</h3>
          <p>{dadosEstaticos.descricao}</p>
        </div>

        {/* --- Botão --- */}
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