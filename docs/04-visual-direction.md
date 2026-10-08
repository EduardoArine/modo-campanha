# 04 — Direção Visual

> Status: **direção aprovada: Concept 03 — Approved as Hybrid** (FASE 1 concluída em 2026-10-08, D-011).
> Regras implementáveis (tokens, escala, grid) vivem em `docs/11-design-system.md`.
> As seções abaixo da linha "Histórico da FASE 0" foram escritas antes do concept e seguem válidas, exceto onde indicado.

## Direção aprovada: Concept 03 híbrido

As duas imagens do Concept 03 são **complementares**:

| Referência                     | Usar para                                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| **03-A** (limpo, mais respiro) | estrutura, grid, hierarquia, espaçamento, densidade, leitura, implementabilidade; **Player Status** inteiro (aberto, poucas caixas, separação por espaço e linhas) |
| **03-B** (atmosférico)         | atmosfera do Hero (~30%): CRT, console MC-01, controle, luz quente, poucos objetos; **cartuchos** com shells diferentes (base do MC-CART) |

Os textos de projetos nas imagens são cópia de concept, **não conteúdo aprovado**.

### Hero = 70% 03-A + 30% 03-B

- **Do 03-A:** composição em duas metades (texto à esquerda, visual à direita), hierarquia MODO CAMPANHA → Eduardo Arine → cargo → áreas → parágrafo → "XP real, sem personagem." → CTAs; respiro; um CTA primário + links secundários.
- **Do 03-B:** luz quente vinda do CRT/ambiente, sensação física do console MC-01 e do controle, leve profundidade de ambiente.
- **Não trazer do 03-B:** pôster na parede, pilha de cartuchos com rótulos de menu, planta, luminária, excesso de objetos, Player Card encaixotado.
- O Hero é **interface implementável** (texto real, botões reais); o visual é um asset contido na metade direita, nunca uma ilustração que ocupa a tela.

### Player Status (base 03-A)

Player Card como única caixa (foto real, placeholder "FOTO DO EDUARDO" até existir, D-017) + colunas de dados abertas separadas por linhas: Origin, XP, Current Campaign, Focus, Sobre a jornada, Estado atual. Sem lista de "Construindo / Aprendendo / Evoluindo" em caixas como no 03-B, a não ser que volte a ser aprovada.

### Cartuchos (base 03-B → MC-CART)

Família autoral com shells **preto, creme, grafite e laranja**; proporções, arquitetura, posição de metadados (MC-CART no topo esquerdo, serial no topo direito, arte, nome) e linguagem MC constantes. Nunca copiar formatos de fabricantes reais. Na listagem: nome, tipo, descrição curta e 1–2 tags. Detalhes em `docs/05`.

### Marca

- Marca: **Modo Campanha**. Símbolo futuro: monograma autoral **MC** (D-015). Ainda não desenhado.
- **MC-01** é linguagem de sistema (MC-01, MC-CART, SAVE 01, PLAYER 01, CAMPAIGN BUILD, SYSTEM ONLINE), não uma segunda marca.
- **Sem alien** como símbolo (D-016).

### Paleta aprovada (D-014)

Laranja `#F28C28` como identidade; neutros quentes escuros (`#14110F`, `#1D1815`, `#231F1C`, `#2B2521`); texto creme (`#F3E9D2`, `#D7CBB5`, `#A89A86`); complementares petrol `#1F3A4A` e teal `#3FA7A3`; status `#7FB069` / `#C44536`; especial dourado `#F2C14E`. Proporção 70% neutros / 20% quentes / 10% complementares-status. Tabela completa e contrastes em `docs/11`.

### Tipografia (D-019)

Pixelify Sans para brand/game-system display só onde validada (hoje: "MODO CAMPANHA" no Hero; códigos com C não passaram); IBM Plex Sans para todo o resto, inclusive títulos de seção, que ganham caráter de game por caixa alta, peso, tracking, marcador e divider (D-029). O caráter retro não depende só da pixel font. Detalhes em `docs/11`.

### Voz

> **O sistema fala a linguagem dos videogames; Eduardo fala como pessoa.**

Vale para os dois idiomas (pt-BR e en, D-018).

---

# Histórico da FASE 0 (direção conceitual pré-concept)

## Proporção

**30% retro/pixel + 70% produto digital moderno.**

O retro é tempero, não base. A base é uma interface limpa, com hierarquia clara, bom espaço em branco e tipografia legível.

## Onde o pixel art aparece

Com moderação, principalmente em:

- títulos de seção;
- ícones;
- pequenos elementos decorativos;
- cartuchos;
- badges / achievements;
- checkpoints do Campaign Log;
- easter eggs;
- animações e elementos de gamificação.

Nunca em textos longos, nem como textura de fundo dominante.

## Tipografia

- **Fonte pixel/display**: apenas títulos e elementos especiais (labels de HUD, mensagens de boot, badges).
- **Fonte moderna, altamente legível**: todo o conteúdo (parágrafos, descrições de case, listas).
- Apenas fontes **gratuitas / open source**. Candidatas e recomendação: `docs/11-design-system.md`.
- Hospedar localmente quando possível (performance e privacidade).

## Paleta conceitual

> ⚠️ **Substituída pela paleta aprovada (D-014).** Mantida apenas como histórico.

| Papel             | Cor conceitual                             |
| ----------------- | ------------------------------------------ |
| Fundo principal   | dark navy                                  |
| Superfícies       | charcoal                                   |
| Texto             | off-white                                  |
| Destaque primário | cyan / azul                                |
| Destaque especial | dourado / âmbar (conquistas, raridade)     |
| XP / progresso    | verde                                      |
| IA / skills       | violeta (**apenas quando necessário**)     |

Sem neon saturado, sem gradientes "cyberpunk". Contraste sempre dentro de **WCAG AA**.

## HUD

Elementos de interface podem lembrar HUDs de jogos (labels em caixa alta, molduras finas, pequenos indicadores de status), mas devem continuar parecendo componentes de produto: alinhados, consistentes e sem poluição.

## CRT

- A TV de tubo é **moldura**, não filtro sobre o conteúdo.
- Efeitos (scanlines, glow, curvatura nas bordas) muito sutis e opcionais.
- Screenshots exibidos com nitidez total.
- Respeitar `prefers-reduced-motion` para boot e flicker.

## Cartuchos

- Formato reconhecível de cartucho antigo, sem copiar nenhum console real (sem marcas registradas).
- Cada projeto tem rótulo, cor predominante e serial fictício.
- Detalhes em `docs/05-project-cartridge-system.md`.

## Profissional sem perder ludicidade

Teste rápido para qualquer tela: **um recrutador sem interesse em games entenderia e respeitaria esta página?** Se não, reduzir o retro. **Alguém reconheceria que esta página é do Eduardo e não de um template?** Se não, aumentar a identidade.

## Referências negativas (evitar)

- site infantil;
- fangame;
- arcade genérico;
- cyberpunk;
- terminal hacker (tela verde sobre preto como tema principal);
- SaaS genérico;
- interface cheia de neon;
- RPG medieval (pergaminhos, espadas, fontes góticas);
- interface excessivamente carregada;
- barras de skill com percentuais;
- alien / space invader como símbolo (D-016);
- avatar gerado ou pixel art no lugar da foto real (D-017);
- levels e números inventados (LV 99, XP arbitrário) (D-021);
- tudo laranja: o laranja é acento (regra 70/20/10).
