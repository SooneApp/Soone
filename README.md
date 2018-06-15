# Rapport de projet Semestre 8

## Vendredi 25 mai

### TouT le monde
 - Brainstorming
 - Explication du concept du projet

### Scott

#### Initialisation du projet et reprise du travail déjà effectué ~1h30

J’ai créé une [organisation](https://github.com/SooneApp) sur **Github** afin que l’on ait nos répertoires centralisés. Cela facilitera le lien entre les différents répertoires, actuellement un pour le *back-end* et un pour le *front-end (Android)*, et les issues créées précédemment sur un répertoire personnel.

J’ai importé ce répertoire personnel dans l’organisation, car celui-ci contenait toutes les tâches que nous avions créées lors de la précédente période en école.

Une fois ce répertoire importé, dans l’organisation, avec les tâches j’ai créé 3 projets différents et ai réparti l’ensemble des tâches dans ceux-ci :
 - [Back-End](https://github.com/orgs/SooneApp/projects/3): Composée de 43 tâches.
 - [Front-End](https://github.com/orgs/SooneApp/projects/2): Composée de 26 tâches.

#### Initialisation du projet Android [#1](https://github.com/SooneApp/Soone-Android-App/issues/1) ~3h

Pour l’initialisation du projet de l’application Android j’ai repris la base d’une application open source personnel afin de garder mes marques et pouvoir implémenter plus rapidement les différentes fonctionnalités qu’il y aura à réaliser.
### Hugo

#### Recuperation des serveurs ~3 heures

J'ai recuperé par le biais de Monsieur Pierre Richard, les accès aux différentes VM que nous utiliserons pour le projet. 

 - Mise en place de la base de donnée mysql et création des accès
 - Configuration initiale du firewall pfsence

## Vendredi 01 juin

### Journée Brainstorm

Discussion sur le fonctionnement de l'application
  - Définition des fonctionnalités
  - Schématisation de l'architecture
  - Tri du bac à sable
  - Répartition des tâches

## Vendredi 08 juin

### Scott
   - Suite à une reinstallation de MacOs sur ma machine j'ai passé la journée à la reconfigurer.

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
- Installation du serveur de production [estimé à 1 jour, réalisé en 1 jour]
  - Installation des dépendances éssentielles
  - Installation et configuration de base de NodeJS
  - Installation et configuration de base de l'application SailsJS
- Recherche d'une solution de monitoring de performance (APM)
---
### Germain

- Mise en place d'un serveur pour heberger le site vitrine + accès FTP
- Recherche d'une solution de sécurisation connexion HTTPS client<->serveur sur l'application Sails.js du serveur de prod

---

## Lundi 11 juin

### Général

   - Mise en place de stand up meeting  tous les matins 9h15 pour faire le point sur tâches réalisées, difficultés rencontrées et objectifs de la journée. Germain animateur.
   - Brainstorm sur différentes parties clés de l'application (notemment le système de match instantané)

---

### Scott
   - Création de l'écran de profil utilisateur.

---
### Matthis
   - Conception du site vitrine.
   - Développement du site vitrine (http://soone.fun/) [estimé à 1j, pas encore terminé]
   
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

- Installation de la suite statistique [estimé à 1 jour, réalisé en 1/2 jour]
  - Installation du serveur APM
  - Installation d'Elasticksearch, Kibana
  - Configuration de l'application Sailsjs avec le serveur APM
- Lecture de la documentation de pfsence -> L'objectif est de faire passer le traffic des serveurs de pro/preprod via le firewall pfsense.
- Suite aux performances faibles et au non fonctionnement des VMs fournies par l'école, nous avons décidé de louer un serveur OVH pour le serveur principale de production, et d'utiliser nos serveurs personnels pour la pre-prod. J'ai passé l'après midi a migrer et reinstaller la configuration sur le nouveau serveur.
---
### Germain
 - Suite HTTPS Sails.js
 - Correction FTP du serveur web
 - Recherche sur les VM fournies par l'école, soucis de pare feu interne et externe de l'école
 
 ## Mardi 12 juin
 
 ### Général
 - Brainstorm sur les paramètres de recherche possible (pour les matchs)
 
 ---
 ### Scott
 
 ---
 ### Matthis
  - Fin du développement site vitrine (http://soone.fun/) [estimé à 1j, réalisé en 2j]
 ---
 ### Nans
 - Mise en place des connecteurs base de données mysql en prod [estimé à 2h , 2h passées aujourd'hui, 2h hier]
 - Travail sur les utilisateurs :
    - Créations des routes [estimé à 1h, 1h passée + temps Loic]
    - Test des routes [estimé à 1h, 1h passée + temps Loic]
 - Documentation base de données [1h passée]
 - Résolution problème de GIT [1h passée]
 - Ajout de relations dans les models [2h passé]
 ---
 ### Loïc
  - Travail sur le système de recherche instantannées : (en cours) [estimé à 1 jour, rééstimé à 1 jour et 1/2 suite à l'ajout de Firebase]
    - Création d'une route d'enregistrement et d'un système de socket pour communiquer avec le client
    - Création de tests unitaires sur le système de sockets
    - Le système de socket serait cependant incompatible avec Android
  - Travail sur l'intégration de Firebase dans l'application : (terminé) [non estimé, 2h + réalisé en amont du projet]
    - Installation du module et configuration du projet
    - Lancement automatique du module lorsque le serveur est lancé
    - Remplacement des intéractions socket par des messages Firebase
    - Mise à jour des utilisateurs pour stocker et gérer leurs identifiants Firebase
 ---
 ### Hugo
Objectif de la journée : Finir de reparer les problèmes liès à la base de donnée, chercher et mettre en place un système de notifications sms.
Objectif atteint avec un reste à faire pour le lendemain.

- Reparation des problemes de base de donnée ( 2 heures ) 
- Mise en place de l'infrastructure d'envoie de SMS [estimé à 1 jour, réalisé en 1 jour]
  - Chercher une solution peu couteuse et efficace -> AWS SNS
  - Integrer les fonctionnalités au projet
  - Faire les premiers tests relatifs à l'envoie de sms
  - Reste à faire : Mettre à jour la base de données, le modèle et les controlleurs pour journaliser les événements d'envoies de sms.
   - Les developpeurs sont occupés sur d'autres partie de l'application, c'est pourquoi je vais m'en occuper.
 ---
 ### Germain
  - Mise en place du serveur de mail afin d'avoir une addresse mail de contact disponible avec comme nom de domaine celui du projet
  - Tests de fonctionnement sécurisation serveur, reste redirection HTTP vers HTTPS sur Sails.js
  
 ## Mercredi 13 juin
 
  ### Général
  - Problème aws
  
  ---
  ### Scott
  
  ---
  ### Matthis
   - Déploiement en prod du site.
   - Mise à jour des couleurs et images du site.
   - Tentative d'integration des SMS pour télécharger l'application.
   - Pair programming avec Nans.
  ---
  ### Nans
   - Problème de date entre le code et la base de données [3h passées aujourd'hui]
   - Création des controleurs et des routes des match, ainsi que des décision des matchs [4h passées aujourd'hui]
  
  ---
  ### Loïc
  - Travail sur le système de recherche instantannées : (terminé) [estimé à 1 jour et demi, terminé en 2 jours]
    - Evolution du modèle de base de données pour supporter plus efficacement les genres et préférences de recherche
    - Ajout des critères de matching au système de recherche instantannées
    - Réalisation de tests manuels (longs et inefficaces) pour valider le comportement
    - Suite aux tests jugés non pertinents, j'ai mis en place une stratégie de tests jugée plus pertinente :
      - Exposition des fonctionnalités du controller grâce au module rewire
      - Réalisation de tests unitaires sur l'ensemble des méthodes exposées du controller
      - Réalisation de tests semi automatisés (requérant une intervention) afin de valider la récéption des données sur une application android
  ---
  ### Hugo
  ---
  ### Germain
   - Ajout redirection HTTP vers HTTPS
      - Recherche de solutions certificats mieux que certificats autosignés
     
  ---
 
 ## Jeudi 14 juin
 
  ### Général
  
  
  ---
  ### Scott
  ---
  ### Matthis
   - Mise à jour mineur du site.
   - Test en réel des envoies de SMS.
   - Brainstorm sur les modele de BDD (CF Nans).
   - Logo avec Germain.
   - Pair programming avec Nans.
  ---
  ### Nans
  - Brainstorm avec Loïc et Matthis vis à vis de la base de données et des différents modèles
    - Réflexion et refonte des modèles pour la base de données (correction de problèmes auxquels nous n'avions pas pensé, et optimisation)  [4h passées aujourd'hui]
    - Refactoring du code impacté par ces modifications  [2h passées aujourd'hui]
  - Fin de la création des controlleurs et routes pour les chats et les décisions à l'issue d'un "match" [2h passées aujourd'hui]
  ---
  ### Loïc
    - Brainstorm sur les modèles afin de rajouter les problématiques manquantes pour la messagerie/le match des utilisateurs avec Matthis et Nans
    - Travail sur le système de messagerie : terminé [estimé à 1 jour, réalisé en 1 jour en incluant le brainstorm] 
      - Création de routes pour envoyer des messages
      - Création d'action controller traitant le message et renvoyant les informations vers le second utilisateur
      - Création de tests unitaires
    - Résolution de problématiques apparues suite à la mise en production de l'application et aux premiers tests android : [non estimé]
      - Refonte complète de la gestion des erreurs pour correctement traiter les messages d'erreur
      - Désactivation des policies d'authentification pour faciliter les tests android
  ---
  ### Hugo
  ---
  ### Germain
    - Design de la marque, logo et icônes
    - Recherche de solutions pour analyseur de code => sonarqube
  ---
 
