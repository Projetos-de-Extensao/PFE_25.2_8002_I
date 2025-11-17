import React, { useState, useEffect } from 'react';
import VagaModal from '../../components/VagaModal'; 

const API_URL = '/db.json'; 

export default function AlunoVagasAbertas() {
  const [vagas, setVagas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroCurso, setFiltroCurso] = useState('Todos os Cursos');
  const [filtroMateria, setFiltroMateria] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [vagaSelecionada, setVagaSelecionada] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Falha ao buscar db.json');
        const data = await response.json();
        
        const cursosDaAPI = data.Vagas || [];
        setCursos(cursosDaAPI);

        // ATUALIZADO: "Achata" as vagas (disciplinas) e inclui
        // os novos campos (preRequisitos, descricao)
        const vagasProcessadas = cursosDaAPI.flatMap(curso => (
          curso.disciplinas.map(disciplina => ({
            id: `${curso.codigoCurso}-${disciplina.nomeDisciplina}`,
            nome: disciplina.nomeDisciplina,
            professor_nome: disciplina.professorResponsavel,
            curso_nome: curso.nomeCurso,
            curso_codigo: curso.codigoCurso,
            // Adiciona os campos para o modal
            preRequisitos: disciplina.preRequisitos, 
            descricao: disciplina.descricao
          }))
        ));
        
        setVagas(vagasProcessadas);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 

  // --- Lógica de Filtragem (sem mudança) ---
  const vagasFiltradas = vagas
    .filter(vaga => {
      if (filtroCurso === 'Todos os Cursos') return true;
      return vaga.curso_nome === filtroCurso; 
    })
    .filter(vaga => {
      return vaga.nome.toLowerCase().includes(filtroMateria.toLowerCase());
    });

  
  // --- Funções do Modal (sem mudança) ---
  const handleVerDetalhes = (vaga) => {
    setVagaSelecionada(vaga);
    setModalVisivel(true);
  };

  const handleCloseModal = () => {
    setModalVisivel(false);
    setVagaSelecionada(null);
  };

  // --- Renderização ---
  if (isLoading) return <div className="content-section"><p>Carregando vagas...</p></div>;
  if (error) return <div className="content-section"><p style={{ color: 'red' }}>Erro: {error}</p></div>;

  return (
    <div className="content-section">
      <h2>Vagas Abertas</h2>
      
      <div className="filtros-container">
        <div className="input-group">
          <label htmlFor="filtro-curso">Filtrar por Curso</label>
          <select 
            id="filtro-curso"
            value={filtroCurso}
            onChange={(e) => setFiltroCurso(e.target.value)}
          >
            <option>Todos os Cursos</option>
            {cursos.map(curso => (
              <option key={curso.codigoCurso} value={curso.nomeCurso}>
                {curso.nomeCurso}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="filtro-busca">Buscar por Matéria</label>
          <input 
            type="text" 
            id="filtro-busca"
            placeholder="Ex: Banco de Dados"
            value={filtroMateria}
            onChange={(e) => setFiltroMateria(e.target.value)}
          />
        </div>
      </div>
      
      <div className="lista-vagas">
        {vagasFiltradas.length > 0 ? (
          vagasFiltradas.map(vaga => (
            <div className="vaga-card" key={vaga.id}>
              <div className="vaga-card-info">
                <h3>{vaga.nome}</h3> 
                <p>Professor: {vaga.professor_nome}</p> 
                <p>Prazo para inscrição: 30/11/2025</p>
              </div>
              <button 
                className="btn btn-primary btn-detalhes-vaga" 
                onClick={() => handleVerDetalhes(vaga)}
              >
                Ver Detalhes
              </button>
            </div>
          ))
        ) : (
          <p>Nenhuma vaga encontrada para os filtros selecionados.</p>
        )}
      </div>

      {modalVisivel && (
        <VagaModal 
          vaga={vagaSelecionada} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}