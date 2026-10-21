import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { SKILL_LOADOUT } from '../../data';
import { SkillGroupId } from '../../models';
import { McAction, McIcon } from '../../shared/ui';

/**
 * Arsenal de Habilidades, Concept C (D-092): módulo de Loadout encaixado abaixo do Player Status.
 * Quatro seletores (botões com `aria-pressed`) mostram uma especialidade por vez; "Ver todas"
 * mostra os quatro grupos no mesmo painel e, ao voltar, recupera a última especialidade.
 * Sem graduação de proficiência: só nomes e pictogramas.
 */
@Component({
  selector: 'app-skill-loadout-section',
  imports: [McAction, McIcon],
  templateUrl: './skill-loadout-section.html',
  styleUrls: ['./skill-loadout-section.scss', './skill-loadout-board.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillLoadoutSection {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly groups = SKILL_LOADOUT;

  /** Última especialidade escolhida (CON no início); preservada durante a visão completa. */
  protected readonly active = signal<SkillGroupId>('build');
  protected readonly showAll = signal(false);
  // read: ElementRef, porque o botão também é o componente McAction.
  private readonly allToggle = viewChild.required('allToggle', {
    read: ElementRef<HTMLButtonElement>,
  });

  /** Grupos no painel: o ativo, ou todos na visão completa. */
  protected readonly visible = computed(() =>
    this.showAll() ? this.groups : this.groups.filter((group) => group.id === this.active()),
  );

  protected select(id: SkillGroupId): void {
    this.active.set(id);
    this.showAll.set(false);
  }

  protected toggleAll(): void {
    this.showAll.update((all) => !all);
  }

  /** "Voltar" do fim da visão completa: o botão some, então o foco volta ao do cabeçalho. */
  protected backFromEnd(): void {
    this.showAll.set(false);
    this.allToggle().nativeElement.focus();
  }
}
