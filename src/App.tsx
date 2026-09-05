import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Projetos } from "./pages/Projetos";
import { ProjetoDetail } from "./pages/ProjetoDetail";
import { Processo } from "./pages/Processo";
import { Materia } from "./pages/Materia";
import { AMirra } from "./pages/AMirra";
import { Contato } from "./pages/Contato";
import { NexoLink } from "./pages/NexoLink";
import { NexoAdmin } from "./pages/NexoAdmin";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Nexo Link Landing Pages (minimal, without standard site header/footer) */}
        <Route path="/l" element={<NexoLink />} />
        <Route path="/l/:campanha" element={<NexoLink />} />
        <Route path="/l-admin" element={<NexoAdmin />} />

        {/* Standard Website Pages */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projetos" element={<Projetos />} />
          <Route path="projetos/:slug" element={<ProjetoDetail />} />
          <Route path="processo" element={<Processo />} />
          <Route path="materia" element={<Materia />} />
          <Route path="a-mirra" element={<AMirra />} />
          <Route path="contato" element={<Contato />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
