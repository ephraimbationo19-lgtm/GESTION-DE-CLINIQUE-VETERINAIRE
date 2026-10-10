// ===================================================
// Délices du Faso — Administration & Gestion des Finances
// ===================================================

const STORAGE_PRODUCTS_KEY = "delicesDuFasoProducts";
const STORAGE_ORDERS_KEY = "delicesDuFasoOrders";

// Plats par défaut
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

// Données d'exemple sobres
const COMMANDES_EXEMPLES = [
  {
    id: "CDF-4819",
    clientNom: "M. Ouedraogo",
    clientTel: "70 23 45 67",
    clientAdresse: "Ouaga 2000",
    date: new Date(Date.now() - 3600000 * 2).toISOString(),
    dateStr: "Aujourd'hui, 13:45",
    total: 7500,
    items: [
      { nom: "Poulet braisé", prix: 3000, quantite: 2, sousTotal: 6000 },
      { nom: "Bissap", prix: 300, quantite: 5, sousTotal: 1500 }
    ],
    statut: "Payée",
    source: "WhatsApp"
  },
  {
    id: "CDF-4820",
    clientNom: "Mme Traoré Fatou",
    clientTel: "78 90 12 34",
    clientAdresse: "Koulouba",
    date: new Date(Date.now() - 3600000 * 5).toISOString(),
    dateStr: "Aujourd'hui, 11:20",
    total: 4500,
    items: [
      { nom: "Riz gras", prix: 1500, quantite: 2, sousTotal: 3000 },
      { nom: "Sauce arachide + riz", prix: 1500, quantite: 1, sousTotal: 1500 }
    ],
    statut: "Payée",
    source: "WhatsApp"
  },
  {
    id: "CDF-4821",
    clientNom: "Client au comptoir",
    clientTel: "-",
    clientAdresse: "Sur place",
    date: new Date(Date.now() - 3600000 * 1).toISOString(),
    dateStr: "Aujourd'hui, 14:10",
    total: 2500,
    items: [
      { nom: "Attiéké poisson", prix: 2000, quantite: 1, sousTotal: 2000 },
      { nom: "Dêguê", prix: 500, quantite: 1, sousTotal: 500 }
    ],
    statut: "Payée",
    source: "Sur place (Espèces)"
  }
];

// État local
let products = [];
let orders = [];
let adminFilterCategory = "tous";

// Formulaire produit
const form = document.getElementById("product-form");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const badgeInput = document.getElementById("badge");
const imageInput = document.getElementById("image");
const availableInput = document.getElementById("available");
const idInput = document.getElementById("product-id");
const formTitle = document.getElementById("form-title");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");

// Éléments du catalogue
const productList = document.getElementById("product-list");
const productCount = document.getElementById("product-count");
const emptyProductMessage = document.getElementById("empty-message");

// =========================================================
// GESTION DES PRODUITS (CATALOGUE)
// =========================================================

function loadProducts() {
  try {
    const saved = localStorage.getItem(STORAGE_PRODUCTS_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(PLATS_PAR_DEFAUT));
      return [...PLATS_PAR_DEFAUT];
    }
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(PLATS_PAR_DEFAUT));
      return [...PLATS_PAR_DEFAUT];
    }
    return parsed;
  } catch {
    return [...PLATS_PAR_DEFAUT];
  }
}

function saveProducts() {
  try {
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(products));
    return true;
  } catch {
    alert("Erreur lors de l'enregistrement dans le navigateur.");
    return false;
  }
}

