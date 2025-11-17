import React from 'react';

// Modal de "Visualização" (somente leitura) para o Coordenador
export default function CoordGerenciarModal({ vaga, onClose }) {

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" style={{ display: 'block' }} onClick={handleOverlayClick}>
      {/* Classe 'x-large' do seu CSS para modais grandes */}
      <div className="modal-content x-large"> 
        <span className="close-btn" onClick={onClose}>&times;</span>
        
        <div id="gerenciar-content">
          <h2>Visualização de Candidatos</h2>
          <h3>Vaga: {vaga.nomeDisciplina}</h3>
          
          <table className="tabela">
            <thead>
              <tr>
                <th>Nome do Aluno</th>
                <th>Curso do Aluno</th>
                <th>CR</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {vaga.candidatos.length === 0 ? (
                <tr>
                  <td colSpan="4">Nenhum candidato inscrito para esta vaga.</td>
                </tr>
              ) : (
                vaga.candidatos.map(candidato => (
                  <tr key={candidato.id}>
                    <td>{candidato.nome}</td>
                    <td>{candidato.cursando}</td>
                    <td>{candidato.cr}</td>
                    <td>
                      {/* Mostra o status, mas sem botões de ação */}
                      <span className={`status status-${candidato.status.toLowerCase().replace(' ', '-')}`}>
                        {candidato.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}