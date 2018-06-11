# Rapport de projet Semestre 8

## Vendredi 25 mai

### Scott

#### Initialisation du projet et reprise du travail déjà effectué ~1h30

J’ai créé une [organisation](https://github.com/SooneApp) sur **Github** afin que l’on ait nos répertoires centralisés. Cela facilitera le lien entre les différents répertoires, actuellement un pour le *back-end* et un pour le *front-end (Android)*, et les issues crée précédemment sur un répertoire personnel.

J’ai importé ce répertoire personnel dans l’organisation, car celui-ci contenait toutes les tâches que nous avions créées lors de la précédente période en école.

Une fois ce répertoire importer, dans l’organisation, avec les tâches j’ai créé 3 projets différents et ai réparti l’ensemble des tâches dans ceux-ci :
 - [Back-End](https://github.com/orgs/SooneApp/projects/3): Composée de 43 tâches.
 - [Front-End](https://github.com/orgs/SooneApp/projects/2): Composée de 26 tâches.
 - [Database](https://github.com/orgs/SooneApp/projects/4): Composée de 3 tâches.
#### Initialisation du projet Android [#1](https://github.com/SooneApp/Soone-Android-App/issues/1) ~3h

Pour l’initialisation du projet de l’application Android j’ai repris la base d’une application open source personnel afin de garder mes marques et pouvoir implémenter plus rapidement les différentes fonctionnalités qu’il y aura à réaliser.
### Hugo

#### Recuperation des serveurs ( 3 heures )

J'ai recuperé par le biai de Monsieur Pierre Richard, les accès aux différentes VM que nous utiliserons pour le projet. 

 - Mise en place de la base de donnée mysql et création des accès
 - Configuration initiale du firewall pfsence




## Vendredi 08 juin

---
### Matthis
   - Installation de l'environnement de travail et mise en place de l'IDE
   - Conception de la base de données, et implémentation via l'orm de Sails.
---
### Nans
   - Installation de l'environnement de travail et mise en place de l'IDE
   - Conception de la base de données, et implémentation via l'orm de Sails.

---
### Loïc
    - Création d'une installation NodeJS et SailsJS [estimé à 1 jour, réalisé en 1/2 jour]
    - Mise à jour de l'organisation projet back-end : [réalisé en amont du projet]
      - Redéfinition des tâches suite au brainstorm
      - Ajout de descriptions pour l'ensemble des tâches
    - Début de travail sur la gestion utilisateur (model, route, controller & helper) [estimé à 1 jour, en cours]
---
### Hugo
Objectif de la journée : Mettre en place tout le nécéssaire au niveau du serveur pour que l'équipe de developpement puisse commencer à travailler.
Objectif atteint 
- Installation du serveur de production ( Estimation : 1 journée, réalisé en 1 journée )
  - Installation des dépendances éssentielles
  - Installation et configuration de base de NodeJS
  - Installation et configuration de base de l'application SailsJS
- Recherche d'une solution de monitoring de performance (APM)
---
### Germain

- Mise en place d'un serveur pour heberger le site vitrine + accès FTP
- Recherche d'une solution de sécurisation connexion HTTPS client<->serveur sur l'application Sails.js du serveur de prod
- 

## Lundi 11 juin

### Général
-Mise en place de stand up meeting tous les matins 9h15 pour faire le point sur tâches réalisées, diffcultés rencontrées et objectifs de la journée
-Brainstorm sur différentes parties clés de l'application (notemment le système de match instantané)

---
### Matthis
   - 
   
---
### Nans
  - Travail sur la gestion utilisateur (commencé par Loic) [estimé à 1j, 2h passées]:
    - Comprend des tests unitaires et l'ajout de relation dans le modèle utilistateur.
  - Tentative de mise en place de "seed" pour la base de donnée [1 heure passé - non fructueux]
  
  - Mise à jour / fin d'implémentation de différents models [estimé à 2h, 4h passées]
    - Découverte des relations many-to-many et many-to-one via l'ORM de sails
    
   - Mise en place de connecteurs pour lancer la base de donnée sur un serveur mysql local [2h passées]
  
---
### Loïc
  - Suite de travail sur la gestion utilisateur (terminé par Nans) [estimé à 1 jour, réalisé en 1 jour et 1/2]:
    - Routes connect, disconnect, get, add & update(WIP) crées
    - Controller et helpers gérant l'ensemble de ces routes
    - Création de tests pour l'ensemble des éléments de la gestion utilisateur
  - Mise en place de tests unitaire : [non estimé, inclus dans la création de tests utilisateur]
    - Mocha comme framework de test unitaire
    - Supertest pour simuler des requêtes HTTP sur les routes
  - Début de travail sur le système de rencontre instantanées [estimé à 1 jour, en cours]
  - Tri sur les tickets git [réalisé en amont du projet]

---
### Hugo
Objectif de la journée : Mettre en place une suite de monitoring permettant d'avoir des statistiques sur l'utilisation de l'API sailsjs.
Les statistiques sont importantes pour debuguer l'appliquation et comprendre les comportements utilisateurs.

- Installation de la suite statistique ( Estimation : 1 journée, réalisé en 1/2 journée )
  - Installation du serveur APM
  - Installation d'Elasticksearch, Kibana
  - Configuration de l'application Sailsjs avec le serveur APM
- Lecture de la documentation de pfsence -> L'objectif est de faire passer le traffic des serveurs de pro/preprod via le firewall pfsense.
---
### Germain
 -
