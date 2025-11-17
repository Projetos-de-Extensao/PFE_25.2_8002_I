import React, { useState, useEffect } from 'react';

// Assumindo o mesmo professor logado
const LOGGED_IN_PROFESSOR = "Dr. Carlos Silva";
const API_URL = '/db.json';

export default function ProfessorAlterarVaga() {
  const [minhasVagas, setMinhasVagas] = useState([]);
  const [vagaSelecionada, setVagaSelecionada] = useState(null);
  
  // Estados para os campos do formulário
  const [preRequisitos, setPreRequisitos] = useState('');
  const [descricao, setDescricao] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Busca todas as vagas do professor
  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Falha ao carregar dados.');
        const data = await response.json();
        
        const cursos = data.Vagas || [];
        const todasDisciplinas = cursos.flatMap(curso => 
          curso.disciplinas.map(disc => ({ ...disc, id: `${curso.codigoCurso}-${disc.nomeDisciplina}` }))
        );
        const vagasDoProfessor = todasDisciplinas.filter(
          disciplina => disciplina.professorResponsavel === LOGGED_IN_PROFESSOR
        );
        
        setMinhasVagas(vagasDoProfessor);
        
        // Se o professor tiver vagas, seleciona a primeira por padrão
        if (vagasDoProfessor.length > 0) {
          handleVagaChange(vagasDoProfessor[0].id, vagasDoProfessor);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVagas();
  }, []);

  // 2. Atualiza o formulário quando o usuário troca a vaga no <select>
  const handleVagaChange = (vagaId, vagas) => {
    const vagasSource = vagas || minhasVagas;
    const vaga = vagasSource.find(v => v.id === vagaId);
    
    if (vaga) {
      setVagaSelecionada(vaga);
      setPreRequisitos(vaga.preRequisitos || '');
      setDescricao(vaga.descricao || '');
    }
  };

  // 3. Simula o salvamento
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Vaga "${vagaSelecionada.nomeDisciplina}" atualizada com sucesso! (Simulado)`);
  };

  if (isLoading) return <div className="content-section"><p>Carregando...</p></div>;
  if (error) return <div className="content-section"><p style={{ color: 'red' }}>Erro: {error}</p></div>;

  return (
    <div className="content-section">
      <h2>Alterar Informações da Vaga</h2>
      
      {minhasVagas.length === 0 ? (
        <p>Você não tem nenhuma vaga de monitoria associada no momento.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Seletor de Vaga */}
          <div className="input-group">
            <label htmlFor="vaga-select">Selecione a Vaga</label>
            <select 
              id="vaga-select"
              onChange={(e) => handleVagaChange(e.target.value)}
              value={vagaSelecionada?.id || ''}
            >
              {minhasVagas.map(vaga => (
                <option key={vaga.id} value={vaga.id}>
                  {vaga.nomeDisciplina}
                </option>
              ))}
            </select>
          </div>

          {/* Campos Editáveis */}
          <div className="input-group">
            <label htmlFor="vaga-requisitos">Pré-requisitos</label>
            <textarea 
              id="vaga-requisitos" 
              rows="4" 
              value={preRequisitos}
              onChange={(e) => setPreRequisitos(e.target.value)}
              className="profile-input" // Reutilizando a classe
            />
          </div>

          <div className="input-group">
            <label htmlFor="vaga-descricao">Descrição das Atividades</label>
            <textarea 
              id="vaga-descricao" 
              rows="6" 
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="profile-input"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Salvar Alterações
          </button>
        </form>
      )}
    </div>
  );
}