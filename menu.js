// Compatibilité : si un élément #liste-plats est présent sur la page
const listePlats = document.getElementById("liste-plats");

function afficherPlats() {
  if (!listePlats) return;
  const produits = JSON.parse(
    localStorage.getItem("delicesDuFasoProducts") || "[]"
  );

  listePlats.replaceChildren();

  produits.forEach((plat) => {
    const carte = document.createElement("article");
    carte.className = "carte-plat";

    if (plat.image) {
      const image = document.createElement("img");
      image.src = plat.image;
      image.alt = plat.name;
      image.style.width = "100%";
      image.style.maxWidth = "250px";
      carte.appendChild(image);
    }

    const nom = document.createElement("h3");
    nom.textContent = plat.name;

    const prix = document.createElement("p");
    prix.textContent = `${plat.price} FCFA`;

    carte.append(nom, prix);

    if (plat.available !== false) {
      listePlats.appendChild(carte);
    }
  });
}

if (listePlats) {
  afficherPlats();
}
