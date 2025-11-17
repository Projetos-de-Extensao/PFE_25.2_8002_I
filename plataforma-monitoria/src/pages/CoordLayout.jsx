// src/pages/CoordLayout.jsx
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import CriarVagaModal from '../components/CriarVagaModal'; // Vamos criar este modal

export default function CoordLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation(); // Hook para saber a rota atual

  // Função para verificar se o link está ativo
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="header">
        <div className="container">
          <h1>Gestão de Monitorias</h1>
          <div className="user-info">
            <span>Olá, Dra. Ana Ferreira!</span>
            {/* Link para a página inicial */}
            <Link to="/" className="btn btn-secondary">Sair</Link>
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
            onClick={() => setIsModalOpen(true)} // Lógica React para abrir modal
          >
            Criar Nova Vaga
          </button>
        </nav>

        {/* Outlet é onde o conteúdo da página (filho) será renderizado */}
        <main id="content-area">
          <Outlet />
        </main>
      </div>

      {/* Renderização condicional do Modal */}
      {isModalOpen && <CriarVagaModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}