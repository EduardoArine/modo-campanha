import { LocaleService } from '../../core/i18n';
import { CampaignLogChapterEntry } from '../../models';

/** Número do marco na sequência, com dois dígitos (01, 02...), derivado da ordem. */
export function milestoneNumber(index: number): string {
  return String(index + 1).padStart(2, '0');
}

/** "MARCO 02 de 05: A escola das locadoras": posição na sequência + título (D-091). */
export function milestoneLabel(
  locale: LocaleService,
  entries: readonly CampaignLogChapterEntry[],
  index: number,
): string {
  const c = locale.ui().campaignLog;
  const title = locale.pick(entries[index].title);
  return `${c.checkpoint} ${milestoneNumber(index)} ${c.diary.of} ${milestoneNumber(entries.length - 1)}: ${title}`;
}
