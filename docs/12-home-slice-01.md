# 12 — Home Slice 01 (plano)

> Status: **HOME SLICE 01 — APPROVED (D-039).**
> Escopo: **Header**, **Hero** e **entrada do Player Status**: o primeiro vertical slice real da página.
> Objetivo: validar se o MC Design System e os Signature Components reproduzem o espírito do **Concept 03 — Approved as Hybrid** numa página real.

Referências: 03-A para estrutura, grid, hierarquia, respiro, legibilidade e implementabilidade; 03-B para atmosfera, profundidade, luz quente, CRT/console e universo físico. Hero ≈ **70% A + 30% B**. Concept é direção, não especificação pixel-perfect.

---

## 1. Árvore de componentes recomendada

```
App (app.ts)
├── SiteHeader                  NOVO · core/layout/  (fora da Home: persiste entre / e /en)
│   ├── marca (markup local)     placeholder do monograma MC + "MODO CAMPANHA"
│   ├── nav (markup local)       âncoras da onepage
│   ├── troca PT/EN (markup local, LocaleService.urlFor)
│   └── a[mcAction="secondary"]  Currículo (só quando houver URL)
└── <router-outlet> → HomePage
    ├── HeroSection             EXISTENTE (placeholder) · features/hero/
    │   ├── conteúdo (markup local: brand line, h1, cargo, áreas, texto, motto, CTAs)
    │   └── HeroVisual           NOVO · features/hero/hero-visual  (decorativo, aria-hidden)
    │       ├── mc-crt-frame     NOVO (extraído do CRT atual) · shared/signature/
    │       └── console MC-01    CSS local no HeroVisual (não é componente ainda)
    └── PlayerStatusSection     EXISTENTE (placeholder) · features/player-status/
        ├── mc-section-header + mc-status (ACTIVE)
        └── grade inicial: mc-player-card + coluna de dados reais
```

Componentes **não** criados de propósito (evitar over-componentization): `HeroContent` (é markup de uma seção só), `LanguageSwitch` e `Nav` (vivem só no header por enquanto; viram componentes se aparecerem em outro lugar, como no Final Checkpoint), `Console` (CSS local até haver um segundo uso real).

## 2. Reutilização do que já existe

| Peça                       | Uso no Slice 01                                                                 |
| -------------------------- | ------------------------------------------------------------------------------- |
| `mcAction`                 | CTA primary (Explorar campanha), text (GitHub, LinkedIn), secondary (Currículo) |
| `mc-icon`                  | `arrow-down` (Explorar), `external` (GitHub/LinkedIn), `github`, `linkedin`, `document` (Currículo), `language` (troca de idioma, se fizer sentido visualmente) |
| `mc-status`                | ACTIVE no header da seção Player Status                                          |
| `mc-section-header`        | PLAYER STATUS                                                                    |
| `mc-player-card`           | início da grade do Player Status (foto placeholder)                              |
| CRT                        | base visual extraída (`mc-crt-frame`, ver §4)                                    |
| Tokens e grid              | `page-grid` (sangria do visual até a borda), `columns`, `mq()`, `type()`, `space()`, cores semânticas, materiais, `--mc-shadow-object`, `--mc-glow-warm` (permitido na área visual do Hero) |
| i18n                       | `LocaleService.ui()` para UI; `pick()` para conteúdo `Localized`                 |

## 3. O que é realmente novo

| Tipo                   | Item                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------ |
| Componentes            | `SiteHeader`; `HeroVisual`; `mc-crt-frame` (extração, ver §4)                                          |
| Refactor               | `mc-crt` → `mc-crt-frame` (visual) + `mc-crt-project-viewer` (função), **sem mudança visual**; remover o placeholder antigo `features/crt-project-viewer` quando o Inventory real existir |
| Conteúdo / modelo      | `PlayerProfile` com campos `Localized` em `data/profile.data.ts` (docs/07), tirando do dicionário de UI os textos humanos provisórios (`hero.*`, `profile.xp`). Links sociais com LinkedIn e currículo quando existirem |
| CSS / composição local | layout do Hero (grid + sangria), console MC-01, luz quente da cena, `scroll-margin-top` das seções (header fixo) |
| UI strings             | rótulos de navegação, eyebrow do Hero (se aprovado), label da troca de idioma                          |
| Assets                 | **nenhum novo neste slice.** Tela do CRT do Hero sem arte final (ver §4); wordmark e monograma seguem pendentes |

