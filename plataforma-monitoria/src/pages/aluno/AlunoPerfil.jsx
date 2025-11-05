// src/pages/aluno/AlunoPerfil.jsx
import React, { useState } from 'react';

export default function AlunoPerfil() {
  // Criamos um estado para rastrear se estamos no "modo de edição"
  const [isEditing, setIsEditing] = useState(false);

  // Poderíamos também usar 'useState' para os valores dos inputs,
  // mas para este formulário, podemos deixar assim por enquanto.
  
  const handleToggleEdit = (e) => {
    // Impede o envio do formulário (comportamento padrão do botão)
    e.preventDefault(); 
    
    if (isEditing) {
      // Se estava editando, agora "salva" e desativa o modo de edição
      alert('Perfil salvo com sucesso! (Simulado)');
      setIsEditing(false);
    } else {
      // Se não estava editando, ativa o modo de edição
      setIsEditing(true);
    }
  };

  return (
    <div className="content-section">
      <h2>Meu Perfil</h2>
      <form id="perfil-form">
        <div className="input-group">
          <label>Nome Completo</label>
          {/* Inputs não editáveis vêm do HTML original */}
          <input type="text" value="Bruno Norton" disabled />
        </div>
        <div className="input-group">
          <label>E-mail</label>
          <input type="email" value="202503452041@alunos.ibmec.edu.br" disabled />
        </div>
        <div className="input-group">
          <label>Curso</label>
          <input type="text" value="Engenharia de Computação" disabled />
        </div>
        <div className="input-group">
          <label>Matrícula</label>
          <input type="text" value="202503452041" disabled />
        </div>
        <div className="input-group">
          <label>Link do Currículo Lattes</label>
          {/* Este input usa o 'isEditing' para habilitar/desabilitar */}
          <input 
            type="text" 
            className="profile-input" 
            placeholder="http://lattes.cnpq.br/seu-id" 
            // A propriedade 'disabled' é o OPOSTO de 'isEditing'
            disabled={!isEditing} 
          />
        </div>
        <button 
          type="button" 
          id="btn-toggle-edit" 
          className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`} // CSS dinâmico
          onClick={handleToggleEdit} // Lógica React
        >
          {/* Texto dinâmico baseado no estado 'isEditing' */}
          {isEditing ? 'Salvar Alterações' : 'Editar Perfil'}
        </button>
      </form>
    </div>
  );
}