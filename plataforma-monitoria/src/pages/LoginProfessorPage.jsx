import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ModalEsqueci = ({ onClose }) => (
  <div id="modal-esqueci" className="modal" style={{ display: 'block' }}>
    <div className="modal-content">
      <span className="close-btn" id="close-esqueci" onClick={onClose}>&times;</span>
      <form id="esqueci-form" onSubmit={(e) => {
          e.preventDefault();
          alert('Link de recuperação enviado! (Simulado)');
          onClose();
        }}>
        <h2>Recuperar Senha</h2>
        <p>Enviaremos um link de recuperação para seu e-mail.</p>
        <div className="input-group"><label>E-mail Institucional</label><input type="email" required /></div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  </div>
);

export default function LoginProfessorPage() {
  const [isEsqueciOpen, setIsEsqueciOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = 'login-body';
    return () => { document.body.className = ''; };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Login como Professor realizado com sucesso! (Simulado)');
    // Redireciona para a nova página de candidatos do professor
    navigate('/professor/candidatos');
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

        <form id="login-prof-form" className="form-card" onSubmit={handleLogin}>
          <h2>Login do Professor</h2>
          <p>Acesso restrito a professores.</p>
          
          <div className="input-group">
            <label htmlFor="email">E-mail Institucional</label>
            <input type="email" id="email" placeholder="matricula@professores.ibmec.edu.br" required />
          </div>
          
          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" required />
          </div>
          
          <button type="submit" className="btn btn-primary">Entrar</button>
          
          <div className="form-links" style={{ justifyContent: 'center' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsEsqueciOpen(true); }}>
              Esqueci minha senha
            </a>
          </div>
          <div className="form-links" style={{ marginTop: 15, justifyContent: 'center' }}>
            <Link to="/">Voltar para seleção</Link>
          </div>
        </form>
      </div>

      {isEsqueciOpen && <ModalEsqueci onClose={() => setIsEsqueciOpen(false)} />}
    </>
  );
}