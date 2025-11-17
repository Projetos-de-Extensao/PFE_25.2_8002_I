import React, { useState, useEffect } from 'react';

// ASSINATURA DE ALUNO:
// Para simular qual aluno está logado, vamos definir um nome fixo.
// Este nome DEVE bater com um "nome" de candidato no db.json
// (Seu header diz "Bruno Norton", mas usei "Bruno Norton" que estava no db.json)
const LOGGED_IN_ALUNO = "Bruno Norton";

const API_URL = '/db.json';

export default function AlunoCandidaturas() {
  const [minhasCandidaturas, setMinhasCandidaturas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidaturas = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Falha ao carregar dados.');
        const data = await response.json();

        const cursos = data.Vagas || [];
        const candidaturasEncontradas = [];

        // Itera por todos os cursos
        for (const curso of cursos) {
          // Itera por todas as disciplinas desse curso
          for (const disciplina of curso.disciplinas) {
            // Itera por todos os candidatos dessa disciplina
            for (const candidato of disciplina.candidatos) {
              
              // Se o candidato for o nosso aluno logado...
              if (candidato.nome === LOGGED_IN_ALUNO) {
                // ...adicionamos a vaga e o status dele à nossa lista
                candidaturasEncontradas.push({
                  id: `${curso.codigoCurso}-${disciplina.nomeDisciplina}`,
                  nomeDisciplina: disciplina.nomeDisciplina,
                  status: candidato.status // <-- O status vem do db.json!
                });
                // Para de procurar nesta disciplina (não precisa checar outros candidatos)
                break; 
              }
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
  }, []);

  // Função helper para retornar a classe CSS correta para o status
  const getStatusClass = (status) => {
    switch (status) {
      case 'Aprovado':
        return 'status-aprovado';
      case 'Rejeitado':
        return 'status-rejeitado';
      case 'Em Análise':
        return 'status-analise';
      default:
        return '';
    }
  };

  if (isLoading) return <div className="content-section"><p>Carregando...</p></div>;
  if (error) return <div className="content-section"><p style={{ color: 'red' }}>Erro: {error}</p></div>;

  return (
    <div className="content-section">
      <h2>Minhas Candidaturas</h2>
      <p>Mostrando candidaturas para o aluno: <strong>{LOGGED_IN_ALUNO}</strong></p>
      
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