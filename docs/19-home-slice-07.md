# 19 — Home Slice 07: Side Quests

> ⛔ **REMOVIDA em D-097 (2026-10-23, decisão do Eduardo):** a seção repetia o que outras seções já mostram; componente, dados MOCK, modelo e textos saíram do código. Este documento fica como histórico.

> Status: **07-A e 07-B APPROVED** (D-056, REVIEWER). Estrutura e visual construídos com **MOCK**; **07-C editorial pendente**.
>
> ⚠️ **SIDE QUESTS CONTENT = MOCK FOR VISUAL DEVELOPMENT.** `src/app/data/side-quests.data.development.ts` é fictício ("Experimento de exemplo A…"). Só existe em desenvolvimento e testes; a produção usa `side-quests.data.ts` (vazio) e não renderiza a seção.

## 1. Função

Projetos fora da atividade profissional principal: game development, concept art, experimentos com IA, interfaces experimentais e estudos (`docs/02`). Ordem da Home: #8, depois da Current Main Quest e antes do Final Checkpoint (`docs/03`).

- Projetos completos e aprovados vão para o **Project Inventory** (MC-CART). Side quests são mais leves: experimento, estudo, exploração.
- **Paco (MC-002)** segue em `review` (D-041) e não entra no runtime, nem aqui.
- Nenhum conteúdo real aprovado hoje: produção vazia.

## 2. Modelo

```ts
type SideQuestKind = 'game' | 'art' | 'ai' | 'interface' | 'study';

interface SideQuest {
  id: string;
  kind: SideQuestKind; // categoria do trabalho; rótulo vem da UI
  title: Localized;
  summary: Localized; // 1 frase, ~80–120 caracteres
}
```

- Fora: progresso, XP, level, raridade, recompensas, métricas. **Links só quando houver URL real aprovada** (o campo entra com o primeiro conteúdo real).

## 3. Direção visual: C — Side Quest Log (escolhida)

Avaliadas: **A — Quest Grid** (módulos em grade 4/2/1; repetiria a composição do Skill Loadout), **B — Demo Carts** (mini-cartuchos; exigiria variação do MC-CART congelado e competiria com o Inventory) e **C — Side Quest Log** (linhas compactas). Escolhida **C**.

```
■ SIDE QUESTS ─────────────────────────────────────────────
──────────────────────────────────────────────────────────
□ GAME DEV   Experimento de exemplo A   Descrição fictícia…
──────────────────────────────────────────────────────────
□ IA         Experimento de exemplo B   Texto de exemplo…
──────────────────────────────────────────────────────────
```

- Réguas de 1 px (`--mc-border-subtle`) entre linhas; marcador vazado com a linguagem estrutural dos checkpoints do Campaign Log.
- Tipo (`label`, muted) · título (`title-m`) · resumo (`body`, secondary).
- Sem painel, cards, sombra, objeto físico, chips, links ou hover. Sem laranja além do marcador do section header: é a seção mais silenciosa depois do Loadout.

| Faixa             | Comportamento                                       |
| ----------------- | --------------------------------------------------- |
| Desktop (≥ 1024)  | tipo 1–2 · título 3–6 · resumo 7–12, na mesma linha |
| Tablet (768–1023) | tipo + título 1–3 · resumo 4–8                      |
| Mobile (< 768)    | empilhado: tipo, título, resumo                     |

## 4. Acessibilidade

`section` com `aria-labelledby`; `ul role="list"`; `h3` por side quest; tipo como texto visível; marcador `aria-hidden`; nada interativo.

## 5. Produção

Mesmo mecanismo do D-049/D-051/D-055: `side-quests.data.ts` vazio; `side-quests.data.development.ts` (ids `mock-side-quest-*`) via `fileReplacements`; guard do deploy falha se `mock-side-quest` aparecer no build público.

## 6. Conteúdo a receber do Eduardo

Lista de side quests públicas (pt-BR/en): tipo, título, uma frase; links públicos quando existirem; confirmação de direitos para material de terceiros/colaboradores.
