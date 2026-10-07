# CLAUDE.md — Modo Campanha

Guia para qualquer sessão de IA que trabalhe neste repositório. Leia inteiro antes de propor ou alterar algo.

## O que é

**Modo Campanha** é o portfólio profissional pessoal de **Eduardo Arine**, que apresenta a carreira dele como **uma campanha de videogame** (jogos retrô, RPGs, card games, cartuchos, interfaces de consoles antigos).

- Frase central: **"XP real, sem personagem."** Tudo é real; a linguagem de jogo é só a forma.
- Princípio de design: **"Retro na linguagem. Moderno na experiência."** (~30% retro/pixel, 70% produto digital moderno.)

## Quem é Eduardo

Desenvolvedor de Produtos Digitais com mais de 10 anos em tecnologia. Formado em Tecnologia em Jogos Digitais. Atua com frontend e backend (Angular, TypeScript, C#, .NET), IA aplicada ao desenvolvimento, UX, produto e gamificação. Campanha atual: construção da **Comunidade On**. Tem projetos pessoais ligados a games (ex.: *Paco: 23 Horas para a Última Vela*).

Fatos além destes **não devem ser presumidos**: pergunte.

## Objetivo do projeto

Registro da evolução profissional, portfólio, vitrine de projetos, ferramenta de aprendizado e extensão da identidade profissional. **Não** é uma persona de influencer.

## Regras fundamentais

1. **Não avançar uma fase significativa de design ou desenvolvimento sem aprovação do Eduardo.**
2. **Não transformar o Modo Campanha em um template genérico de portfólio de desenvolvedor.**
3. **Quando houver dúvida entre estética de jogo e usabilidade, priorizar usabilidade sem remover a identidade de jogo.**
4. **Antes de implementar uma nova ideia importante, consultar `/docs` e registrar a decisão em `docs/10-decisions.md` quando necessário.**
5. **Não inventar experiências, métricas, projetos, cargos ou resultados profissionais.**
6. **Manter o projeto divertido sem sacrificar profissionalismo.**

## Proibido

- Barras/percentuais de skill (`Angular 95%`).
- Conteúdo fictício em `src/app/data/` (exemplos só se marcados explicitamente como placeholder).
- Informações confidenciais ou internas da Comunidade On.
- Estéticas a evitar: infantil, fangame, arcade genérico, cyberpunk, terminal hacker, neon, RPG medieval, SaaS genérico, interface carregada.
- Fonte pixel em textos longos.
- Fontes proprietárias.
- Instalar biblioteca de UI (Material, PrimeNG etc.), de animação, backend, CMS ou analytics **sem decisão registrada e aprovada**.
- Animações que bloqueiam conteúdo ou ignoram `prefers-reduced-motion`.
- Easter eggs que atrapalham navegação, ou implementar efeitos de easter egg sem aprovação.
- Publicar no GitHub Pages ou ativar deploy automático sem avisar Eduardo.
- Usar marcas registradas de consoles (Nintendo, Sega etc.) nos assets.

## Documentação (`docs/`)

| Arquivo                             | Conteúdo                                          |
| ----------------------------------- | ------------------------------------------------- |
| `01-product-vision.md`              | objetivo, público, o que é / não é                |
| `02-experience-concept.md`          | cada seção e momento da experiência               |
| `03-information-architecture.md`    | ordem da onepage, âncoras, componentes            |
| `04-visual-direction.md`            | 30/70, tipografia, paleta conceitual, a evitar    |
| `05-project-cartridge-system.md`    | cartuchos, console, CRT, estados, interação       |
| `06-technical-architecture.md`      | stack, estrutura, a11y, performance, GitHub Pages |
| `07-content-model.md`               | interfaces e dados                                |
| `08-easter-eggs.md`                 | Secret Area, Konami Code, regras                  |
| `09-roadmap.md`                     | fases 0–9 e decisões em aberto                    |
| `10-decisions.md`                   | decision log (D-001...)                           |

Mantenha os docs em sincronia com o código. Ao concluir itens do roadmap, atualize os checkboxes.

## Arquitetura (resumo)

- Angular 21.2, standalone, signals, `OnPush`, control flow nativo, SCSS, Vitest. Sem SSR. Node local 22.14 (upgrade para Angular 22 pendente, ver D-009).
- `src/app/features/<seção>/`: uma pasta por seção da onepage (`<nome>-section.ts`, `<section id="<nome>">`).
- `src/app/pages/home/home-page.ts`: compõe as seções na ordem de `docs/03`. O teste `home-page.spec.ts` valida a ordem.
- `src/app/models/`: interfaces (`Project`, `Cartridge`, `Skill`, `SkillGroup`, `Achievement`, `CampaignCheckpoint`, `SocialLink`).
- `src/app/data/`: conteúdo estático tipado (hoje apenas skills e link do GitHub).
- `src/app/core/`: infraestrutura transversal (boot, konami listener). `src/app/shared/`: componentes reutilizáveis (só criar quando um elemento se repetir).
- `src/styles/`: SCSS global. Tokens só na FASE 2.
- `public/assets/`: imagens, ícones, cartuchos, pixel art (referenciar como `assets/...`).
- Convenção de nomes do Angular 21: `hero-section.ts` → `HeroSection` (sem sufixo `.component`).
- Código em inglês; comentários e docs em português.

## Comandos

```bash
npm start                 # dev server em http://localhost:4200
npm run build             # build de produção (base-href /)
npm run build:gh-pages    # build para GitHub Pages (base-href /modo-campanha/)
npm test -- --watch=false # testes (Vitest)
npx prettier --check "src/**/*.{ts,html,scss}"
```

Deploy: `.github/workflows/deploy-pages.yml`, **disparo manual** (`workflow_dispatch`). Requer Settings → Pages → Source: GitHub Actions.

## Roadmap e fase atual

- **Fase atual: FASE 0 concluída → próxima: FASE 1 — Visual Concept** (Hero, Player Status, início do Project Inventory). Concept primeiro, **sem layout definitivo antes da aprovação**.
- Fases: 0 Foundation · 1 Visual Concept · 2 Design System · 3 Core Experience · 4 Career Content · 5 Game Feel · 6 Secrets · 7 Content · 8 Quality · 9 Release. Detalhes em `docs/09-roadmap.md`.

## Fluxo de trabalho

1. Ler os docs relevantes antes de começar.
2. Propor um plano curto e **pedir aprovação** para mudanças de fase, de direção visual ou de arquitetura.
3. Implementar em passos pequenos, sem overengineering e sem dependências desnecessárias.
4. Rodar build e testes antes de concluir.
5. Atualizar docs (roadmap, decisões, modelo de conteúdo) quando algo mudar.
6. Commits no padrão Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`...). Branch principal: `main`.
7. Em caso de dúvida sobre conteúdo real (datas, projetos, resultados): **perguntar ao Eduardo**, nunca preencher.
