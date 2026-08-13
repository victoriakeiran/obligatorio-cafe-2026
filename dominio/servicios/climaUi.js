export function mostrarMensaje(texto, tipo = 'success') {
    const mensaje = document.querySelector('#mensaje');

    if (mensaje === null) {
        return;
    }

    mensaje.textContent = texto;
    mensaje.className = `alert alert-${tipo}`;
    mensaje.classList.remove('d-none');
}

export function ocultarMensaje() {
    const mensaje = document.querySelector('#mensaje');

    if (mensaje !== null) {
        mensaje.classList.add('d-none');
    }
}