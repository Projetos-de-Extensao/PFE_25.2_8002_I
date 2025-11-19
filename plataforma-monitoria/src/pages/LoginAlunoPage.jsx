import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const API_URL = '/db.json';

// Modal simples para Esqueci a Senha
const ModalEsqueci = ({ onClose }) => (
  <div id="modal-esqueci" className="modal" style={{ display: 'block' }} onClick={(e) => e.target.className === 'modal' && onClose()}>
    <div className="modal-content">
      <span className="close-btn" onClick={onClose}>&times;</span>
      <form onSubmit={(e) => { e.preventDefault(); alert('Link enviado! (Simulado)'); onClose(); }}>
        <h2>Recuperar Senha</h2>
        <p>Enviaremos um link de recuperação para seu e-mail.</p>
        <div className="input-group"><label>E-mail Institucional</label><input type="email" required /></div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  </div>
);

export default function LoginAlunoPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [inputLogin, setInputLogin] = useState('');
  const [isEsqueciOpen, setIsEsqueciOpen] = useState(false); // Estado para o modal
  
  useEffect(() => {
    document.body.className = 'login-body';
    return () => { document.body.className = ''; };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      let alunoEncontrado = null;
      const todasDisciplinas = (data.Vagas || []).flatMap(v => v.disciplinas);
      
      for (const disciplina of todasDisciplinas) {
        const candidato = disciplina.candidatos?.find(c => 
          c.nome.toLowerCase() === inputLogin.toLowerCase() ||
          (c.email && c.email.toLowerCase() === inputLogin.toLowerCase())
        );
        if (candidato) {
          alunoEncontrado = candidato;
          break;
        }
      }

      if (alunoEncontrado) {
        login({ nome: alunoEncontrado.nome, role: 'aluno' });
        alert(`Bem-vindo, ${alunoEncontrado.nome}!`);
        navigate('/aluno/vagas');
      } else {
        alert('Aluno não encontrado.');
      }
    } catch (error) {
      alert('Erro ao conectar.');
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img 
          src="/ibmecmonitoriaslogo.jpg"
          alt="Logo Ibmec Monitorias" 
        />
      </div>

      <form className="form-card" onSubmit={handleLogin}>
        <h2>Login do Aluno</h2>
        <p>Use seu e-mail institucional ou nome completo.</p>
        
        <div className="input-group">
          <label>E-mail ou Nome</label>
          <input 
            type="text" 
            placeholder="Ex: bruno.norton@alunos.ibmec.edu.br" 
            required 
            value={inputLogin}
            onChange={(e) => setInputLogin(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label>Senha</label>
          <input type="password" placeholder="••••••" required />
        </div>
        
        <button type="submit" className="btn btn-primary">Entrar</button>
        
        {/* BOTÃO DE ESQUECI MINHA SENHA VOLTOU AQUI */}
        <div className="form-links" style={{ justifyContent: 'center', marginTop: '15px' }}>
           <a href="#" onClick={(e) => { e.preventDefault(); setIsEsqueciOpen(true); }}>
              Esqueci minha senha
           </a>
        </div>
        <div className="form-links" style={{ justifyContent: 'center', marginTop: '10px' }}>
          <Link to="/">Voltar</Link>
        </div>
      </form>

      {/* Renderiza o modal se estiver aberto */}
      {isEsqueciOpen && <ModalEsqueci onClose={() => setIsEsqueciOpen(false)} />}
    </div>
  );
}