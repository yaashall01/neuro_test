
---

# Gestion des Produits et Utilisateurs (React + Symfony)  

## Description du projet  
Ce projet est une application web permettant la gestion des produits et des utilisateurs.  
Le frontend utilise **React, Redux, TypeScript, Tailwind CSS** et le backend repose sur **Symfony**.  

Fonctionnalités :  
- **Utilisateurs** : consulter et rechercher des produits  
- **Administrateurs** : gérer les produits et les utilisateurs  

---

## Fonctionnalités principales  

### Authentification & Autorisation  
- Inscription et connexion avec JWT  
- Séparation des rôles : **Admin** et **Utilisateur**  
- Redirection automatique si le token expire  

### Gestion des Produits (Admin)  
- Ajouter, modifier et supprimer un produit  
- Afficher la liste des produits avec un statut (PUBLISHED/DRAFT)  

### Gestion des Utilisateurs (Admin)  
- Ajouter, modifier et supprimer un utilisateur  
- Modifier le rôle d’un utilisateur (Admin/User)  

### Interface utilisateur  
- UI moderne avec **Tailwind CSS**  
- Design minimaliste et responsive  

---

## Technologies utilisées  

### Frontend :  
- **React** (Redux Toolkit)  
- **Tailwind CSS**  
- **TypeScript**  
- **Axios** (requêtes API)  
- **JWT** (authentification)  

### Backend :  
- **Symfony** (API REST)  
- **Doctrine & MySQL**  
- **JWT Authentication**  

---

## Identifiants de test  

| Type | Email | Mot de passe |
|------|----------------|--------------|
| Admin | `admin@gmail.com` | `secret` |
| Utilisateur | `user@gmail.com` | `secret` |

L'admin peut gérer les produits et les utilisateurs, tandis que l'utilisateur peut uniquement voir les produits.  

---

## Installation et exécution  

### Backend (Symfony)  
1. Assurez-vous d’avoir **PHP**, **Composer**, et **Symfony CLI**.  
2. Clonez le projet et accédez au dossier backend :  
   ```sh
   git clone https://github.com/yaashall01/neuro_test
   cd api
   ```
3. Installez les dépendances :  
   ```sh
   composer install
   ```
4. Configurez la base de données :  
   ```sh
   php bin/console doctrine:database:create
   php bin/console doctrine:migrations:migrate
   ```
5. Insérez les données : exécutez `data.sql`  
6. Démarrez le serveur :  
   ```sh
   symfony server:start
   ```

---

### Frontend (React)  
1. Assurez-vous d’avoir **Node.js** et **npm**.  
2. Accédez au dossier frontend :  
   ```sh
   cd client
   ```
3. Installez les dépendances :  
   ```sh
   npm install
   ```
4. Démarrez le projet :  
   ```sh
   npm run dev
   ```
5. Ouvrez l’application :  
   [http://localhost:5173](http://localhost:5173)  

---

## API Endpoints  

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| **POST** | `/api/login_check` | Connexion utilisateur |
| **POST** | `/api/register` | Inscription utilisateur |
| **GET** | `/api/products` | Liste des produits |
| **POST** | `/api/products` | Ajouter un produit (Admin) |
| **PUT** | `/api/products/{id}` | Modifier un produit (Admin) |
| **DELETE** | `/api/products/{id}` | Supprimer un produit (Admin) |
| **GET** | `/api/users` | Liste des utilisateurs (Admin) |
| **POST** | `/api/users` | Ajouter un utilisateur (Admin) |
| **PUT** | `/api/users/{id}` | Modifier un utilisateur (Admin) |
| **DELETE** | `/api/users/{id}` | Supprimer un utilisateur (Admin) |
| **GET** | `/api/doc` | Documentation Swagger UI (public) |
| **GET** | `/api/doc.json` | Documentation Swagger (JSON) |

---

**Projet prêt à être utilisé.**