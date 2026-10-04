# TP Pokédex

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19.2">
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5.9">
  <img src="https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 7.2">
  <img src="https://img.shields.io/badge/API-PokéBuild-EF5350?style=for-the-badge" alt="PokéBuild API">
</p>

Pokédex développé avec React et TypeScript. L'application principale se trouve dans le dossier `tp-pokedex/`.

## Fonctionnalités vérifiées

- chargement des 100 premiers Pokémon depuis PokéBuild API ;
- liste cliquable des Pokémon ;
- affichage du numéro, du nom, de l'image et des types ;
- recherche d'un Pokémon par nom ;
- chargement des évolutions du Pokémon sélectionné ;
- navigation vers une évolution lorsqu'elle existe ;
- gestion basique des erreurs API dans la console.

## Structure utile

```text
tp-pokedex/
├── README.md
├── package.json
├── node_modules/
└── tp-pokedex/
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    └── src/
        ├── main.tsx
        └── components/
            ├── App.tsx
            ├── Pokemon.tsx
            ├── PokemonDTO.tsx
            ├── PokemonDetail.tsx
            ├── PokemonEvolution.tsx
            ├── PokemonList.tsx
            └── SearchBar.tsx
```

## Installation

Prérequis : Node.js et npm.

```bash
git clone https://github.com/loic31000/tp-pokedex.git
cd tp-pokedex/tp-pokedex
npm install
npm run dev
```

Vite affiche ensuite l'adresse locale du serveur de développement.

## Commandes

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Source des données

L'application interroge `https://pokebuildapi.fr/api/v1/` pour la liste, la recherche et les détails. Les illustrations d'évolution utilisent aussi les sprites officiels exposés sur le dépôt public PokeAPI.

## État du dépôt

Un dossier `node_modules/` est actuellement versionné à la racine du dépôt. Le `.gitignore` de l'application située dans `tp-pokedex/` exclut bien `node_modules`, mais ce nettoyage n'est pas appliqué à la racine dans l'état actuel.

Le dépôt ne contient pas de tests automatisés ni de fichier de licence.
