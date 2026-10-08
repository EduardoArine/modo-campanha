import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { McStatus } from '../ui';
import { McCart } from './cart/cart';
import { McCrtFrame } from './crt-frame/crt-frame';
import { McCrtProjectViewer } from './crt-project-viewer/crt-project-viewer';
import { McPlayerCard } from './player-card/player-card';
import { McProjectSummary } from './project-summary/project-summary';

@Component({
  imports: [McCart, McCrtFrame, McCrtProjectViewer, McPlayerCard, McProjectSummary, McStatus],
  template: `
    <mc-player-card
      id="placeholder"
      name="Eduardo Arine"
      [fields]="[{ label: 'CLASS', value: 'Desenvolvedor de Produtos Digitais' }]"
      statusLabel="STATUS"
    >
      <mc-status state="active">ACTIVE</mc-status>
    </mc-player-card>
    <mc-player-card id="photo" name="Eduardo Arine" [photo]="{ src: 'x.jpg', alt: 'Foto real' }" />

    <mc-cart serial="ON-001" title="Projeto" type="PLATAFORMA" shell="light" />

    <mc-project-summary
      title="Projeto"
      description="Descrição"
      [chips]="[
        { label: 'A', tone: 'warm' },
        { label: 'B', tone: 'cool' },
        { label: 'C', tone: 'warm' },
      ]"
    />

    <mc-crt-frame id="frame"><p class="scene">Qualquer conteúdo</p></mc-crt-frame>
    <mc-crt-project-viewer id="empty" />
    <mc-crt-project-viewer id="content" state="content"
      ><p class="demo">Conteúdo</p></mc-crt-project-viewer
    >
  `,
})
class Host {}

describe('MC signature components', () => {
  function render(): HTMLElement {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders the player card as a labelled article with a definition list', () => {
    const card = render().querySelector('#placeholder')!;
    const article = card.querySelector('article')!;
    const nameId = article.getAttribute('aria-labelledby')!;

    expect(card.querySelector(`#${nameId}`)?.textContent).toBe('Eduardo Arine');
    expect(card.querySelectorAll('dl dt').length).toBe(2);
    expect(card.querySelector('dd mc-status')?.textContent?.trim()).toBe('ACTIVE');
    expect(card.querySelector('.placeholder')?.textContent).toBe('FOTO DO EDUARDO');
    expect(card.querySelector('img')).toBeNull();
    expect(card.querySelectorAll('.bracket[aria-hidden="true"]').length).toBe(4);
  });

  it('uses the real photo with its alt text when provided', () => {
    const img = render().querySelector<HTMLImageElement>('#photo img')!;

    expect(img.getAttribute('alt')).toBe('Foto real');
    expect(render().querySelector('#photo .placeholder')).toBeNull();
  });

  it('exposes the cart as one non-interactive image with an accessible name', () => {
    const cart = render().querySelector('mc-cart')!;

    expect(cart.getAttribute('role')).toBe('img');
    expect(cart.getAttribute('aria-label')).toBe('MC-CART ON-001: Projeto, PLATAFORMA');
    expect(cart.classList).toContain('mc-cart--light');
    expect(cart.getAttribute('tabindex')).toBeNull();
    expect(cart.querySelector('.art-placeholder')?.textContent).toBe('PROJECT ARTWORK');
  });

  it('shows at most two chips in the project summary', () => {
    const summary = render().querySelector('mc-project-summary')!;

    expect(summary.querySelector('h3')?.textContent).toBe('Projeto');
    expect(summary.querySelectorAll('mc-chip').length).toBe(2);
  });

  it('renders the CRT as a labelled region with decorative effects hidden', () => {
    const el = render();
    const empty = el.querySelector('#empty')!;
    const content = el.querySelector('#content')!;

    expect(empty.getAttribute('role')).toBe('region');
    expect(empty.getAttribute('aria-label')).toBe('Visualizador de projetos');
    expect(empty.querySelector('.empty')?.textContent).toBe('INSERT CARTRIDGE');
    expect(empty.querySelector('.fx')?.getAttribute('aria-hidden')).toBe('true');
    expect(content.querySelector('.demo')?.textContent).toBe('Conteúdo');
    expect(content.querySelector('.empty')).toBeNull();
  });

  it('keeps the CRT frame presentational: no role, no texts of its own, projected content', () => {
    const frame = render().querySelector('#frame')!;

    expect(frame.getAttribute('role')).toBeNull();
    expect(frame.getAttribute('aria-label')).toBeNull();
    expect(frame.querySelector('.viewport .scene')?.textContent).toBe('Qualquer conteúdo');
    expect(frame.querySelector('.id')).toBeNull();
    expect(frame.textContent?.trim()).toBe('Qualquer conteúdo');
  });

  it('builds the project viewer on top of the frame', () => {
    const viewer = render().querySelector('#empty')!;

    expect(viewer.querySelector('mc-crt-frame .id')?.textContent).toBe('MC-01');
  });
});
