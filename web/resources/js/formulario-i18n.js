document.addEventListener("DOMContentLoaded", async function () {
  const idiomasSoportados = ["es", "en", "fr", "ru", "ja", "ar", "zh"];
  const guardado = localStorage.getItem("idioma");
  const nav = navigator.language.slice(0, 2);

  const lang = idiomasSoportados.includes(guardado)
    ? guardado
    : (idiomasSoportados.includes(nav) ? nav : "es");

  try {
    const response = await fetch(`resources/i18n/${lang}.json`);
    if (!response.ok) throw new Error("No se encontró el JSON");
    const traducciones = await response.json();

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const clave = el.getAttribute("data-i18n");
      if (!traducciones[clave]) return;

      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = traducciones[clave];
      } else if (el.tagName === "OPTION") {
        el.textContent = traducciones[clave];
      } else {
        el.innerText = traducciones[clave];
      }
    });

    const detalles = document.getElementById("detalles");
    if (detalles && traducciones.formPlaceholderDetalles) {
      detalles.placeholder = traducciones.formPlaceholderDetalles;
    }
  } catch (error) {
    console.error("❌ Error cargando traducciones del formulario", error);
  }
});



