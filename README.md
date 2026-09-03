# MIRRA

Ambiente oficial web da MIRRA — Peças e projetos em resina.

## Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Motion**: framer-motion (motion/react)

## Estrutura
- `src/components/brand`: Assets da identidade visual componentizados em SVG (inline), controlados por `currentColor`.
- `src/config/mirra.ts`: Banco de dados editorial local (projetos, textos, capítulos, contato).
- `src/lib/handoff.ts`: Lógica de integração com o sistema NEXO (orçamentos e prospecção).
- `src/lib/analytics.ts`: Tracking simples de eventos (page_view, handoff_to_site, cta_clicked).

## Setup Local
```bash
npm install
npm run dev
```

## Pendências de Assets
- Injetar o texto XML final dos SVGs em `/src/components/brand/`
- Adicionar vídeos .mp4 em `/public/assets/videos/`
- Adicionar imagens em `/public/assets/projects/` e `/public/assets/posters/`
- Renderizar `og-mirra.jpg` para `public/assets/og/`
