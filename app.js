// ===================================================
// Délices du Faso — Application Client & Panier
// ===================================================

const STORAGE_PRODUCTS_KEY = "delicesDuFasoProducts";
const STORAGE_ORDERS_KEY = "delicesDuFasoOrders";

// Plats initiaux avec un design épuré (badges discrets uniquement sur les essentiels)
const PLATS_PAR_DEFAUT = [
  {
    id: "plat-1",
    name: "Riz gras",
    price: 1500,
    category: "plats",
    description: "Riz cuisiné à la tomate avec viande de bœuf et légumes",
    image: "images/riz gras.jpg",
    badge: "Populaire",
    rating: "4.8 (2.1K)",
    available: true
  },
  {
    id: "plat-2",
    name: "Tô sauce gombo",
    price: 1000,
    category: "plats",
    description: "Pâte de maïs accompagnée de sauce gombo à la viande",
    image: "images/to sauce gombo.jpg",
    badge: "",
    rating: "4.7 (1.8K)",
    available: true
  },
  {
    id: "plat-3",
    name: "Poulet braisé",
    price: 3000,
    category: "grillades",
    description: "Poulet grillé au feu de bois, servi avec attiéké ou frites",
    image: "images/poulet.jpg",
    badge: "Best-seller",
    rating: "4.9 (3.5K)",
    available: true
  },
  {
    id: "plat-4",
    name: "Sauce arachide + riz",
    price: 1500,
    category: "plats",
    description: "Sauce à base de pâte d'arachide avec viande, servie avec du riz",
    image: "images/95d20f94a896c224f048e817624ecdc6.jpg",
    badge: "",
    rating: "4.6 (1.2K)",
    available: true
  },
  {
    id: "plat-5",
    name: "Brochettes de bœuf",
    price: 500,
    category: "grillades",
    description: "Brochettes de viande de bœuf épicées, cuites au charbon",
    image: "images/brochette de boeuf.jpg",
    badge: "",
    rating: "4.5 (900)",
    available: true
  },
  {
    id: "plat-6",
    name: "Attiéké poisson",
    price: 2000,
    category: "plats",
    description: "Semoule de manioc accompagnée de poisson frit et alloco",
    image: "images/atieke avec poisson.jpg",
    badge: "Populaire",
    rating: "4.7 (2.3K)",
    available: true
  },
  {
    id: "plat-7",
    name: "Babenda",
    price: 1000,
    category: "plats",
    description: "Plat traditionnel moaga à base de feuilles vertes, riz et soumbala",
    image: "images/babenda.jpg",
    badge: "",
    rating: "4.4 (800)",
    available: true
  },
  {
    id: "plat-8",
    name: "Dêguê",
    price: 500,
    category: "desserts",
    description: "Dessert à base de couscous de mil et yaourt sucré",
    image: "images/degue.jpg",
    badge: "",
    rating: "4.6 (1.4K)",
    available: true
  },
  {
    id: "plat-9",
    name: "Bissap",
    price: 300,
    category: "boissons",
    description: "Jus de fleurs d'hibiscus frais, sucré et parfumé",
    image: "images/bissap.jpg",
    badge: "",
    rating: "4.8 (2.0K)",
    available: true
  },
  {
    id: "plat-10",
    name: "Zoom-koom",
    price: 300,
    category: "boissons",
    description: "Boisson rafraîchissante à base de mil, citron et sucre",
    image: "images/zoom--kom.jpg",
    badge: "",
    rating: "4.5 (1.1K)",
    available: true
  }
];

// Structure du panier en mémoire : { nom: { prix, quantite, image } }
let panier = {};
let categorieActive = "tous";
let rechercheTexte = "";

// ---------- Récupération et initialisation des plats ----------
function chargerProduits() {
  try {
    const data = localStorage.getItem(STORAGE_PRODUCTS_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(PLATS_PAR_DEFAUT));
      return PLATS_PAR_DEFAUT;
    }
    const produits = JSON.parse(data);
    if (!Array.isArray(produits) || produits.length === 0) {
      localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(PLATS_PAR_DEFAUT));
      return PLATS_PAR_DEFAUT;
    }
    return produits;
  } catch (e) {
    console.error("Erreur chargement plats :", e);
    return PLATS_PAR_DEFAUT;
  }
}

