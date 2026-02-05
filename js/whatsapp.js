// js/whatsapp.js
function comprar(nombre) {
  const telefono = "51927208885";

  // Precio real desde la tarjeta
  const productCard = event.target.closest(".product-info");
  const priceEl = productCard.querySelector(".product-price");
  const precio = priceEl ? priceEl.textContent.replace("S/", "").trim() : "";

  // Imagen principal visible
  const mainImage =
    productCard.parentElement.querySelector(".main-image img") ||
    productCard.parentElement.querySelector(".lifestyle-images img");

  const imgSrc = mainImage ? mainImage.getAttribute("src") : "";

  // URL absoluta (GitHub Pages / local)
  const base =
    window.location.origin +
    window.location.pathname.split("/").slice(0, -1).join("/");

  const imgUrl = imgSrc ? `${base}/${imgSrc}` : "";

  const mensaje =
    `Hola 👋, estoy interesado en este producto:%0A%0A` +
    `🛍️ ${nombre}%0A` +
    `💰 Precio: S/ ${precio}%0A%0A` +
    `📸 Imagen:%0A${imgUrl}`;

  const url = `https://wa.me/${telefono}?text=${mensaje}`;
  window.open(url, "_blank", "noopener");
}
