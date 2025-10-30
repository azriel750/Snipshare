grand seigneur je vous partage le cahier des charge proprement réencodé (modifié)mardi 21 octobre 2025 10:39
# 📘 **Cahier des charges – Projet SnipShare**  
_Rédigé par Philippe Lambert, chef de projet fonctionnel. Tampon virtuel apposé._ 🪶  

---
Envoyer un message dans #「🌍」général
﻿
# 📘 **Cahier des charges – Projet SnipShare**  
_Rédigé par Philippe Lambert, chef de projet fonctionnel. Tampon virtuel apposé._ 🪶  

---

## 🎯 **Objectif du projet**
SnipShare est une plateforme de **partage de snippets de code** destinée à une **collectivité territoriale**.  
Elle permettra aux agents de stocker, partager et commenter de petits morceaux de code réutilisables, en toute sécurité.  
Pour faire simple : c’est un "Google Drive pour bouts de code", mais sans les chats ni les mèmes. 😉

---

## 🧩 **Fonctionnalités principales**

1. **Authentification sécurisée**
   - Inscription et connexion avec e-mail et mot de passe.
   - Le mot de passe doit être solide.  
   - Chaque utilisateur reçoit un "jeton".  
   → _Si le mot de passe est faible, Minou Turing miaule d’indignation._

2. **Gestion des snippets**
   - Chaque utilisateur peut gérer ses snippets.
   - Champs obligatoires : titre, code, langage, visibilité.

3. **Visibilité**
   - Trois niveaux :
     - **Public** : visible par tout le monde.
     - **Privé** : visible uniquement par le créateur.
     - **Non-répertorié** : accessible uniquement par lien direct.  
   → _Un snippet privé exposé à tous = catastrophe intergalactique._

4. **Likes et commentaires**
   - Les utilisateurs connectés peuvent aimer et commenter des snippets.
   - Un seul like par utilisateur.
   - Pas de modération prévue _(on croise les doigts 🤞)_.

5. **Recherche et tags**
   - Recherche par titre, langage, utilisateur, etc.
   - Tri par pertinence.
   - Max 5 tags par snippet.  
   → _Les tags, c’est comme les étiquettes sur mon frigo : il faut s’y retrouver._

6. **Profil utilisateur**
   - Page avec les snippets créés/likés.
   - Modification possible de l’e-mail et du mot de passe.
   - Statistiques visibles _(nombre de snippets, likes)_.

7. **Responsive design**
   - L’interface doit être agréable sur ordinateur **et mobile**.
   - Taille minimale des boutons : 48px _(test sur doigts humains, pas de robot)_.

8. **Tests**
   - 80 % de couverture minimum.
   - Rapport de tests obligatoire.
   - Tests unitaires + fonctionnels _(backend uniquement)_.  
   → _Les tests, c’est comme les ceintures de sécurité : ennuyeux, mais vitaux._

9. **Docker et DevOps**
   - 3 conteneurs : base de données, backend, frontend.
   - Pas besoin de déploiement final, mais tout doit être prêt pour.  
   → _Docker, c’est comme les Lego : si les briques ne s’emboîtent pas, tout s’effondre._

---

### 🧠 **Contraintes techniques**
- **Backend** : NodeJS avec Express et TypeScript.  
- **Frontend** : React avec TypeScript.  
- **Architecture** : MVC pour le backend, atomic design pour le frontend.  
- **Base de données** : PostgreSQL.  
- **Méthodologie** : modélisation Merise _(MCD → MLD → MPD → LDD)_.  
- **Authentification** : Cookies, hash sécurisé _(argon2)_, token temporaire.  
- **Tests** : Vitest/Jest pour les unités, Supertest pour l’API.  
- **Compatibilité** : Chrome, Firefox, Edge _(versions récentes)_.  

_Note personnelle : si ça marche sur Internet Explorer, c’est suspect._  
_Note personnelle 2 : si votre dossier `src` ressemble à une soupe, je rends le tablier._

---

## 📦 **Livrables attendus**
- Maquettes _(desktop + mobile)_.  
- Modèle de données _(MCD complet et lisible)_.  
- Code source propre et versionné.  
- Documentation technique :
  - Commentaires dans le code source, lisibles par mon stagiaire.
  - Documentation complète de l'API.
- Rapport de tests _(preuve des 80 %)_.  
- Fichiers Docker.  

Chaque livrable doit être **testé, documenté et prouvé**.  
Sans capture ou rapport, je ne valide pas. 👍

---

## 🔧 **Phases du projet**

### Phase 1 : Conception _(21 au 24 octobre)_
- Charte graphique _(couleurs, polices)_.  
- Maquettes _(zoning → wireframe → maquette → prototype)_.  
- Modélisation BDD _(MCD → MLD → MPD → LDD)_.  
- Conception fonctionnelle _(user stories, diagrammes)_.  
- Planification des tâches.  
🚫 _Aucune ligne de code ne doit être écrite ici._

### Phase 2 : Développement _(27 octobre au 7 novembre)_
- Développement des fonctionnalités par **ordre de priorité**.
- On ne change plus la conception, sauf bug majeur.

### Phase 3 : Fix & validation _(4 au 7 novembre)_
- Tests, corrections, ajustements finaux.
- Validation finale avec moi _(et mon tampon)_. 🪶  

---

## ⚙️ **Règles de validation**
Je valide **uniquement** sur preuves :
- Captures d’écran, rapports de test ou démos vidéo.
- Documentation claire _(mon stagiaire doit comprendre)_.
- Respect des règles métiers et de la logique définie.

Sans ça, **pas de tampon**.  
Et pas de tampon = pas de validation. 😬

---

## 🎮 **Interactions**
Je suis votre **seul interlocuteur et décideur**.  
Posez-moi **une question à la fois**, sinon je me perds dans mes tableurs.  
Chaque échange doit **faire avancer le projet**.  

Et souvenez-vous :  
> “La paperasse, c’est la vie.” — _Philippe Lambert, 2025_  
> “Les réunions, c’est le mal.” — _aussi lui, 5 minutes plus tard._

---

📅 **Début du projet : 21/10/2025 – Fin : 07/11/2025**  
Phase 1 : Conception  
Phase 2 : Développement  
Phase 3 : Fix & Validation  

🎉 _PS : Un projet réussi, c’est comme un bon yaourt. Pas périmé, bien documenté, et refermable proprement._  