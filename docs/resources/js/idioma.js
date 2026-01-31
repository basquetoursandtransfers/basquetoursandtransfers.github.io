document.addEventListener("DOMContentLoaded", function () {
    // Detectar idioma del navegador (no usamos localStorage)
    const idiomaNavegador = navigator.language.slice(0, 2);//SE MANTIENE
    const idiomasSoportados = ["es", "en", "fr", "ru", "ja", "ar", "zh"];//SE MANTIENE
    const idiomaGuardado = localStorage.getItem("idioma");

    // const idiomaActual = idiomasSoportados.includes(idiomaNavegador) ? idiomaNavegador : "es";

    const idiomaActual = idiomasSoportados.includes(idiomaGuardado) ? idiomaGuardado
            : (idiomasSoportados.includes(idiomaNavegador) ? idiomaNavegador : "es");

    // Cargar idioma
    cargarIdioma(idiomaActual);
    actualizarBandera(idiomaActual);

    // Eventos para cambiar idioma manualmente
    document.querySelectorAll(".lang-selector").forEach(boton => {
        boton.addEventListener("click", (e) => {
            e.preventDefault();
            const nuevoIdioma = boton.dataset.lang;
            // ✅ Guardar idioma para que el formulario lo lea
            localStorage.setItem("idioma", nuevoIdioma);
            cargarIdioma(nuevoIdioma);
            actualizarBandera(nuevoIdioma);
        });
    });
});

function cargarIdioma(codigoIdioma) {
    //fetch(`resources/i18n/${codigoIdioma}.json`)
     fetch(`resources/i18n/${codigoIdioma}.json?v=${Date.now()}`)
            .then(response => {
                if (!response.ok)
                    throw new Error(`No se encontró el archivo: ${codigoIdioma}.json`);
                return response.json();
            })
            .then(textos => {
                traducirPagina(textos);
            })
            .catch(error => {
                console.error("Error al cargar archivo de idioma:", error);
            });
}
function traducirPagina(textos) {
    document.querySelectorAll("[data-i18n]").forEach(elemento => {
        const clave = elemento.getAttribute("data-i18n");
        const textoTraducido = textos[clave];
        if (!textoTraducido)
            return;

        if (elemento.tagName === "INPUT" || elemento.tagName === "TEXTAREA") {
            elemento.placeholder = textoTraducido;
        } else if (elemento.tagName === "OPTION") {
            elemento.textContent = textoTraducido;
        } else {
            elemento.innerText = textoTraducido;
        }
    });
}


function actualizarBandera(codigoIdioma) {
    const bandera = {
        es: "resources/img/banderaEsp.jpg",
        en: "resources/img/banderaBrit.jpg",
        fr: "resources/img/banderaFrancia.jpg",
        ru: "resources/img/banderaRusa.jpg",
        ja: "resources/img/banderaJap.jpg",
        ar: "resources/img/banderaArabiaSaudi.jpg",
        zh: "resources/img/banderaChina.jpg"
    };

//  const imgBandera = document.querySelector("#idiomaDropdown img");
    const imgBandera = document.getElementById("banderaActual");
    if (imgBandera && bandera[codigoIdioma]) {
        imgBandera.src = bandera[codigoIdioma];
        imgBandera.alt = codigoIdioma;
    }
}


