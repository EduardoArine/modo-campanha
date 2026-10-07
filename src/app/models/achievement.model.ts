export interface Achievement {
  id: string;
  /** Título no estilo de conquista (ex.: `GAME DEV ORIGIN`). */
  title: string;
  /** Fato concreto que sustenta a conquista. Nunca inventar. */
  description: string;
  icon?: string;
  /** Conquistas secretas só aparecem após um easter egg (docs/08-easter-eggs.md). */
  secret?: boolean;
}
