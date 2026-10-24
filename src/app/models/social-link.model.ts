import { Localized } from '../core/i18n';

export type SocialLinkKind = 'github' | 'linkedin' | 'email' | 'resume' | 'other';

export interface SocialLink {
  kind: SocialLinkKind;
  label: string;
  url: string;
  /** Arquivo diferente por idioma (ex.: currículo em pt e en, D-099); `url` fica como o padrão (pt). */
  localizedUrl?: Localized;
}
