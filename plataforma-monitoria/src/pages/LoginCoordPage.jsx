import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const API_URL = '/db.json';

export default function LoginCoordPage() {
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
      
      // Procura o coordenador na lista de Vagas (Cursos)
      const coordEncontrado = (data.Vagas || []).find(v => 
        v.coordenadorNome.toLowerCase() === inputLogin.toLowerCase() ||
        v.coordenadorEmail.toLowerCase() === inputLogin.toLowerCase()
      );

      if (coordEncontrado) {
        login({ nome: coordEncontrado.coordenadorNome, role: 'coordenador' });
        alert(`Bem-vindo, ${coordEncontrado.coordenadorNome}!`);
        navigate('/coord/dashboard');
      } else {
        alert('Coordenador não encontrado. Tente "ana.ferreira@coordenadores.ibmec.edu.br".');
      }
    } catch (error) {
      alert('Erro ao conectar.');
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
         <span className="logo-placeholder">Monitoria Ibmec</span>
      </div>

      <form className="form-card" onSubmit={handleLogin}>
        <h2>Login do Coordenador</h2>
        <p>Acesso restrito a coordenadores.</p>
        
        <div className="input-group">
          <label>E-mail Institucional ou Nome</label>
          <input 
            type="text" 
            placeholder="Ex: ana.ferreira@coordenadores.ibmec.edu.br" 
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