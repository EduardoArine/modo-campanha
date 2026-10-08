import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { McAction } from './action/action';
import { McChip } from './chip/chip';
import { McIcon } from './icon/icon';
import { McSectionHeader } from './section-header/section-header';
import { McStatus } from './status/status';

@Component({
  imports: [McAction, McChip, McIcon, McSectionHeader, McStatus],
  template: `
    <mc-icon id="decorative" name="external" />
    <mc-icon id="informative" name="github" [size]="24" label="GitHub" />

    <a id="link" mcAction="text" href="/x">GitHub <mc-icon name="external" /></a>
    <button id="primary" mcAction>Explorar</button>
    <button id="submit" mcAction="secondary" type="submit">Enviar</button>

    <mc-chip id="chip" tone="cool">Produto</mc-chip>

    <mc-section-header id="full" heading="PLAYER STATUS" headingId="ps" code="MC-01">
      <mc-status state="active">ACTIVE</mc-status>
    </mc-section-header>
    <mc-section-header id="minimal" heading="SKILL TREE" [level]="3" divider="false" />
  `,
})
class Host {}

describe('MC UI primitives', () => {
  function render(): HTMLElement {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('hides decorative icons and names informative ones', () => {
    const el = render();
    const decorative = el.querySelector('#decorative')!;
    const informative = el.querySelector('#informative')!;

    expect(decorative.getAttribute('aria-hidden')).toBe('true');
    expect(decorative.getAttribute('role')).toBeNull();
    expect(informative.getAttribute('role')).toBe('img');
    expect(informative.getAttribute('aria-label')).toBe('GitHub');
    expect(informative.querySelector('svg')?.getAttribute('width')).toBe('24');
  });

  it('keeps native semantics for actions', () => {
    const el = render();
    const link = el.querySelector('#link')!;

    expect(link.tagName).toBe('A');
    expect(link.classList).toContain('mc-action--text');
    expect(el.querySelector('#primary')!.classList).toContain('mc-action--primary');
    expect(el.querySelector<HTMLButtonElement>('#primary')!.type).toBe('button');
    expect(el.querySelector<HTMLButtonElement>('#submit')!.type).toBe('submit');
  });

  it('renders informative chips without interactive semantics', () => {
    const chip = render().querySelector('#chip')!;

    expect(chip.classList).toContain('mc-chip--cool');
    expect(chip.getAttribute('role')).toBeNull();
    expect(chip.getAttribute('tabindex')).toBeNull();
  });

  it('renders status with visible text and a hidden indicator', () => {
    const status = render().querySelector('mc-status')!;

    expect(status.textContent?.trim()).toBe('ACTIVE');
    expect(status.querySelector('.indicator')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders only the section header parts that were provided', () => {
    const el = render();
    const full = el.querySelector('#full')!;
    const minimal = el.querySelector('#minimal')!;

    expect(full.querySelector('h2#ps')?.textContent).toBe('PLAYER STATUS');
    expect(full.querySelector('.code')?.textContent).toBe('MC-01');
    expect(full.querySelector('.rule')).not.toBeNull();
    expect(full.querySelector('mc-status')).not.toBeNull();

    expect(minimal.querySelector('h3')?.textContent).toBe('SKILL TREE');
    expect(minimal.querySelector('.code')).toBeNull();
    expect(minimal.querySelector('.rule')).toBeNull();
    expect(minimal.querySelector('.subtitle')).toBeNull();
  });
});