## 4. Estratégia do CRT (decisão que precisa de aprovação)

O CRT do Hero e o CRT Project Viewer são da **mesma família visual**, mas têm **funções diferentes**:

| | Hero | Project Viewer |
|---|---|---|
| Papel | ambientação decorativa | conteúdo semântico do case |
| Acessibilidade | `aria-hidden` (cena inteira) | `role="region"` rotulado |
| Estado | sempre igual (tela de sistema) | vazio / com conteúdo |
| Tela | pequena, só uma mensagem/arte | cresce com o conteúdo |

Forçar o `mc-crt` atual a servir ao Hero criaria uma abstração ruim (região rotulada "Visualizador de projetos" dentro de uma cena decorativa, inputs condicionais por contexto).

**Recomendação (opção B):**

1. Extrair a **base visual** para `mc-crt-frame`: shell → bezel → vidro → faixa inferior (MC-01, ranhuras, botão, LED), com a tela recebendo conteúdo por projeção. Sem semântica própria; container query de simplificação mantida.
2. Renomear o atual `mc-crt` para **`mc-crt-project-viewer`**, que **compõe** `mc-crt-frame` e acrescenta a função: `role="region"`, rótulo traduzido, estado vazio "INSERT CARTRIDGE".
3. O Hero usa `mc-crt-frame` diretamente dentro do `HeroVisual` (`aria-hidden`).
4. Validação: screenshot antes/depois do showcase (o Project Viewer não pode mudar 1 px) + testes atuais adaptados.

Alternativas: **A** reutilizar `mc-crt` como está (rejeitada: semântica errada no Hero); **C** criar um CRT separado para o Hero (rejeitada: duplica a família visual e diverge com o tempo).

**Tela do CRT no Hero (sem asset novo):** recomendo exibir a mensagem de sistema já aprovada **"INSERT CARTRIDGE"** com a luz quente da tela. Ela conecta o Hero ao Project Inventory sem inventar copy. A arte final da tela (paisagem/pixel art, como no concept) fica como **pendência de asset**.

## 5. Estratégia do console MC-01

| Pergunta | Recomendação |
|---|---|
| Precisa ser componente agora? | **Não.** Só existe um uso (Hero). Vira signature component (`mc-console`) quando houver o segundo uso real: interação de inserção do cartucho (FASE 5). |
| Pode ser CSS simples? | **Sim.** Corpo baixo em `--mc-material-dark`, sob o CRT, com sombra de objeto. |
| Partes estruturais | corpo, **slot de cartucho** (ranhura escura que conversa com a língua do MC-CART), etiqueta **MC-01** (Plex, papel `system`), LED |
| Partes decorativas | ranhuras, no máximo dois botões |
| Controller | **fora do Slice 01.** Adiciona ruído; reavaliar na revisão visual (03-A tem, 03-B tem). |
| Copiar consoles comerciais | não: silhueta autoral, coerente com chanfros e materiais do MC-CART |

Fica para depois: cartucho inserido no slot, animação de inserção, boot.

## 6. Estratégia do Hero visual

> A ambientação apoia o conteúdo. Nunca compete com ele.

- **Elementos:** CRT (`mc-crt-frame`) apoiado sobre o console MC-01 + luz quente radial atrás (`--mc-glow-warm`, só nesta área). Nada além disso no Slice 01: sem planta, pôster, luminária ou pilha de cartuchos (03-B).
- **Hierarquia:** a cena fica abaixo do conteúdo em contraste e escala. O laranja forte do Hero é o "MODO CAMPANHA"; o visual usa materiais escuros e luz quente difusa.
- **Semântica:** a cena inteira é `aria-hidden="true"`, sem foco nem interação.
- **Sem animação**; a cena precisa funcionar estática.

## 7. Header

