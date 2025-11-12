// src/components/VagaModal.jsx
import React from 'react';

export default function VagaModal({ vaga, onClose }) {
  
  const dadosEstaticos = {
    prazo: '30/11/2025',
    preRequisitos: 'CR > 7.0, Aprovado na matéria base.',
    descricao: 'Auxiliar os alunos com listas de exercícios e plantões de dúvidas semanais.'
  };

  // Função para fechar o modal ao clicar no fundo
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // ATUALIZADO: Criamos a função para o botão "Candidatar"
  const handleApply = () => {
    // 1. Mostra um alerta para simular o envio
    alert(`Candidatura para a vaga "${vaga.nome}" enviada com sucesso! (Simulado)`);
    
    // 2. Fecha o modal
    onClose();
  };

  return (
    <div className="modal" style={{ display: 'block' }} onClick={handleOverlayClick}>
      <div className="modal-content">
        
        {/* Este botão fecha o modal */}
        <span className="close-btn" onClick={onClose}>&times;</span>

        <h2>{vaga.nome}</h2> 
        
        <p><strong>Professor Responsável:</strong> {vaga.professor_nome}</p>
        <p><strong>Prazo Final:</strong> {dadosEstaticos.prazo}</p>
        <p><strong>Código:</strong> {vaga.codigo}</p>
        <p><strong>Curso:</strong> {vaga.curso_nome}</p>

        <div className="modal-section">
          <h3>Pré-requisitos</h3>
          <p>{dadosEstaticos.preRequisitos}</p>
        </div>

        <div className="modal-section">
          <h3>Descrição das Atividades</h3>
          <p>{dadosEstaticos.descricao}</p>
        </div>

        {/* ATUALIZADO: Adicionamos o evento onClick={handleApply} ao botão */}
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