function renderProducts() {
  productList.innerHTML = "";

  const filtered = products.filter(p => {
    if (adminFilterCategory === "tous") return true;
    const cat = (p.category || "").toLowerCase();
    return cat === adminFilterCategory;
  });

  productCount.textContent = `${products.length} plat${products.length > 1 ? "s" : ""} au menu`;
  emptyProductMessage.hidden = filtered.length !== 0;

  filtered.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const imgSrc = product.image && product.image.trim() !== "" ? product.image : "images/poulet.jpg";
    const badgeText = product.badge || "";
    const isAvail = product.available !== false;

    card.innerHTML = `
      <div class="product-card-img-wrap">
        <img src="${imgSrc}" alt="${product.name}" loading="lazy" onerror="this.onerror=null; this.src='images/poulet.jpg';">
        ${badgeText ? `<span class="product-badge">${badgeText}</span>` : ""}
      </div>
      <h3>${product.name}</h3>
      <p class="price">${formaterPrix(product.price)} FCFA</p>
      <p class="category">${getCategoryLabel(product.category)}</p>
      <p class="desc">${product.description || "Aucune description"}</p>
      <div class="status-wrap">
        <span class="status ${isAvail ? "" : "unavailable"}">
          ${isAvail ? "Disponible" : "En rupture"}
        </span>
      </div>
      <div class="card-actions">
        <button type="button" class="btn-toggle-avail" title="Changer la disponibilité">
          ${isAvail ? "Mettre en rupture" : "Rendre disponible"}
        </button>
        <button type="button" class="edit-button">Modifier</button>
        <button type="button" class="delete-button">Supprimer</button>
      </div>
    `;

    // Événements
    card.querySelector(".btn-toggle-avail").addEventListener("click", () => {
      toggleProductAvailability(product.id);
    });

    card.querySelector(".edit-button").addEventListener("click", () => {
      editProduct(product.id);
    });

    card.querySelector(".delete-button").addEventListener("click", () => {
      deleteProduct(product.id);
    });

    productList.appendChild(card);
  });

  populateQuickSaleDishes();
}

function getCategoryLabel(cat) {
  switch ((cat || "").toLowerCase()) {
    case "plats": return "Plats traditionnels & Riz";
    case "grillades": return "Grillades & Viandes";
    case "boissons": return "Boissons locales & Jus";
    case "desserts": return "Desserts & Douceurs";
    default: return cat || "Plat";
  }
}

function toggleProductAvailability(id) {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return;
  products[index].available = !(products[index].available !== false);
  saveProducts();
  renderProducts();
}

function editProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  idInput.value = product.id;
  nameInput.value = product.name;
  priceInput.value = product.price;
  categoryInput.value = product.category || "plats";
  descriptionInput.value = product.description || "";
  badgeInput.value = product.badge || "";
  imageInput.value = product.image || "";
  availableInput.checked = product.available !== false;

  formTitle.textContent = `Modifier « ${product.name} »`;
  saveButton.textContent = "Enregistrer les modifications";
  cancelButton.hidden = false;

  switchTab("nouveau-plat");
}

function deleteProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  if (!confirm(`Voulez-vous retirer « ${product.name} » du catalogue ?`)) {
    return;
  }

  products = products.filter(p => p.id !== id);
  saveProducts();
  renderProducts();
}

function resetForm() {
  form.reset();
  idInput.value = "";
  formTitle.textContent = "Ajouter un plat au menu";
  saveButton.textContent = "Enregistrer le plat";
  cancelButton.hidden = true;
  availableInput.checked = true;
}

// Soumission du formulaire plat
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const price = Number(priceInput.value);
  const category = categoryInput.value;
  const description = descriptionInput.value.trim();
  const badge = badgeInput.value;
  const image = imageInput.value.trim();
  const available = availableInput.checked;

  if (!name || isNaN(price) || price <= 0) {
    alert("Veuillez renseigner un nom et un prix valide en FCFA.");
    return;
  }

  if (idInput.value) {
    const index = products.findIndex(p => p.id === idInput.value);
    if (index !== -1) {
      products[index] = {
        ...products[index],
        name,
        price,
        category,
        description,
        badge,
        image,
        available
      };
    }
  } else {
    products.push({
      id: "plat-" + Date.now(),
      name,
      price,
      category,
      description,
      badge,
      image,
      rating: "5.0 (Nouveau)",
      available
    });
  }

  if (saveProducts()) {
    renderProducts();
    resetForm();
    alert(`Le plat « ${name} » a été enregistré dans le catalogue.`);
    switchTab("catalogue");
  }
});

