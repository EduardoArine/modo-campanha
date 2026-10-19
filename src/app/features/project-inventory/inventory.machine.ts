/**
 * Estado de domínio do Project Inventory (H2, D-077): um único estado decide textos, controles,
 * indicadores e anúncios; a interface só lê `inventoryView(state)`. Sem flags independentes.
 *
 * empty ──insert──▶ inserting ──seated──▶ loading ──loaded──▶ ready(art)
 *   ▲                                                         │  play ▶ ready(teaser)
 *   └──────ejected─── ejecting ◀──────────eject───────────────┘  teaser-failed ▶ ready(teaser-unavailable)
 * Qualquer estado ──assets-failed──▶ unavailable (fallback: case acessível sem o MC-01).
 * Com reduced motion, `insert` vai direto a ready e `eject` direto a empty.
 *
 * Troca (biblioteca MC-CART, D-087): `select` em READY ejeta o atual e, ao terminar, insere o
 * escolhido (ejecting{then: insert} ──ejected──▶ inserting). Uma única escolha faz a troca toda; com
 * reduced motion, vai direto ao READY do novo. Durante inserção, carregamento e ejeção, `select` é
 * ignorado (nada de duas animações, nem case de um projeto com o cartucho de outro).
 */
export type InventoryScreen = 'art' | 'art-unavailable' | 'teaser' | 'teaser-unavailable';

export type InventoryState =
  | { readonly kind: 'empty'; readonly cartridge: string; readonly ejected?: true }
  | { readonly kind: 'inserting'; readonly cartridge: string }
  | { readonly kind: 'loading'; readonly cartridge: string }
  | { readonly kind: 'ready'; readonly cartridge: string; readonly screen: InventoryScreen }
  | {
      readonly kind: 'ejecting';
      readonly cartridge: string;
      readonly next: string;
      /** Troca: ao terminar de ejetar, insere `next` (D-087). */
      readonly then?: 'insert';
    }
  | { readonly kind: 'unavailable'; readonly cartridge: string };

export type InventoryEvent =
  | { readonly type: 'insert'; readonly reduced: boolean }
  | { readonly type: 'seated' }
  | { readonly type: 'loaded' }
  | { readonly type: 'play' }
  | { readonly type: 'teaser-failed' }
  | { readonly type: 'art-failed' }
  | { readonly type: 'eject'; readonly reduced: boolean }
  | { readonly type: 'ejected' }
  | { readonly type: 'select'; readonly cartridge: string; readonly reduced: boolean }
  | { readonly type: 'assets-failed' };

export function initialInventoryState(cartridge: string): InventoryState {
  return { kind: 'empty', cartridge };
}

/** Transição pura. Eventos fora de hora são ignorados (ex.: inserir durante a inserção). */
export function nextInventoryState(state: InventoryState, event: InventoryEvent): InventoryState {
  const { cartridge } = state;
  if (event.type === 'assets-failed') return { kind: 'unavailable', cartridge };
  switch (state.kind) {
    case 'empty':
      if (event.type === 'insert') {
        return event.reduced
          ? { kind: 'ready', cartridge, screen: 'art' }
          : { kind: 'inserting', cartridge };
      }
      if (event.type === 'select') return { kind: 'empty', cartridge: event.cartridge };
      return state;
    case 'inserting':
      return event.type === 'seated' ? { kind: 'loading', cartridge } : state;
    case 'loading':
      return event.type === 'loaded' ? { kind: 'ready', cartridge, screen: 'art' } : state;
    case 'ready':
      // A arte é o padrão; se ela falhar, a tela mostra o nome e o teaser continua possível.
      if (event.type === 'art-failed' && state.screen === 'art')
        return { ...state, screen: 'art-unavailable' };
      if (event.type === 'play' && (state.screen === 'art' || state.screen === 'art-unavailable')) {
        return { ...state, screen: 'teaser' };
      }
      if (event.type === 'teaser-failed') return { ...state, screen: 'teaser-unavailable' };
      if (event.type === 'eject') return eject(state, cartridge, event.reduced);
      // Trocar de cartucho no READY (D-087): ejeta o atual e insere o escolhido em seguida.
      if (event.type === 'select' && event.cartridge !== cartridge) {
        return event.reduced
          ? { kind: 'ready', cartridge: event.cartridge, screen: 'art' }
          : { kind: 'ejecting', cartridge, next: event.cartridge, then: 'insert' };
      }
      return state;
    case 'ejecting':
      if (event.type !== 'ejected') return state;
      return state.then === 'insert'
        ? { kind: 'inserting', cartridge: state.next }
        : { kind: 'empty', cartridge: state.next, ejected: true };
    case 'unavailable':
      if (event.type === 'select') return { kind: 'empty', cartridge: event.cartridge };
      return state;
  }
}

