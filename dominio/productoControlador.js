import { Producto } from "./clases/Producto.js";
import { Memoria } from "./servicios/Memoria.js";
import { mostrarError, limpiarError } from "./modulos/util.js";

let productos = [];
let ventas = [];
let codigoProductoAEliminar = null;

function CargoDatosProductos(){
    const LaMemoria = new Memoria();
    productos = LaMemoria.leer('productos');
    ventas = LaMemoria.leer('ventas');
    
    if(!productos){
        productos = [];
    }

    if (!ventas) {
        ventas = [];
        
    }

    InicializarProducto();
    ListarProductos();
}

function ListarProductos(){
    let lista = document.getElementById('lista-productos').options;
    lista.length = 0;

    for (let objProducto of productos) {
        let texto = 'Codigo: ' + objProducto.codigo + ' : Nombre: ' + objProducto.nombre 
        + ' - Precio: ' + objProducto.precio + ' - Stock: ' + objProducto.stock;
        let elemento = new Option(texto, objProducto.codigo);
        lista.add(elemento);
    }
}

function InicializarProducto(){
    limpiarError("codigo");
    limpiarError("nombre");
    limpiarError("descripcion");
    limpiarError("precio");
    limpiarError("stock");
    limpiarError("lista-productos");

    document.getElementById("lista-productos").selectedIndex = -1;
    
    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("codigo").disabled = false;

    document.getElementById("codigo").focus();
    let mayorCodigo = 0;

    for (let unProducto of productos) {
        if (Number(unProducto.codigo) > mayorCodigo) {
            mayorCodigo = Number(unProducto.codigo);
        }
    }

    document.getElementById("codigo").value = mayorCodigo + 1;
}

function AgregarProducto(){
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let precio = parseFloat(document.getElementById("precio").value);
    let stock = parseInt(document.getElementById("stock").value);

    limpiarError("codigo");
    limpiarError("nombre");
    limpiarError("descripcion");
    limpiarError("precio");
    limpiarError("stock");

    let hayError = false;

    if (codigo === "") {
        mostrarError("codigo", "El código es obligatorio.");
        hayError = true;
    }

    if (nombre === "") {
        mostrarError("nombre", "El nombre es obligatorio.");
        hayError = true;
    }

    if (descripcion === "") {
        mostrarError("descripcion", "La descripción es obligatoria.");
        hayError = true;
    }

    if (hayError) {
        return;
    }

    if (isNaN(precio) || precio <= 0) {
        mostrarError("precio", "El precio debe ser mayor a 0.");
        hayError = true;
    }

    if (isNaN(stock) || stock <= 0) {
        mostrarError("stock", "El stock debe ser mayor a 0.");
        hayError = true;
    }

    if (hayError) {
        return;
    }

    if (BuscarProducto(codigo) != null) {
        mostrarError("codigo", "Ya existe un producto con ese código.");
        return;
    }

    let unProducto = new Producto(codigo, nombre, descripcion, precio, stock);
    productos.push(unProducto);

    const LaMemoria = new Memoria();
    LaMemoria.escribir('productos', productos);

    InicializarProducto();
    ListarProductos();
    MostrarModal("Producto agregado correctamente");
}

function SeleccionarProducto(){
    let codigoSeleccionado = document.getElementById('lista-productos').value;
    
    for (let objProducto of productos) {
        if(objProducto.codigo == codigoSeleccionado){
            document.getElementById("codigo").value = objProducto.codigo;
            document.getElementById("nombre").value = objProducto.nombre;
            document.getElementById("descripcion").value = objProducto.descripcion;
            document.getElementById("precio").value = objProducto.precio;
            document.getElementById("stock").value = objProducto.stock;
            document.getElementById("codigo").disabled = true;
            break;
        }
    }
}

