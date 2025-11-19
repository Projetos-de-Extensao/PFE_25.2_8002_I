import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const API_URL = '/db.json';

export default function LoginProfessorPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [inputLogin, setInputLogin] = useState('');

  useEffect(() => {
    document.body.className = 'login-body';
    return () => { document.body.className = ''; };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      const todasDisciplinas = (data.Vagas || []).flatMap(v => v.disciplinas);
      
      // Procura professor pelo Nome ou Email
      const professorEncontrado = todasDisciplinas.find(d => 
        d.professorResponsavel.toLowerCase() === inputLogin.toLowerCase() ||
        (d.professorEmail && d.professorEmail.toLowerCase() === inputLogin.toLowerCase())
      );

      if (professorEncontrado) {
        login({ nome: professorEncontrado.professorResponsavel, role: 'professor' });
        alert(`Bem-vindo, ${professorEncontrado.professorResponsavel}!`);
        navigate('/professor/candidatos');
      } else {
        alert('Professor não encontrado. Tente "Dr. Carlos Silva" ou "carlos.silva@professores.ibmec.edu.br".');
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
        <h2>Login do Professor</h2>
        <p>Acesso restrito a professores.</p>
        
        <div className="input-group">
          <label>E-mail Institucional ou Nome</label>
          <input 
            type="text" 
            placeholder="Ex: carlos.silva@professores.ibmec.edu.br" 
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
        
        <div className="form-links" style={{ justifyContent: 'center', marginTop: '15px' }}>
          <Link to="/">? Voltar</Link>
        </div>
      </form>
    </div>
  );
}