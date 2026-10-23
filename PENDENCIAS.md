# Pendências — Modo Campanha

Lista viva do que falta decidir, aprovar ou fazer. Atualize ao concluir um item (marque `[x]` ou apague a linha).
Última atualização: 2026-10-23.

## Para retomar em outra máquina

```bash
git switch main
git pull
npm ci          # obrigatório: entraram @angular/ssr e @angular/platform-server (D-098)
npm start       # http://localhost:4200 (dev, sem pré-renderização)
npm run build   # produção: pré-renderiza / e /en em dist/modo-campanha/browser
```

Estado: tudo mergeado na `main`. Nenhuma branch aberta.

## 1. Publicar (deploy)

O site no ar tem o deploy de 2026-10-22 (Inventário H3, D-093 a D-095). **Ainda não publicado:**

- cartucho maior no slot, barra do console no topo, novo fundo da estação (D-094, D-095) e dossiê em tela cheia no celular (D-096);
- remoção de Conquistas, Missão principal atual e Missões secundárias (D-097);
- ajustes da revisão de UI/UX e pré-renderização da Home (D-098).

- [ ] Revisar no navegador (`npm start`, e o celular pela rede local) e, se ok, disparar o workflow **Deploy to GitHub Pages** (Actions → workflow_dispatch). Na primeira publicação com a pré-renderização, conferir `/` e `/en` no ar (HTML já com o conteúdo, idioma certo e sem erros no console).

## 2. Aprovações formais (implementado e mergeado, falta o seu "aprovado")

- [ ] Diário de Campanha por capítulos (D-091)
- [ ] Arsenal de Habilidades, Concept C (D-092); frases de PRD, IA e DNA ainda são **proposta** (`src/app/data/skills.data.ts`)
- [ ] Inventário H3, capa e dossiê dentro do CRT (D-093), moldura e cenário (D-094), MC-01 frontal e portátil (D-095), dossiê em tela cheia no celular (D-096)
- [ ] Ajustes da revisão de UI/UX (D-098)

## 3. Decisões suas

- [ ] **Contato:** e-mail e/ou CV em PDF. É o que mais pesa na nota de conteúdo da revisão (8,5). `src/app/data/social-links.data.ts` já está preparado para e-mail e currículo (só renderiza com URL real).
- [ ] **Hero (congelado):** botão de pausa da demonstração com 32 px (o recomendado para toque é 44 px) e, no celular, a primeira tela só com texto.
- [ ] **Paco: 23 Horas para a Última Vela:** entra como cartucho MC-007 quando você aprovar o conteúdo.
- [ ] **FASE 6 (segredos):** qual efeito para o Konami Code, Secret Area etc. (`docs/08`).
- [ ] **Progress e XP de campanha:** sem definição (D-021, D-059).

## 4. Conteúdo (textos seus)

- [ ] "10+ anos" aparece 4 vezes nas duas primeiras telas (Hero e Player Status, ambos congelados).
- [ ] Marco 04 do capítulo 02 do Diário repete a descrição do MC-006 (Comunidade ON).
- [ ] "facilities" (Axia) ficou como jargão aceito na versão pt; trocar se preferir.
- [ ] Revisão das traduções antigas do Campaign Log (D-088).

## 5. SYSTEM HORIZON

- [ ] Personagem definitivo (hoje provisório, `docs/22` §13).
- [ ] MVP interativo: proposta aguardando aprovação (D-069, `docs/23`).

## 6. Depois da publicação

- [ ] Testar em Safari e Firefox reais; validar links do LinkedIn e da ScienceDirect; LinkedIn Post Inspector; `sitemap.xml` no Search Console.
- [ ] Domínio próprio (opcional) e divulgação no LinkedIn.

## Referências

- Revisão de UI/UX (4 rodadas): notas finais UX 9 · visual 8,8 · acessibilidade 9,2 · conteúdo 8,5. O que separa de 10 depende dos itens das seções 3 e 4. Detalhes em `docs/10-decisions.md`, D-098.
- Roadmap completo: `docs/09-roadmap.md`. Decisões: `docs/10-decisions.md`.