// Normaliser la catégorie pour le filtrage
function normaliserCategorie(cat) {
  if (!cat) return "plats";
  const c = cat.toLowerCase();
  if (c.includes("grillade")) return "grillades";
  if (c.includes("boisson")) return "boissons";
  if (c.includes("dessert")) return "desserts";
  if (c.includes("accompagnement")) return "plats";
  return "plats";
}

// Image par défaut si aucune photo
function obtenirImageParDefaut(categorie) {
  const c = normaliserCategorie(categorie);
  if (c === "grillades") return "images/poulet.jpg";
  if (c === "boissons") return "images/bissap.jpg";
  if (c === "desserts") return "images/degue.jpg";
  return "images/95d20f94a896c224f048e817624ecdc6.jpg";
}

// ---------- Affichage dynamique du catalogue ----------
function afficherCatalogue() {
  const container = document.getElementById("menu-grid");
  if (!container) return;

  const produits = chargerProduits();
  container.innerHTML = "";

  const platsAffiches = produits.filter(p => {
    if (p.available === false) return false;

    // Filtre par catégorie
    if (categorieActive !== "tous" && normaliserCategorie(p.category) !== categorieActive) {
      return false;
    }

    // Filtre par texte de recherche
    if (rechercheTexte.trim() !== "") {
      const q = rechercheTexte.trim().toLowerCase();
      const nomMatch = (p.name || "").toLowerCase().includes(q);
      const descMatch = (p.description || "").toLowerCase().includes(q);
      return nomMatch || descMatch;
    }

    return true;
  });

  if (platsAffiches.length === 0) {
    const msgDefaut = rechercheTexte.trim() !== ""
      ? `Aucun plat ne correspond à « <strong>${rechercheTexte.replace(/</g, "&lt;")}</strong> ».`
      : "Aucun plat disponible dans cette catégorie pour le moment.";

    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: #fff; border-radius: 16px; border: 1px dashed #e0d5c8; color: #888;">
        <p style="font-weight: 600;">${msgDefaut}</p>
        <p style="font-size: 12px; margin-top: 4px;">Consultez nos autres catégories ou essayez un autre mot-clé.</p>
      </div>
    `;
    return;
  }

  platsAffiches.forEach(plat => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("data-categorie", normaliserCategorie(plat.category));

    const imgSrc = plat.image && plat.image.trim() !== "" ? plat.image : obtenirImageParDefaut(plat.category);
    const badgeHtml = plat.badge && plat.badge.trim() !== ""
      ? `<span class="product-badge badge-populaire">${plat.badge}</span>`
      : "";
    const ratingText = plat.rating || "4.8 (Nouveau)";
    const descriptionText = plat.description || "Spécialité authentique préparée à la commande.";

    card.innerHTML = `
      <div class="product-img">
        <img src="${imgSrc}" alt="${plat.name}" loading="lazy" onerror="this.onerror=null; this.src='images/poulet.jpg';">
        ${badgeHtml}
        <button class="product-fav" onclick="toggleFav(this)" title="Favori">
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div class="product-info">
        <h3 class="product-name">${plat.name}</h3>
        <p class="product-desc">${descriptionText}</p>
        <div class="product-rating">
          <span class="star">★</span> ${ratingText}
        </div>
        <div class="product-footer">
          <span class="product-price">${formaterPrix(plat.price)} <small>FCFA</small></span>
          <button class="btn-add" title="Ajouter au panier">+</button>
        </div>
      </div>
    `;

    const addBtn = card.querySelector(".btn-add");
    addBtn.addEventListener("click", () => {
      ajouterAuPanier(plat.name, plat.price, imgSrc);
    });

    container.appendChild(card);
  });
}

// ---------- Toast Notification ----------
function afficherToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

// ---------- Gestion du Panier ----------
function ajouterAuPanier(nom, prix, image) {
  if (panier[nom]) {
    panier[nom].quantite++;
  } else {
    panier[nom] = {
      prix: Number(prix),
      quantite: 1,
      image: image || "images/poulet.jpg"
    };
  }
  afficherToast(`« ${nom} » ajouté au panier`);
  afficherPanier();
  mettreAJourBadge();
}

function augmenterQuantite(nom) {
  if (panier[nom]) {
    panier[nom].quantite++;
    afficherPanier();
    mettreAJourBadge();
  }
}

function retirerDuPanier(nom) {
  if (panier[nom]) {
    panier[nom].quantite--;
    if (panier[nom].quantite <= 0) {
      delete panier[nom];
    }
    afficherPanier();
    mettreAJourBadge();
  }
}

function supprimerDuPanier(nom) {
  if (panier[nom]) {
    delete panier[nom];
    afficherToast(`« ${nom} » retiré du panier`);
    afficherPanier();
    mettreAJourBadge();
  }
}

function viderPanier() {
  if (Object.keys(panier).length === 0) return;
  if (!confirm("Voulez-vous vider votre panier ?")) return;
  panier = {};
  afficherToast("Panier vidé");
  afficherPanier();
  mettreAJourBadge();
}

function compterArticles() {
  return Object.values(panier).reduce((acc, item) => acc + item.quantite, 0);
}

function calculerTotal() {
  return Object.values(panier).reduce((acc, item) => acc + (item.prix * item.quantite), 0);
}

function formaterPrix(nombre) {
  return Number(nombre || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function mettreAJourBadge() {
  const badge = document.getElementById("badge-panier");
  if (!badge) return;
  const count = compterArticles();
  badge.textContent = count;
  badge.style.display = count === 0 ? "none" : "flex";
}

// ---------- Rendu du Panier ----------
function afficherPanier() {
  const corps = document.getElementById("corps-panier");
  const panierVide = document.getElementById("panier-vide");
  const cartFooter = document.getElementById("cart-footer");
  const totalElement = document.getElementById("total-panier");

  if (!corps || !panierVide || !cartFooter || !totalElement) return;

  const noms = Object.keys(panier);

  if (noms.length === 0) {
    panierVide.classList.remove('hidden');
    cartFooter.classList.add('hidden');
    corps.innerHTML = "";
    return;
  }

  panierVide.classList.add('hidden');
  cartFooter.classList.remove('hidden');

  let html = "";
  noms.forEach(nom => {
    const item = panier[nom];
    const sousTotal = item.prix * item.quantite;
    const safeNom = nom.replace(/'/g, "\\'");

    html += `
      <div class="cart-item">
        <div class="cart-item-thumb">
          <img src="${item.image}" alt="${nom}" onerror="this.onerror=null; this.src='images/poulet.jpg';">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${nom}</div>
          <div class="cart-item-price">${formaterPrix(sousTotal)} FCFA <small>(${formaterPrix(item.prix)}/u)</small></div>
        </div>
        <div class="cart-item-controls">
          <button class="cart-btn" onclick="retirerDuPanier('${safeNom}')" title="Diminuer">−</button>
          <span class="cart-qty">${item.quantite}</span>
          <button class="cart-btn" onclick="augmenterQuantite('${safeNom}')" title="Augmenter">+</button>
          <button class="cart-btn cart-btn-remove" onclick="supprimerDuPanier('${safeNom}')" title="Supprimer">✕</button>
        </div>
      </div>
    `;
  });

  corps.innerHTML = html;
  totalElement.innerHTML = `${formaterPrix(calculerTotal())} <small>FCFA</small>`;
}

// ---------- Enregistrement et Commande WhatsApp ----------
function commanderWhatsApp() {
  const noms = Object.keys(panier);
  if (noms.length === 0) {
    afficherToast("Votre panier est vide");
    return;
  }

  const nomInput = document.getElementById("client-nom");
  const telInput = document.getElementById("client-tel");
  const adresseInput = document.getElementById("client-adresse");

  const clientNom = (nomInput && nomInput.value.trim()) ? nomInput.value.trim() : "Client Délices du Faso";
  const clientTel = (telInput && telInput.value.trim()) ? telInput.value.trim() : "Non précisé";
  const clientAdresse = (adresseInput && adresseInput.value.trim()) ? adresseInput.value.trim() : "À emporter / Sur place";

  const total = calculerTotal();
  const numCommande = "CDF-" + Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const dateStr = now.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  // Enregistrement dans les finances
  const nouvelleCommande = {
    id: numCommande,
    clientNom: clientNom,
    clientTel: clientTel,
    clientAdresse: clientAdresse,
    date: now.toISOString(),
    dateStr: dateStr,
    total: total,
    items: noms.map(nom => ({
      nom: nom,
      prix: panier[nom].prix,
      quantite: panier[nom].quantite,
      sousTotal: panier[nom].prix * panier[nom].quantite
    })),
    statut: "Validée",
    source: "En ligne / WhatsApp"
  };

  try {
    const ordersData = localStorage.getItem(STORAGE_ORDERS_KEY);
    const orders = ordersData ? JSON.parse(ordersData) : [];
    orders.unshift(nouvelleCommande);
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    console.warn("Impossible d'enregistrer la commande dans les finances :", e);
  }

  // Message WhatsApp sobre et clair
  let message = `COMMANDE ${numCommande} — Délices du Faso\n\n`;
  message += `Client : ${clientNom}\n`;
  if (clientTel !== "Non précisé") message += `Téléphone : ${clientTel}\n`;
  if (clientAdresse !== "À emporter / Sur place") message += `Livraison : ${clientAdresse}\n`;
  message += `Date : ${dateStr}\n\n`;
  message += `Détails des plats :\n`;

  noms.forEach(nom => {
    const item = panier[nom];
    const sousTotal = item.prix * item.quantite;
    message += `• ${item.quantite}x ${nom} (${formaterPrix(sousTotal)} FCFA)\n`;
  });

  message += `\nTotal : ${formaterPrix(total)} FCFA\n\n`;
  message += `Merci de confirmer la prise en charge.`;

  const numero = "22603844466";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;

  panier = {};
  if (nomInput) nomInput.value = "";
  if (telInput) telInput.value = "";
  if (adresseInput) adresseInput.value = "";
  afficherPanier();
  mettreAJourBadge();

  afficherToast("Commande enregistrée. Ouverture de WhatsApp...");

  setTimeout(() => {
    window.open(url, "_blank");
  }, 500);
}

// ---------- Recherche & Filtre par Catégorie ----------
function rechercherPlats(valeur) {
  rechercheTexte = valeur || "";
  const btnClear = document.getElementById("search-clear");
  if (btnClear) {
    btnClear.style.display = rechercheTexte.trim() !== "" ? "block" : "none";
  }
  afficherCatalogue();
}

function effacerRecherche() {
  const inputSearch = document.getElementById("menu-search");
  if (inputSearch) {
    inputSearch.value = "";
  }
  rechercherPlats("");
}

function filtrerCategorie(categorie, element) {
  categorieActive = categorie;

  const items = document.querySelectorAll(".category-item");
  items.forEach(el => el.classList.remove("active"));
  if (element) {
    element.classList.add("active");
  }

  afficherCatalogue();
}

// ---------- Favoris (Like) ----------
function toggleFav(btn) {
  if (!btn) return;
  const isLiked = btn.classList.toggle("liked");
  afficherToast(isLiked ? "Ajouté aux favoris" : "Retiré des favoris");
}

// ---------- Synchronisation et Initialisation ----------
window.addEventListener("storage", (e) => {
  if (e.key === STORAGE_PRODUCTS_KEY) {
    afficherCatalogue();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  chargerProduits();
  afficherCatalogue();
  mettreAJourBadge();
});
