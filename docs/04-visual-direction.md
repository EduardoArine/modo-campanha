# 04 — Direção Visual

> Status: **direção conceitual**. Nenhum valor final (HEX, fontes, espaçamentos) foi fechado. A direção definitiva nasce do concept visual na FASE 1 e vira design system na FASE 2.

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
- Apenas fontes **gratuitas / open source** (ex.: candidatas a avaliar na FASE 2: Press Start 2P, Silkscreen, Pixelify Sans, VT323 para display; Inter, IBM Plex Sans, Atkinson Hyperlegible para texto). Nenhuma escolhida ainda.
- Hospedar localmente quando possível (performance e privacidade).

## Paleta conceitual

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
- barras de skill com percentuais.
