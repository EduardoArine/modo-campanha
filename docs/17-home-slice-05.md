# 17 — Home Slice 05: Final Checkpoint

> Status: **HOME SLICE 05 — APPROVED** (D-054). Direção **A — Save Point Editorial**. Final Checkpoint e footer **FROZEN**: nenhum ajuste salvo regressão objetiva. Contato / Contact de volta ao header (→ `#final-checkpoint`).
>
> | Etapa | Estado                                         |
> | ----- | ---------------------------------------------- |
> | 05-0  | decisões e conteúdo aprovados (D-052)          |
> | 05-A  | estrutura + dados ✅                           |
> | 05-B  | visual ✅ **APPROVED / FROZEN**                |
> | 05-C  | footer ✅ **APPROVED / FROZEN**                |
> | 05-D  | revisão integrada ✅ (Contato no header, docs) |

## 1. Ordem de construção × ordem da página

O Final Checkpoint é construído **antes** de Current Main Quest e Side Quests (D-052): já existe conteúdo público real suficiente para ele, e o encerramento aproxima a Home de uma primeira versão publicável. **A ordem final da Home não muda**: o Final Checkpoint continua sendo a seção #9, a última (`docs/03`). Depois dele: Current Main Quest, depois Side Quests.

Primeira composição publicável (produção):

```
Hero → Player Status → Skill Loadout → Project Inventory → Final Checkpoint → Footer
```

Campaign Log e Achievements continuam **dev-only** enquanto tiverem conteúdo MOCK (D-049, D-051). Em desenvolvimento a sequência é: … → Project Inventory → Campaign Log → Achievements → Final Checkpoint → Footer.

## 2. Função

Encerrar a campanha atual sem virar tela de videogame literal: **CAMPAIGN CONTINUES...** Presença de fechamento sem competir com o Hero ou com o MC-CART; nada de painel gigante, motion ou CTA laranja forçado.

## 3. Direção visual: A — Save Point Editorial (aprovada)

Avaliadas: **A — Save Point Editorial** (aberta), **B — Continue Prompt** (`CONTINUE? ▮`; risco de videogame literal e de links lidos como opções de menu), **C — Save Slot Panel** (painel; repete o Record Panel dos Achievements e lê como banner de CTA SaaS).

Aprovada a **A**:

```
SAVE COMPLETE
■ CAMPAIGN CONTINUES... ───────────────────────────────────

Se quiser construir algo comigo ou trocar ideias sobre     (colunas 8–12:
produto, IA, desenvolvimento ou games, estes são os        espaço negativo)
melhores lugares para me encontrar.

[ GitHub ↗ ]  [ LinkedIn ↗ ]
───────────────────────────────────────────────────────────
XP real, sem personagem.         © 2026 Eduardo Arine · Modo Campanha
```

- **SAVE COMPLETE** é o **único** detalhe MC-01, no slot `code` do `mc-section-header` (papel `system`, cor muted). Sem `CONTINUE?`, cursor em bloco ou Save Slot Panel nesta etapa.
- Frase humana em `title-l`, colunas 1–7; o restante da linha é espaço negativo (não slot vazio).
- GitHub e LinkedIn como **duas ações `secondary` equivalentes** (contorno, sem laranja de preenchimento), abrindo em nova aba com o mesmo padrão `external` do Hero. **Sem ícones de marca.** Nenhuma ação `primary`.
- Sem `mc-status` (não há estado real), CRT, console, MC-CART, painel `--mc-panel`, sombra, glow ou Pixelify ("CONTINUE?" começa pelo "C" reprovado em D-029).
- Laranja só no marcador do section header (e nos estados de foco/hover já existentes).

## 4. Conteúdo (aprovado)

| Elemento         | pt-BR                                                                                                                                          | en                                                                                                                                          | Origem                          |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| Linha de sistema | SAVE COMPLETE                                                                                                                                  | SAVE COMPLETE                                                                                                                               | UI (`finalCheckpoint.save`)     |
| `h2`             | CAMPAIGN CONTINUES...                                                                                                                          | CAMPAIGN CONTINUES...                                                                                                                       | UI (`sections.finalCheckpoint`) |
| Frase            | Se quiser construir algo comigo ou trocar ideias sobre produto, IA, desenvolvimento ou games, estes são os melhores lugares para me encontrar. | If you'd like to build something together or exchange ideas about product, AI, development, or games, these are the best places to find me. | dado: `PlayerProfile.closing`   |
| Ações            | GitHub · LinkedIn                                                                                                                              | GitHub · LinkedIn                                                                                                                           | `SOCIAL_LINKS`                  |
| Footer (05-C)    | XP real, sem personagem. · © {ano atual} Eduardo Arine · Modo Campanha                                                                         | Real XP. No persona. · © {current year} Eduardo Arine · Modo Campanha                                                                       | `PlayerProfile.motto` + UI      |

- **Fora:** email, WhatsApp e formulário (não existem destinos públicos aprovados). Dado real faltando simplesmente não aparece. O currículo em PDF entrou na D-099 como terceira ação `secondary`.
- **Sem MOCK:** a seção não lê Campaign Log nem Achievements.