function eject(state: InventoryState, next: string, reduced: boolean): InventoryState {
  return reduced
    ? { kind: 'empty', cartridge: next, ejected: true }
    : { kind: 'ejecting', cartridge: state.cartridge, next };
}

/**
 * Cartucho escolhido na biblioteca × cartucho fisicamente no MC-01 (D-087). Diferem só durante a
 * troca (o atual ainda saindo, o escolhido esperando) e no slot vazio (escolhido, nada inserido).
 */
export function cartridgeSelection(state: InventoryState): {
  selected: string;
  inserted: string | null;
} {
  switch (state.kind) {
    case 'empty':
    case 'unavailable':
      return { selected: state.cartridge, inserted: null };
    case 'ejecting':
      return { selected: state.next, inserted: state.cartridge };
    default:
      return { selected: state.cartridge, inserted: state.cartridge };
  }
}

/** O que a interface mostra em cada estado (chaves; os textos vêm do dicionário). */
export interface InventoryView {
  /** Pose do cartucho no MC-01. */
  pose: 'out' | 'seated';
  /** Movimento em curso (define a duração da transição). */
  motion: 'none' | 'insert' | 'eject';
  slot: 'empty' | 'loading' | 'inserted' | 'ejecting' | 'unavailable';
  /** LED do slot (console) e da tela (CRT): o cartucho pode estar encaixado com a tela em falha. */
  slotLed: 'off' | 'busy' | 'on' | 'fault';
  screenLed: 'off' | 'busy' | 'on' | 'fault';
  screen: 'standby' | 'loading' | InventoryScreen;
  /** Inserir: disponível, bloqueado (em transição, continua focável) ou fora (cartucho dentro). */
  insert: 'enabled' | 'busy' | 'hidden';
  /** Controles do CRT (estado, teaser, ejetar): só com o cartucho encaixado. */
  controls: boolean;
  /** Case do projeto: da inserção ao READY (entra com o clique) e no fallback; sai ao ejetar. */
  case: boolean;
  /** Escolher outro cartucho (com 2 ou mais): fora das transições. */
  selectable: boolean;
  announce: 'loading' | 'ejected' | 'teaser-unavailable' | null;
}

export function inventoryView(state: InventoryState): InventoryView {
  const base = {
    motion: 'none',
    controls: false,
    case: false,
    selectable: false,
    announce: null,
  } as const;
  switch (state.kind) {
    case 'empty':
      return {
        ...base,
        pose: 'out',
        slot: 'empty',
        slotLed: 'off',
        screenLed: 'off',
        screen: 'standby',
        insert: 'enabled',
        selectable: true,
        announce: state.ejected ? 'ejected' : null,
      };
    case 'inserting':
      return {
        ...base,
        pose: 'seated',
        motion: 'insert',
        slot: 'loading',
        slotLed: 'busy',
        screenLed: 'busy',
        screen: 'standby',
        insert: 'busy',
        // O case entra junto com a ação (sem empurrar a página 1 s depois do clique: CLS).
        case: true,
        announce: 'loading',
      };
    case 'loading':
      return {
        ...base,
        pose: 'seated',
        slot: 'loading',
        slotLed: 'busy',
        screenLed: 'busy',
        screen: 'loading',
        insert: 'busy',
        case: true,
        announce: 'loading',
      };
    case 'ready':
      return {
        ...base,
        pose: 'seated',
        slot: 'inserted',
        slotLed: 'on',
        screenLed: state.screen === 'teaser-unavailable' ? 'fault' : 'on',
        screen: state.screen,
        insert: 'hidden',
        controls: true,
        case: true,
        selectable: true,
        announce: state.screen === 'teaser-unavailable' ? 'teaser-unavailable' : null,
      };
    case 'ejecting':
      return {
        ...base,
        pose: 'out',
        motion: 'eject',
        slot: 'ejecting',
        slotLed: 'busy',
        screenLed: 'off',
        screen: 'standby',
        insert: 'busy',
      };
    case 'unavailable':
      return {
        ...base,
        pose: 'out',
        slot: 'unavailable',
        slotLed: 'fault',
        screenLed: 'fault',
        screen: 'standby',
        insert: 'hidden',
        case: true,
        selectable: true,
      };
  }
}
