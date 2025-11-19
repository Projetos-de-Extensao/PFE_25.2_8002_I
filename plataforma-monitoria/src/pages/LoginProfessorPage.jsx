import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importa o contexto

const API_URL = '/db.json';

export default function LoginAlunoPage() {
  const { login } = useAuth(); // Pega a função de login
  const navigate = useNavigate();
  const [inputLogin, setInputLogin] = useState(''); // Pode ser nome ou email
  
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
      
      // Varre todas as vagas e disciplinas para procurar o aluno
      const todasDisciplinas = (data.Vagas || []).flatMap(v => v.disciplinas);
      
      for (const disciplina of todasDisciplinas) {
        const candidato = disciplina.candidatos?.find(c => 
          // Verifica se o input bate com o NOME ou com o EMAIL (case insensitive)
          c.nome.toLowerCase() === inputLogin.toLowerCase() ||
          c.email.toLowerCase() === inputLogin.toLowerCase()
        );
        
        if (candidato) {
          alunoEncontrado = candidato;
          break; // Paramos de procurar se acharmos
        }
      }

      if (alunoEncontrado) {
        // SUCESSO: Loga o usuário no contexto global
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
         {/* Substitua pela sua tag <img> se preferir */}
          <img 
          src="/ibmecmonitoriaslogo.jpg"
          alt="Logo Ibmec Monitorias" 
          />
      </div>

      <form id="login-aluno-form" className="form-card" onSubmit={handleLogin}>
        <h2>Login do Aluno</h2>
        <p>Use seu e-mail institucional ou nome completo.</p>
        
        <div className="input-group">
          <label htmlFor="login">E-mail ou Nome</label>
          <input 
            type="text" 
            id="login" 
            placeholder="Ex: bruno.norton@alunos.ibmec.edu.br" 
            required 
            value={inputLogin}
            onChange={(e) => setInputLogin(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" placeholder="••••••" required />
        </div>
        
        <button type="submit" className="btn btn-primary">Entrar</button>
        
        <div className="form-links" style={{ justifyContent: 'center', marginTop: '15px' }}>
          <Link to="/">? Voltar</Link>
        </div>
      </form>
    </div>
  );
}