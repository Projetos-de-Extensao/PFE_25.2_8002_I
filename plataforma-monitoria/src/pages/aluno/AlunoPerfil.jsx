import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const API_URL = '/db.json';

export default function AlunoPerfil() {
  const { user } = useAuth();
  
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('');
  const [matricula, setMatricula] = useState('');
  const [lattes, setLattes] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!user) return;

    const fetchAlunoData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Falha ao carregar dados.');
        const data = await response.json();

        let alunoEncontrado = null;
        
        // Procura os dados do aluno no db.json para preencher o perfil
        const todasDisciplinas = (data.Vagas || []).flatMap(v => v.disciplinas);
        for (const disciplina of todasDisciplinas) {
          const candidato = disciplina.candidatos?.find(c => c.nome === user.nome);
          if (candidato) {
            alunoEncontrado = candidato;
            break;
          }
        }

        if (alunoEncontrado) {
          setCurso(alunoEncontrado.cursando);
          setEmail(alunoEncontrado.email || 'email@naoencontrado.com');
          // Gera uma matrícula fictícia baseada no ID se não tiver
          setMatricula(`20250${alunoEncontrado.id}`);
        } else {
          setCurso("Não identificado");
          setEmail("email@exemplo.com");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAlunoData();
  }, [user]);

  const handleToggleEdit = (e) => {
    e.preventDefault(); 
    if (isEditing) {
      alert('Perfil salvo com sucesso! (Simulado)');
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  if (isLoading) return <div className="content-section"><p>Carregando...</p></div>;

  return (
    <div className="content-section">
      <h2>Meu Perfil</h2>
      <form id="perfil-form">
        <div className="input-group">
          <label>Nome Completo</label>
          <input type="text" value={user?.nome} disabled />
        </div>
        <div className="input-group">
          <label>E-mail</label>
          <input type="text" value={email} disabled />
        </div>
        <div className="input-group">
          <label>Curso</label>
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