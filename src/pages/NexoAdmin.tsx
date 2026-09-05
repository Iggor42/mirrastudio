import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MirraWordmark } from "@/components/brand/MirraWordmark";
import {
  NEXO_CAMPAIGNS,
  NexoVisit,
  NexoLead,
  NexoClick
} from "@/config/nexoLink";

export function NexoAdmin() {
  const [visits, setVisits] = useState<NexoVisit[]>([]);
  const [leads, setLeads] = useState<NexoLead[]>([]);
  const [clicks, setClicks] = useState<NexoClick[]>([]);

  // Ensure robots noindex for admin route
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "noindex, nofollow");

    loadData();
  }, []);

  const loadData = () => {
    try {
      const v: NexoVisit[] = JSON.parse(localStorage.getItem("nexo_visits") || "[]");
      const l: NexoLead[] = JSON.parse(localStorage.getItem("nexo_leads") || "[]");
      const c: NexoClick[] = JSON.parse(localStorage.getItem("nexo_clicks") || "[]");
      setVisits(v);
      setLeads(l);
      setClicks(c);
    } catch {
      // Ignore
    }
  };

  const handleClear = () => {
    if (confirm("Deseja zerar as métricas locais do Nexo Link armazenadas neste navegador?")) {
      localStorage.removeItem("nexo_visits");
      localStorage.removeItem("nexo_leads");
      localStorage.removeItem("nexo_clicks");
      loadData();
    }
  };

  // Collect all unique campaign slugs from campaigns config and actual data
  const allSlugs = Array.from(
    new Set([
      ...Object.keys(NEXO_CAMPAIGNS),
      ...visits.map((v) => v.slug),
      ...leads.map((l) => l.slug)
    ])
  );

  // Per campaign stats
  const campaignStats = allSlugs.map((slug) => {
    const campaignVisits = visits.filter((v) => v.slug === slug).length;
    const campaignLeads = leads.filter((l) => l.slug === slug).length;
    const campaignClicks = clicks.filter((c) => c.slug === slug).length;
    const conversionRate = campaignVisits > 0 ? ((campaignLeads / campaignVisits) * 100).toFixed(1) : "0.0";

    return {
      slug,
      visits: campaignVisits,
      leads: campaignLeads,
      clicks: campaignClicks,
      conversionRate
    };
  });

  const totalVisits = visits.length;
  const totalLeads = leads.length;
  const totalClicks = clicks.length;
  const overallConversion = totalVisits > 0 ? ((totalLeads / totalVisits) * 100).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-marfim text-grafite p-6 md:p-12 selection:bg-areia selection:text-grafite">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-areia/60 gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <MirraWordmark className="h-6 w-auto text-grafite" />
            </Link>
            <span className="text-xs uppercase tracking-widest text-mineral border-l border-areia/80 pl-4">
              Nexo Link • Métricas Locais
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleClear}
              className="text-xs uppercase tracking-widest px-3 py-2 border border-red-300 text-red-700 hover:bg-red-50 transition-colors"
            >
              Zerar Dados Locais
            </button>
            <Link
              to="/l/instagram"
              className="text-xs uppercase tracking-widest px-3 py-2 bg-grafite text-marfim hover:bg-grafite/90 transition-colors"
            >
              Testar /l/instagram ↗
            </Link>
          </div>
        </header>

        {/* Funnel Overview Cards */}
        <section className="my-8">
          <h2 className="text-xs uppercase tracking-widest text-mineral mb-4 font-medium">
            Funil Geral de Conversão (LocalStorage)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/60 p-5 border border-areia/40">
              <span className="text-[10px] uppercase tracking-widest text-mineral block mb-1">
                1. Visitas Únicas
              </span>
              <span className="text-3xl font-editorial text-grafite block">{totalVisits}</span>
              <span className="text-xs text-grafite/50 font-light">Páginas abertas</span>
            </div>

            <div className="bg-white/60 p-5 border border-areia/40">
              <span className="text-[10px] uppercase tracking-widest text-mineral block mb-1">
                2. Briefings Enviados
              </span>
              <span className="text-3xl font-editorial text-grafite block">{totalLeads}</span>
              <span className="text-xs text-grafite/50 font-light">Formulários concluídos</span>
            </div>

            <div className="bg-white/60 p-5 border border-areia/40">
              <span className="text-[10px] uppercase tracking-widest text-mineral block mb-1">
                3. Cliques WhatsApp
              </span>
              <span className="text-3xl font-editorial text-grafite block">{totalClicks}</span>
              <span className="text-xs text-grafite/50 font-light">Aberturas de wa.me</span>
            </div>

            <div className="bg-white/60 p-5 border border-areia/40">
              <span className="text-[10px] uppercase tracking-widest text-mineral block mb-1">
                Taxa de Conclusão
              </span>
              <span className="text-3xl font-editorial text-ambar block">{overallConversion}%</span>
              <span className="text-xs text-grafite/50 font-light">Briefings / Visitas</span>
            </div>
          </div>
        </section>

        {/* Table by Campaign */}
        <section className="my-8">
          <h2 className="text-xs uppercase tracking-widest text-mineral mb-4 font-medium">
            Desempenho por Campanha (Slug)
          </h2>
          <div className="overflow-x-auto border border-areia/60 bg-white/40">
            <table className="w-full text-left text-sm">
              <thead className="bg-areia/20 text-[10px] uppercase tracking-widest text-mineral border-b border-areia/60">
                <tr>
                  <th className="py-3 px-4">Campanha (Slug)</th>
                  <th className="py-3 px-4 text-center">Visitas</th>
                  <th className="py-3 px-4 text-center">Briefings</th>
                  <th className="py-3 px-4 text-center">WhatsApp</th>
                  <th className="py-3 px-4 text-center">Conversão</th>
                  <th className="py-3 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-areia/40">
                {campaignStats.map((row) => (
                  <tr key={row.slug} className="hover:bg-white/60 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs text-grafite">
                      /l/{row.slug}
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-grafite">
                      {row.visits}
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-grafite">
                      {row.leads}
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-grafite">
                      {row.clicks}
                    </td>
                    <td className="py-3 px-4 text-center font-editorial text-ambar">
                      {row.conversionRate}%
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/l/${row.slug}`}
                        className="text-xs text-grafite/70 hover:text-grafite underline underline-offset-2"
                      >
                        Abrir ↗
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recent Leads Briefing Table */}
        <section className="my-8">
          <h2 className="text-xs uppercase tracking-widest text-mineral mb-4 font-medium">
            Últimos Briefings Recebidos ({leads.length})
          </h2>
          {leads.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-areia text-sm text-grafite/50">
              Nenhum lead recebido ainda no armazenamento local. Complete um briefing em{" "}
              <Link to="/l/instagram" className="underline text-grafite">
                /l/instagram
              </Link>{" "}
              para testar o registro.
            </div>
          ) : (
            <div className="overflow-x-auto border border-areia/60 bg-white/40">
              <table className="w-full text-left text-xs">
                <thead className="bg-areia/20 uppercase tracking-wider text-mineral border-b border-areia/60">
                  <tr>
                    <th className="py-2.5 px-3">Data/Hora</th>
                    <th className="py-2.5 px-3">Campanha</th>
                    <th className="py-2.5 px-3">Nome</th>
                    <th className="py-2.5 px-3">O Quê</th>
                    <th className="py-2.5 px-3">Prazo</th>
                    <th className="py-2.5 px-3">Referência</th>
                    <th className="py-2.5 px-3">UTMs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-areia/40">
                  {leads
                    .slice(-15)
                    .reverse()
                    .map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/60">
                        <td className="py-2.5 px-3 text-grafite/60 whitespace-nowrap">
                          {new Date(lead.timestamp).toLocaleDateString("pt-BR")}{" "}
                          {new Date(lead.timestamp).toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </td>
                        <td className="py-2.5 px-3 font-mono">{lead.slug}</td>
                        <td className="py-2.5 px-3 font-medium text-grafite">{lead.nome}</td>
                        <td className="py-2.5 px-3">{lead.vertical}</td>
                        <td className="py-2.5 px-3">{lead.prazo}</td>
                        <td className="py-2.5 px-3 text-grafite/70 max-w-xs truncate">
                          {lead.referencia || "—"}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-[10px] text-grafite/60">
                          {[
                            lead.utms.source && `src:${lead.utms.source}`,
                            lead.utms.medium && `med:${lead.utms.medium}`,
                            lead.utms.campaign && `cmp:${lead.utms.campaign}`
                          ]
                            .filter(Boolean)
                            .join(" ") || "—"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Test Links */}
        <section className="pt-6 border-t border-areia/60 text-xs text-grafite/60 flex flex-wrap gap-4 items-center">
          <span className="font-medium text-grafite">Atalhos de teste:</span>
          <Link to="/l/default" className="underline hover:text-grafite">/l/default</Link>
          <Link to="/l/instagram" className="underline hover:text-grafite">/l/instagram</Link>
          <Link to="/l/reels-materia" className="underline hover:text-grafite">/l/reels-materia</Link>
          <Link to="/l/reels-processo" className="underline hover:text-grafite">/l/reels-processo</Link>
          <Link to="/l/anuncio-tampo" className="underline hover:text-grafite">/l/anuncio-tampo</Link>
          <Link to="/l/teste?utm_source=ig&utm_medium=reels" className="underline hover:text-grafite">
            /l/teste com UTMs
          </Link>
        </section>
      </div>
    </div>
  );
}
