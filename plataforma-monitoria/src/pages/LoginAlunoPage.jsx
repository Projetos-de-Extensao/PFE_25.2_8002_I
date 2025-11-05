// src/pages/LoginAlunoPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// --- COMPONENTE DO MODAL: CADASTRO ---
// (Definido aqui para simplicidade, mas poderia ser um arquivo separado)
const ModalCadastro = ({ onClose }) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cadastro realizado com sucesso! (Simulado)');
    onClose(); // Fecha o modal após o "cadastro"
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <form id="cadastro-form" onSubmit={handleSubmit}>
          <h2>Criar Conta</h2>
          <p>Preencha seus dados para se cadastrar.</p>
          <div className="input-group"><label>Nome Completo</label><input type="text" required /></div>
          <div className="input-group"><label>E-mail Institucional</label><input type="email" required /></div>
          <div className="input-group"><label>Matrícula</label><input type="text" required /></div>
          <div className="input-group"><label>Curso</label><input type="text" required /></div>
          <div className="input-group"><label>Criar Senha</label><input type="password" required /></div>
          <button type="submit" className="btn btn-primary">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

// --- COMPONENTE DO MODAL: ESQUECI A SENHA ---
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


// --- PÁGINA PRINCIPAL DE LOGIN DO ALUNO ---
export default function LoginAlunoPage() {
  // 1. Estados para controlar cada modal (fechados por padrão)
  const [isCadastroOpen, setIsCadastroOpen] = useState(false);
  const [isEsqueciOpen, setIsEsqueciOpen] = useState(false);
  
  const navigate = useNavigate();

  // Adiciona a classe ao body
  useEffect(() => {
    document.body.className = 'login-body';
    return () => { document.body.className = ''; };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Login como Aluno realizado com sucesso! (Simulado)');
    navigate('/aluno/vagas');
  };

  return (
    <>
      <div className="login-container">
        <div className="logo">
          <span className="logo-placeholder">Monitoria Ibmec</span>
        </div>

        <form id="login-aluno-form" className="form-card" onSubmit={handleLogin}>
          <h2>Login do Aluno</h2>
          {/* ... inputs de email e senha ... */}
           <div className="input-group">
            <label htmlFor="email">E-mail Institucional</label>
            <input type="email" id="email" placeholder="matricula@alunos.ibmec.edu.br" required />
          </div>
          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" required />
          </div>
          
          <button type="submit" className="btn btn-primary">Entrar</button>
          
          <div className="form-links" style={{ justifyContent: 'center', gap: '20px' }}>
            {/* 2. onClick que abre o modal de cadastro */}
            <a href="#" onClick={(e) => { e.preventDefault(); setIsCadastroOpen(true); }}>
              Criar conta
            </a>
            {/* 2. onClick que abre o modal de esqueci senha */}
            <a href="#" onClick={(e) => { e.preventDefault(); setIsEsqueciOpen(true); }}>
              Esqueci minha senha
            </a>
          </div>
          <div className="form-links" style={{ marginTop: 15, justifyContent: 'center' }}>
            <Link to="/">Voltar para seleção</Link>
          </div>
        </form>
      </div>

      {/* 3. Renderização condicional dos modais */}
      {isCadastroOpen && <ModalCadastro onClose={() => setIsCadastroOpen(false)} />}
      {isEsqueciOpen && <ModalEsqueci onClose={() => setIsEsqueciOpen(false)} />}
    </>
  );
}