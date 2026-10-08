// Ícones do MC Design System (docs/11-design-system.md, Icons).
//
// MC SYSTEM ICONS: desenhados para o Modo Campanha em grade de 16 px; traço 1.5,
// pontas retas e só ângulos de 0/45/90° (curvas viram chanfros): técnico e levemente pixel.
// Criar apenas ícones usados por componentes reais.
//
// BRAND ICONS: marcas oficiais monocromáticas, sem pixelização.
// GitHub: Octicons "mark-github" (MIT, GitHub Inc.). LinkedIn: Simple Icons (CC0).

export interface McIconDefinition {
  viewBox: string;
  /** `stroke`: ícones de sistema (traço). `fill`: marcas de terceiros. */
  style: 'stroke' | 'fill';
  paths: readonly string[];
}

export const MC_ICONS = {
  // System
  'arrow-down': {
    viewBox: '0 0 16 16',
    style: 'stroke',
    paths: ['M8 2.75V12.5', 'M3.75 8.75 8 13l4.25-4.25'],
  },
  external: {
    viewBox: '0 0 16 16',
    style: 'stroke',
    paths: ['M4.25 11.75 11.5 4.5', 'M6 4.25h5.75V10'],
  },
  document: {
    viewBox: '0 0 16 16',
    style: 'stroke',
    paths: ['M3.75 1.75h5.5l3 3v9.5h-8.5z', 'M9.25 1.75v3h3', 'M6 8.25h4', 'M6 11h4'],
  },
  language: {
    viewBox: '0 0 16 16',
    style: 'stroke',
    paths: [
      'M5.5 1.75h5l3.75 3.75v5L10.5 14.25h-5L1.75 10.5v-5z',
      'M8 1.75 10.25 5v6L8 14.25 5.75 11V5z',
      'M1.75 8h12.5',
    ],
  },
  // Brand
  github: {
    viewBox: '0 0 16 16',
    style: 'fill',
    paths: [
      'M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z',
    ],
  },
  linkedin: {
    viewBox: '0 0 24 24',
    style: 'fill',
    paths: [
      'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 4.892v4.851zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    ],
  },
} as const satisfies Record<string, McIconDefinition>;

export type McIconName = keyof typeof MC_ICONS;

/** Tamanhos suportados pelo design system. Valores arbitrários não são aceitos. */
export type McIconSize = 16 | 20 | 24;
