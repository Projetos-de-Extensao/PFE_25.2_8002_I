import React, { useState, useEffect } from 'react';

const API_URL = '/db.json';

// ATUALIZADO: Re-introduzindo a simulação de login do Coordenador
const LOGGED_IN_COORDENADOR = "Dra. Ana Ferreira"; 

export default function CoordDashboard() {
  const [stats, setStats] = useState({
    vagasAtivas: 0,
    totalCandidatos: 0,
    totalProfessores: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Falha ao carregar dados.');
        const data = await response.json();

        // ATUALIZADO: Filtra os cursos que este coordenador gerencia
        const meusCursos = (data.Vagas || []).filter(
          curso => curso.coordenadorNome === LOGGED_IN_COORDENADOR
        );

        // Achata a lista de disciplinas apenas desses cursos
        const minhasDisciplinas = meusCursos.flatMap(curso => curso.disciplinas);

        // 1. Vagas Ativas (total de disciplinas nos seus cursos)
        const totalVagas = minhasDisciplinas.length;

        // 2. Total de Candidatos (soma de todos os candidatos em suas disciplinas)
        const totalCandidatos = minhasDisciplinas.reduce(
          (acc, disciplina) => acc + (disciplina.candidatos?.length || 0), 
          0
        );

        // 3. Total de Professores (nomes únicos de professores em suas disciplinas)
        const totalProfessores = new Set(
          minhasDisciplinas.map(d => d.professorResponsavel)
        ).size;

        setStats({
          vagasAtivas: totalVagas,
          totalCandidatos: totalCandidatos,
          totalProfessores: totalProfessores
        });

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

  return (
    <div className="content-section">
      <h2>Painel Principal</h2>
      {/* ATUALIZADO: Mostra o contexto do coordenador logado */}
      <p>Gerenciando cursos de: <strong>{LOGGED_IN_COORDENADOR}</strong></p>
      
      <div className="dashboard-grid" style={{ marginTop: '20px' }}>
        <div className="stat-card">
          <h3>{stats.vagasAtivas}</h3>
          <p>Vagas Ativas</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalCandidatos}</h3>
          <p>Total de Candidatos</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalProfessores}</h3>
          <p>Professores</p>
        </div>
      </div>
    </div>
  );
}