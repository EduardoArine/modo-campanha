import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core';

export type McActionVariant = 'primary' | 'secondary' | 'text';

/**
 * Estilo de ação do MC Design System aplicado ao elemento nativo, preservando a semântica:
 * navegação → `<a mcAction>`; ação → `<button mcAction>`.
 * Variantes: `primary` (CTA, no máximo um por região visual), `secondary` (contorno),
 * `text` (baixa ênfase, sublinhado discreto).
 */
@Component({
  selector: 'a[mcAction], button[mcAction]',
  template: '<ng-content />',
  styleUrl: './action.scss',
  host: {
    class: 'mc-action',
    '[class.mc-action--primary]': 'variant() === "primary"',
    '[class.mc-action--secondary]': 'variant() === "secondary"',
    '[class.mc-action--text]': 'variant() === "text"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class McAction {
  readonly variant = input<McActionVariant, McActionVariant | ''>('primary', {
    alias: 'mcAction',
    transform: (value) => value || 'primary',
  });

  constructor() {
    // <button> sem type vira "submit" dentro de formulários; ações do sistema são "button".
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    if (element instanceof HTMLButtonElement && !element.hasAttribute('type')) {
      element.type = 'button';
    }
  }
}
