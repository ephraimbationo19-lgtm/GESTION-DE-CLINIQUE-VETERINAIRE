# Délices du Faso — Application Web Restaurant & Gestion Financière

Bienvenue sur la plateforme web de **Délices du Faso**, un restaurant spécialisé dans la cuisine africaine et les spécialités culinaires du Burkina Faso.

## 🌟 Fonctionnalités

### Espace Client (`index.html` & `app.js`)
- **Catalogue dynamique de plats** : Consultation des spécialités avec photos, tarifs en FCFA, notes et badges.
- **Recherche & Filtrage** : Recherche instantanée par nom/description et filtre par catégorie (Plats, Grillades, Boissons, Desserts).
- **Panier interactif** : Gestion des quantités, calcul automatique des sous-totaux et du total.
- **Commande directe WhatsApp** : Envoi de la commande mise en forme directement vers le numéro WhatsApp du restaurant avec coordonnées de livraison.

### Espace Propriétaire & Administration (`admin.html` & `admin.js`)
- **Tableau de bord financier (KPI)** : Suivi du chiffre d'affaires, nombre de commandes, panier moyen et portions servies.
- **Vente rapide au comptoir** : Enregistrement direct des ventes sur place (Espèces, Orange Money, Moov Money).
- **Gestion de la carte (CRUD)** : Ajout, modification, suppression et gestion des disponibilités des plats.
- **Persistance locale (`localStorage`)** : Synchronisation fluide entre l'espace client et le panneau d'administration.

## 📁 Structure du projet

```
.
├── index.html       # Interface principale client (catalogue, panier, commande)
├── admin.html       # Interface d'administration et tableau de bord financier
├── style.css        # Styles CSS de l'application client
├── admin.css        # Styles CSS de l'espace administration
├── app.js           # Logique JavaScript client (panier, recherche, WhatsApp)
├── admin.js         # Logique JavaScript administration & finances
├── menu.js          # Module de compatibilité affichage catalogue
├── images/          # Images locales des plats et boissons
└── README.md        # Documentation du projet
```

## 🚀 Utilisation

Ouvrez simplement `index.html` ou `admin.html` dans un navigateur web. Aucune dépendance externe ni serveur backend requis.
