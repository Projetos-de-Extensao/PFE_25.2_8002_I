import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const API_URL = '/db.json';

export default function LoginAlunoPage() {
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
      
      let alunoEncontrado = null;
      
      // Varre todas as disciplinas para encontrar o candidato
      const todasDisciplinas = (data.Vagas || []).flatMap(v => v.disciplinas);
      
      for (const disciplina of todasDisciplinas) {
        const candidato = disciplina.candidatos?.find(c => 
          // Verifica Nome OU Email (case insensitive)
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
        alert('Aluno não encontrado. Tente "Bruno Norton" ou "bruno.norton@alunos.ibmec.edu.br".');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com o banco de dados.');
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
        
        <div className="form-links" style={{ justifyContent: 'center', marginTop: '15px' }}>
          <Link to="/">? Voltar</Link>
        </div>
      </form>
    </div>
  );
}