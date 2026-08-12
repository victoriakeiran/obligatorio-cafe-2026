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

export function formatearPesos(valor) {
    return `$${Number(valor).toFixed(2)}`;
}

export function crearBoton(texto, clase, accion, codigo) {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.textContent = texto;
    boton.className = clase;
    boton.dataset.accion = accion;
    boton.dataset.codigo = codigo;
    return boton;
}