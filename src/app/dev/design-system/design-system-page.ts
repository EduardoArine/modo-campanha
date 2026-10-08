import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LocaleService } from '../../core/i18n';
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

// Ferramenta interna (dev only). Textos da própria página não passam pelo dicionário;
// os textos dos componentes de exemplo, sim (para revisar pt-BR e en).
@Component({
  selector: 'app-design-system-page',
  imports: [RouterLink, McAction, McChip, McIcon, McSectionHeader, McStatus],
  templateUrl: './design-system-page.html',
  styleUrl: './design-system-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignSystemPage {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;

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

  protected readonly iconNames = Object.keys(MC_ICONS) as McIconName[];
  protected readonly iconSizes: McIconSize[] = [16, 20, 24];
  protected readonly previewStates = ['default', 'hover', 'active', 'focus'] as const;

  protected readonly dictionaryRows = [
    { key: 'hero.role', pt: UI_PT_BR.hero.role, en: UI_EN.hero.role },
    { key: 'hero.motto', pt: UI_PT_BR.hero.motto, en: UI_EN.hero.motto },
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
