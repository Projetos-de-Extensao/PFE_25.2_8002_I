import React, { useState, useEffect } from 'react';

// SIMULAÇÃO: Aluno logado
const LOGGED_IN_ALUNO = "Bruno Norton";
const API_URL = '/db.json';

export default function AlunoPerfil() {
  // Estado para os dados do formulário
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('');
  const [matricula, setMatricula] = useState('');
  const [lattes, setLattes] = useState('');
  
  // Estado para o modo de edição
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchAlunoData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Falha ao carregar dados.');
        const data = await response.json();

        // Procura pelo aluno em todas as listas de candidatos
        let alunoEncontrado = null;
        for (const vaga of data.Vagas) {
          for (const disciplina of vaga.disciplinas) {
            alunoEncontrado = disciplina.candidatos.find(
              c => c.nome === LOGGED_IN_ALUNO
            );
            if (alunoEncontrado) break;
          }
          if (alunoEncontrado) break;
        }

        if (alunoEncontrado) {
          // ATUALIZADO: Preenche os dados com base na API
          setCurso(alunoEncontrado.cursando);
          // Simula e-mail e matrícula
          setEmail(`${alunoEncontrado.nome.toLowerCase().replace(' ', '.')}${alunoEncontrado.id}@alunos.ibmec.edu.br`);
          setMatricula(`20250${alunoEncontrado.id}`);
        } else {
          // Fallback se o aluno não for encontrado
          setCurso("Curso não encontrado");
          setEmail("email@naoencontrado.com");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAlunoData();
  }, []); // Roda apenas uma vez

  
  const handleToggleEdit = (e) => {
    e.preventDefault(); 
    
    if (isEditing) {
      alert('Perfil salvo com sucesso! (Simulado)');
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  if (isLoading) {
    return <div className="content-section"><p>Carregando perfil...</p></div>;
  }

  return (
    <div className="content-section">
      <h2>Meu Perfil</h2>
      <form id="perfil-form">
        <div className="input-group">
          <label>Nome Completo</label>
          <input type="text" value={LOGGED_IN_ALUNO} disabled />
        </div>
        <div className="input-group">
          <label>E-mail</label>
          <input type="email" value={email} disabled />
        </div>
        <div className="input-group">
          <label>Curso</label>
          {/* ATUALIZADO: Campo dinâmico */}
          <input type="text" value={curso} disabled />
        </div>
        <div className="input-group">
          <label>Matrícula</label>
          <input type="text" value={matricula} disabled />
        </div>
        <div className="input-group">
          <label>Link do Currículo Lattes</label>
          <input 
            type="text" 
            className="profile-input" 
            placeholder="http://lattes.cnpq.br/seu-id" 
            value={lattes}
            onChange={(e) => setLattes(e.target.value)}
            disabled={!isEditing} 
          />
        </div>
        <button 
          type="button" 
          id="btn-toggle-edit" 
          className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`}
          onClick={handleToggleEdit}
        >
          {isEditing ? 'Salvar Alterações' : 'Editar Perfil'}
        </button>
      </form>
    </div>
  );
}