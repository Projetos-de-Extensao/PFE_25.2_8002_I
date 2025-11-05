// src/pages/coord/CoordVagas.jsx
import React, { useState } from 'react';
// Importa o novo modal que acabamos de criar
import GerenciarCandidatosModal from '../../components/GerenciarCandidatosModal';

// Dados simulados das vagas criadas
const vagasCriadas = [
  { nome: 'Engenharia de Computação', prazo: '30/10/2025', inscritos: 3 },
  { nome: 'Métodos Quantitativos', prazo: '28/10/2025', inscritos: 5 },
  { nome: 'Matemática Discreta', prazo: '05/11/2025', inscritos: 1 },
];

export default function CoordVagas() {
  // Estado para controlar a visibilidade do modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado para saber QUAL vaga estamos gerenciando
  const [vagaSelecionada, setVagaSelecionada] = useState(null);

  const handleOpenModal = (nomeVaga) => {
    setVagaSelecionada(nomeVaga);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setVagaSelecionada(null);
  };

  return (
    <>
      <div className="content-section">
        <h2>Vagas Criadas</h2>
        <table className="tabela">
          <thead>
            <tr>
              <th>Matéria</th>
              <th>Prazo Final</th>
              <th>Inscritos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vagasCriadas.map((vaga) => (
              <tr key={vaga.nome}>
                <td>{vaga.nome}</td>
                <td>{vaga.prazo}</td>
                <td>{vaga.inscritos}</td>
                <td>
                  <button 
                    className="btn btn-primary btn-gerenciar-vaga"
                    onClick={() => handleOpenModal(vaga.nome)} // Lógica React
                  >
                    Gerenciar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Renderização condicional do Modal */}
      {isModalOpen && (
        <GerenciarCandidatosModal 
          vagaNome={vagaSelecionada} 
          onClose={handleCloseModal} 
        />
      )}
    </>
  );
}