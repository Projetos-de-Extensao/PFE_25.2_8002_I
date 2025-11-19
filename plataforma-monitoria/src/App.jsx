import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // <-- Importe o Provider

// Importe as páginas
import IndexPage from "./pages/IndexPage";
import LoginAlunoPage from "./pages/LoginAlunoPage";
import LoginCoordPage from "./pages/LoginCoordPage";
import LoginProfessorPage from "./pages/LoginProfessorPage";

import AlunoLayout from "./pages/AlunoLayout";
import CoordLayout from "./pages/CoordLayout";
import ProfessorLayout from "./pages/ProfessorLayout";

import AlunoVagasAbertas from "./pages/aluno/AlunoVagasAbertas";
import AlunoCandidaturas from "./pages/aluno/AlunoCandidaturas";
import AlunoPerfil from "./pages/aluno/AlunoPerfil";

import CoordDashboard from "./pages/coord/CoordDashboard";
import CoordVagas from "./pages/coord/CoordVagas";

import ProfessorCandidatos from "./pages/professor/ProfessorCandidatos";
import ProfessorAlterarVaga from "./pages/professor/ProfessorAlterarVaga";

const router = createBrowserRouter([
  { path: "/", element: <IndexPage /> },
  { path: "/login-aluno", element: <LoginAlunoPage /> },
  { path: "/login-coord", element: <LoginCoordPage /> },
  { path: "/login-professor", element: <LoginProfessorPage /> },
  
  {
    path: "/aluno",
    element: <AlunoLayout />,
    children: [
      { path: "vagas", element: <AlunoVagasAbertas /> },
      { path: "candidaturas", element: <AlunoCandidaturas /> },
      { path: "perfil", element: <AlunoPerfil /> },
    ],
  },
  
  {
    path: "/coord",
    element: <CoordLayout />,
    children: [
      { path: "dashboard", element: <CoordDashboard /> },
      { path: "vagas", element: <CoordVagas /> },
    ],
  },

  {
    path: "/professor",
    element: <ProfessorLayout />,
    children: [
      { path: "candidatos", element: <ProfessorCandidatos /> },
      { path: "alterar-vaga", element: <ProfessorAlterarVaga /> },
    ],
  },
]);

function App() {
  return (
    // Envolvemos o Router com o AuthProvider
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;