import { CampaignArt, MARKERS } from '../scenes/campaign';
import { ASSET_BASE } from './assets';
import { withFinalArt } from './art-loader';
import { Palette } from './palette';
import { createPlaceholderArt } from './placeholder-art';

/**
 * Arte do jogo (D-103): a mesma do teaser (cenário, personagem, pickups, MC-CART) + a folha de
 * marcadores. Só o jogo pede `sh-markers.png`; a Home nunca baixa este arquivo. Se ele não carregar,
 * a cena desenha formas mínimas no lugar (a parada nunca some).
 */
export async function loadCampaignArt(doc: Document, palette: Palette): Promise<CampaignArt> {
  const markers = doc.createElement('img');
  markers.src = ASSET_BASE + MARKERS.file;
  const [art, ok] = await Promise.all([
    withFinalArt(doc, createPlaceholderArt(doc, palette)),
    markers.decode().then(
      () => true,
      () => false,
    ),
  ]);
  return { ...art, markers: ok ? markers : null };
}
