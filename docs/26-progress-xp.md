# 26 — Progress e XP de campanha (proposta)

> Status: **PROPOSTA, aguardando decisão do Eduardo** (D-102). Nada implementado.

## O problema

O Modo Campanha usa a linguagem de jogo, mas a regra é "XP real, sem personagem": nenhum nível, ponto ou barra inventada sobre o Eduardo (D-017, D-021). Uma pontuação do Eduardo ("XP 12.450") seria justamente o que o site proíbe.

A saída é separar **quem progride**:

- **O visitante progride na exploração** do portfólio, como num jogo: o que ele já viu.
- **O XP do Eduardo é sempre um fato contado**, nunca uma conta inventada: anos, projetos, marcos.

## A. Progresso da campanha (do visitante)

Um registro discreto do que o visitante já explorou, só nesta visita.

| Ação do visitante                             | Conta como                     |
| --------------------------------------------- | ------------------------------ |
| Inserir um cartucho e abrir a capa            | cartucho jogado (x / 7)        |
| Abrir o dossiê de um projeto                  | dossiê lido                    |
| Ler a história completa de um marco do Diário | marco lido (x / 15)            |
| Ver todas as habilidades do Arsenal           | arsenal completo               |
| Chegar ao Contato                             | campanha concluída             |

- **Onde aparece:**
  - um selo pequeno na biblioteca ("3 / 7 jogados") e no seletor de capítulos do Diário ("lido" em cada marco, com forma e texto, não só cor);
  - um resumo no Contato: "Você explorou 5 de 7 cartuchos e 9 de 15 marcos." Sem porcentagem nem barra de nível.
- **Conquistas da visita:** só por exploração real ("Coleção completa": todos os 7 cartuchos; "Diário lido": os 15 marcos). Elas podem destravar os segredos da FASE 6, como uma Secret Area ao completar a coleção, e se ligam ao SYSTEM HORIZON interativo.
- **Privacidade:** guardado só no navegador do visitante (`sessionStorage`), apagado ao fechar. Sem analytics nem servidor.
- **Acessibilidade:** tudo em texto, sem animação obrigatória; nada bloqueia conteúdo.

## B. XP da campanha (do Eduardo, sempre fato)

Os números vêm dos dados que já existem, calculados no build, nunca digitados:

- **desde 2016** em produtos digitais (marco do 4Change);
- **7 cartuchos** (projetos publicados);
- **15 marcos** em 3 capítulos do Diário;
- **18 habilidades** em 4 especialidades.

Isso cabe numa linha de sistema no Contato ("CAMPANHA: 3 CAPÍTULOS · 15 MARCOS · 7 CARTUCHOS"). Quando um projeto ou marco novo entra, o número cresce sozinho. O selo "XP 10+" do Player Status continua o único "XP" com esse nome.

## Recomendação

Implementar **A + B juntos**, nesta ordem:

1. **B**, pequeno e sem risco.
2. **A**, com as conquistas da visita como porta para a FASE 6 e o SYSTEM HORIZON.

Fica fora: pontos, níveis, rankings e qualquer número sobre o Eduardo que não seja contagem de dados reais.
