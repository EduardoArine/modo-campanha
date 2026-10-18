import { Localized } from '../core/i18n';

/** Linha de dado real do Player Status (label + valor, nos dois idiomas). Nunca pontos/XP inventado. */
export interface ProfileField {
  label: Localized;
  value: Localized;
  /** Forma curta do mesmo dado real (ex.: "10+" no selo do Player Card, D-082). */
  short?: Localized;
}

/** Estado atual do Player Status (D-082). O tom de cor vem do `id`, na UI. */
export interface ProfileState {
  id: 'building' | 'learning' | 'evolving';
  label: Localized;
  value: Localized;
}

/** Foto real aprovada (D-017, D-082): derivados WebP em `public/assets/player/`. */
export interface ProfilePhoto {
  src: string;
  srcset: string;
  width: number;
  height: number;
  alt: Localized;
}

/** Perfil do Eduardo (docs/07-content-model.md). Só conteúdo aprovado por Eduardo. */
export interface PlayerProfile {
  /** Nome próprio: igual nos dois idiomas. */
  name: string;
  role: Localized;
  /** Linha de áreas (ex.: "IA • Produto • Desenvolvimento • Gamificação"). */
  focusLine: Localized;
  /** Texto humano curto do Hero. */
  summary: Localized;
  motto: Localized;
  /** Frase de encerramento do Final Checkpoint (D-052). */
  closing: Localized;
  /** Dados do Player Status. */
  status: {
    origin: ProfileField;
    xp: ProfileField;
    currentCampaign: ProfileField;
    focus: ProfileField;
  };
  /** "Sobre a jornada" (D-082): parágrafos do texto aprovado. */
  journey: Localized<readonly string[]>;
  /** Frase de destaque da jornada. */
  tagline: Localized;
  /** "Estado atual": três estados aprovados, nesta ordem. */
  currentState: readonly ProfileState[];
  /** Frase final do Player Status. */
  quote: Localized;
  /** Foto real aprovada. Ausente = placeholder "FOTO DO EDUARDO" (D-017). */
  photo?: ProfilePhoto;
}
