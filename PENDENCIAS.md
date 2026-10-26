# Pendências — Modo Campanha

Lista viva do que falta decidir, aprovar ou fazer. Atualize ao concluir um item (marque `[x]` ou apague a linha).
Última atualização: 2026-10-25.

## Para retomar em outra máquina

```bash
git switch main
git pull
npm ci          # obrigatório: entraram @angular/ssr e @angular/platform-server (D-098)
npm start       # http://localhost:4200 (dev, sem pré-renderização)
npm run build   # produção: pré-renderiza / e /en em dist/modo-campanha/browser
```

Estado: `feat/content-pass` (D-102) e `feat/system-horizon-mvp` (D-103, a partir da anterior) aguardando revisão. Sem merge e sem deploy.

## 1. Publicar (deploy)

- [x] Publicado em 2026-10-24 (PR #8, commit `3c6d7c9`): currículo em PDF (D-099), MC-007 — 4Change e o marco de 2016 no Diário (D-100), Inventário abrindo com o MC-001 encaixado (D-101). Conferido no ar: "07 CARTUCHOS" em `/` e `/en`, PDFs no idioma certo, sem erros nem rolagem lateral.
- [x] Publicado antes, no mesmo dia: D-094 a D-098 (commit `b316a0d`).

## 2. Aprovações formais (implementado e mergeado, falta o seu "aprovado")

- [x] Tudo aprovado pelo Eduardo em 2026-10-25 (D-102): Diário (D-091), Arsenal (D-092, com as frases), Inventário (D-093 a D-096) e revisão de UI/UX (D-098).

## 3. Decisões suas

- [x] **Currículo em PDF** (pt e en): no cabeçalho (≥ 1024 px) e no Contato (D-099).
- [x] **E-mail de contato** no Contato (D-102).
- [x] **Hero:** botão de pausa da demonstração com 44 px (D-102). A primeira tela do celular só com texto fica como está.
- [x] **MC-007 — 4Change (D-100):** conteúdo, inglês e arte do cartucho aprovados.
  - [x] imagem do marco de 2016 no Diário;
  - site da Arppen: dispensado.
- [ ] **Paco: 23 Horas para a Última Vela:** fica para depois (MC-008, quando você quiser).
- [ ] **FASE 6 (segredos):** talvez entre no SYSTEM HORIZON interativo.
- [ ] **Progress e XP de campanha:** proposta em `docs/26-progress-xp.md`, aguardando sua decisão.

## 4. Conteúdo (textos seus)

- [x] "10+ anos" só no Player Status (D-102).
- [x] Marco 04 do capítulo 02 com resumo próprio (D-102).
- [x] "facilities" fica na versão pt.
- [x] Traduções do Diário revisadas (D-102).

## 5. SYSTEM HORIZON

- [ ] Personagem definitivo (hoje provisório, `docs/22` §13).
- [ ] **MVP interativo implementado (D-103), aguardando sua revisão:** branch `feat/system-horizon-mvp` (sem merge e sem deploy). Abra `/system-horizon` ou, na capa do MC-001, "Jogar SYSTEM HORIZON".
- [ ] Arte do jogo: marcadores em pixel art do repositório (`sh-markers.png`); o PixelLab não estava conectado nesta sessão. Para usar o PixelLab, configure o servidor MCP dele no Claude Code (`claude mcp add ...`) e peça a troca no contrato de `docs/23` §18.6.

## 6. Depois da publicação

- [x] Firefox e WebKit (motor do Safari) testados no Playwright; links externos conferidos (D-102).
- [ ] **Conferir num iPhone ou Mac** se o texto aparece no peso certo (no WebKit de teste ele ficou fino; ver D-102).
- [ ] Abrir no navegador o PDF do TCC no repositório da FATEC (o servidor não respondeu daqui).
- [ ] LinkedIn Post Inspector e envio do `sitemap.xml` ao Search Console (precisam da sua conta).
- [ ] Domínio próprio (opcional) e divulgação no LinkedIn.
- [ ] Celular, publicado (achado em 2026-10-25): na capa do MC-001, o botão "Reproduzir demonstração" fica cortado à direita do vidro do portátil (a linha de ações não quebra desde `af11eb9`). Não mexi (Inventário congelado); dá para encurtar o rótulo no celular.

## Referências

- Revisão de UI/UX (4 rodadas): notas finais UX 9 · visual 8,8 · acessibilidade 9,2 · conteúdo 8,5. O que separa de 10 depende dos itens das seções 3 e 4. Detalhes em `docs/10-decisions.md`, D-098.
- Roadmap completo: `docs/09-roadmap.md`. Decisões: `docs/10-decisions.md`.
