import { SocialLink } from '../models';

// Links reais aprovados. Currículo (D-099): os PDFs do Eduardo, um por idioma, em public/assets/cv/.
// E-mail: aguardando (não renderizar sem endereço real).
export const SOCIAL_LINKS: SocialLink[] = [
  { kind: 'github', label: 'GitHub', url: 'https://github.com/EduardoArine' },
  { kind: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/eduardoarine' },
  {
    kind: 'resume',
    label: 'Currículo',
    url: 'assets/cv/eduardo-arine-curriculo.pdf',
    localizedUrl: {
      'pt-BR': 'assets/cv/eduardo-arine-curriculo.pdf',
      en: 'assets/cv/eduardo-arine-resume.pdf',
    },
  },
];