- **Sólido**, `--mc-surface`, borda inferior `--mc-border-subtle`, altura ~64 px, **fixo no topo** (sticky). As seções ganham `scroll-margin-top` para âncoras não ficarem sob o header.
- **Marca (esquerda):** placeholder honesto do monograma (caixa com "MC" em Plex 600, já que a Pixelify não foi validada em "MC" pequeno, D-029) + "MODO CAMPANHA" em Plex, papel `system`. Link para o topo (`/` ou `/en`). Substituído pelo SVG quando a marca existir.
- **Navegação (centro/direita):** âncoras da onepage. Proposta de itens (precisa aprovação de copy): pt **Sobre · Projetos · Jornada · Contato** / en **About · Projects · Journey · Contact**, apontando para `#player-status`, `#project-inventory`, `#campaign-log`, `#final-checkpoint`. No Slice 01 as seções-alvo ainda são placeholders, mas existem.
- **Troca PT/EN:** dois links (`PT` | `EN`), cada um com `lang` e `aria-current` no idioma ativo, gerados por `LocaleService.urlFor()` (a URL continua sendo a fonte da verdade).
- **Currículo:** `a[mcAction="secondary"]` com ícone `document`, **só quando existir a URL**. Até lá, não renderizar (link desabilitado não existe).
- **Metadados técnicos (ONLINE, versão, build, MC-01):** **nenhum no Slice 01.** Não agregam informação real no header e competem com a navegação. MC-01 já aparece no próprio console/CRT.
- **Mobile:** marca + PT/EN (+ Currículo se existir). **Sem menu hambúrguer no Slice 01**: a navegação some abaixo de `md` e a página continua navegável por scroll; reavaliar quando houver mais seções reais.

## 8. Hero: conteúdo e composição

Ordem (03-A), com papéis tipográficos:

| Elemento | Papel | Fonte | Observação |
|---|---|---|---|
| Eyebrow (opcional) | `label` | Plex | 03-A tem "MC-01 / PORTFÓLIO PROFISSIONAL": **copy pendente** |
| MODO CAMPANHA | `display-hero` | Pixelify (único uso validado) | `<p>` visualmente maior que o H1 |
| **Eduardo Arine** | `name` | Plex | **`<h1>`** (D-026) |
| Desenvolvedor de Produtos Digitais | `title-l` | Plex | en: Digital Product Developer (aprovado) |
| IA • Produto • Desenvolvimento • Gamificação | `body` em `text-secondary` | Plex | en: **tradução pendente** |
| Texto humano curto | `body-l` | Plex | **copy pendente (Eduardo)**: placeholder marcado até lá |
| XP real, sem personagem. | `title-m` | Plex | en: Real XP. No persona. (aprovado) |
| CTAs | `mcAction` | Plex | ver abaixo |

**CTAs:** `Explorar campanha` (**primary**, único na região, âncora para `#player-status`, ícone `arrow-down`) · `GitHub` (**text**, externo, ícone `external`) · `LinkedIn` (**text**, **URL pendente**) · `Currículo` (**secondary**, **URL pendente**). Decisão pendente: Currículo no **header e no Hero** ou só no header (03-A: só no header; recomendo só no header para não repetir a ação).

**Composição desktop (≥ 1024 px, 12 colunas):** conteúdo nas colunas **1–6**; visual nas **7–12** com sangria até a borda direita (`content-start / full-end` no `page-grid`, sem position absolute). Testar **1–5 / 6–12** ou **1–7 / 8–12** na revisão: o grid alinha, não obriga simetria. Hero com altura definida pelo conteúdo (sem 100vh); a entrada do Player Status começa a aparecer na primeira dobra, como no 03-A.

## 9. Responsividade

