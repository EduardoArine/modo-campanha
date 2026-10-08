# 05 — Sistema de Cartuchos de Projeto

Os projetos do portfólio são representados como **cartuchos de videogame antigos**. Este documento define o sistema; a implementação visual vem nas FASES 2–3 e a animação na FASE 5.

## MC-CART System (direção aprovada, D-013)

Base visual: cartuchos do **Concept 03-B**. Sistema **autoral**: nenhum formato de fabricante real (Nintendo, Sega etc.).

Todo cartucho pertence à mesma família:

```
MC-CART                 ON-001     ← nomenclatura fixa (topo esquerdo) · serial (topo direito)
┌─────────────────────────────┐
│        LABEL ART            │    ← arte do projeto
│  PROJECT NAME               │    ← nome em pixel font
│  tagline curta              │
└─────────────────────────────┘
TYPE                               ← tipo do projeto
```

| Pode variar                                 | Deve manter                         |
| ------------------------------------------- | ----------------------------------- |
| shell: **preto, creme, grafite, laranja**   | proporções                          |
| label (arte e cor de fundo)                 | arquitetura visual (corpo, janela do rótulo, ranhuras) |
| accent color                                | nomenclatura (MC-CART, serial)      |
| artwork                                     | posição dos metadados               |
|                                             | linguagem MC                        |

Serial: formato `<COLEÇÃO>-<NNN>` (ex.: `ON-001`, do concept). Regra de prefixos a definir na spec do MC-CART (FASE 2).

### Informação na listagem

Princípio: **coleção primeiro, documentação depois.** Dentro/abaixo do cartucho, apenas:

- nome;
- tipo;
- descrição curta (1 linha, ~60 caracteres);
- 1 ou 2 tags.

Exemplo de formato (texto ilustrativo, não aprovado):

```
Comunidade On
Plataforma digital de atendimento e oportunidades.
[Produto] [Desenvolvimento]
```

Todo o resto (missão, papel, desafios, resultados...) pertence ao **CRT Project Viewer**. Todos os textos existem em pt-BR e en (D-018).

### Layout da coleção

Grid de 4 por linha no desktop (3 colunas de 12 cada), 2 por linha no tablet e **1 por linha no mobile (baseline)**; mais projetos quebram linha. Testar 2 por linha no mobile depois (D-022). **Sem carrossel** (as setas do 03-B não foram adotadas), pela acessibilidade e por mostrar a coleção inteira.

## Anatomia do cartucho (esboço da FASE 0, substituído pelo MC-CART acima onde houver conflito)

```
 ┌───────────────────────────┐
 │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│  ← topo / ranhuras de encaixe
 │ ┌───────────────────────┐ │
 │ │                       │ │
 │ │        ARTE           │ │  ← arte do rótulo (cartridge.art)
 │ │                       │ │
 │ ├───────────────────────┤ │
 │ │ TÍTULO DO PROJETO     │ │  ← cartridge.label
 │ └───────────────────────┘ │
 │  MC-001        ● 2025     │  ← serial fictício · ano · indicador de status
 └───────────────────────────┘
   corpo na cor predominante (cartridge.color)
```

Partes:

1. **Corpo**: cor predominante do projeto.
2. **Rótulo**: arte + nome curto.
3. **Serial fictício**: ~~ex. `MC-001`~~ → formato `<COLEÇÃO>-<NNN>`, ex. `ON-001` (ver MC-CART). Puramente estético, sequencial.
4. **Ano**.
5. **Indicador de status** (LED/selo): em andamento, lançado, arquivado, conceito.
6. **Selo de destaque** para projetos `featured`.

## Metadados

Definidos em `src/app/models/project.model.ts` (`Project` + `Cartridge`):

| Campo               | Uso no cartucho              | Uso no CRT Viewer           |
| ------------------- | ---------------------------- | --------------------------- |
| `id`, `slug`        | identificação / URL futura   | identificação               |
| `title`, `subtitle` | —                            | PROJECT NAME                |
| `cartridge.label`   | rótulo                       | —                           |
| `cartridge.art`     | arte do rótulo               | boot screen (opcional)      |
| `cartridge.color`   | cor do corpo                 | cor de destaque do case     |
| `cartridge.serial`  | serial impresso              | boot screen                 |
| `type`              | filtro / agrupamento         | TYPE                        |
| `status`            | LED/selo                     | STATUS                      |
| `year`              | ano impresso                 | YEAR                        |
| `role`              | —                            | ROLE / MY ROLE              |
| `stack`             | —                            | STACK                       |
| `summary`           | tooltip / descrição curta    | resumo                      |
| `mission`, `responsibilities`, `challenges`, `solution`, `results`, `learnings` | — | corpo do case |
| `screenshots`       | —                            | SCREENSHOTS                 |
| `links`             | —                            | LINKS                       |
| `featured`          | destaque na prateleira       | —                           |

## Estados do cartucho (interface)

| Estado      | Descrição                                                 |
| ----------- | --------------------------------------------------------- |
| `idle`      | na prateleira                                             |
| `hover` / `focus` | leve elevação, rótulo em destaque (teclado = mouse) |
| `selected`  | escolhido; animação de inserção em andamento              |
| `inserted`  | no console; case exibido no CRT                           |
| `ejected`   | volta à prateleira quando outro é escolhido               |

Estados de **status do projeto** (`ProjectStatus`): `in-progress`, `released`, `archived`, `concept`.

## Seleção

- Clique, toque, `Enter` ou `Espaço` selecionam o cartucho.
- Cada cartucho é um elemento focável com nome acessível (`aria-label` com título do projeto).
- Apenas um cartucho inserido por vez.
- Sem JavaScript de animação, a seleção ainda funciona (o case aparece direto).

## Interação com o console (futuro, FASE 5)

Fluxo:

1. cartucho selecionado
2. sobe da prateleira
3. desloca-se até o console
4. encaixa
5. LED do console acende
6. TV de tubo liga
7. tela de boot curta (`LOADING CARTRIDGE...` → `BOOTING...`)
8. case aparece

Mensagens: `INSERT CARTRIDGE` (estado vazio), `LOADING CARTRIDGE...`, `NO SIGNAL`, `BOOTING...`.

Regras:

- duração total alvo **500–800 ms**;
- com `prefers-reduced-motion`: troca direta, sem deslocamento;
- clicar em outro cartucho durante a animação deve funcionar (cancelar/encadear);
- em mobile, o fluxo pode ser simplificado (ex.: sem deslocamento espacial, apenas encaixe + boot).

## Integração com o CRT

- `CrtProjectViewer` recebe o `Project` selecionado via `input()`.
- Estado vazio: `INSERT CARTRIDGE`.
- Conteúdo do case deve ser legível sem efeitos, e os efeitos CRT ficam na moldura.
- Futuro: rota `/projects/:slug` pode abrir o site com o cartucho já inserido (link compartilhável).

## Reutilização fora do site

O cartucho é também um **ativo de marca**:

- cada cartucho pode ser exportado como imagem para posts de **LinkedIn/Instagram** ("novo cartucho no inventário");
- manter as artes em `public/assets/cartridges/` em resolução suficiente para social (ex.: ≥ 1080 px no maior lado);
- formato do cartucho consistente para que a série seja reconhecível;
- considerar, na FASE 2, um template (SVG/Figma) para gerar novos cartuchos rapidamente.
