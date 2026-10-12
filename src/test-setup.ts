// jsdom não implementa canvas (e avisa a cada chamada). Sem contexto 2D, a tela do SYSTEM HORIZON
// simplesmente não desenha (D-068), que é o comportamento esperado nos testes.
HTMLCanvasElement.prototype.getContext = (() =>
  null) as typeof HTMLCanvasElement.prototype.getContext;
