import { Localized } from '../core/i18n';

/** Linha de dado real do Player Status (label + valor, nos dois idiomas). Nunca pontos/XP inventado. */
export interface ProfileField {
  label: Localized;
  value: Localized;
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
  /** Dados do Player Status (usados a partir do Slice 01-E). */
  status: {
    origin: ProfileField;
    xp: ProfileField;
    currentCampaign: ProfileField;
    focus: ProfileField;
    state: ProfileField;
  };
  /** Foto real aprovada. Ausente = placeholder "FOTO DO EDUARDO" (D-017). */
  photo?: { src: string; alt: Localized };
}
