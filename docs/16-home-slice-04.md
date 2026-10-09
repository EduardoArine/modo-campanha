# 16 — Home Slice 04: Achievements

> Status: **plano aprovado (D-051).** Direção **A + B — Achievement Record Panel** aprovada para exploração. **04-A e 04-B implementados com conteúdo MOCK, aguardando revisão visual.** 04-0 (fatos reais) pendente; 04-C não iniciado.
>
> ⚠️ **ACHIEVEMENTS CONTENT = MOCK FOR VISUAL DEVELOPMENT.** Os itens em `src/app/data/achievements.data.development.ts` são textos genéricos e deliberadamente fictícios. Só existem em desenvolvimento e testes; a produção usa `achievements.data.ts` (vazio) e não renderiza a seção.

## 1. Função narrativa

Hero → Player Status (quem é) → Skill Loadout (o que sabe) → Project Inventory (o que construiu) → Campaign Log (como mudou) → **Achievements (que provas ficaram)**.

Pergunta da seção: _"Quais fatos concretos ajudam a provar a evolução profissional apresentada até aqui?"_ Linguagem de jogo só como enquadramento; nenhuma conquista artificial.

## 2. Critérios para um achievement existir

Precisa de **fonte factual aprovada** e passar nos dois testes:

- **Concreto:** marco verificável, mudança significativa ou prova de uma capacidade já mostrada.
- **Novo:** acrescenta algo que **não** aparece em Player Status, Skill Loadout, Inventory ou Campaign Log.

O MOCK do Campaign Log nunca é fonte. Comunidade On não vira achievement (pertence à Current Main Quest).

## 3. Candidatos a partir de fatos já aprovados

Nenhum passa com folga: 10+ anos e formação em Jogos Digitais (FATEC Americana) já são XP/ORIGEM do Player Status; Modo Campanha já está no Inventory; IA no workflow, produto/UX e gamificação não têm marco concreto ainda; a origem em games → produtos é a tese do Campaign Log. **A 04-0 é uma coleta de fatos novos**, não uma seleção.

## 4. Fatos a receber do Eduardo (04-0)

Produtos lançados/publicados citáveis (nome/contexto, ano, papel); jogos publicados, protótipos públicos ou game jams; reconhecimentos, prêmios, certificações; palestras, workshops, mentoria, ensino; open source; marcos de responsabilidade publicáveis; um marco concreto de IA (ano + o que mudou); números reais e publicáveis (nada da On sem aprovação). Para cada um: a evidência (ano, nome público, link) e se pode ser nomeado.

## 5. Modelo (implementado na 04-A)

```ts
interface Achievement {
  id: string;
  title: Localized; // manchete curta
  description: Localized; // 1 frase, ~80–110 caracteres
  evidence: Localized; // OBRIGATÓRIO: fonte factual curta (até ~60 caracteres)
  year?: number; // só com data real
}
```

- `evidence` obrigatório: contrato que impede um achievement sem base factual.
- `ACH-01`, `ACH-02`… derivados da ordem de apresentação, decorativos (`aria-hidden`); nunca no dado.
- Fora: kind, icon, secret (volta na FASE 6), score, XP, rarity, level, unlocked, progress.

## 6. Regra pública de quantidade

| Aprovados | Comportamento         |
| --------- | --------------------- |
| 0         | não renderiza         |
| 1         | ainda não renderiza   |
| 2–5       | renderiza normalmente |

`MIN_ACHIEVEMENTS = 2` em `src/app/data/achievements.rules.ts` (arquivo não substituído por `fileReplacements`). Nunca criar slot vazio nem repetir outras seções para chegar a 3 ou 4 itens; com 2 achievements bons, publicar 2.

## 7. Direção visual: A + B — Achievement Record Panel

Avaliadas: **A — System Achievement List** (madura, mas repete o ritmo textual do Campaign Log), **B — Badge without badge** (hierarquia de achievement, mas risco de card grid e de repetir o Skill Loadout), **C — Record Stamps** (carimbo/burocracia; "verified" sugere certificação).

Híbrido aprovado:

- **um único painel digital** (`--mc-panel`, sem sombra, sem material físico), largura do conteúdo;
- células separadas por **réguas finas** (gap de 1 px mostrando `--mc-border-subtle`; mesma intensidade da borda externa);
- cada célula: `■ ACH-0N` (marker + código, laranja, decorativos) · **manchete** (Plex, caixa alta, peso) · descrição (1 frase) · **EVIDÊNCIA: …** no pé da célula, em tom apagado;
- laranja só no marker e no código; **sem teal nem verde** (nenhuma categoria ou estado real);
- sem badge, medalha, troféu, estrela, raridade, glow, hover, motion, shell ou object shadow.

Peso visual: mais visual que o Campaign Log, menos que o Project Inventory; contido (painel), ao contrário da composição aberta do Skill Loadout.

### Responsivo

| Faixa    | Comportamento                                                  |
| -------- | -------------------------------------------------------------- |
| ≥ 1200   | N células numa linha (`--n` = quantidade): 4 → 4, 3 → 3, 2 → 2 |
| 768–1199 | 2 por linha; ímpar final ocupa a linha inteira                 |
| < 768    | 1 por linha, réguas horizontais; nunca 2 colunas               |

### Orçamento editorial

description ~80–110 caracteres; evidence até ~60. Limite **editorial**: sem line-clamp nem truncation CSS.

## 8. Acessibilidade

`h2` ACHIEVEMENTS; `ul role="list"` (a ordem não tem significado); `h3` por manchete; `ACH-0N` e marker `aria-hidden`; rótulo visível **EVIDÊNCIA / EVIDENCE**; nada interativo (sem `tabindex`, sem fake button); significado nunca só por cor ou forma.

## 9. Produção

Mesmo mecanismo do Campaign Log (D-049): `achievements.data.ts` vazio em produção; `achievements.data.development.ts` (MOCK, ids `mock-achievement-*`) só em desenvolvimento/testes via `fileReplacements`; a Home renderiza só com ≥ 2 itens; o deploy guard falha se `mock-achievement` aparecer no build público.

## 10. Componentes

Reutilizados: `mc-section-header`, tokens (`--mc-panel`, bordas), papéis tipográficos (`label`, `title-m`, `body-s`, `caption`), breakpoints `md`/`xl`. Novo: apenas a `AchievementsSection` reescrita (SCSS local).

## 11. i18n

`sections.achievements` (ACHIEVEMENTS). Novas chaves: `achievements.code` (ACH, linguagem de sistema) e `achievements.evidence` (EVIDÊNCIA / EVIDENCE). Conteúdo em `Localized`.

## 12. Header

Sem impacto: Achievements não tem item de navegação.

## 13. Etapas

| Etapa                   | Conteúdo                                                                       | Parada                  |
| ----------------------- | ------------------------------------------------------------------------------ | ----------------------- |
| **04-0 Content intake** | fatos novos do Eduardo → critérios → 2–5 achievements com evidência            | ◆ aprovação do conteúdo |
| **04-A Model + data**   | `Achievement`, regra ≥ 2, dados vazios em produção, MOCK em dev, guard, testes | ✅ (MOCK)               |
| **04-B Visual**         | Record Panel 1440 / 820 / 390, pt-BR e en; ritmo Log → Achievements            | ◆ revisão visual        |
| **04-C Editorial**      | MOCK → fatos aprovados; liberação para produção                                | ◆ aprovação final       |

A 04-C não bloqueia as próximas partes da Home.
