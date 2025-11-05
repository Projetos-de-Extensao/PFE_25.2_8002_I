// src/pages/aluno/AlunoVagasAbertas.jsx
import React, { useState } from 'react';
// Importa o modal que criamos na primeira resposta
import VagaModal from '../../components/VagaModal'; 

// Nossos dados, incluindo as novas vagas de Direito e Administração
const DADOS_VAGAS = [
  { id: 1, curso: 'Engenharia', materia: 'Engenharia de Computação', professor: 'Prof. Silva', prazo: '30/10/2025', preRequisitos: 'CR > 7.0, Aprovado em Cálculo I', descricao: 'Auxiliar os alunos com listas de exercícios e plantões de dúvidas.' },
  { id: 2, curso: 'Engenharia', materia: 'Métodos Quantitativos', professor: 'Prof. Carlos', prazo: '28/10/2025', preRequisitos: 'Aprovado em Cálculo I', descricao: 'Apoio nas aulas de monitoria e correção de listas.' },
  { id: 3, curso: 'Engenharia', materia: 'Matemática Discreta', professor: 'Profa. Beatriz', prazo: '05/11/2025', preRequisitos: 'Aprovado em Lógica de Programação', descricao: 'Elaboração de material de apoio.' },
  { id: 4, curso: 'Direito', materia: 'Direito Constitucional', professor: 'Prof. Mendes', prazo: '10/11/2025', preRequisitos: 'CR > 7.0', descricao: 'Discussão de casos e apoio em pesquisa.' },
  { id: 5, curso: 'Direito', materia: 'Direito Penal I', professor: 'Profa. Ana', prazo: '12/11/2025', preRequisitos: 'CR > 7.0, Cursando 3º período ou superior', descricao: 'Apoio na revisão de trabalhos.' },
  { id: 6, curso: 'Direito', materia: 'Teoria Geral do Processo', professor: 'Prof. Santos', prazo: '15/11/2025', preRequisitos: 'CR > 7.0', descricao: 'Auxiliar os alunos com dúvidas sobre os procedimentos.' },
  { id: 7, curso: 'Administração', materia: 'Gestão de Pessoas', professor: 'Prof. Oliveira', prazo: '10/11/2025', preRequisitos: 'CR > 7.0', descricao: 'Apoio em dinâmicas de grupo.' },
  { id: 8, curso: 'Administração', materia: 'Marketing Digital', professor: 'Profa. Lima', prazo: '14/11/2025', preRequisitos: 'CR > 7.0, Conhecimento em mídias sociais', descricao: 'Apoio na gestão de campanhas.' },
  { id: 9, curso: 'Administração', materia: 'Finanças Corporativas', professor: 'Prof. Costa', prazo: '18/11/2025', preRequisitos: 'CR > 7.0, Aprovado em Contabilidade Básica', descricao: 'Auxílio em planilhas e análises financeiras.' },
];

export default function AlunoVagasAbertas() {
  const [filtroCurso, setFiltroCurso] = useState('Todos os Cursos');
  const [filtroMateria, setFiltroMateria] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [vagaSelecionada, setVagaSelecionada] = useState(null);

  const handleVerDetalhes = (vaga) => {
    setVagaSelecionada(vaga);
    setModalVisivel(true);
  };

  const handleCloseModal = () => {
    setModalVisivel(false);
    setVagaSelecionada(null);
  };

  const vagasFiltradas = DADOS_VAGAS
    .filter(vaga => filtroCurso === 'Todos os Cursos' || vaga.curso === filtroCurso)
    .filter(vaga => vaga.materia.toLowerCase().includes(filtroMateria.toLowerCase()));

  // Note que o HTML do 'aluno_vagas.html' foi mesclado aqui.
  // A div '.content-section' vem do HTML original.
  return (
    <div className="content-section">
      <h2>Vagas Abertas</h2>
      
      {/* --- BARRA DE FILTRO --- */}
      {/* Note que o 'filtros-container' do HTML original virou 'filter-bar' no React
          (o CSS em style.css/index.css deve ser ajustado se os nomes das classes mudarem)
          Vamos usar as classes do seu HTML original ('filtros-container') */}
      <div className="filtros-container">
        <div className="input-group">
          <label htmlFor="filtro-curso">Filtrar por Curso</label>
          <select 
            id="filtro-curso"
            value={filtroCurso}
            onChange={(e) => setFiltroCurso(e.target.value)}
          >
            <option>Todos os Cursos</option>
            <option>Engenharia</option>
            <option>Administração</option>
            <option>Direito</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="filtro-busca">Buscar por Matéria</label>
          <input 
            type="text" 
            id="filtro-busca"
            placeholder="Ex: Cálculo I"
            value={filtroMateria}
            onChange={(e) => setFiltroMateria(e.target.value)}
          />
        </div>
        {/* O botão 'Filtrar' não é mais necessário, pois o React filtra 'ao vivo' */}
      </div>
      
      {/* --- LISTA DE VAGAS --- */}
      <div className="lista-vagas">
        {vagasFiltradas.length > 0 ? (
          vagasFiltradas.map(vaga => (
            <div className="vaga-card" key={vaga.id}>
              <div className="vaga-card-info">
                <h3>{vaga.materia}</h3>
                <p>Professor: {vaga.professor}</p>
                <p>Prazo para inscrição: {vaga.prazo}</p>
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

      {/* --- O MODAL --- */}
      {modalVisivel && (
        <VagaModal 
          vaga={vagaSelecionada} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}