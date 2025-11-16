// src/pages/LoginCoordPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// COMPONENTE DO MODAL: ESQUECI A SENHA
const ModalEsqueci = ({ onClose }) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Link de recuperação enviado! (Simulado)');
    onClose(); // Fecha o modal
  };
  
  return (
    <div id="modal-esqueci" className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close-btn" id="close-esqueci" onClick={onClose}>&times;</span>
        <form id="esqueci-form" onSubmit={handleSubmit}>
          <h2>Recuperar Senha</h2>
          <p>Enviaremos um link de recuperação para seu e-mail.</p>
          <div className="input-group"><label>E-mail Institucional</label><input type="email" required /></div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </div>
    </div>
  );
};


// PÁGINA PRINCIPAL DE LOGIN DO COORDENADOR
export default function LoginCoordPage() {
  // 1. Estado para controlar o modal
  const [isEsqueciOpen, setIsEsqueciOpen] = useState(false);
  const navigate = useNavigate();

  // Adiciona a classe ao body
  useEffect(() => {
    document.body.className = 'login-body';
    return () => { document.body.className = ''; };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Login como Coordenador realizado com sucesso! (Simulado)');
    navigate('/coord/dashboard');
  };

  return (
    <>
      <div className="login-container">
        <div className="logo">
          <img 
          src="/ibmecmonitoriaslogo.jpg"
          alt="Logo Ibmec Monitorias" 
        />
        </div>

        <form id="login-coord-form" className="form-card" onSubmit={handleLogin}>
          <h2>Login do Coordenador</h2>
          {/* ... inputs de email e senha ... */}
          <div className="input-group">
            <label htmlFor="email">E-mail Institucional</label>
            <input type="email" id="email" placeholder="matricula@coordenadores.ibmec.edu.br" required />
          </div>
          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" required />
          </div>
          
          <button type="submit" className="btn btn-primary">Entrar</button>
          
          <div className="form-links" style={{ justifyContent: 'center' }}>
            {/* 2. onClick que abre o modal */}
            <a href="#" onClick={(e) => { e.preventDefault(); setIsEsqueciOpen(true); }}>
              Esqueci minha senha
            </a>
          </div>
          <div className="form-links" style={{ marginTop: 15, justifyContent: 'center' }}>
            <Link to="/">Voltar para seleção</Link>
          </div>
        </form>
      </div>

      {/* 3. Renderização condicional do modal */}
      {isEsqueciOpen && <ModalEsqueci onClose={() => setIsEsqueciOpen(false)} />}
    </>
  );
}