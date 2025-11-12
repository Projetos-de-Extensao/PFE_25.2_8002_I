// src/pages/aluno/AlunoVagasAbertas.jsx

import React, { useState, useEffect } from 'react';
import VagaModal from '../../components/VagaModal'; 

// ATUALIZADO: URL da nossa API local
const API_URL = '/db.json'; // O arquivo que você colocou na pasta /public

export default function AlunoVagasAbertas() {
  // Estados para os dados da API
  const [vagas, setVagas] = useState([]);      // <-- A lista "achatada" de disciplinas
  const [cursos, setCursos] = useState([]);    // <-- A lista de cursos para o filtro
  
  // Estados de controle
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados dos filtros e modal
  const [filtroCurso, setFiltroCurso] = useState('Todos os Cursos');
  const [filtroMateria, setFiltroMateria] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [vagaSelecionada, setVagaSelecionada] = useState(null);

  // Hook para buscar dados no carregamento
  useEffect(() => {
    const fetchData = async () => {
      try {
        // ATUALIZADO: Buscamos apenas uma API
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('Falha ao buscar db.json');
        }

        const data = await response.json();
        
        // --- LÓGICA DE PROCESSAMENTO DE DADOS ---
        // data.Vagas é a lista de cursos (ex: [{nomeCurso: "Engenharia...", disciplinas: [...]}, ...])
        const cursosDaAPI = data.Vagas || [];
        
        // 1. Criamos a lista de cursos para o filtro
        setCursos(cursosDaAPI);

        // 2. Criamos a lista "achatada" de vagas (disciplinas)
        // Usamos flatMap para transformar um array de cursos (com disciplinas aninhadas)
        // em um único array de disciplinas, onde cada disciplina sabe qual é o seu curso.
        const vagasProcessadas = cursosDaAPI.flatMap(curso => (
          curso.disciplinas.map(disciplina => ({
            // Criamos um ID único para o React (ex: "CC001-Banco de Dados")
            id: `${curso.codigoCurso}-${disciplina.nomeDisciplina}`,
            
            // Dados da disciplina
            nome: disciplina.nomeDisciplina,
            professor_nome: disciplina.professorResponsavel,
            
            // Dados do curso "pai"
            curso_nome: curso.nomeCurso,
            curso_codigo: curso.codigoCurso
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

  // --- LÓGICA DE FILTRAGEM (Atualizada para os novos nomes) ---
  const vagasFiltradas = vagas
    .filter(vaga => {
      // 1. Filtro de Curso
      if (filtroCurso === 'Todos os Cursos') return true;
      return vaga.curso_nome === filtroCurso; // Compara com o nome do curso que adicionamos
    })
    .filter(vaga => {
      // 2. Filtro de Matéria
      return vaga.nome.toLowerCase().includes(filtroMateria.toLowerCase());
    });

  
  // --- Funções do Modal (sem alteração) ---
  const handleVerDetalhes = (vaga) => {
    setVagaSelecionada(vaga);
    setModalVisivel(true);
  };

  const handleCloseModal = () => {
    setModalVisivel(false);
    setVagaSelecionada(null);
  };

  // --- Renderização (Carregando...) ---
  if (isLoading) {
    return (
      <div className="content-section">
        <h2>Vagas Abertas</h2>
        <p>Carregando vagas...</p>
      </div>
    );
  }

  // --- Renderização (Erro) ---
  if (error) {
    return (
      <div className="content-section">
        <h2>Vagas Abertas</h2>
        <p style={{ color: 'red' }}>Erro ao carregar dados: {error}</p>
      </div>
    );
  }

  // --- Renderização (Sucesso) ---
  return (
    <div className="content-section">
      <h2>Vagas Abertas</h2>
      
      {/* --- Filtros --- */}
      <div className="filtros-container">
        <div className="input-group">
          <label htmlFor="filtro-curso">Filtrar por Curso</label>
          <select 
            id="filtro-curso"
            value={filtroCurso}
            onChange={(e) => setFiltroCurso(e.target.value)}
          >
            <option>Todos os Cursos</option>
            
            {/* ATUALIZADO: Lendo a lista de cursos do estado 'cursos' */}
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
      
      {/* --- Lista de Vagas (Cards) --- */}
      <div className="lista-vagas">
        {vagasFiltradas.length > 0 ? (
          vagasFiltradas.map(vaga => (
            <div className="vaga-card" key={vaga.id}>
              <div className="vaga-card-info">
                
                {/* ATUALIZADO: Usando os nomes do objeto 'vaga' processado */}
                <h3>{vaga.nome}</h3> 
                <p>Professor: {vaga.professor_nome}</p> 
                
                {/* Mantendo o prazo estático como antes */}
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

      {/* --- Renderização do Modal --- */}
      {modalVisivel && (
        <VagaModal 
          vaga={vagaSelecionada} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}