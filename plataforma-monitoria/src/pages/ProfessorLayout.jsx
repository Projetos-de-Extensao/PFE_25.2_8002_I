import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importamos o contexto

export default function ProfessorLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path) => location.pathname === path;

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <h1>Painel do Professor</h1>
          <div className="user-info">
            {/* Nome dinâmico do professor */}
            <span>Olá, {user ? user.nome : 'Professor'}!</span>
            <a href="#" onClick={handleLogout} className="btn btn-secondary">Sair</a>
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