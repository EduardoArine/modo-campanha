import {
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

  it('switches cartridges: select in empty, or eject first when one is seated', () => {
    expect(run([{ type: 'select', cartridge: 'mc-002', reduced: false }])).toEqual({
      kind: 'empty',
      cartridge: 'mc-002',
    });
    const ready = run([{ type: 'insert', reduced: true }]);
    const switching = run([{ type: 'select', cartridge: 'mc-002', reduced: false }], ready);
    expect(switching).toEqual({ kind: 'ejecting', cartridge: 'mc-001', next: 'mc-002' });
    expect(run([{ type: 'ejected' }], switching)).toMatchObject({
      kind: 'empty',
      cartridge: 'mc-002',
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
