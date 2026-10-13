import { Art, ASSET_BASE, FINAL_LAYERS, LAYERS, LayerId } from './assets';

/**
 * Troca, no `Art` de placeholders, as camadas com arte final integrada (docs/22 §12). Cada arquivo
 * que não carregar continua placeholder: a tela nunca fica sem cenário.
 */
export async function withFinalLayers(doc: Document, art: Art): Promise<Art> {
  const files = new Map<LayerId, string>(LAYERS.map((layer) => [layer.id, layer.file]));
  const loaded = await Promise.all(
    FINAL_LAYERS.map(async (id) => {
      const image = doc.createElement('img');
      image.src = ASSET_BASE + files.get(id);
      try {
        await image.decode();
        return [id, image] as const;
      } catch {
        return null;
      }
    }),
  );
  const layers = { ...art.layers };
  for (const entry of loaded) if (entry) layers[entry[0]] = entry[1];
  return { ...art, layers };
}
