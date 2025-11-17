import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function ProfessorLayout() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Assume um nome de professor fixo para o "Olá!"
  const nomeProfessor = "Dr. Carlos Silva"; 

  return (
    <>
      <header className="header">
        <div className="container">
          <h1>Painel do Professor</h1>
          <div className="user-info">
            <span>Olá, {nomeProfessor}!</span>
            <Link to="/" className="btn btn-secondary">Sair</Link>
          </div>
        </div>
      </header>

      <div className="container main-layout">
        <nav className="sidebar">
          <ul>
            <li>
              <Link 
                to="/professor/candidatos" 
                className={`nav-link ${isActive('/professor/candidatos') ? 'active' : ''}`}
              >
                Candidatos
              </Link>
            </li>
            <li>
              <Link 
                to="/professor/alterar-vaga" 
                className={`nav-link ${isActive('/professor/alterar-vaga') ? 'active' : ''}`}
              >
                Alterar Vaga
              </Link>
            </li>
          </ul>
        </nav>

        <main id="content-area">
          <Outlet />
        </main>
      </div>
    </>
  );
}