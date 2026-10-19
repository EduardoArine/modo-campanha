import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { McCart } from './cart/cart';
import { McCrtFrame } from './crt-frame/crt-frame';
import { McCrtProjectViewer } from './crt-project-viewer/crt-project-viewer';
import { McPlayerCard } from './player-card/player-card';
import { McProjectSummary } from './project-summary/project-summary';

@Component({
  imports: [McCart, McCrtFrame, McCrtProjectViewer, McPlayerCard, McProjectSummary],
  template: `
    <mc-player-card id="placeholder" name="Eduardo Arine" [badge]="{ label: 'XP', value: '10+' }" />
    <mc-player-card id="photo" name="Eduardo Arine" [photo]="{ src: 'x.jpg', alt: 'Foto real' }" />

    <mc-cart serial="ON-001" title="Projeto" type="PLATAFORMA" shell="light" />
    <mc-cart
      id="render"
      serial="MC-001"
      title="Projeto"
      type="PORTFÓLIO"
      [render]="{ src: 'front.webp', width: 960, height: 690 }"
    />

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

  it('renders the player card as a labelled article; badge and bar are decorative (D-082)', () => {
    const card = render().querySelector('#placeholder')!;
    const article = card.querySelector('article')!;
    const nameId = article.getAttribute('aria-labelledby')!;

    expect(card.querySelector(`#${nameId}`)?.textContent).toBe('Eduardo Arine');
    expect(card.querySelector('.player')?.textContent).toBe('JOGADOR 01');
    expect(card.querySelector('.placeholder')?.textContent).toBe('FOTO DO EDUARDO');
    expect(card.querySelector('img')).toBeNull();
    expect(card.querySelector('.badge')?.getAttribute('aria-hidden')).toBe('true');
    expect(Array.from(card.querySelectorAll('.badge > span'), (s) => s.textContent)).toEqual([
      'XP',
      '10+',
    ]);
    expect(card.querySelector('.bar')?.getAttribute('aria-hidden')).toBe('true');
    expect(card.querySelector('.capsule')?.getAttribute('aria-hidden')).toBe('true');
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
    expect(cart.querySelector('.art-placeholder')?.textContent).toBe('ARTE DO PROJETO');
  });

  it('uses the CSS construction as fallback and the official render as the object (D-065)', () => {
    const el = render();
    const fallback = el.querySelector('mc-cart:not(#render)')!;
    const rendered = el.querySelector('mc-cart#render')!;

    expect(fallback.querySelector('.cart .shell')).not.toBeNull();
    expect(fallback.classList).not.toContain('mc-cart--render');
    expect(rendered.classList).toContain('mc-cart--render');
    expect(rendered.getAttribute('role')).toBe('img');
    expect(rendered.getAttribute('aria-label')).toBe('MC-CART MC-001: Projeto, PORTFÓLIO');
    expect(rendered.querySelector('.cart')).toBeNull();
    expect(rendered.querySelector('img.render')?.getAttribute('alt')).toBe('');
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
    expect(empty.querySelector('.empty')?.textContent).toBe('INSIRA UM CARTUCHO');
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
