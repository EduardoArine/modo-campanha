import { Art, ASSET_BASE, FINAL_LAYERS, FINAL_SHEETS, LAYERS, SHEETS } from './assets';

/**
 * Troca, no `Art` de placeholders, as camadas e folhas com arte final integrada (docs/22 §12–§13).
 * Cada arquivo que não carregar continua placeholder: a tela nunca fica sem cenário nem personagem.
 */
export async function withFinalArt(doc: Document, art: Art): Promise<Art> {
  const load = async (file: string): Promise<HTMLImageElement | null> => {
    const image = doc.createElement('img');
    image.src = ASSET_BASE + file;
    try {
      await image.decode();
      return image;
    } catch {
      return null;
    }
  };
  const files = new Map(LAYERS.map((layer) => [layer.id, layer.file]));
  const [layerImages, sheetImages] = await Promise.all([
    Promise.all(FINAL_LAYERS.map((id) => load(files.get(id)!))),
    Promise.all(FINAL_SHEETS.map((name) => load(SHEETS[name].file))),
  ]);
  const layers = { ...art.layers };
  FINAL_LAYERS.forEach((id, i) => (layers[id] = layerImages[i] ?? layers[id]));
  const sheets = { ...art.sheets };
  FINAL_SHEETS.forEach((name, i) => (sheets[name] = sheetImages[i] ?? sheets[name]));
  return { layers, sheets };
}
