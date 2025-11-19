// src/pages/coord/CoordDashboard.jsx
import React, { useState, useEffect } from 'react';

const API_URL = '/db.json';

// SIMULAÇÃO: Coordenador logado
const LOGGED_IN_COORDENADOR = "Dra. Ana Ferreira";

export default function CoordDashboard() {
  const [stats, setStats] = useState({
    vagasAtivas: 0,
    totalCandidatos: 0,
    totalProfessores: 0
  });
  
  // Dados completos para as listas detalhadas
  const [detalhesVagas, setDetalhesVagas] = useState([]);
  const [detalhesCandidatos, setDetalhesCandidatos] = useState([]);
  const [detalhesProfessores, setDetalhesProfessores] = useState([]);

  // Estado para controlar qual "aba" (card) está ativa
  // Valores possíveis: 'vagas', 'candidatos', 'professores' ou null (nenhum)
  const [activeTab, setActiveTab] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Falha ao carregar dados.');
        const data = await response.json();

        // 1. Filtra os cursos deste coordenador
        const meusCursos = (data.Vagas || []).filter(
          curso => curso.coordenadorNome === LOGGED_IN_COORDENADOR
        );

        // 2. Prepara listas detalhadas
        
        // Lista de Vagas (Disciplinas)
        const listaVagas = meusCursos.flatMap(curso => curso.disciplinas.map(d => ({
          ...d,
          cursoNome: curso.nomeCurso
        })));

        // Lista de Candidatos (com a vaga a que pertencem)
        const listaCandidatos = listaVagas.flatMap(vaga => 
          (vaga.candidatos || []).map(c => ({
            ...c,
            vagaNome: vaga.nomeDisciplina
          }))
        );

        // Lista de Professores (nomes únicos)
        // Usamos um Map para garantir unicidade e guardar info da disciplina
        const mapProfessores = new Map();
        listaVagas.forEach(vaga => {
          if (!mapProfessores.has(vaga.professorResponsavel)) {
            mapProfessores.set(vaga.professorResponsavel, {
              nome: vaga.professorResponsavel,
              disciplinas: []
            });
          }
          mapProfessores.get(vaga.professorResponsavel).disciplinas.push(vaga.nomeDisciplina);
        });
        const listaProfessores = Array.from(mapProfessores.values());

        // 3. Atualiza Estatísticas
        setStats({
          vagasAtivas: listaVagas.length,
          totalCandidatos: listaCandidatos.length,
          totalProfessores: listaProfessores.length
        });

        // 4. Salva os detalhes para uso nas abas
        setDetalhesVagas(listaVagas);
        setDetalhesCandidatos(listaCandidatos);
        setDetalhesProfessores(listaProfessores);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) return <div className="content-section"><p>Carregando...</p></div>;
  if (error) return <div className="content-section"><p style={{ color: 'red' }}>Erro: {error}</p></div>;

  // Função helper para renderizar o conteúdo da aba ativa
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'vagas':
        return (
          <div className="tab-content fade-in">
            <h3>Detalhamento: Vagas Ativas</h3>
            <table className="tabela">
              <thead>
                <tr>
                  <th>Disciplina</th>
                  <th>Curso</th>
                  <th>Professor</th>
                </tr>
              </thead>
              <tbody>
                {detalhesVagas.map((vaga, idx) => (
                  <tr key={idx}>
                    <td>{vaga.nomeDisciplina}</td>
                    <td>{vaga.cursoNome}</td>
                    <td>{vaga.professorResponsavel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      case 'candidatos':
        return (
          <div className="tab-content fade-in">
            <h3>Detalhamento: Todos os Candidatos</h3>
            <table className="tabela">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Curso do Aluno</th>
                  <th>Vaga Pretendida</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {detalhesCandidatos.map((cand, idx) => (
                  <tr key={idx}>
                    <td>{cand.nome}</td>
                    <td>{cand.cursando}</td>
                    <td>{cand.vagaNome}</td>
                    <td>
                      <span className={`status status-${cand.status.toLowerCase().replace(' ', '-')}`}>
                        {cand.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'professores':
        return (
          <div className="tab-content fade-in">
            <h3>Detalhamento: Professores da Coordenação</h3>
            <table className="tabela">
              <thead>
                <tr>
                  <th>Professor</th>
                  <th>Disciplinas Ministradas</th>
                </tr>
              </thead>
              <tbody>
                {detalhesProfessores.map((prof, idx) => (
                  <tr key={idx}>
                    <td>{prof.nome}</td>
                    <td>{prof.disciplinas.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return (
          <div className="tab-placeholder">
            <p>Selecione um card acima para ver os detalhes.</p>
          </div>
        );
    }
  };

  return (
    <div className="content-section">
      <h2>Painel Principal</h2>
      <p>Gerenciando cursos de: <strong>{LOGGED_IN_COORDENADOR}</strong></p>
      
      {/* GRID DE CARDS (Agora clicáveis) */}
      <div className="dashboard-grid" style={{ marginTop: '20px', marginBottom: '30px' }}>
        
        {/* Card 1: Vagas */}
        <div 
          className={`stat-card ${activeTab === 'vagas' ? 'active-card' : ''}`}
          onClick={() => setActiveTab('vagas')}
          style={{ cursor: 'pointer' }} // Indica que é clicável
        >
          <h3>{stats.vagasAtivas}</h3>
          <p>Vagas Ativas</p>
        </div>

        {/* Card 2: Candidatos */}
        <div 
          className={`stat-card ${activeTab === 'candidatos' ? 'active-card' : ''}`}
          onClick={() => setActiveTab('candidatos')}
          style={{ cursor: 'pointer' }}
        >
          <h3>{stats.totalCandidatos}</h3>
          <p>Total de Candidatos</p>
        </div>

        {/* Card 3: Professores */}
        <div 
          className={`stat-card ${activeTab === 'professores' ? 'active-card' : ''}`}
          onClick={() => setActiveTab('professores')}
          style={{ cursor: 'pointer' }}
        >
          <h3>{stats.totalProfessores}</h3>
          <p>Professores</p>
        </div>
      </div>

      {/* ÁREA DE CONTEÚDO DETALHADO */}
      <div className="details-section" style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
        {renderActiveTabContent()}
      </div>
    </div>
  );
}