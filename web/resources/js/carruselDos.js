
// Lista de imágenes para los tours
const tourImages = [
    "CostaB.jpeg",
    "cadavedo.jpg",
    "CostaV.jpeg",
    "Seleccion_Marques_Riscal.jpg",
    "JSB1.jpg",
    "Imagen2a1.jpeg",
    "ImgEmbarc.jpeg",
    "jsb_panoramica.jpeg",
    "Seleccion_.jpg",
    "Seleccion_Ysios.jpg",
    "Seleccion_Orio.jpg",
    "Flysch.jpg",
    "Claustro.jpg",
    "Lourdes.jpg",
    "Anboto1.jpg",
    "Etxebarri.jpg",
    "aixerrota.jpg",
    "Bodega.jpg",
    "Boroa.jpg",
    "Carcassone3.jpg",
    "Castro.jpg",
    "Comida5.jpg",
    "Cudillero.jpg",
    "faro.jpg",
    "dolmen.jpg",
    "vides.jpg",
    "Getaria.jpg",
    "granja.jpg",
    "baiona.jpg",
    "Horreo.jpg",
    "flysch2.jpg",
    "encartaciones.jpg",
    "catalina.jpg",
    "gaviota.jpg",
    "Trasl1a.jpeg"

];

//// esto que sigue funcina bien pero no tiene zoom
//const container = document.getElementById("tour-slides");
//if (container) {
//    tourImages.forEach(name => {
//        console.log("Cargando imagen:", name);
//
//        const slide = document.createElement("div");
//        slide.classList.add("swiper-slide");
//
//        const img = document.createElement("img");
//        img.src = `resources/img/${name}`;
//        img.className = "img-fluid rounded-3 shadow-sm";
//        img.alt = name.split(".")[0];
//        slide.appendChild(img);
//        container.appendChild(slide);
//    });
//}
//
//    
//    // Calcular delay dinámico según tamaño de pantalla
//const screenWidth = window.innerWidth;
//const autoplayDelay = screenWidth < 576 ? 1500 : 3000; // más rápido en móvil
//
//const swiper = new Swiper(".mySwiper", {
//    loop: true,
//    autoplay: {
//        delay: autoplayDelay,
//        disableOnInteraction: false
//    },
//    spaceBetween: 30,
//    pagination: {
//        el: ".swiper-pagination",
//        clickable: true
//    },
//    navigation: {
//        nextEl: ".swiper-button-next",
//        prevEl: ".swiper-button-prev"
//    },
//    breakpoints: {
//        576: { slidesPerView: 1 },
//        768: { slidesPerView: 2 },
//        992: { slidesPerView: 3 }
//    }
//     
//    
//});

//a partir de aqui intentando con zoom
//1) Referencias al modal (debe existir ya en tu index.html)
const modal    = document.getElementById("img-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.getElementById("modal-close");

// 2) Generar e insertar las slides en el contenedor
const container = document.getElementById("tour-slides");
if (container) {
  tourImages.forEach(name => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    // Envoltorio para habilitar Zoom nativo de Swiper
    const zoomWrapper = document.createElement("div");
    zoomWrapper.classList.add("swiper-zoom-container");

    // Imagen
    const img = document.createElement("img");
    img.src = `resources/img/${name}`;
    img.className = "img-fluid rounded-3 shadow-sm";
    img.alt = name.split(".")[0];
    img.style.cursor = "pointer";

    zoomWrapper.appendChild(img);
    slide.appendChild(zoomWrapper);
    container.appendChild(slide);
  });
}

// 3) Calcular un autoplayDelay distinto para móviles (<576px)
const autoplayDelay = window.innerWidth < 576 ? 1500 : 3000;

// 4) Inicializar Swiper (bundle incluye Autoplay + Zoom)
const swiper = new Swiper(".mySwiper", {
  // Muestra 3 slides por defecto (se ajusta en breakpoints)
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,

  // Autoplay con delay dinámico
  autoplay: {
    delay: autoplayDelay,
    disableOnInteraction: false
  },

  // Zoom nativo: doble-tap o pellizcar
  zoom: {
    maxRatio: 3
  },

  // Paginación y flechas
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },

  // Ajuste de slides por vista según ancho de pantalla
  breakpoints: {
    576: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  },

  // Para que Detecte las slides que acabas de inyectar
  observer: true,
  observeParents: true,
  observeSlideChildren: true
});

// Asegurarnos de que el autoplay arranque
swiper.autoplay.start();

// 5) Cuando el usuario haga clic en cualquiera de las imágenes:
if (container) {
  container.querySelectorAll("img").forEach(img => {
    img.addEventListener("click", () => {
      // 5.1) Detén el autoplay
      swiper.autoplay.stop();
      // 5.2) Muestra el modal con la imagen ampliada
      modalImg.src        = img.src;
      modalImg.alt        = img.alt;
      modal.style.display = "flex";
    });
  });
}

// 6) Función para cerrar modal y reiniciar autoplay
function closeModal() {
  modal.style.display = "none";
  swiper.autoplay.start();
}

// 7) Listeners para cerrar el modal
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});