# Work in France - Back office public

> Back office public de la plateforme de demande d'autorisations provisoires de travail.

Ce dépôt de code contient le back office public de Work in France.

## Installation de l'environnement de développement

Projet Node.js avec `Node v9.11.1` et `npm 5.8.0`.

```shell
$ npm install
```

## Lancement du serveur de développement

### 1) Avec Docker

Pour construire l'image Docker :

```shell
$ docker build -t wif-bo-public .
```

Puis :

```shell
$ docker run -p 1337:1337 -v ~/Desktop/validity_check.json:/app/src/server/apt/validity_check.json wif-bo-public
$ docker run --restart=always -d -p 1337:1337 -v ~/Desktop/validity_check.json:/app/src/server/apt/validity_check.json wif-bo-public
```

### 2) Ou en local

```shell
$ npm run start
```

## Lancement des tests unitaires

```shell
$ npm test
```
