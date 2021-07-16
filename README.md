# Kinés.fr (backend)

Kinés.fr est une plateforme collaborative et de partage pour les
kinésithérapeutes. Elle permet à ces praticiens, et aux
professionnels en lien avec ce domaine, de proposer de la
documentation, des formations et des services de façon centralisée.
Kinés.fr est une plateforme alimentée par et pour les
kinésithérapeutes.

![Logo](https://cdn.discordapp.com/attachments/816033799979794482/865169749759623178/logo_kineservice-removebg-preview.png (2))

    
## Screenshots

![App Screenshot](https://cdn.discordapp.com/attachments/816033799979794482/865162313383018526/screen_site_responsive-removebg-preview.png (2))

  
## Contexte

En formation à la Wild Code School de Nantes, notre groupe composé de Guillaume Lefort, Damien Guiganton, Aurélien Bouchet, Ninon Maraval et Jonathan Rousseau s'est vu confier la mission de réaliser une application destinée aux kinésithérapeutes qui leur permettra de partager des connaissances, des formations et/ou des services client. Ce projet a été créé en 8 semaines pour un client extérieur et est le dernier projet de notre formation.

  
## Technologies

**Client:** ReactJS, CSS, Bootstrap

**Server:** Node, Express, mysql

  
## Fonctionnalités

- Accéder au site depuis un téléphone ou un ordinateur
- Mode connecté et non connecté
- Créer un compte et s'y connecter
- Ajouter un utilisateur dans la base de données
- Consulter, télécharger et ajouter des documentations, des formations et des services
- Effectuer une recherche sur les pages documentations, formations et services
- Effectuer une recherche globale dans tout le site

  
## Modules

- https://www.bcrypt.fr/
- https://www.npmjs.com/package/cors
- https://www.npmjs.com/package/dotenv
- https://www.npmjs.com/package/express
- https://www.npmjs.com/package/jsonwebtoken
- https://www.npmjs.com/package/multer
- https://www.npmjs.com/package/mysql2

## API Reference

#### Catégories

```
  http://localhost:3000/category
```

| Routes | Description                |
| :-------- | :------------------------- |
| GET api/category | récupère toutes les catégories  |

#### Documentations

```
  Documentation http://localhost:3000/documentation
```

| Routes |  Description                       |
| :-------- |  :-------------------------------- |
| GET api/documentation | récupère toutes les documentations |
| POST api/documentation | ajoute une nouvelle documentation ; chaque documentation est identifiée par un numéro d'id |
| PUT api/documentation/{id} | modifie une documentation |
| DELETE api/documentation/{id} | supprime une documentation |

#### Formations

```
  Formation http://localhost:3000/formation
```

| Routes |  Description                       |
| :-------- |  :-------------------------------- |
| GET api/formation | récupère toutes les formations |
| POST api/formation | ajoute une nouvelle formation ; chaque formation est identifiée par un numéro d'id |
| PUT api/formation/{id} | modifie une formation |
| DELETE api/formation/{id} | supprime une formation |

#### Profil

```
  Profil http://localhost:3000/profil
```

| Routes |  Description                       |
| :-------- |  :-------------------------------- |
| POST api/profil | ajoute un nouvel utilisateur ; chaque utilisateur est identifié par un numéro d'id |
| PUT api/profil/{id} | modifie le profil d'un utilisateur |

#### Services

| Routes |  Description                       |
| :-------- |  :-------------------------------- |
| GET api/service | récupère tous les services |
| GET api/service/{id} | récupère tous les services |
| POST api/service | ajoute un nouveau service ; chaque service est identifié par un numéro d'id |
| PUT api/service/{id} | modifie un service |
| DELETE api/service/{id} | supprime un service |  

#### Connexion

| Routes |  Description                       |
| :-------- |  :-------------------------------- |
| POST api/signIn | récupère les données d'un utilisateur et le connecte à son compte s'il en a créé un |
 
 #### Inscription

| Routes |  Description                       |
| :-------- |  :-------------------------------- |
| POST api/signUp | crée un nouvel utilisateur et l'enregistre dans la base de données |  
