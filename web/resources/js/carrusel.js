
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

//// Contenedor donde se insertarán las imágenes
const container = document.getElementById("tour-slides");
if (container) {
    tourImages.forEach(name => {
        console.log("Cargando imagen:", name);

        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        const img = document.createElement("img");
        img.src = `resources/img/${name}`;
        img.className = "img-fluid rounded-3 shadow-sm";
        img.alt = name.split(".")[0];

        slide.appendChild(img);
        container.appendChild(slide);
    });
}

// Inicializar el carrusel Swiper, esto es sin calcular el tiempo según pantalla
//const swiper = new Swiper(".mySwiper", {
//    slidesPerView: 3,
//    spaceBetween: 30,
//    loop: true,
//    autoplay: {
//        delay: 3000,
//        disableOnInteraction: false
//    },
//    pagination: {
//        el: ".swiper-pagination",
//        clickable: true
//    },
//    navigation: {
//        nextEl: ".swiper-button-next",
//        prevEl: ".swiper-button-prev"
//    },
//    breakpoints: {
//        992: {slidesPerView: 3},
//        768: {slidesPerView: 2},
//        576: {slidesPerView: 1}
//    }
    
    
    // Calcular delay dinámico según tamaño de pantalla
const screenWidth = window.innerWidth;
const autoplayDelay = screenWidth < 576 ? 1500 : 3000; // más rápido en móvil

const swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
        delay: autoplayDelay,
        disableOnInteraction: false
    },
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    breakpoints: {
        576: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 }
    }
     
    
});

