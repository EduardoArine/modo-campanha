export type SocialLinkKind = 'github' | 'linkedin' | 'email' | 'resume' | 'other';

export interface SocialLink {
  kind: SocialLinkKind;
  label: string;
  url: string;
}
