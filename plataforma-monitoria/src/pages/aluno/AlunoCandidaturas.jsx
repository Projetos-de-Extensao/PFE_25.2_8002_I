import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Importe o contexto

const API_URL = '/db.json';

export default function AlunoCandidaturas() {
  const { user } = useAuth(); // Pega o usuário logado
  const [minhasCandidaturas, setMinhasCandidaturas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return; // Aguarda o usuário

    const fetchCandidaturas = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Falha ao carregar dados.');
        const data = await response.json();

        const cursos = data.Vagas || [];
        const candidaturasEncontradas = [];

        for (const curso of cursos) {
          for (const disciplina of curso.disciplinas) {
            // Procura se o aluno logado está na lista de candidatos desta disciplina
            const candidato = disciplina.candidatos?.find(c => c.nome === user.nome);
            
            if (candidato) {
              candidaturasEncontradas.push({
                id: `${curso.codigoCurso}-${disciplina.nomeDisciplina}`,
                nomeDisciplina: disciplina.nomeDisciplina,
                status: candidato.status 
              });
            }
          }
        }
        
        setMinhasCandidaturas(candidaturasEncontradas);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidaturas();
  }, [user]); // Roda novamente se o usuário mudar

  // Helper para CSS
  const getStatusClass = (status) => {
    switch (status) {
      case 'Aprovado': return 'status-aprovado';
      case 'Rejeitado': return 'status-rejeitado';
      case 'Em Análise': return 'status-analise';
      default: return '';
    }
  };

  if (isLoading) return <div className="content-section"><p>Carregando...</p></div>;
  if (error) return <div className="content-section"><p style={{ color: 'red' }}>Erro: {error}</p></div>;

  return (
    <div className="content-section">
      <h2>Minhas Candidaturas</h2>
      <p>Mostrando candidaturas para: <strong>{user?.nome}</strong></p>
      
      <table className="tabela">
        <thead>
          <tr>
            <th>Matéria</th>
            <th>Status da Candidatura</th>
          </tr>
        </thead>
        <tbody>
          {minhasCandidaturas.length === 0 ? (
            <tr>
              <td colSpan="2">Você ainda não se candidatou a nenhuma vaga.</td>
            </tr>
          ) : (
            minhasCandidaturas.map(candidatura => (
              <tr key={candidatura.id}>
                <td>{candidatura.nomeDisciplina}</td>
                <td>
                  <span className={`status ${getStatusClass(candidatura.status)}`}>
                    {candidatura.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}