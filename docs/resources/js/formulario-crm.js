(() => {
    "use strict";

    const WORKER_URL =
        "https://crm-btt-inbox.basquetoursandtransfers.workers.dev";

    const formulario = document.getElementById("presupuestoForm");

    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", () => {
        try {
            const datos = new FormData(formulario);
            const hora = obtenerTexto(datos, "hora");
            const minutos = obtenerTexto(datos, "minutos").padStart(2, "0");

            const solicitud = {
                submissionId: crearIdentificador(),
                name: obtenerTexto(datos, "nombre"),
                email: obtenerTexto(datos, "email"),
                phone: obtenerTexto(datos, "telefono"),
                serviceType: convertirTipoServicio(
                    obtenerTexto(datos, "servicio")
                ),
                requestedVehicle: obtenerOpcional(datos, "vehiculo"),
                serviceDate: obtenerOpcional(datos, "fecha"),
                serviceTime: hora
                    ? `${hora}:${minutos || "00"}`
                    : null,
                origin: obtenerOpcional(datos, "origen"),
                destination: obtenerOpcional(datos, "destino"),
                passengerCount: obtenerNumero(datos, "pasajeros"),
                luggageDescription: null,
                message: obtenerOpcional(datos, "detalles"),
                sourcePage: window.location.href.split("#")[0],
                language: (
                    document.documentElement.lang || "es"
                ).slice(0, 5),
                website: ""
            };

            fetch(`${WORKER_URL}/api/v1/public/inquiries`, {
                method: "POST",
                mode: "cors",
                credentials: "omit",
                keepalive: true,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(solicitud)
            }).catch(() => {
                // La copia al CRM nunca bloquea ni modifica Formspree.
            });
        } catch {
            // Cualquier fallo local deja intacto el envío a Formspree.
        }
    }, { capture: true });

    function obtenerTexto(datos, nombre) {
        return String(datos.get(nombre) || "").trim();
    }

    function obtenerOpcional(datos, nombre) {
        return obtenerTexto(datos, nombre) || null;
    }

    function obtenerNumero(datos, nombre) {
        const valor = obtenerTexto(datos, nombre);

        if (!valor) {
            return null;
        }

        const numero = Number(valor);
        return Number.isInteger(numero) ? numero : null;
    }

    function convertirTipoServicio(valor) {
        const normalizado = valor
            .trim()
            .toLocaleLowerCase("es");

        return {
            "traslados": "TRANSFER",
            "tours": "PRIVATE_TOUR",
            "disposiciones": "CHAUFFEUR_SERVICE"
        }[normalizado] || "OTHER";
    }

    function crearIdentificador() {
        if (
            window.crypto &&
            typeof window.crypto.randomUUID === "function"
        ) {
            return window.crypto.randomUUID();
        }

        return `web-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 12)}`;
    }
})();

