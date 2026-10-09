# 08 — Easter Eggs

Easter eggs **fazem parte oficialmente** da experiência do Modo Campanha. Eles recompensam quem explora, reforçam a identidade de jogo e não custam nada para quem não os encontra.

> Status: **documentados, não implementados.** Qualquer efeito precisa de aprovação de Eduardo antes da implementação (FASE 6).

## Regras para qualquer easter egg

1. **Nunca prejudicar a navegação.** Nenhum conteúdo essencial pode depender de um easter egg.
2. **Sutil.** Descoberto por curiosidade, não anunciado em destaque.
3. **Reversível / inofensivo.** Se mudar algo (ex.: tema), deve ser fácil voltar e não persistir de forma confusa.
4. **Acessível.** Não pode quebrar leitores de tela, foco ou teclado; respeita `prefers-reduced-motion`.
5. **Não interceptar atalhos do navegador** nem capturar teclas enquanto o usuário digita em campos de texto.
6. **Leve.** Código carregado sob demanda quando possível; zero impacto perceptível na performance.
7. **Profissional.** Divertido, nunca constrangedor ou fora do tom do portfólio.
8. **Registrado.** Cada easter egg aprovado ganha entrada em `docs/10-decisions.md`.

## Easter Egg 1 — Secret Area

Em algum ponto da página existirá, discretamente:

```
???
```

Ao descobrir (clique/foco/ativação):

```
SECRET AREA FOUND
+100 XP
Obrigado por explorar além do caminho principal.
```

Em aberto:

- [ ] localização definitiva do `???` (decisão futura, depois do layout da FASE 3);
- [ ] o que a Secret Area contém (mensagem apenas? conteúdo bônus? conquista secreta?);
- [ ] se o "+100 XP" tem algum efeito visível em outro lugar (ex.: contador de XP do visitante).

## Easter Egg 2 — Konami Code

Suporte ao código clássico:

```
↑ ↑ ↓ ↓ ← → ← → B A
```

Detalhes técnicos previstos:

- listener de teclado em `core/` (serviço), ativo apenas fora de inputs;
- comparação por `KeyboardEvent.key` (`ArrowUp`, `ArrowUp`, `ArrowDown`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `ArrowLeft`, `ArrowRight`, `b`, `a`), sem diferenciar maiúsculas;
- sequência reiniciada em caso de erro;
- alternativa para mobile a avaliar (ex.: gesto ou toques em um elemento específico), opcional.

**Efeito: NÃO DEFINIDO.** Decisão futura (ver `docs/09-roadmap.md`, FASE 6).

Backlog de ideias (nenhuma aprovada):

- desbloquear a Secret Area;
- mudar temporariamente o tema;
- liberar uma conquista secreta (o campo `secret` saiu do modelo `Achievement` no Slice 04, D-051; volta quando a FASE 6 for implementada);
- mostrar uma tela escondida;
- desbloquear conteúdo bônus.

## Ideias futuras (backlog livre)

Registrar aqui novas ideias antes de qualquer implementação. Exemplo de formato:

| Ideia | Gatilho | Efeito | Status |
| ----- | ------- | ------ | ------ |
| —     | —       | —      | —      |
