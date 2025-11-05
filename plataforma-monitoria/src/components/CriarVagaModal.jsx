// src/components/CriarVagaModal.jsx
import React from 'react';

// Recebe a função 'onClose' como propriedade
export default function VagaModal({ onClose }) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Vaga publicada com sucesso! (Simulado)');
    onClose(); // Fecha o modal ao submeter
  };

  return (
    // O modal-overlay (div .modal) agora é controlado pelo CSS
    <div id="modal-criar-vaga" className="modal" style={{ display: 'block' }}>
      <div className="modal-content large">
        {/* Usamos a função onClose no X */}
        <span className="close-btn" id="close-criar-vaga" onClick={onClose}>&times;</span>
        
        <form id="criar-vaga-form" onSubmit={handleSubmit}>
          <h2>Publicar Nova Vaga de Monitoria</h2>
          <h4>Informações Básicas</h4>
          <div className="input-group">
            <label htmlFor="vaga-materia">Matéria</label>
            <input type="text" id="vaga-materia" placeholder="Ex: Engenharia de Computação" required />
          </div>
          <div className="input-group">
            <label htmlFor="vaga-professor">Professor Responsável</label>
            <input type="text" id="vaga-professor" required />
          </div>
          <h4>Detalhes e Requisitos</h4>
          <div className="input-group">
            <label htmlFor="vaga-requisitos">Pré-requisitos</label>
            <textarea id="vaga-requisitos" rows="3" placeholder="Ex: Ter sido aprovado..."></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="vaga-descricao">Descrição das Atividades</label>
            <textarea id="vaga-descricao" rows="5"></textarea>
          </div>
          <h4>Configuração</h4>
          <div className="input-group-row">
            <div className="input-group">
              <label htmlFor="vaga-numero">Número de Vagas</label>
              <input type="number" id="vaga-numero" defaultValue="1" min="1" required />
            </div>
            <div className="input-group">
              <label htmlFor="vaga-prazo">Prazo Final para Inscrições</label>
              <input type="date" id="vaga-prazo" required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Publicar Vaga</button>
        </form>
      </div>
    </div>
  );
}