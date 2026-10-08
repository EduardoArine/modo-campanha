import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LocaleService } from '../../core/i18n';
import { PLAYER_PROFILE } from '../../data';
import { UI_EN } from '../../core/i18n/ui.en';
import { UI_PT_BR } from '../../core/i18n/ui.pt-BR';
import {
  MC_ICONS,
  McAction,
  McChip,
  McIcon,
  McIconName,
  McIconSize,
  McSectionHeader,
  McStatus,
} from '../../shared/ui';
import {
  McCart,
  McCartShell,
  McCrtProjectViewer,
  McPlayerCard,
  McProjectSummary,
} from '../../shared/signature';

// Ferramenta interna (dev only). Textos da própria página não passam pelo dicionário;
// os textos dos componentes de exemplo, sim (para revisar pt-BR e en).
@Component({
  selector: 'app-design-system-page',
  imports: [
    RouterLink,
    McAction,
    McCart,
    McChip,
    McCrtProjectViewer,
    McIcon,
    McPlayerCard,
    McProjectSummary,
    McSectionHeader,
    McStatus,
  ],
  templateUrl: './design-system-page.html',
  styleUrl: './design-system-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignSystemPage {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly profileName = PLAYER_PROFILE.name;

  // Player Card: valores reais já aprovados (cargo, XP profissional), via dicionário.
  protected readonly playerFields = computed(() => [
    { label: this.ui().playerCard.classLabel, value: this.locale.pick(PLAYER_PROFILE.role) },
    {
      label: this.ui().playerCard.xpLabel,
      value: this.locale.pick(PLAYER_PROFILE.status.xp.value),
    },
  ]);

  protected readonly typeRoles = [
    { role: 'display-hero', sample: 'Modo Campanha' },
    { role: 'section-title', sample: 'Current Main Quest' },
    { role: 'cart-title', sample: 'Comunidade On' },
    { role: 'system', sample: 'MC · MC-01 · MC-CART · ON-001' },
    { role: 'label', sample: 'Origin · XP · Current Campaign' },
    { role: 'name', sample: 'Eduardo Arine' },
    { role: 'title-l', sample: 'Desenvolvedor de Produtos Digitais' },
    { role: 'title-m', sample: 'XP real, sem personagem.' },
    { role: 'body-l', sample: 'Ação, coração e opção: ã á é í ó ú ç ê ô õ à â.' },
    { role: 'body', sample: 'Texto corrido em IBM Plex Sans, no máximo 65 caracteres por linha.' },
    { role: 'body-s', sample: 'Descrição curta de um cartucho (exemplo).' },
    { role: 'caption', sample: 'Produto · Desenvolvimento' },
  ];

  protected readonly colorGroups = [
    { name: 'Superfícies', tokens: ['bg', 'surface', 'panel', 'elevated'] },
    {
      name: 'Texto',
      tokens: ['text', 'text-secondary', 'text-muted', 'text-on-accent', 'text-on-cool'],
    },
    {
      name: 'Acento, links e foco',
      tokens: ['accent', 'accent-hover', 'accent-active', 'link', 'link-hover', 'focus-ring'],
    },
    {
      name: 'Interação e disabled',
      tokens: [
        'interactive-hover',
        'interactive-active',
        'disabled-bg',
        'disabled-text',
        'disabled-border',
      ],
    },
    {
      name: 'Especial, frios e status',
      tokens: ['special', 'cool-surface', 'cool', 'status-online', 'status-danger'],
    },
    {
      name: 'Bordas',
      tokens: ['border-subtle', 'border-default', 'border-accent', 'border-cool'],
    },
  ];

  // Dados de DEMONSTRAÇÃO (fictícios, só para o showcase). Nunca usar como conteúdo real.
  private readonly demo = {
    'pt-BR': {
      title: 'Projeto demo',
      longTitle: 'Projeto de demonstração com nome longo',
      type: 'PLATAFORMA DIGITAL',
      description: 'Descrição curta de demonstração (conteúdo fictício).',
      chips: ['Produto', 'Desenvolvimento', 'Terceiro chip (oculto)'],
      flag: 'DEMO · CONTEÚDO FICTÍCIO',
      role: 'Papel de exemplo',
      stack: 'Angular · TypeScript · .NET',
      text: 'Texto de demonstração para avaliar a leitura dentro da tela do CRT. O conteúdo real dos projetos entra na FASE 7.',
      shot: 'SCREENSHOT (DEMO)',
      labels: { type: 'TYPE', role: 'ROLE', stack: 'STACK' },
    },
    en: {
      title: 'Demo project',
      longTitle: 'Demonstration project with a long name',
      type: 'DIGITAL PLATFORM',
      description: 'Short demo description (fictional content).',
      chips: ['Product', 'Development', 'Third chip (hidden)'],
      flag: 'DEMO · FICTIONAL CONTENT',
      role: 'Sample role',
      stack: 'Angular · TypeScript · .NET',
      text: 'Demo text to evaluate readability inside the CRT screen. Real project content arrives in PHASE 7.',
      shot: 'SCREENSHOT (DEMO)',
      labels: { type: 'TYPE', role: 'ROLE', stack: 'STACK' },
    },
  };
  protected readonly d = computed(() => this.demo[this.locale.locale()]);

  protected readonly carts = computed(() => {
    const d = this.d();
    const items: {
      serial: string;
      shell: McCartShell;
      accent: 'warm' | 'cool' | 'special';
      title: string;
    }[] = [
      { serial: 'ON-001', shell: 'dark', accent: 'warm', title: d.title },
      { serial: 'ON-002', shell: 'light', accent: 'cool', title: d.title },
      { serial: 'ON-003', shell: 'orange', accent: 'special', title: d.longTitle },
      { serial: 'ON-004', shell: 'cool', accent: 'warm', title: d.title },
    ];
    return items;
  });

  protected readonly iconNames = Object.keys(MC_ICONS) as McIconName[];
  protected readonly iconSizes: McIconSize[] = [16, 20, 24];
  protected readonly previewStates = ['default', 'hover', 'active', 'focus'] as const;

  protected readonly dictionaryRows = [
    { key: 'profile.role', pt: PLAYER_PROFILE.role['pt-BR'], en: PLAYER_PROFILE.role.en },
    { key: 'profile.motto', pt: PLAYER_PROFILE.motto['pt-BR'], en: PLAYER_PROFILE.motto.en },
    { key: 'hero.eyebrow', pt: UI_PT_BR.hero.eyebrow, en: UI_EN.hero.eyebrow },
    { key: 'cta.explore', pt: UI_PT_BR.cta.explore, en: UI_EN.cta.explore },
    { key: 'cta.resume', pt: UI_PT_BR.cta.resume, en: UI_EN.cta.resume },
    { key: 'inventory.subtitle', pt: UI_PT_BR.inventory.subtitle, en: UI_EN.inventory.subtitle },
    {
      key: 'sections.playerStatus',
      pt: UI_PT_BR.sections.playerStatus,
      en: UI_EN.sections.playerStatus,
    },
    { key: 'status.active', pt: UI_PT_BR.status.active, en: UI_EN.status.active },
  ];
}
