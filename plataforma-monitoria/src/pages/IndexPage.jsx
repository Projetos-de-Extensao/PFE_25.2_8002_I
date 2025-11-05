// src/pages/IndexPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function IndexPage() {
  // Adiciona a classe ao body (só para esta página)
  React.useEffect(() => {
    document.body.className = 'login-body';
    // Remove a classe ao sair
    return () => {
      document.body.className = '';
    };
  }, []);

  return (
    <div className="login-container">
      <div className="logo">
        <span className="logo-placeholder">Monitoria Ibmec</span>
      </div>
      <div className="form-card role-selection">
        <h2>Bem-vindo!</h2>
        <p>Selecione seu tipo de acesso para continuar.</p>
        
        <Link to="/login-aluno" className="btn btn-role">
          <span className="role-icon">?</span> Sou Aluno
        </Link>
        
        <Link to="/login-coord" className="btn btn-role">
          <span className="role-icon">?</span> Sou Coordenador
        </Link>
      </div>
    </div>
  );
}