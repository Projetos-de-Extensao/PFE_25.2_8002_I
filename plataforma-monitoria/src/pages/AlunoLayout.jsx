import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importamos o contexto

export default function AlunoLayout() {
  const { user, logout } = useAuth(); // Pegamos o usuário e a função de logout
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = (e) => {
    e.preventDefault();
    logout(); // Limpa o usuário do contexto/localStorage
    navigate('/'); // Manda de volta para a tela inicial
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <h1>Plataforma de Monitoria</h1>
          <div className="user-info">
            {/* Agora mostra o nome dinâmico do aluno logado */}
            <span>Olá, {user ? user.nome : 'Aluno'}!</span>
            <a href="#" onClick={handleLogout} className="btn btn-secondary">Sair</a>
          </div>
        </div>
      </header>

      <div className="container main-layout">
        <nav className="sidebar">
          <ul>
            <li>
              <Link 
                to="/aluno/vagas" 
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
          <Outlet />
        </main>
      </div>
    </>
  );
}