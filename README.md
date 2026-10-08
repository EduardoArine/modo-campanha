# Modo Campanha

Uma carreira apresentada como uma campanha de videogame: desenvolvimento, IA, produtos digitais e gamificação.

> **XP real, sem personagem.**

## Sobre

Portfólio profissional gamificado de **Eduardo Arine**, Desenvolvedor de Produtos Digitais com mais de 10 anos em tecnologia e formação em Tecnologia em Jogos Digitais.

Projetos viram cartuchos, a trajetória vira um log de campanha e as competências formam uma árvore de habilidades. Tudo real, só que na linguagem dos games.

## Conceito

**Retro na linguagem. Moderno na experiência.**

A estética de videogames antigos (pixel art, cartuchos, TV de tubo, HUDs) dá identidade; a experiência segue padrões modernos de produto digital: rápida, legível, responsiva e acessível.

Visão completa em [docs/01-product-vision.md](docs/01-product-vision.md).

## Status

🚧 Em desenvolvimento. Direção visual aprovada (Concept 03 híbrido); design system aprovado; etapa atual: **FASE 3 — Core Experience** (planejamento da Home).

## Stack

- Angular 21 (standalone components, signals)
- TypeScript
- SCSS
- Vitest
- GitHub Pages + GitHub Actions

## Roadmap

[docs/09-roadmap.md](docs/09-roadmap.md)

## Documentação

Toda a visão de produto, experiência, arquitetura e decisões está em [`/docs`](docs/):

1. [Visão do produto](docs/01-product-vision.md)
2. [Conceito de experiência](docs/02-experience-concept.md)
3. [Arquitetura de informação](docs/03-information-architecture.md)
4. [Direção visual](docs/04-visual-direction.md)
5. [Sistema de cartuchos](docs/05-project-cartridge-system.md)
6. [Arquitetura técnica](docs/06-technical-architecture.md)
7. [Modelo de conteúdo](docs/07-content-model.md)
8. [Easter eggs](docs/08-easter-eggs.md)
9. [Roadmap](docs/09-roadmap.md)
10. [Decisões](docs/10-decisions.md)
11. [MC Design System](docs/11-design-system.md)
12. [Home Slice 01 (plano)](docs/12-home-slice-01.md)

## Rodando localmente

Pré-requisitos: Node.js 22.12+ e npm.

```bash
git clone https://github.com/EduardoArine/modo-campanha.git
cd modo-campanha
npm install
npm start
```

Acesse `http://localhost:4200`.

Outros comandos:

```bash
npm run build             # build de produção
npm test -- --watch=false # testes
```

## Deploy

Publicação via **GitHub Pages** com GitHub Actions ([workflow](.github/workflows/deploy-pages.yml)), em `https://eduardoarine.github.io/modo-campanha/`.

O deploy é **manual** enquanto o site está em construção:

1. Settings → Pages → Source: **GitHub Actions** (uma única vez).
2. Actions → **Deploy to GitHub Pages** → **Run workflow**.

Detalhes e adaptação para domínio próprio em [docs/06-technical-architecture.md](docs/06-technical-architecture.md#github-pages).

---

Built with Angular. No coins required.
