// src/components/GerenciarCandidatosModal.jsx
import React from 'react';

// Dados simulados (do seu script.js)
const dadosCandidatos = [
  { nome: 'Bruno Norton', curso: 'Eng. Computação', cr: 8.5 },
  { nome: 'João Vitor', curso: 'Eng. Computação', cr: 7.9 },
  { nome: 'Mariana Costa', curso: 'Administração', cr: 9.1 }
];

// O modal recebe a 'vagaNome' e a função 'onClose'
export default function GerenciarCandidatosModal({ vagaNome, onClose }) {

  const handleAprovar = (nome) => {
    alert(`Aluno ${nome} aprovado! (Simulado)`);
    // Em um app real, você atualizaria o estado aqui
  };
  
  const handleRejeitar = (nome) => {
    alert(`Aluno ${nome} rejeitado! (Simulado)`);
  };

  return (
    <div id="modal-gerenciar-candidatos" className="modal" style={{ display: 'block' }}>
      <div className="modal-content x-large">
        <span className="close-btn" id="close-gerenciar" onClick={onClose}>&times;</span>
        
        <div id="gerenciar-content">
          <h2>Gerenciamento de Candidatos</h2>
          <h3>Vaga: {vagaNome}</h3>
          
          <table className="tabela">
            <thead>
              <tr>
                <th>Nome do Aluno</th>
                <th>Curso</th>
                <th>CR</th>
                <th>Documentos</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {dadosCandidatos.map((c, index) => (
                <tr key={index}>
                  <td>{c.nome}</td>
                  <td>{c.curso}</td>
                  <td>{c.cr}</td>
                  <td><a href="#" className="btn btn-secondary">Baixar Histórico</a></td>
                  <td>
                    <button 
                      className="btn btn-success btn-aprovar"
                      onClick={() => handleAprovar(c.nome)}
                    >
                      Aprovar
                    </button>
                    <button 
                      className="btn btn-danger btn-rejeitar"
                      onClick={() => handleRejeitar(c.nome)}
                    >
                      Rejeitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}