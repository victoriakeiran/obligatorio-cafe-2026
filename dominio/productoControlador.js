
import { Producto } from "./clases/Producto.js";
import { Memoria } from "./servicios/Memoria.js";

let productos = [];
let ventas = [];


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
    
    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("codigo").disabled = false;

    document.getElementById("codigo").focus();
    document.getElementById("codigo").value = productos.length+1;
}

function AgregarProducto(){
   
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let precio = parseInt(document.getElementById("precio").value);
    let stock = parseInt(document.getElementById("stock").value);

      if (precio <= 0 || stock <= 0) {
        alert("El precio debe de ser mayor a cero y el stock no puede ser menor a cero");
        return;
    }

    if(codigo == "" || nombre == "" || descripcion == ""){
        alert("Debe ingresar todos los campos!");
        return;
    }
    if(isNaN(precio) || isNaN(stock)){
        alert("Los valores ingresados no son correctos!");
        return;
    }
    if (BuscarProducto(codigo) != null) {
        alert("Ya existe un producto con ese código.");
        return;
    }

    let unProducto = new Producto(codigo, nombre, descripcion, precio, stock);
    productos.push(unProducto);

    const LaMemoria = new Memoria();
    LaMemoria.escribir('productos', productos);

    InicializarProducto();
    ListarProductos();
    alert("Producto agregado correctamente");

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
        }
    }
}

function ModificarProducto(){
   
    let codigoSeleccionado = document.getElementById("lista-productos").value;
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let precio = parseInt(document.getElementById("precio").value);
    let stock = parseInt(document.getElementById("stock").value);

    if(codigoSeleccionado == "" || nombre == "" || descripcion == ""){
        alert("Debe seleccionar un producto para modificar");
        return;
    }
    if(isNaN(precio) || isNaN(stock)){
        alert("Los valores ingresados no son correctos!");
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
    alert("Se ha modificado correctamente su producto");
}

function BuscarProducto(pCodigo){
    for (let objProducto of productos) {
        if(objProducto.codigo == pCodigo){
            return objProducto;
        }
    }
    return null;
}

function EliminarProducto(){
    
    let codigoSeleccionado = document.getElementById("lista-productos").value;
    let posicionProducto = -1;
  
    if(codigoSeleccionado == ""){
        alert("Debe seleccionar un Producto!");
        return;
    }
    
    for (let venta of ventas){
        console.log(venta);
        if (venta.producto.codigo == codigoSeleccionado) {
            alert("No se puede eliminar un producto que tiene ventas");
            return;
        }
    }
   
    for (let pos = 0; pos < productos.length; pos++) {
        if(productos[pos].codigo == codigoSeleccionado){
            posicionProducto = pos;
        }
    }

    if(posicionProducto != -1){
        productos.splice(posicionProducto, 1);
    }

    const LaMemoria = new Memoria();
    LaMemoria.escribir('productos', productos);

    InicializarProducto();
    ListarProductos();
    alert("Se ha eliminado correctamente su producto");
}

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

document.getElementById("lista-productos").addEventListener("change", SeleccionarProducto);

CargoDatosProductos();

