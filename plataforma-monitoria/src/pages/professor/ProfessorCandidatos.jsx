import React, { useState, useEffect } from 'react';

// ASSINATURA DE PROFESSOR:
// Para simular qual professor está logado, vamos definir um nome fixo.
// Este nome DEVE bater com um "professorResponsavel" do db.json
const LOGGED_IN_PROFESSOR = "Dr. Carlos Silva";

const API_URL = '/db.json';

export default function ProfessorCandidatos() {
  const [minhasVagas, setMinhasVagas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Falha ao carregar dados.');
        const data = await response.json();

        // 1. Pega todos os cursos
        const cursos = data.Vagas || [];
        
        // 2. "Achata" todas as disciplinas
        const todasDisciplinas = cursos.flatMap(curso => 
          curso.disciplinas.map(disciplina => ({
            ...disciplina,
            nomeCurso: curso.nomeCurso
          }))
        );

        // 3. Filtra apenas as disciplinas do professor logado
        const vagasDoProfessor = todasDisciplinas.filter(
          disciplina => disciplina.professorResponsavel === LOGGED_IN_PROFESSOR
        );
        
        setMinhasVagas(vagasDoProfessor);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVagas();
  }, []);

  // Simulação de ações
  const handleAprovar = (nome) => {
    alert(`Aluno ${nome} aprovado! (Simulado)`);
  };
  
  const handleRejeitar = (nome) => {
    alert(`Aluno ${nome} rejeitado! (Simulado)`);
  };

  if (isLoading) return <div className="content-section"><p>Carregando...</p></div>;
  if (error) return <div className="content-section"><p style={{ color: 'red' }}>Erro: {error}</p></div>;
  
  return (
    <div className="content-section">
      <h2>Gerenciamento de Candidatos</h2>
      <p>Você está vendo os candidatos para as disciplinas que você leciona ({LOGGED_IN_PROFESSOR}).</p>

      {minhasVagas.length === 0 ? (
        <p>Você não tem nenhuma vaga de monitoria associada no momento.</p>
      ) : (
        minhasVagas.map(vaga => (
          <div key={vaga.nomeDisciplina} style={{ marginTop: '30px' }}>
            <h3>Vaga: {vaga.nomeDisciplina}</h3>
            
            <table className="tabela">
              <thead>
                <tr>
                  <th>Nome do Aluno</th>
                  {/* ATUALIZADO: Nova coluna */}
                  <th>Curso do Aluno</th>
                  <th>CR</th>
                  <th>Histórico</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {vaga.candidatos.length === 0 ? (
                  <tr>
                    <td colSpan="5">Nenhum candidato inscrito para esta vaga.</td>
                  </tr>
                ) : (
                  vaga.candidatos.map(candidato => (
                    <tr key={candidato.id}>
                      <td>{candidato.nome}</td>
                      {/* ATUALIZADO: Novo campo 'cursando' */}
                      <td>{candidato.cursando}</td>
                      <td>{candidato.cr}</td>
                      <td>
                        <a href={candidato.historico_url} className="btn btn-secondary">
                          Baixar
                        </a>
                      </td>
                      <td>
                        <button 
                          className="btn btn-success" 
                          onClick={() => handleAprovar(candidato.nome)}
                          style={{ marginRight: '5px' }}
                        >
                          Aprovar
                        </button>
                        <button 
                          className="btn btn-danger"
                          onClick={() => handleRejeitar(candidato.nome)}
                        >
                          Rejeitar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}