## 5. Responsivo

| Faixa             | Seção                                                                                                                    | Footer (05-C)                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| Desktop (≥ 1024)  | frase nas colunas 1–7 de 12; ações em linha, à esquerda; padding inferior menor que o de seção (fechamento com o footer) | uma linha: motto à esquerda, © à direita; régua 1 px |
| Tablet (768–1023) | frase nas colunas 1–7 de 8; ações em linha                                                                               | mesma linha, com wrap se faltar espaço               |
| Mobile (< 768)    | frase em largura total; ações em linha com wrap; alvos de 44 px                                                          | empilhado, à esquerda; respiro final + safe area     |

Ritmo validado nos dois contextos: produção (Project Inventory → Final Checkpoint) e desenvolvimento (Achievements → Final Checkpoint).

## 6. Semântica e acessibilidade

- `<section id="final-checkpoint" aria-labelledby="final-checkpoint-title">` dentro do `<main>`, sempre a última seção.
- `h2` pelo `mc-section-header`; SAVE COMPLETE é um `<p>` lido antes do título.
- Links nativos `<a>` com `target="_blank" rel="noopener noreferrer"`, ícone `external` decorativo e texto oculto "(abre em nova aba)" / "(opens in a new tab)".
- Footer: `<footer>` (contentinfo) **fora do `<main>`**; motto em `<p>`, © em `<small>`.
- Nada de `tabindex` extra, motion ou significado só por cor. Nenhum par de cor novo.
- A âncora `#final-checkpoint` não consegue subir até o topo (fim da página): o scroll para no fim, comportamento aceito.

## 7. Arquitetura

- `FinalCheckpointSection` (`features/final-checkpoint/`) reescrita, SCSS local; nenhum componente compartilhado novo.
- `PlayerProfile.closing: Localized` (voz do Eduardo, como `summary` e `motto`); rótulo `finalCheckpoint.save` no dicionário de UI.
- **Footer (05-C):** `SiteFooter` em `core/layout/site-footer/`, renderizado pela **`HomePage` depois do `</main>`**. É a solução mais simples que mantém o fechamento semântico da Home e deixa o footer fora do `/dev/design-system` sem lógica de roteamento: a Home é o único componente das rotas `/` e `/en`; o showcase é outra rota. Resultado: Final Checkpoint → Footer → fim da página.
- **Footer implementado (05-C):** `<footer>` com uma régua superior de 1 px (`--mc-border-subtle`) dentro do container; mesmo fundo da página, sem superfície, sombra, glow, section header, monograma, ícones ou links. Motto em `body-s` (`--mc-text-secondary`) e copyright em `<small>` `caption` (`--mc-text-muted`), com o ano calculado em runtime. ≥ 768: motto à esquerda, © à direita, na mesma linha; < 768: empilhado, motto primeiro. Padding inferior `space(6)` + `env(safe-area-inset-bottom)`. O espaço entre as ações do Final Checkpoint e a régua (64 px) é o padding congelado da seção; o footer não acrescenta margem. Testes: `site-footer.spec.ts` (pt/en, ano atual, sem links/ícones/linguagem de game), `home-page.spec.ts` (footer logo depois do `</main>`, fora dele) e `app.spec.ts` (presente na Home, ausente no `/dev/design-system`).
- **Header (05-D):** Contato / Contact volta e aponta para `#final-checkpoint` (destino real; não vira LinkedIn, D-047).

## 8. Etapas

| Etapa                      | Entrega                                                                                                                                                   | Parada                   |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **05-0 Decisões**          | conteúdo, direção, footer, header (D-052)                                                                                                                 | ✅                       |
| **05-A Estrutura + dados** | `PlayerProfile.closing`; `finalCheckpoint.save`; seção sempre no fim da Home; testes (ordem, pt/en, só links reais, nenhuma primary, sem email/currículo) | —                        |
| **05-B Visual**            | 1440 / 820 / 390 × pt-BR/en; ritmo em desenvolvimento e produção                                                                                          | ◆ revisão visual         |
| **05-C Footer**            | `SiteFooter` na Home; spec; screenshots                                                                                                                   | ◆ revisão visual         |
| **05-D Revisão integrada** | Contato no header; docs 02/03/07/09/10/README/CLAUDE.md; testes, builds, guardas, prettier                                                                | ◆ aprovação final e push |

Commits locais até a aprovação da 05-D. Sem deploy.

## 9. Riscos

1. `home-page.spec.ts` afirmava a ausência de `CAMPAIGN CONTINUES`: atualizado de forma intencional, sem enfraquecer as verificações de Campaign Log e Achievements.
2. A Home de produção ganha uma 5ª seção: o espaçamento é ajustado só na seção nova; Project Inventory segue congelado.
3. Header (Slice 01 aprovado): o retorno de Contato muda a nav e o `site-header.spec.ts`; conferir 3 itens + PT/EN em 768 px.
4. Ano dinâmico no footer: testes não fixam o ano.
5. Guardas de MOCK inalteradas; a seção não importa dados MOCK.
6. Orçamento de CSS por componente (4 kB): enxugar antes de aumentar (D-035).
