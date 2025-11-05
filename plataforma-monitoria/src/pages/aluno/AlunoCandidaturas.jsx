// src/pages/aluno/AlunoCandidaturas.jsx
import React from 'react';

export default function AlunoCandidaturas() {
  // Simplesmente retornamos o JSX baseado no HTML
  return (
    <div className="content-section">
      <h2>Minhas Candidaturas</h2>
      <table className="tabela">
        <thead>
          <tr>
            <th>Matéria</th>
            <th>Status da Candidatura</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Programação de Computadores I</td>
            <td><span className="status status-aprovado">Aprovado</span></td>
          </tr>
          <tr>
            <td>Geometria Analítica</td>
            <td><span className="status status-rejeitado">Rejeitado</span></td>
          </tr>
          <tr>
            <td>Física I</td>
            <td><span className="status status-analise">Em Análise</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}