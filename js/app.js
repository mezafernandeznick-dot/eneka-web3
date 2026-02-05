// js/app.js

/* =========================
   SIDEBAR (HOME)
========================= */
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

if (menuBtn && sidebar) {
  menuBtn.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

/* =========================
   HERO CAROUSEL (HOME)
========================= */
const heroImages = [
  "assets/hero/c1024ee73ed778be6acfbe541aa229ab.jpg",
  "assets/hero/95356fd17b421b5f74bd2981b0c23eb8.jpg",
  "assets/hero/b38ad1d3d72e703a3e0668a03a83364c.jpg",
  "assets/hero/28a1a64ba22537335d38cb511bb6df21.jpg",
  "assets/hero/725b77cf1f40d0666beea3c7496273fd.jpg",
  "assets/hero/c261f89e2964ea13d75f0c6575b8ee27.jpg",
  "assets/hero/08acf2f2967bb18087b68a808c73296c.jpg",
  "assets/hero/dbe2c615deaaf40ea1eb38dcafaffda1.jpg",
  "assets/hero/aa318fb8974125eeef26d8a68266b681.jpg",
  "assets/hero/589b472da8d0c172c06884199f4d1762.jpg",
  "assets/hero/7789645ae0737f0412453e2bf0d87126.jpg",
  "assets/hero/1c68ddf282caf016c89b142bf4096c75.jpg",
];

(function () {
  const ul = document.getElementById("heroSlides");
  if (!ul || !heroImages.length) return;

  ul.setAttribute("aria-hidden", "false");
  ul.style.display = "block";

  heroImages.forEach((src, i) => {
    const li = document.createElement("li");
    li.style.cssText = "position:absolute; inset:0;";
    const img = document.createElement("img");
img.alt = "";

img.onerror = () => {
  li.remove(); // elimina imágenes rotas
};

img.src = src;

    img.style.cssText =
      "width:100%; height:100%; object-fit:cover; display:block; filter:contrast(1.02) saturate(1.02)";
    li.style.opacity = i ? 0 : 1;
    li.style.transition = "opacity .6s";
    li.appendChild(img);
    ul.appendChild(li);
  });

  let i = 0;
  setInterval(() => {
    const items = [...ul.children];
    items.forEach((el, idx) => (el.style.opacity = idx === i ? 1 : 0));
    i = (i + 1) % items.length;
  }, 4000);
})();

/* =========================
   ACTIVE CATEGORY (SIDEBAR)
========================= */
(function () {
  const path = location.pathname.split("/").pop() || "index.html";
  const slug = path.replace(".html", "");
  document.querySelectorAll(".sidebar a[data-cat]").forEach((a) => {
    if (a.dataset.cat === slug) a.classList.add("active");
  });
})();

/* =========================
   TILES UNIFORMES (HOME)
========================= */
(function () {
  function uniformTiles() {
    const allImgs = Array.from(document.querySelectorAll(".tile-link .tile-img"));
    if (!allImgs.length) return;

    const refImg = allImgs[0];

    function applyWith(img) {
      const w = img.naturalWidth,
        h = img.naturalHeight;
      if (w > 0 && h > 0) {
        const ratio = `${w} / ${h}`;
        document.querySelectorAll(".tile-link").forEach((wrap) => {
          wrap.style.aspectRatio = ratio;
        });
      }
    }

    if (refImg.complete && refImg.naturalWidth) {
      applyWith(refImg);
    } else {
      refImg.addEventListener("load", () => applyWith(refImg), { once: true });
    }
  }

  window.addEventListener("DOMContentLoaded", uniformTiles);
  window.addEventListener("load", uniformTiles);
})();

/* =========================
   LIGHTBOX UNIVERSAL
========================= */
(function () {
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-label", "Visor de imagen");

  lb.innerHTML = `
    <button class="lightbox__close" aria-label="Cerrar (Esc)">✕</button>
    <img class="lightbox__img" alt="">
  `;

  document.body.appendChild(lb);

  const imgEl = lb.querySelector(".lightbox__img");
  const btnClose = lb.querySelector(".lightbox__close");

  function open(src, alt = "") {
    imgEl.src = src;
    imgEl.alt = alt;
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
    btnClose.focus();
  }

  function close() {
    lb.classList.remove("open");
    imgEl.src = "";
    imgEl.alt = "";
    document.body.style.overflow = "";
  }

  btnClose.addEventListener("click", close);
  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  function bindImages() {
    const selector =
      ".product-images img, .gallery img, .lifestyle-images img, .thumbs img, .main-image img";

    document.querySelectorAll(selector).forEach((img) => {
      img.style.cursor = "zoom-in";
      img.setAttribute("tabindex", "0");

      img.addEventListener("click", () =>
        open(img.currentSrc || img.src, img.alt || "")
      );

      img.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(img.currentSrc || img.src, img.alt || "");
        }
      });
    });
  }

  window.addEventListener("DOMContentLoaded", bindImages);
  window.addEventListener("load", bindImages);
})();
