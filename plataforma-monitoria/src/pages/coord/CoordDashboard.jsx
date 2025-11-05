// src/pages/coord/CoordDashboard.jsx
import React from 'react';

export default function CoordDashboard() {
  return (
    <div className="content-section">
      <h2>Painel Principal</h2>
      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>3</h3>
          <p>Vagas Ativas</p>
        </div>
        <div className="stat-card">
          <h3>9</h3>
          <p>Total de Candidatos</p>
        </div>
        <div className="stat-card">
          <h3>8</h3>
          <p>Novos Candidatos (Hoje)</p>
        </div>
      </div>
    </div>
  );
}