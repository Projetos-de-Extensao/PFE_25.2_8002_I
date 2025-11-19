import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // <-- Importe o contexto
import CoordGerenciarModal from '../../components/CoordGerenciarModal';

const API_URL = '/db.json';
const PRAZO_ESTATICO = '30/11/2025';

export default function CoordVagas() {
  const { user } = useAuth(); // <-- Pega o coordenador logado
  const [minhasVagas, setMinhasVagas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vagaSelecionada, setVagaSelecionada] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchVagas = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Falha ao carregar dados.');
        const data = await response.json();
        
        // ATUALIZADO: Filtra usando user.nome
        const meusCursos = (data.Vagas || []).filter(
          curso => curso.coordenadorNome === user.nome
        );

        const vagasProcessadas = meusCursos.flatMap(curso => 
          curso.disciplinas.map(disciplina => ({
            id: `${curso.codigoCurso}-${disciplina.nomeDisciplina}`,
            ...disciplina, 
            nomeCurso: curso.nomeCurso
          }))
        );
        
        setMinhasVagas(vagasProcessadas);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVagas();
  }, [user]);

  const handleOpenModal = (vaga) => {
    setVagaSelecionada(vaga);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setVagaSelecionada(null);
  };

  if (isLoading) return <div className="content-section"><p>Carregando...</p></div>;
  if (error) return <div className="content-section"><p style={{ color: 'red' }}>Erro: {error}</p></div>;

  return (
    <>
      <div className="content-section">
        <h2>Vagas Criadas</h2>
        <p>Estas são as vagas para os cursos que você coordena (<strong>{user?.nome}</strong>).</p>

        <table className="tabela">
          <thead>
            <tr>
              <th>Matéria</th>
              <th>Professor</th>
              <th>Curso</th>
              <th>Prazo Final</th>
              <th>Inscritos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {minhasVagas.length === 0 ? (
              <tr>
                <td colSpan="6">Nenhuma vaga encontrada para os seus cursos.</td>
              </tr>
            ) : (
              minhasVagas.map((vaga) => (
                <tr key={vaga.id}>
                  <td>{vaga.nomeDisciplina}</td>
                  <td>{vaga.professorResponsavel}</td>
                  <td>{vaga.nomeCurso}</td>
                  <td>{PRAZO_ESTATICO}</td>
                  <td>{vaga.candidatos.length}</td>
                  <td>
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleOpenModal(vaga)}
                    >
                      Visualizar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <CoordGerenciarModal 
          vaga={vagaSelecionada} 
          onClose={handleCloseModal} 
        />
      )}
    </>
  );
}