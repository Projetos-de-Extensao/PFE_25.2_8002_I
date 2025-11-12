import React, { useState, useEffect } from 'react';
import VagaModal from '../../components/VagaModal'; 

const API_CURSOS_URL = 'https://plataformacasa-a2a3d2abfd5e.herokuapp.com/api/cursos/';
const API_DISCIPLINAS_URL = 'https://plataformacasa-a2a3d2abfd5e.herokuapp.com/api/disciplinas/';
const API_FUNCIONARIOS_URL = 'https://plataformacasa-a2a3d2abfd5e.herokuapp.com/api/funcionarios/';

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
        const [cursosResponse, disciplinasResponse, funcionariosResponse] = await Promise.all([
          fetch(API_CURSOS_URL),
          fetch(API_DISCIPLINAS_URL),
          fetch(API_FUNCIONARIOS_URL)
        ]);

        if (!cursosResponse.ok || !disciplinasResponse.ok || !funcionariosResponse.ok) {
          throw new Error('Falha ao buscar dados das APIs');
        }

        const cursosData = await cursosResponse.json();
        const disciplinasData = await disciplinasResponse.json();
        const funcionariosData = await funcionariosResponse.json();

        //LÓGICA DE MESCLAGEM DE DADOS
        const listaDisciplinas = disciplinasData.results || disciplinasData;
        
        //Filtramos a lista para pegar apenas os professores
        const listaProfessores = (funcionariosData.results || funcionariosData)
          .filter(func => func.tipo_usuario_nome === 'Professor');

        if (!listaProfessores || listaProfessores.length === 0) {
          throw new Error('Não foi possível carregar os professores.');
        }

        const vagasComProfessores = listaDisciplinas.map((disciplina, index) => {
          const professorAtribuido = listaProfessores[index % listaProfessores.length];

          return {
            ...disciplina, 
            professor_nome: professorAtribuido.nome 
          };
        });
        
        setCursos(cursosData.results || cursosData);
        setVagas(vagasComProfessores);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 

  const vagasFiltradas = vagas
    .filter(vaga => {
      if (filtroCurso === 'Todos os Cursos') return true;
      return vaga.curso_nome === filtroCurso; 
    })
    .filter(vaga => {
      return vaga.nome.toLowerCase().includes(filtroMateria.toLowerCase());
    });

  
  const handleVerDetalhes = (vaga) => {
    setVagaSelecionada(vaga);
    setModalVisivel(true);
  };

  const handleCloseModal = () => {
    setModalVisivel(false);
    setVagaSelecionada(null);
  };

  // Renderização (Carregando...)
  if (isLoading) {
    return (
      <div className="content-section">
        <h2>Vagas Abertas</h2>
        <p>Carregando vagas...</p>
      </div>
    );
  }

  // Renderização (Erro)
  if (error) {
    return (
      <div className="content-section">
        <h2>Vagas Abertas</h2>
        <p style={{ color: 'red' }}>Erro ao carregar dados: {error}</p>
      </div>
    );
  }

  // Renderização (Sucesso)
  return (
    <div className="content-section">
      <h2>Vagas Abertas</h2>
      
      {/* Filtros (sem alteração) */}
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
              <option key={curso.id} value={curso.nome}>
                {curso.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="filtro-busca">Buscar por Matéria</label>
          <input 
            type="text" 
            id="filtro-busca"
            placeholder="Ex: Estruturas de Dados"
            value={filtroMateria}
            onChange={(e) => setFiltroMateria(e.target.value)}
          />
        </div>
      </div>
      
      {/* Lista de Vagas (Cards) */}
      <div className="lista-vagas">
        {vagasFiltradas.length > 0 ? (
          vagasFiltradas.map(vaga => (
            <div className="vaga-card" key={vaga.id}>
              <div className="vaga-card-info">
                
                <h3>{vaga.nome}</h3> 
                <p>Professor: {vaga.professor_nome}</p> 
                
                {/* ATUALIZADO (Bug 3): Data corrigida */}
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

      {/* Renderização do Modal */}
      {modalVisivel && (
        <VagaModal 
          vaga={vagaSelecionada} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}