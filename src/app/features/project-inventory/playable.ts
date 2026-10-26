import { Locale, localizedUrl } from '../../core/i18n';
import { Project } from '../../models';

/**
 * Caminho da campanha jogável de um cartucho (D-103), no idioma ativo: só quando a experiência
 * `playable` está disponível e o cartucho roda o SYSTEM HORIZON (MC-001). Usado na capa e no dossiê.
 */
export function playablePath(project: Project, locale: Locale): string | null {
  const ready = project.experiences.some((e) => e.kind === 'playable' && e.status === 'available');
  return ready && project.cartridge.teaser === 'system-horizon'
    ? localizedUrl('/system-horizon', locale)
    : null;
}
