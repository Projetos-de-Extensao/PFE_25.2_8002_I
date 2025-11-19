import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // <-- Importe o contexto

const API_URL = '/db.json';

export default function CoordDashboard() {
  const { user } = useAuth(); // <-- Pega o coordenador logado
  
  const [stats, setStats] = useState({
    vagasAtivas: 0,
    totalCandidatos: 0,
    totalProfessores: 0
  });
  const [detalhesVagas, setDetalhesVagas] = useState([]);
  const [detalhesCandidatos, setDetalhesCandidatos] = useState([]);
  const [detalhesProfessores, setDetalhesProfessores] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Falha ao carregar dados.');
        const data = await response.json();

        // ATUALIZADO: Filtra usando user.nome
        const meusCursos = (data.Vagas || []).filter(
          curso => curso.coordenadorNome === user.nome
        );

        const listaVagas = meusCursos.flatMap(curso => curso.disciplinas.map(d => ({
          ...d,
          cursoNome: curso.nomeCurso
        })));

        const listaCandidatos = listaVagas.flatMap(vaga => 
          (vaga.candidatos || []).map(c => ({
            ...c,
            vagaNome: vaga.nomeDisciplina
          }))
        );

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

        setStats({
          vagasAtivas: listaVagas.length,
          totalCandidatos: listaCandidatos.length,
          totalProfessores: listaProfessores.length
        });

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
  }, [user]);

  if (isLoading) return <div className="content-section"><p>Carregando...</p></div>;
  if (error) return <div className="content-section"><p style={{ color: 'red' }}>Erro: {error}</p></div>;

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
            <h3>Detalhamento: Todas as Candidaturas</h3>
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
        return <div className="tab-placeholder"><p>Selecione um card acima para ver os detalhes.</p></div>;
    }
  };

  return (
    <div className="content-section">
      <h2>Painel Principal</h2>
      <p>Gerenciando cursos de: <strong>{user?.nome}</strong></p>
      
      <div className="dashboard-grid" style={{ marginTop: '20px', marginBottom: '30px' }}>
        <div 
          className={`stat-card ${activeTab === 'vagas' ? 'active-card' : ''}`}
          onClick={() => setActiveTab('vagas')}
          style={{ cursor: 'pointer' }}
        >
          <h3>{stats.vagasAtivas}</h3>
          <p>Vagas Ativas</p>
        </div>
        <div 
          className={`stat-card ${activeTab === 'candidatos' ? 'active-card' : ''}`}
          onClick={() => setActiveTab('candidatos')}
          style={{ cursor: 'pointer' }}
        >
          <h3>{stats.totalCandidatos}</h3>
          <p>Total de Candidaturas</p>
        </div>
        <div 
          className={`stat-card ${activeTab === 'professores' ? 'active-card' : ''}`}
          onClick={() => setActiveTab('professores')}
          style={{ cursor: 'pointer' }}
        >
          <h3>{stats.totalProfessores}</h3>
          <p>Professores</p>
        </div>
      </div>

      <div className="details-section" style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
        {renderActiveTabContent()}
      </div>
    </div>
  );
}