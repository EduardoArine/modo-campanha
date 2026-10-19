import {
  cartridgeSelection,
  initialInventoryState,
  InventoryEvent,
  InventoryState,
  inventoryView,
  nextInventoryState,
} from './inventory.machine';

const run = (events: InventoryEvent[], from: InventoryState = initialInventoryState('mc-001')) =>
  events.reduce(nextInventoryState, from);

describe('inventory machine (D-077)', () => {
  it('goes empty → inserting → loading → ready(art), never auto-playing the teaser', () => {
    const states = [initialInventoryState('mc-001')];
    for (const e of [
      { type: 'insert', reduced: false },
      { type: 'seated' },
      { type: 'loaded' },
    ] as const) {
      states.push(nextInventoryState(states.at(-1)!, e));
    }
    expect(states.map((s) => s.kind)).toEqual(['empty', 'inserting', 'loading', 'ready']);
    expect(states.at(-1)).toEqual({ kind: 'ready', cartridge: 'mc-001', screen: 'art' });
  });

  it('plays the teaser only on request, and keeps a failure as its own READY screen', () => {
    const ready = run([{ type: 'insert', reduced: true }]);
    expect(run([{ type: 'play' }], ready)).toMatchObject({ screen: 'teaser' });
    expect(run([{ type: 'play' }, { type: 'teaser-failed' }], ready)).toMatchObject({
      kind: 'ready',
      screen: 'teaser-unavailable',
    });
  });

  it('ejects with the reverse motion and returns to empty, announcing it', () => {
    const ready = run([{ type: 'insert', reduced: true }]);
    const ejecting = run([{ type: 'eject', reduced: false }], ready);
    expect(ejecting.kind).toBe('ejecting');
    const empty = run([{ type: 'ejected' }], ejecting);
    expect(empty).toEqual({ kind: 'empty', cartridge: 'mc-001', ejected: true });
    expect(inventoryView(empty).announce).toBe('ejected');
  });

  it('skips the motion with reduced motion', () => {
    expect(run([{ type: 'insert', reduced: true }]).kind).toBe('ready');
    const ready = run([{ type: 'insert', reduced: true }]);
    expect(run([{ type: 'eject', reduced: true }], ready).kind).toBe('empty');
  });

  it('ignores events out of order (double insert, eject while inserting)', () => {
    const inserting = run([{ type: 'insert', reduced: false }]);
    expect(run([{ type: 'insert', reduced: false }], inserting)).toBe(inserting);
    expect(run([{ type: 'eject', reduced: false }], inserting)).toBe(inserting);
    expect(run([{ type: 'loaded' }], inserting)).toBe(inserting);
  });

  it('selects in empty without inserting (the TV stays off)', () => {
    const state = run([{ type: 'select', cartridge: 'mc-002', reduced: false }]);
    expect(state).toEqual({ kind: 'empty', cartridge: 'mc-002' });
    expect(inventoryView(state).screen).toBe('standby');
  });

  it('swaps with one selection: eject the seated one, then insert the chosen one (D-087)', () => {
    const ready = run([{ type: 'insert', reduced: true }]);
    const swapping = run([{ type: 'select', cartridge: 'mc-002', reduced: false }], ready);
    expect(swapping).toEqual({
      kind: 'ejecting',
      cartridge: 'mc-001',
      next: 'mc-002',
      then: 'insert',
    });
    // Durante a ejeção a tela já desliga e o case sai: nada do projeto anterior fica na tela.
    expect(inventoryView(swapping)).toMatchObject({ screen: 'standby', case: false });
    const states = [swapping];
    for (const e of [{ type: 'ejected' }, { type: 'seated' }, { type: 'loaded' }] as const) {
      states.push(nextInventoryState(states.at(-1)!, e));
    }
    expect(states.map((x) => x.kind)).toEqual(['ejecting', 'inserting', 'loading', 'ready']);
    expect(states.at(-1)).toEqual({ kind: 'ready', cartridge: 'mc-002', screen: 'art' });
  });

  it('swaps straight to the new READY with reduced motion', () => {
    const ready = run([{ type: 'insert', reduced: true }]);
    expect(run([{ type: 'select', cartridge: 'mc-006', reduced: true }], ready)).toEqual({
      kind: 'ready',
      cartridge: 'mc-006',
      screen: 'art',
    });
  });

  it('swaps from the teaser too, and ignores selecting the seated cartridge', () => {
    const teaser = run([{ type: 'insert', reduced: true }, { type: 'play' }]);
    expect(run([{ type: 'select', cartridge: 'mc-001', reduced: false }], teaser)).toBe(teaser);
    expect(run([{ type: 'select', cartridge: 'mc-003', reduced: false }], teaser)).toMatchObject({
      kind: 'ejecting',
      next: 'mc-003',
    });
  });

  it('ignores new selections while inserting, loading or ejecting (no double animation)', () => {
    const inserting = run([{ type: 'insert', reduced: false }]);
    const loading = run([{ type: 'seated' }], inserting);
    const ejecting = run(
      [{ type: 'loaded' }, { type: 'select', cartridge: 'mc-002', reduced: false }],
      loading,
    );
    for (const state of [inserting, loading, ejecting]) {
      expect(run([{ type: 'select', cartridge: 'mc-005', reduced: false }], state)).toBe(state);
      expect(inventoryView(state).selectable).toBe(false);
    }
    // A troca em curso segue para o cartucho escolhido primeiro.
    expect(run([{ type: 'ejected' }], ejecting)).toEqual({
      kind: 'inserting',
      cartridge: 'mc-002',
    });
  });

  it('tells the selected cartridge apart from the one physically inserted', () => {
    expect(cartridgeSelection(initialInventoryState('mc-001'))).toEqual({
      selected: 'mc-001',
      inserted: null,
    });
    const ready = run([{ type: 'insert', reduced: true }]);
    expect(cartridgeSelection(ready)).toEqual({ selected: 'mc-001', inserted: 'mc-001' });
    const swapping = run([{ type: 'select', cartridge: 'mc-004', reduced: false }], ready);
    expect(cartridgeSelection(swapping)).toEqual({ selected: 'mc-004', inserted: 'mc-001' });
  });

  it('manual eject keeps the last cartridge selected, slot empty and the TV in standby', () => {
    const ready = run([{ type: 'insert', reduced: true }]);
    const empty = run([{ type: 'eject', reduced: true }], ready);
    expect(empty).toEqual({ kind: 'empty', cartridge: 'mc-001', ejected: true });
    expect(inventoryView(empty)).toMatchObject({
      slot: 'empty',
      screen: 'standby',
      insert: 'enabled',
    });
  });

  it('falls back to "unavailable" from any state when an asset fails, keeping the case', () => {
    const view = inventoryView(
      run([{ type: 'insert', reduced: false }, { type: 'assets-failed' }]),
    );
    expect(view).toMatchObject({
      slot: 'unavailable',
      slotLed: 'fault',
      case: true,
      insert: 'hidden',
    });
  });

  it('derives one coherent view per state (no "inserted" text with an empty slot, and so on)', () => {
    const views = [
      run([]),
      run([{ type: 'insert', reduced: false }]),
      run([{ type: 'insert', reduced: false }, { type: 'seated' }]),
      run([{ type: 'insert', reduced: true }]),
      run([
        { type: 'insert', reduced: true },
        { type: 'eject', reduced: false },
      ]),
    ].map(inventoryView);
    expect(views.map((v) => [v.slot, v.pose, v.insert, v.controls, v.screen])).toEqual([
      ['empty', 'out', 'enabled', false, 'standby'],
      ['loading', 'seated', 'busy', false, 'standby'],
      ['loading', 'seated', 'busy', false, 'loading'],
      ['inserted', 'seated', 'hidden', true, 'art'],
      ['ejecting', 'out', 'busy', false, 'standby'],
    ]);
    // O case entra com a ação de inserir (sem deslocar a página depois) e sai ao ejetar.
    expect(views.map((v) => v.case)).toEqual([false, true, true, true, false]);
  });
});

describe('inventory machine — indicators', () => {
  it('keeps the slot LED on when only the teaser fails (the cartridge is still seated)', () => {
    const view = inventoryView(
      run([{ type: 'insert', reduced: true }, { type: 'play' }, { type: 'teaser-failed' }]),
    );
    expect([view.slot, view.slotLed, view.screenLed]).toEqual(['inserted', 'on', 'fault']);
  });
});

describe('inventory machine — READY art failure', () => {
  it('shows the title when the art fails and still allows the teaser', () => {
    const failed = run([{ type: 'insert', reduced: true }, { type: 'art-failed' }]);
    expect(failed).toMatchObject({ kind: 'ready', screen: 'art-unavailable' });
    expect(inventoryView(failed).slot).toBe('inserted');
    expect(run([{ type: 'play' }], failed)).toMatchObject({ screen: 'teaser' });
  });
});