| Breakpoint | Header | Hero | Player Status (entrada) |
|---|---|---|---|
| **Desktop** (≥ 1024) | marca · nav · PT/EN · Currículo | conteúdo 1–6 + cena 7–12 (sangria) | header da seção + Player Card (4/12) + coluna de dados (4/12) |
| **Tablet** (768–1023) | marca · nav compacta · PT/EN | **empilhado**: conteúdo (8/8) → cena reduzida (largura máx. ~32 rem, centralizada) | Player Card 3/8 + dados 5/8 |
| **Mobile** (< 768) | marca · PT/EN (sem nav) | **conteúdo primeiro**; CTAs visíveis sem scroll longo; cena **simplificada**: só o CRT compacto (moldura simplificada pela container query), **sem console** | empilhado: header → Player Card → dados |

Princípio: no mobile, leitura, CTA e identidade vêm antes da cena. CRT e console nunca dividem espaço lateral com o texto numa tela pequena. Se o CRT compacto não agregar na revisão, a cena pode sair do mobile.

## 10. Entrada do Player Status

Validar a transição **Hero → Player Status**, sem preencher a seção inteira:

- `mc-section-header` **PLAYER STATUS** + `mc-status` **ACTIVE**;
- grade inicial (4/4/4 como ponto de partida, D-022): **Player Card** (cols 1–4) + **coluna de dados reais já aprovados** (cols 5–8): ORIGIN · Tecnologia em Jogos Digitais, XP · 10+ anos em tecnologia, CURRENT CAMPAIGN · Comunidade On;
- coluna "Focus / Sobre a jornada / Estado atual" (cols 9–12) **fica para o Slice 02** (texto humano pendente).

## 11. PT-BR / EN

- Tudo vem do dicionário (UI) ou de `PlayerProfile` `Localized` (conteúdo). Nada hardcoded.
- Pontos de comprimento a validar com textos reais nos dois idiomas: cargo (pt é mais longo), áreas, motto, `Explore the campaign` (mais longo que o pt), itens da nav, labels do Player Status.
- Revisão obrigatória com screenshots **pt e en** em desktop, tablet e mobile.

## 12. Motion (só pontos futuros, nada no Slice 01)

| Ponto | Fase |
|---|---|
| Boot inicial curto (≤ 1 s) "INITIALIZING CAMPAIGN… PLAYER FOUND" | 5 |
| CRT do Hero: power-on / brilho da tela | 5 |
| Scroll: entrada suave das seções (com `prefers-reduced-motion`) | 5 |
| Interação de cartucho: inserir no console MC-01, boot, case no Project Viewer | 5 |

O Hero precisa funcionar **estático**; Motion nunca bloqueia a implementação estrutural.

## 13. Riscos

| Risco | Mitigação |
|---|---|
| Cena do Hero parecer vazia sem arte final da tela | "INSERT CARTRIDGE" + luz quente; arte da tela como pendência de asset; revisão visual no 01-C |
| Refactor do CRT quebrar o Project Viewer | extração sem mudança visual, screenshot antes/depois, testes |
| Header sem nav no mobile ser percebido como incompleto | onepage por scroll; reavaliar hambúrguer no Slice 02 |
| Placeholder do monograma parecer final | marcado como placeholder no código e nos docs; marca é checkpoint separado |
| Textos pendentes (texto humano, LinkedIn, currículo, traduções) | placeholders explicitamente marcados; Currículo/LinkedIn não renderizam sem URL |
| Strings en mais longas quebrarem CTA/nav | validação pt/en em todos os breakpoints (01-F) |
| Header fixo cobrir âncoras | `scroll-margin-top` nas seções |
| CLS da Pixelify no "MODO CAMPANHA" | `font-display: swap` hoje; preload na FASE 8 |
| Glow/atmosfera reduzir legibilidade | glow só na coluna visual; contraste do texto medido sem ele |
| Orçamento de CSS do Hero/cena | enxugar antes de aumentar (D-035) |

## 14. Conteúdo pendente (Eduardo)

1. **Texto humano curto do Hero** (pt e en). Até lá: placeholder marcado.
2. **URL do LinkedIn.**
3. **Currículo** (arquivo/URL, pt e en?).
4. Tradução en de **"IA • Produto • Desenvolvimento • Gamificação"** (sugestão a aprovar: "AI • Product • Development • Gamification").
5. Rótulos da **navegação** (proposta no §7).
6. **Eyebrow** do Hero: usar ou não, e com que texto.
7. Tradução en dos **dados do Player Status** (ex.: "Tecnologia em Jogos Digitais").
8. (Asset, pode esperar) arte da tela do CRT do Hero; monograma MC e wordmark.

