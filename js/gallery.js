// js/gallery.js
document.addEventListener("DOMContentLoaded", () => {
  const mainImg = document.getElementById("mainProductImage");
  const thumbs = Array.from(document.querySelectorAll(".thumbs img"));

  // Flechas (más tolerante)
  const btnLeft = document.querySelector(".arrow.left, .arrow-left");
  const btnRight = document.querySelector(".arrow.right, .arrow-right");

  if (!mainImg || thumbs.length === 0) return;

  let currentIndex = 0;
  const images = thumbs.map(img => img.src);

  function updateImage(index) {
    currentIndex = index;
    mainImg.src = images[currentIndex];

    thumbs.forEach((img, i) => {
      img.classList.toggle("active", i === currentIndex);
    });
  }

  // Imagen inicial
  updateImage(0);

  // Click en miniaturas
  thumbs.forEach((img, index) => {
    img.addEventListener("click", () => updateImage(index));
  });

  // Flecha izquierda
  if (btnLeft) {
    btnLeft.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      updateImage(
        currentIndex === 0 ? images.length - 1 : currentIndex - 1
      );
    });
  }

  // Flecha derecha
  if (btnRight) {
    btnRight.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      updateImage(
        currentIndex === images.length - 1 ? 0 : currentIndex + 1
      );
    });
  }
});
