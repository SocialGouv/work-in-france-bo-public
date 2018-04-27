# Work in France - Back office public

> Back office public de la plateforme de demande d'autorisations provisoires de travail.

Ce dépôt de code contient le back office public de Work in France.

## Installation de l'environnement de développement avec Docker

Pour construire l'image Docker :

```shell
$ docker build -t wif-bo-public .
```

Pour lancer une instance de l'image avec les fichiers `validity_check.json` et `stats.json` montés en volumes :

```shell
$ docker run -p 1337:1337 --name wif_bo_public -v ~/Desktop/validity_check.json:/app/src/server/apt/validity_check.json -v ~/Desktop/stats.json:/app/src/server/public/stats.json wif-bo-public
```

## Lancement de l'instance Docker en production

```shell
$ sudo docker run --restart=always -d -p 1337:1337 -v $PWD/validity_check.json:/app/src/server/apt/validity_check.json -v $PWD/stats.json:/app/src/server/public/stats.json wif-bo-public
```

## Environnement de développement en local

Projet Node.js avec `Node v9.11.1` et `npm 5.8.0`.

```shell
# Installer les dépendances.
$ npm install

# Lancer le serveur web.
$ npm run start

# Lancer les tests unitaires.
$ npm test
```
