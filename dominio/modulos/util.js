export function mostrarError(idCampo, mensaje) {
    const campo = document.getElementById(idCampo);
    const error = document.getElementById("error-" + idCampo);

    campo.classList.add("campo-error");
    error.textContent = mensaje;
}

export function limpiarError(idCampo) {
    const campo = document.getElementById(idCampo);
    const error = document.getElementById("error-" + idCampo);

    campo.classList.remove("campo-error");
    error.textContent = "";
}