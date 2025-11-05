// src/pages/AlunoLayout.jsx
import React from 'react';
// Importa os componentes de roteamento
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function AlunoLayout() {
  // O 'useLocation' nos ajuda a saber qual é a URL atual
  // para que possamos destacar o link ativo na sidebar.
  const location = useLocation();

  // Função para verificar se o link deve estar "ativo"
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="header">
        <div className="container">
          <h1>Plataforma de Monitoria</h1>
          <div className="user-info">
            <span>Olá, Bruno Norton!</span>
            {/* O <Link> do React Router é usado em vez de <a href> 
                para navegar sem recarregar a página */}
            <Link to="/" className="btn btn-secondary">Sair</Link>
          </div>
        </div>
      </header>

      <div className="container main-layout">
        <nav className="sidebar">
          <ul>
            <li>
              <Link 
                to="/aluno/vagas" 
                // Define a classe 'active' dinamicamente
                className={`nav-link ${isActive('/aluno/vagas') ? 'active' : ''}`}
              >
                Vagas Abertas
              </Link>
            </li>
            <li>
              <Link 
                to="/aluno/candidaturas" 
                className={`nav-link ${isActive('/aluno/candidaturas') ? 'active' : ''}`}
              >
                Minhas Candidaturas
              </Link>
            </li>
            <li>
              <Link 
                to="/aluno/perfil" 
                className={`nav-link ${isActive('/aluno/perfil') ? 'active' : ''}`}
              >
                Meu Perfil
              </Link>
            </li>
          </ul>
        </nav>

        <main id="content-area">
          {/* <Outlet> é o espaço reservado onde o React Router
              vai renderizar o componente "filho" da rota.
              (Ex: AlunoVagasAbertas, AlunoCandidaturas, etc.) */}
          <Outlet />
        </main>
      </div>
    </>
  );
}