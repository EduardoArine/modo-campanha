import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { Project } from '../../models';
import { McAction, McIcon, McStatus } from '../../shared/ui';

/**
 * Capa do projeto dentro do CRT (H3, D-093): a arte oficial do cartucho ao fundo e, por cima, em
 * HTML real, o código, o nome, o tipo, a descrição curta, as tecnologias e EXPLORAR PROJETO. O
 * MC-001 também oferece o teaser (sem prometer a campanha jogável, que segue em desenvolvimento).
 * Os dados são os do case de cada projeto; nada de capa genérica.
 */
@Component({
  selector: 'app-crt-cover',
  imports: [McAction, McIcon, McStatus],
  templateUrl: './crt-cover.html',
  styleUrl: './crt-cover.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrtCover {
  readonly project = input.required<Project>();
  /** Sem a arte (falhou ao carregar): a capa segue só com o texto. */
  readonly showArt = input(true);
  /** O teaser pode ser reproduzido (MC-001, sem falha anterior). */
  readonly teaser = input(false);
  /** O teaser não carregou: aviso na própria capa. */
  readonly teaserFailed = input(false);
  readonly explore = output<void>();
  readonly playTeaser = output<void>();
  readonly artFailed = output<void>();

  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;

  /** Nome em duas cores (como na prancha): a última palavra em laranja; uma palavra só, em creme. */
  protected readonly title = computed(() => {
    const words = this.locale.pick(this.project().title).trim().split(/\s+/);
    return words.length > 1
      ? { head: words.slice(0, -1).join(' '), tail: words[words.length - 1] }
      : { head: words[0], tail: '' };
  });

  /** "Teaser disponível · Campanha jogável em desenvolvimento" (o que o cartucho oferece hoje). */
  protected readonly experiences = computed(() => {
    const status = this.ui().inventory.experience;
    return this.project()
      .experiences.map(
        (e) =>
          `${this.locale.pick(e.label)} ${e.status === 'available' ? status.available : status.inDevelopment}`,
      )
      .join(' · ');
  });
}
