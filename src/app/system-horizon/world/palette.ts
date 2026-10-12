/**
 * Paleta dos placeholders técnicos: cada cor é um token semântico do MC Design System, lido em
 * runtime (`--mc-<token>`), então o código não carrega cores próprias. A arte final traz a sua
 * paleta indexada (docs/22 §4.0), derivada dos mesmos tokens.
 */
export const PALETTE_TOKENS = {
  night: 'bg',
  ground: 'surface',
  shade: 'panel',
  shell: 'elevated',
  cream: 'text',
  creamDim: 'text-secondary',
  dust: 'text-muted',
  orange: 'accent',
  orangeLight: 'accent-hover',
  orangeDeep: 'accent-active',
  gold: 'special',
  petrol: 'cool-surface',
  teal: 'cool',
} as const;

export type Palette = Record<keyof typeof PALETTE_TOKENS, string>;

export function readPalette(style: CSSStyleDeclaration): Palette {
  const entries = Object.entries(PALETTE_TOKENS).map(([name, token]) => [
    name,
    style.getPropertyValue(`--mc-${token}`).trim(),
  ]);
  return Object.fromEntries(entries) as Palette;
}
