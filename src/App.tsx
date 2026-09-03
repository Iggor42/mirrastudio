import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Projetos } from "./pages/Projetos";
import { ProjetoDetail } from "./pages/ProjetoDetail";
import { Processo } from "./pages/Processo";
import { Materia } from "./pages/Materia";
import { AMirra } from "./pages/AMirra";
import { Contato } from "./pages/Contato";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
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
