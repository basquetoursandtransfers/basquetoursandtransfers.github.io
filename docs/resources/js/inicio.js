function hideCookieBanner() {
    const banner = document.getElementById("cookie-banner");
    if (banner)
        banner.style.display = "none";
}

function showCookieBanner() {
    const banner = document.getElementById("cookie-banner");
    if (banner)
        banner.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
    const choice = localStorage.getItem("cookiesAccepted");

    // Si todavía no hay elección, mostramos banner
    if (!choice)
        showCookieBanner();

    // Botones
    const btnAccept = document.getElementById("btn-accept-cookies");
    const btnReject = document.getElementById("btn-reject-cookies");

    if (btnAccept) {
        btnAccept.addEventListener("click", function () {
            localStorage.setItem("cookiesAccepted", "true");
            hideCookieBanner();
            // Aquí cargarías analytics en el futuro si quieres
        });
    }

    if (btnReject) {
        btnReject.addEventListener("click", function () {
            localStorage.setItem("cookiesAccepted", "false");
            hideCookieBanner();
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const enlacesCorreo = [document.getElementById("correoLink"), document.getElementById("iconoCorreo")];

    enlacesCorreo.forEach(correoLink => {
        if (!correoLink) return;
        correoLink.href = isMobile
                ? "mailto:info@basquetoursandtransfers.com"
                : "https://mail.google.com/mail/?view=cm&fs=1&to=info@basquetoursandtransfers.com&tf=cm";
        correoLink.target = "_blank"; // se abre en nueva pestaña, opcional
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnSolicitarPresupuesto")?.addEventListener("click", function () {
        window.location.href = "formulario.html";
    });
});