function ModificarProducto(){
    let codigoSeleccionado = document.getElementById("lista-productos").value;
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let precio = parseFloat(document.getElementById("precio").value);
    let stock = parseInt(document.getElementById("stock").value);

    limpiarError("nombre");
    limpiarError("descripcion");
    limpiarError("precio");
    limpiarError("stock");
    limpiarError("lista-productos");

    let hayError = false;

    if (codigoSeleccionado === "") {
        mostrarError("lista-productos", "Debe seleccionar un producto para modificar.");
        hayError = true;
    }

    if (nombre === "") {
        mostrarError("nombre", "El nombre es obligatorio.");
        hayError = true;
    }

    if (descripcion === "") {
        mostrarError("descripcion", "La descripción es obligatoria.");
        hayError = true;
    }

    if (isNaN(precio) || precio <= 0) {
        mostrarError("precio", "El precio debe ser mayor a 0.");
        hayError = true;
    }

    if (isNaN(stock) || stock <= 0) {
        mostrarError("stock", "El stock debe ser mayor a 0.");
        hayError = true;
    }

    if (hayError) {
        return;
    }
   
    let unProducto = BuscarProducto(codigoSeleccionado);

    unProducto.nombre = nombre;
    unProducto.descripcion = descripcion;
    unProducto.precio = precio;
    unProducto.stock = stock;

    const LaMemoria = new Memoria();
    LaMemoria.escribir('productos', productos);
    
    InicializarProducto();
    ListarProductos();
    MostrarModal("Se ha modificado correctamente su producto");
}

function BuscarProducto(pCodigo){
    for (let objProducto of productos) {
        if(objProducto.codigo == pCodigo){
            return objProducto;
        }
    }
    return null;
}

function EliminarProducto() {
    let codigoSeleccionado = document.getElementById("lista-productos").value;

    limpiarError("lista-productos");

    if (codigoSeleccionado === "") {
        mostrarError("lista-productos", "Debe seleccionar un producto.");
        return;
    }

    for (let venta of ventas) {
        if (venta.producto.codigo == codigoSeleccionado) {
            mostrarError(
                "lista-productos",
                "No se puede eliminar un producto que tiene ventas."
            );
            return;
        }
    }

    codigoProductoAEliminar = codigoSeleccionado;

    MostrarModalConfirmar(
        "¿Está seguro que desea eliminar este producto?"
    );
}

function ConfirmarEliminarProducto() {
    let posicionProducto = -1;

    for (let pos = 0; pos < productos.length; pos++) {
        if (productos[pos].codigo == codigoProductoAEliminar) {
            posicionProducto = pos;
            break;
        }
    }

    if (posicionProducto != -1) {
        productos.splice(posicionProducto, 1);
    }

    const LaMemoria = new Memoria();
    LaMemoria.escribir("productos", productos);

    CerrarModalConfirmar();

    InicializarProducto();
    ListarProductos();

    MostrarModal("Se ha eliminado correctamente su producto");

    codigoProductoAEliminar = null;

}

   document
    .getElementById("btnAceptarEliminar")
    .addEventListener("click", ConfirmarEliminarProducto);


document.getElementById("botones-productos").addEventListener("click", function(evento) {

    if (evento.target.id === "btnAgregar") {
        AgregarProducto();
    }

    if (evento.target.id === "btnModificar") {
        ModificarProducto();
    }

    if (evento.target.id === "btnEliminar") {
        EliminarProducto();
    }

    if (evento.target.id === "btnLimpiar") {
        InicializarProducto();
    }

});

document.getElementById("stock").addEventListener("keydown", function(evento) {
    if (
        evento.key === "e" ||
        evento.key === "E" ||
        evento.key === "+" ||
        evento.key === "-" ||
        evento.key === "."
    ) {
        evento.preventDefault();
    }
});

document.getElementById("precio").addEventListener("keydown", function(evento) {
    if (
        evento.key === "e" ||
        evento.key === "E" ||
        evento.key === "+" ||
        evento.key === "-"
    ) {
        evento.preventDefault();
    }
});

document.getElementById("lista-productos").addEventListener("change", SeleccionarProducto);

CargoDatosProductos();

