import { createBrowserRouter, RouterProvider } from "react-router-dom";

import IndexPage from "./pages/IndexPage";
import LoginAlunoPage from "./pages/LoginAlunoPage";
import LoginCoordPage from "./pages/LoginCoordPage";
import AlunoLayout from "./pages/AlunoLayout";
import CoordLayout from "./pages/CoordLayout";
import AlunoVagasAbertas from "./pages/aluno/AlunoVagasAbertas";
import AlunoCandidaturas from "./pages/aluno/AlunoCandidaturas";
import AlunoPerfil from "./pages/aluno/AlunoPerfil";
import CoordDashboard from "./pages/coord/CoordDashboard";
import CoordVagas from "./pages/coord/CoordVagas";

// NOVAS PÁGINAS DO PROFESSOR
import LoginProfessorPage from "./pages/LoginProfessorPage"; // Nova
import ProfessorLayout from "./pages/ProfessorLayout";       // Nova
import ProfessorCandidatos from "./pages/professor/ProfessorCandidatos"; // Nova
import ProfessorAlterarVaga from "./pages/professor/ProfessorAlterarVaga"; // Nova

// Definição do "mapa" do site
const router = createBrowserRouter([
  // Rotas de Login
  { path: "/", element: <IndexPage /> },
  { path: "/login-aluno", element: <LoginAlunoPage /> },
  { path: "/login-coord", element: <LoginCoordPage /> },
  { path: "/login-professor", element: <LoginProfessorPage /> }, // Nova Rota
  
  // --- Rotas do Aluno (sem mudança) ---
  {
    path: "/aluno",
    element: <AlunoLayout />,
    children: [
      { path: "vagas", element: <AlunoVagasAbertas /> },
      { path: "candidaturas", element: <AlunoCandidaturas /> },
      { path: "perfil", element: <AlunoPerfil /> },
    ],
  },
  
  // --- Rotas do Coordenador (sem mudança) ---
  {
    path: "/coord",
    element: <CoordLayout />,
    children: [
      { path: "dashboard", element: <CoordDashboard /> },
      { path: "vagas", element: <CoordVagas /> },
    ],
  },

  // --- NOVAS ROTAS DO PROFESSOR ---
  {
    path: "/professor",
    element: <ProfessorLayout />, // Layout com a nova sidebar
    children: [
      // A rota padrão (ex: /professor) pode redirecionar ou ser a de candidatos
      { path: "candidatos", element: <ProfessorCandidatos /> },
      { path: "alterar-vaga", element: <ProfessorAlterarVaga /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;