## 15. Plano por sub-slices

Cada sub-slice termina com build/test/typecheck/Prettier, contratos de contraste, guarda do showcase, verificação de overflow e commit próprio. Checkpoints visuais com Eduardo marcados com ◆.

| Sub-slice | Entrega |
|---|---|
| **01-0 Preparação** | refactor `mc-crt-frame` + `mc-crt-project-viewer` sem mudança visual (screenshot antes/depois); modelo `PlayerProfile` `Localized` + `profile.data.ts` (só textos já aprovados); `scroll-margin-top` |
| **01-A Header** | `SiteHeader` no `App`: marca placeholder, nav, PT/EN, Currículo condicional; sticky; mobile sem nav |
| **01-B Hero content** | markup semântico (H1 = Eduardo Arine), papéis tipográficos, CTAs, i18n; layout 1–6 |
| **01-C Hero visual** ◆ | `HeroVisual`: `mc-crt-frame` + console CSS + luz quente; sangria 7–12; teste de distribuições assimétricas. **Checkpoint visual do Hero desktop** |
| **01-D Hero responsive** | tablet empilhado com cena reduzida; mobile conteúdo-primeiro com CRT compacto, sem console |
| **01-E Entrada do Player Status** | section header + ACTIVE + Player Card + coluna de dados reais |
| **01-F Revisão** ◆ | pt/en × desktop/tablet/mobile; acessibilidade (landmarks, headings, foco, aria-hidden da cena, contraste); critérios de sucesso (§16). **Checkpoint final do Slice 01** |

## 16. Critérios de sucesso

1. Parece profissional?
2. Parece Modo Campanha?
3. Continua legível sem entender referências de games?
4. A linguagem retrô apoia e não domina?
5. O Hero funciona sem animação?
6. PT-BR e EN funcionam sem comprometer layout?
7. A transição Hero → Player Status parece natural?
8. O layout é implementável e responsivo?

## 16-A. Progresso (até o checkpoint 01-C)

| Sub-slice | Estado | Notas |
|---|---|---|
| 01-0 | ✅ | `mc-crt-frame` + `mc-crt-project-viewer` (diff 0 px); `PlayerProfile`; `--mc-header-height` + `scroll-margin-top`; navegação de mesma URL volta a rolar; `.mc-visually-hidden` |
| 01-A | ✅ | `app-site-header` no shell do app |
| 01-B | ✅ | conteúdo real do Hero, pt/en, H1 = Eduardo Arine |
| 01-C | ✅ ◆ | cena: CRT + console MC-01 + luz quente; **APPROVED** |
| 01-D | ✅ | tablet: cena 31rem com console; mobile: só CRT compacto, ações agrupadas |
| 01-E | ✅ | Player Card 1–4 + dados 6–12; status só no card (variante B); sem "Sobre a jornada" |
| 01-F | ✅ ◆ | revisão pt/en em 1440, 820 e 390; âncoras validadas com cliques reais; **APPROVED** |

Desvios do plano: ver D-037 (limite do CRT 34rem → 28rem; cabeçalho do Player Status como referência de ritmo; padding inferior do Hero). Bundle inicial de produção passou de ~209 kB para ~253 kB (69 kB transferidos), porque o header vive no shell do app; abaixo do orçamento de 500 kB.

## 17. Primeira decisão para aprovação (resolvida)

**Arquitetura do CRT (§4):** extrair `mc-crt-frame` (base visual compartilhada) e renomear o componente atual para `mc-crt-project-viewer` (função especializada), com o Hero usando o frame diretamente. É pré-requisito do 01-0 e do 01-C.

Decisões seguintes, com recomendação padrão se Eduardo não preferir outra:

- Currículo só no header (não repetir no Hero);
- header sem metadados técnicos;
- mobile sem nav (sem hambúrguer) no Slice 01;
- tela do CRT do Hero com "INSERT CARTRIDGE";
- console como CSS local, sem controller.