cancelButton.addEventListener("click", () => {
  resetForm();
  switchTab("catalogue");
});

// =========================================================
// GESTION DES FINANCES & COMMANDES
// =========================================================

function loadOrders() {
  try {
    const saved = localStorage.getItem(STORAGE_ORDERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveOrders() {
  try {
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(orders));
    return true;
  } catch {
    alert("Impossible d'enregistrer les finances.");
    return false;
  }
}

function renderFinances() {
  orders = loadOrders();

  const totalCA = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const totalCommandes = orders.length;

  const nomsClients = orders
    .map(o => (o.clientNom || "").trim().toLowerCase())
    .filter(n => n && n !== "client sur place" && n !== "client au comptoir");
  const clientsUniques = new Set(nomsClients).size;
  const clientsTotalComptoir = orders.filter(o => {
    const n = (o.clientNom || "").toLowerCase();
    return n === "client sur place" || n === "client au comptoir";
  }).length;
  const nombreClientsFinal = clientsUniques + clientsTotalComptoir;

  const panierMoyen = totalCommandes > 0 ? Math.round(totalCA / totalCommandes) : 0;

  let totalPlatsVendus = 0;
  orders.forEach(o => {
    if (Array.isArray(o.items)) {
      totalPlatsVendus += o.items.reduce((acc, it) => acc + (Number(it.quantite) || 1), 0);
    } else {
      totalPlatsVendus += 1;
    }
  });

  document.getElementById("kpi-ca").innerHTML = `${formaterPrix(totalCA)} <small>FCFA</small>`;
  document.getElementById("kpi-clients").textContent = `${totalCommandes} commande${totalCommandes > 1 ? "s" : ""}`;
  document.getElementById("kpi-clients-details").textContent = `${nombreClientsFinal} client${nombreClientsFinal > 1 ? "s" : ""} unique${nombreClientsFinal > 1 ? "s" : ""}`;
  document.getElementById("kpi-panier-moyen").innerHTML = `${formaterPrix(panierMoyen)} <small>FCFA</small>`;
  document.getElementById("kpi-plats-vendus").textContent = `${totalPlatsVendus} portion${totalPlatsVendus > 1 ? "s" : ""}`;

  const tbody = document.getElementById("orders-tbody");
  const emptyOrdersMsg = document.getElementById("empty-orders-msg");
  tbody.innerHTML = "";

  if (orders.length === 0) {
    emptyOrdersMsg.hidden = false;
    return;
  }

  emptyOrdersMsg.hidden = true;

  orders.forEach(order => {
    const tr = document.createElement("tr");

    let platsResume = "";
    if (Array.isArray(order.items) && order.items.length > 0) {
      platsResume = order.items.map(it => `<strong>${it.quantite}x</strong> ${it.nom}`).join("<br>");
    } else {
      platsResume = order.details || "Plats divers";
    }

    const clientContact = [order.clientTel, order.clientAdresse].filter(Boolean).join(" • ");

    tr.innerHTML = `
      <td><span class="order-ref">${order.id || "CMD"}</span></td>
      <td><span class="order-date">${order.dateStr || "Récemment"}</span></td>
      <td>
        <div class="order-client-name">${order.clientNom || "Client"}</div>
        ${clientContact ? `<div class="order-client-tel">${clientContact}</div>` : ""}
      </td>
      <td><div class="order-items-list">${platsResume}</div></td>
      <td><strong class="order-amount">${formaterPrix(order.total)} FCFA</strong></td>
      <td>
        <span class="order-badge-source ${order.source && order.source.includes('WhatsApp') ? 'badge-whatsapp' : 'badge-pos'}">
          ${order.source || 'En ligne'}
        </span>
      </td>
      <td>
        <button type="button" class="btn-delete-order" title="Supprimer cette commande" data-id="${order.id}">
          ✕
        </button>
      </td>
    `;

    tr.querySelector(".btn-delete-order").addEventListener("click", () => {
      deleteOrder(order.id);
    });

    tbody.appendChild(tr);
  });
}

function deleteOrder(id) {
  if (!confirm("Voulez-vous supprimer cette commande de l'historique ?")) return;
  orders = orders.filter(o => o.id !== id);
  saveOrders();
  renderFinances();
}

// Vente rapide / Sur place au comptoir
function populateQuickSaleDishes() {
  const select = document.getElementById("sale-dish");
  if (!select) return;

  const currentVal = select.value;
  select.innerHTML = '<option value="">-- Sélectionner un plat --</option>';

  products.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.name;
    opt.dataset.price = p.price;
    opt.textContent = `${p.name} (${formaterPrix(p.price)} FCFA)`;
    select.appendChild(opt);
  });

  if (currentVal) select.value = currentVal;
}

