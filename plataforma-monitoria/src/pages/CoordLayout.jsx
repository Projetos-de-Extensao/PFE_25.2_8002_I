import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importamos o contexto
import CriarVagaModal from '../components/CriarVagaModal'; // Mantemos o modal de criação

export default function CoordLayout() {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
          <h1>Gestão de Monitorias</h1>
          <div className="user-info">
            {/* Nome dinâmico do coordenador */}
            <span>Olá, {user ? user.nome : 'Coordenador'}!</span>
            <a href="#" onClick={handleLogout} className="btn btn-secondary">Sair</a>
          </div>
        </div>
      </header>

      <div className="container main-layout">
        <nav className="sidebar">
          <ul>
            <li>
              <Link 
                to="/coord/dashboard" 
                className={`nav-link ${isActive('/coord/dashboard') ? 'active' : ''}`}
              >
                Painel Principal
              </Link>
            </li>
            <li>
              <Link 
                to="/coord/vagas" 
                className={`nav-link ${isActive('/coord/vagas') ? 'active' : ''}`}
              >
                Vagas Criadas
              </Link>
            </li>
          </ul>
          <button 
            id="show-criar-vaga" 
            className="btn btn-primary btn-full"
            onClick={() => setIsModalOpen(true)}
          >
            Criar Nova Vaga
          </button>
        </nav>

        <main id="content-area">
          <Outlet />
        </main>
      </div>

      {/* Renderização condicional do Modal de Criar Vaga */}
      {isModalOpen && <CriarVagaModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}