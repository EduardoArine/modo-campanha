import { PROJECTS } from '../../data';
import { Project } from '../../models';

// ⚠️ FIXTURES DEV-ONLY (D-077): só para testar a escolha e a troca de cartuchos e o fallback no
// laboratório. NÃO são projetos: ids `mock-inventory-*`, títulos "MOCK", reaproveitam os assets do
// MC-001. Nunca entram em `src/app/data` (o deploy guard falha se `mock-inventory` aparecer no build).
const [mc001] = PROJECTS;

const mock = (n: string, overrides: Partial<Project> = {}): Project => ({
  ...mc001,
  id: `mock-inventory-${n}`,
  serial: `MOCK-${n}`,
  slug: `mock-inventory-${n}`,
  title: { 'pt-BR': `MOCK CARTRIDGE ${n}`, en: `MOCK CARTRIDGE ${n}` },
  description: {
    'pt-BR': 'Cartucho de teste do laboratório (não é um projeto).',
    en: 'Lab test cartridge (not a project).',
  },
  experiences: [],
  links: [],
  ...overrides,
});

/** `set`: single (só o MC-001 real), multi (MC-001 + 2 MOCK), broken (render do console ausente). */
export function labProjects(set: string | null): readonly Project[] {
  if (set === 'multi') return [mc001, mock('002'), mock('003')];
  if (set === 'broken') {
    return [
      mock('404', {
        cartridge: {
          ...mc001.cartridge,
          renders: {
            ...mc001.cartridge.renders!,
            console: { src: 'assets/mock-inventory/missing.webp', width: 699, height: 500 },
          },
        },
      }),
    ];
  }
  return [mc001];
}