const quickSaleForm = document.getElementById("quick-sale-form");
if (quickSaleForm) {
  quickSaleForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const dishSelect = document.getElementById("sale-dish");
    const qtyInput = document.getElementById("sale-qty");
    const clientInput = document.getElementById("sale-client");
    const paymentSelect = document.getElementById("sale-payment");

    const dishName = dishSelect.value;
    const qty = Number(qtyInput.value) || 1;
    const clientName = clientInput.value.trim() || "Client sur place";
    const payment = paymentSelect.value;

    if (!dishName) {
      alert("Veuillez sélectionner un plat.");
      return;
    }

    const selectedOption = dishSelect.options[dishSelect.selectedIndex];
    const unitPrice = Number(selectedOption.dataset.price) || 0;
    const total = unitPrice * qty;

    const now = new Date();
    const newOrder = {
      id: "VENTE-" + Math.floor(1000 + Math.random() * 9000),
      clientNom: clientName,
      clientTel: "-",
      clientAdresse: "Comptoir",
      date: now.toISOString(),
      dateStr: "Aujourd'hui, " + now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      total: total,
      items: [
        { nom: dishName, prix: unitPrice, quantite: qty, sousTotal: total }
      ],
      statut: "Payée",
      source: `Sur place (${payment})`
    };

    orders.unshift(newOrder);
    saveOrders();
    renderFinances();

    dishSelect.value = "";
    qtyInput.value = "1";
    alert(`Vente enregistrée : ${formaterPrix(total)} FCFA`);
  });
}

// Boutons d'actions financières
document.getElementById("btn-seed-orders").addEventListener("click", () => {
  if (confirm("Charger 3 commandes d'exemple pour tester les statistiques financières ?")) {
    orders = [...COMMANDES_EXEMPLES, ...orders];
    saveOrders();
    renderFinances();
  }
});

document.getElementById("btn-reset-finances").addEventListener("click", () => {
  if (confirm("Voulez-vous réinitialiser tout l'historique financier ?")) {
    orders = [];
    saveOrders();
    renderFinances();
  }
});

document.getElementById("btn-reset-catalog").addEventListener("click", () => {
  if (confirm("Restaurer les plats originaux dans le catalogue ?")) {
    products = [...PLATS_PAR_DEFAUT];
    saveProducts();
    renderProducts();
    alert("Carte restaurée avec succès.");
  }
});

document.getElementById("btn-add-shortcut").addEventListener("click", () => {
  resetForm();
  switchTab("nouveau-plat");
});

// Filtres de catégories dans l'admin
const categoryPills = document.querySelectorAll("#admin-category-filters .pill");
categoryPills.forEach(pill => {
  pill.addEventListener("click", () => {
    categoryPills.forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    adminFilterCategory = pill.dataset.filter;
    renderProducts();
  });
});

// Présélection d'images locales
document.querySelectorAll(".preset-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    imageInput.value = btn.dataset.img;
  });
});

// =========================================================
// GESTION DES ONGLETS
// =========================================================

function switchTab(tabId) {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });

  document.querySelectorAll(".tab-content").forEach(content => {
    content.classList.toggle("active", content.id === `tab-${tabId}`);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    switchTab(btn.dataset.tab);
  });
});

function formaterPrix(nombre) {
  return Number(nombre || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// =========================================================
// INITIALISATION
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  products = loadProducts();
  renderProducts();
  renderFinances();
});
