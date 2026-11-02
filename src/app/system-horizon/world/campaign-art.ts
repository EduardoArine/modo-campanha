import { JUNGLE_BG, JUNGLE_SHEET } from '../minigames/jungle-run';
import { MinigameArt } from '../minigames/minigame';
import { CampaignArt, MARKERS } from '../scenes/campaign';
import { ASSET_BASE } from './assets';
import { withFinalArt } from './art-loader';
import { Palette } from './palette';
import { createPlaceholderArt } from './placeholder-art';

/**
 * Arte do jogo (D-103): a mesma do teaser (cenário, personagem, pickups, MC-CART) + a folha de
 * marcadores e a arte dos minijogos (D-104). Só o jogo pede estes arquivos; a Home nunca os baixa.
 * Se um deles não carregar, a cena desenha formas mínimas no lugar (nada some).
 */
export async function loadCampaignArt(
  doc: Document,
  palette: Palette,
): Promise<CampaignArt & MinigameArt> {
  const load = (file: string): Promise<HTMLImageElement | null> => {
    const image = doc.createElement('img');
    image.src = ASSET_BASE + file;
    return image.decode().then(
      () => image,
      () => null,
    );
  };
  const [art, markers, jungle, jungleBg] = await Promise.all([
    withFinalArt(doc, createPlaceholderArt(doc, palette)),
    load(MARKERS.file),
    load(JUNGLE_SHEET.file),
    load(JUNGLE_BG),
  ]);
  return { ...art, markers, jungle, jungleBg };
}
