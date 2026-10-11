# 18 — Home Slice 06: Current Main Quest

> Status: **06-A e 06-B APPROVED** (D-055, REVIEWER). Estrutura e visual construídos com **MOCK**; **06-C editorial pendente** (texto público aprovado pelo Eduardo).
>
> ⚠️ **CURRENT MAIN QUEST CONTENT = MOCK FOR VISUAL DEVELOPMENT.** `src/app/data/current-quest.data.development.ts` é fictício ("Campanha de exemplo"). Só existe em desenvolvimento e testes; a produção usa `current-quest.data.ts` (`null`) e não renderiza a seção.

## 1. Função

Seção especial dedicada à **campanha atual** (hoje, Comunidade On): mostrar a participação do Eduardo na construção e evolução da plataforma **sem informação confidencial ou interna**. Ordem da Home: #7, depois de Achievements e antes de Side Quests / Final Checkpoint (`docs/03`).

Fatos públicos já aprovados: só o **nome** "Comunidade On" como campanha atual (Player Status). O texto-base de `docs/02` é conceitual ("a revisar"). Publicar só o nome repetiria o Player Status, então **a seção só vai para produção com texto público aprovado** (Comunidade On = INTERNAL / NEEDS EXPLICIT APPROVAL, D-040).

## 2. Modelo

```ts
interface CurrentQuest {
  id: string;
  title: Localized; // nome público da campanha
  role?: Localized; // papel público aprovado
  summary: Localized; // 1–2 frases públicas, ~140–220 caracteres
  focus: Localized<readonly string[]>; // 2–4 frentes de atuação, sem métricas
}
```

- `CURRENT_QUEST: CurrentQuest | null`; `null` = seção não renderizada.
- Fora: métricas, resultados, clientes, parceiros, arquitetura, integrações, datas não aprovadas, XP, level, progresso, percentuais.

## 3. Direção visual: A — Quest Briefing (aberta)

Avaliadas: **A — Quest Briefing** (composição aberta, duas colunas), **B — Quest Panel** (painel com borda de acento; repetiria o Record Panel dos Achievements, logo acima) e **C — CRT Briefing** (moldura CRT; competiria com o Hero e com o CRT Project Viewer da FASE 5). Escolhida **A**.

```
■ CURRENT MAIN QUEST ─────────────────────── ○ IN PROGRESS

Campanha de exemplo                         FRENTES
Papel de exemplo                            ▪ Frente de exemplo A
Resumo público em 1–2 frases (body-l)       ▪ Frente de exemplo B
                                            ▪ Frente de exemplo C
```

- `mc-section-header` com `mc-status state="in-progress"` (**IN PROGRESS**): é o uso documentado desse estado (docs/11). O D-039 proíbe status no header só no Player Status.
- Título `title-l` com peso 600; papel em `body` muted; resumo em `body-l` secondary.
- Frentes como lista informativa com o marcador discreto do Skill Loadout (sem chips, hover ou pointer).
- Sem painel, sombra, objeto físico, glow, logos, métricas ou barra de progresso. Laranja só no marcador do header e no status.

| Faixa             | Comportamento                              |
| ----------------- | ------------------------------------------ |
| Desktop (≥ 1024)  | briefing nas colunas 1–7; frentes nas 9–12 |
| Tablet (768–1023) | briefing 1–5; frentes 6–8                  |
| Mobile (< 768)    | empilhado: briefing, depois frentes        |

## 4. Acessibilidade

`section` com `aria-labelledby`; `h2` pelo header; título em `h3`; status como texto visível (`mc-status`); frentes em `ul role="list"` rotulada pelo label visível; nada interativo.

## 5. Produção

Mesmo mecanismo do D-049/D-051: `current-quest.data.ts` = `null`; `current-quest.data.development.ts` (id `mock-current-quest`) via `fileReplacements` em dev/testes; o deploy guard falha se `mock-current-quest` aparecer no build público.

## 6. Conteúdo a receber do Eduardo

Texto público aprovado (pt-BR/en) sobre a participação na Comunidade On; papel a exibir; 2–4 frentes de atuação; confirmação de que o nome pode aparecer nesta seção. Nada interno (arquitetura, integrações, métricas, parceiros, clientes).
