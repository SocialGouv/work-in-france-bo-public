# Work in France - Back office public [![CircleCI](https://circleci.com/gh/SocialGouv/work-in-france-bo-public.svg?style=svg)](https://circleci.com/gh/SocialGouv/work-in-france-bo-public)

> Back office public de la plateforme de demande d'autorisations provisoires de travail.

Ce dépôt de code contient le back office public de Work in France. Ce back-office permet de fournir des statistiques ainsi qu'une API de verification des ATP.

Projet Node.js avec `Node v9` et `npm 5`.

## Environnement de développement

Pour construire l'image Docker :

```shell
$ docker build -t wif-bo-public .
```

Pour lancer une instance de l'image :

```shell
$ docker run -p 1337:1337 --name wif_bo_public wif-bo-public

# Avec les fichiers `validity_check.json` et `stats.json` montés en volumes.
$ docker run -p 1337:1337 --name wif_bo_public -v $PWD/validity_check.json:/app/src/server/apt/production/validity_check.json -v $PWD/stats.json:/app/src/server/public/stats.json wif-bo-public
```

Pour re-lancer l'instance de l'image :

```shell
$ docker start -ai wif_bo_public
```

Pour lancer les tests :

```shell
docker exec -t wif_bo_public npm test
```

## Environnement de production

```shell
$ docker build -t wif-bo-public .
```

Pour lancer une instance de l'image avec les fichiers `validity_check.json` et `stats.json` montés en volumes (en production ces derniers sont générés par le [back-office privé](https://github.com/SocialGouv/work-in-france-bo)) :

```shell
$ sudo docker run --restart=always -d -p 1337:1337 -v $PWD/validity_check.json:/app/src/server/apt/production/validity_check.json -v $PWD/stats.json:/app/src/server/public/stats.json wif-bo-public
```
