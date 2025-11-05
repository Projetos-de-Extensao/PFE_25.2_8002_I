// src/App.jsx
import { createBrowserRouter, RouterProvider }from "react-router-dom";

// Importe as páginas que vamos criar
import IndexPage from "./pages/IndexPage";
import LoginAlunoPage from "./pages/LoginAlunoPage";
import LoginCoordPage from "./pages/LoginCoordPage";

// Importe os "Layouts" (páginas com header e sidebar)
import AlunoLayout from "./pages/AlunoLayout";
import CoordLayout from "./pages/CoordLayout";

// Importe as "Páginas Internas" do Aluno
import AlunoVagasAbertas from "./pages/aluno/AlunoVagasAbertas";
import AlunoCandidaturas from "./pages/aluno/AlunoCandidaturas";
import AlunoPerfil from "./pages/aluno/AlunoPerfil";

// Importe as "Páginas Internas" do Coordenador
import CoordDashboard from "./pages/coord/CoordDashboard";
import CoordVagas from "./pages/coord/CoordVagas";

// Definição do "mapa" do site
const router = createBrowserRouter([
  { path: "/", element: <IndexPage /> },
  { path: "/login-aluno", element: <LoginAlunoPage /> },
  { path: "/login-coord", element: <LoginCoordPage /> },
  
  // --- Rotas do Aluno (com layout compartilhado) ---
  {
    path: "/aluno",
    element: <AlunoLayout />, // O layout com header e sidebar do aluno
    children: [
      // O path 'vagas' será '/aluno/vagas'
      { path: "vagas", element: <AlunoVagasAbertas /> },
      { path: "candidaturas", element: <AlunoCandidaturas /> },
      { path: "perfil", element: <AlunoPerfil /> },
    ],
  },
  
  // --- Rotas do Coordenador (com layout compartilhado) ---
  {
    path: "/coord",
    element: <CoordLayout />, // O layout com header e sidebar do coord
    children: [
      { path: "dashboard", element: <CoordDashboard /> },
      { path: "vagas", element: <CoordVagas /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;