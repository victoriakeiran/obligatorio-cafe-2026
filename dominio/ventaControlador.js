import { Venta } from "./clases/Venta.js";
import { Memoria } from "./servicios/Memoria.js";

let ventas = [];
let productos = [];
let vendedores = [];


function CargoDatosVentas(){
    const LaMemoria = new Memoria();
    ventas = LaMemoria.leer('ventas');
    productos = LaMemoria.leer('productos');
    vendedores = LaMemoria.leer('vendedores');

    console.log("PRODUCTOS:", productos);
console.log("VENDEDORES:", vendedores);
    
    if(!ventas){
        ventas = [];
    }

    if (!vendedores) {
        vendedores = [];
    }

    if (!productos) {
        productos = [];
    }

    InicializarVenta();
    CargarVendedores();
    CargarProductos();
    ListarVentas();
}

function CargarVendedores(){
    let lista = document.getElementById('codigo-vendedor').options;
    lista.length = 0;

    let elementoBase = new Option("Seleccione un vendedor", "");
    lista.add(elementoBase);

    for (let objVendedor of vendedores) {
        let elemento = new Option(objVendedor.nombre, objVendedor.codigo);
        lista.add(elemento);
    }
}

function CargarProductos(){
    let lista = document.getElementById('codigo-producto').options;
    lista.length = 0;

    let elementoBase = new Option("Seleccione un producto", "");
    lista.add(elementoBase);

    for (let objProducto of productos) {
        let elemento = new Option(objProducto.nombre, objProducto.codigo);
        lista.add(elemento);
    }
}

function CargarPrecioProducto(){
    document.getElementById('precio-producto').value = "";

    let codigoProducto = document.getElementById('codigo-producto').value;
    for (let objProducto of productos) {
        if(objProducto.codigo == codigoProducto){
            document.getElementById('precio-producto').value = objProducto.precio;
        }
    }
}

function ActualizarStock(pCodigoProducto, pCantidad){
    for (const unProducto of productos) {
        if(unProducto.codigo == pCodigoProducto){
            unProducto.stock = unProducto.stock - pCantidad;
        }
    }
}

function DevolverStock(pCodigoProducto, pCantidad){
    for (const unProducto of productos) {
        if(unProducto.codigo == pCodigoProducto){
            unProducto.stock = unProducto.stock + pCantidad;
        }
    }
}

function ActualizarCantidadVendidos(pCodigoProducto, pCantidad){
    for (const unProducto of productos) {
        if(unProducto.codigo == pCodigoProducto){
            unProducto.cantVendidos = unProducto.cantVendidos + pCantidad;
        }
    }
}

function DevolverCantidadVendidos(pCodigoProducto, pCantidad){
    for (const unProducto of productos) {
        if(unProducto.codigo == pCodigoProducto){
            unProducto.cantVendidos = unProducto.cantVendidos - pCantidad;
        }
    }
}

function DevolverCantidadVentas(pCodigoVendedor){
    for (const unVendedor of vendedores) {
        if(unVendedor.codigo == pCodigoVendedor){
            unVendedor.cantVentas -= 1;
        }
    }
}

function ActualizarCantidadVentas(pCodigoVendedor){
    for (const unVendedor of vendedores) {
        if(unVendedor.codigo == pCodigoVendedor){
            unVendedor.cantVentas += 1;
        }
    }
}

function CalculoTotal(){
    let precio = document.getElementById('precio-producto').value;
    let cantidad = document.getElementById('cantidad').value;
    let total = 0;
    if(cantidad > 0){
        total = precio * cantidad;
        document.getElementById('total').value = total;
    }
}

function ListarVentas(){
    let lista = document.getElementById('lista-ventas').options;
    lista.length = 0;

    for (let objVenta of ventas) {
        let texto = 'Codigo: ' + objVenta.codigo + ' : Fecha: ' + objVenta.fecha 
        + ' - Producto: ' + objVenta.producto.nombre + ' - Total: ' + objVenta.total;
        let elemento = new Option(texto, objVenta.codigo);
        lista.add(elemento);
    }
}

function InicializarVenta(){

    let hoy = new Date();
    console.log("HOY", hoy);
    
    let anio = hoy.getFullYear();
    let mes = ""+(hoy.getMonth()+1);
    mes = (mes.length == 1)?"0"+mes:mes;
    let dia = ""+hoy.getDate();
    dia = (dia.length == 1)?"0"+dia:dia;

    let fecha = anio + "-" + mes + "-" + dia;
    console.log("FECHA", fecha);
    
    document.getElementById("codigo").value = "";
    document.getElementById("fecha").value = fecha;
    document.getElementById("codigo-vendedor").value = "";
    document.getElementById("codigo-producto").value = "";
    document.getElementById("precio-producto").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("total").value = "";
    document.getElementById("codigo").focus();
    document.getElementById("codigo").value = ventas.length+1;
}

function BuscarProducto(pCodigo){
    for (let objProducto of productos) {
        if (objProducto.codigo == pCodigo){
            return objProducto;
        }
    }
    return null;
}

function BuscarVendedor(pCodigo){
    for (let objVendedor of vendedores) {
        if (objVendedor.codigo == pCodigo){
            return objVendedor;
        }
    }
    return null;
}

function AgregarVenta(){
    
    let codigo = document.getElementById("codigo").value;
    let fecha = document.getElementById("fecha").value;
    let codigoVendedor = document.getElementById("codigo-vendedor").value;
    let codigoProducto = document.getElementById("codigo-producto").value;
    let cantidad = parseInt(document.getElementById("cantidad").value);
    let total = parseInt(document.getElementById("total").value);

        if (cantidad <=0) {
        alert("La cantidad debe ser mayor a cero");
        return;
    }

    if(codigo == "" || fecha == "" || codigoVendedor == "" || codigoProducto == ""){
        alert("Debe ingresar todos los campos!");
        return;
    }
    if(isNaN(cantidad) || isNaN(total)){
        alert("Los valores ingresados no son correctos!");
        return;
    }

     if (BuscarVenta(codigo) != null) {
        alert("Ya existe una venta con ese código.");
        return;
    }
    
    let unProducto = BuscarProducto(codigoProducto);
    
    let unVendedor = BuscarVendedor(codigoVendedor);
    
     if (cantidad > Number(unProducto.stock)) {
        alert("No hay stock suficiente para esta venta");
        return;
    }

    let unaVenta = new Venta(codigo, fecha, unProducto, unVendedor, cantidad, total);
    ventas.push(unaVenta);



    const LaMemoria = new Memoria();
    LaMemoria.escribir('ventas', ventas);



    ActualizarStock(codigoProducto, cantidad);
    ActualizarCantidadVendidos(codigoProducto, cantidad);
    LaMemoria.escribir('productos', productos);

    
    ActualizarCantidadVentas(codigoVendedor);
    
    LaMemoria.escribir('vendedores', vendedores);

    InicializarVenta();
    ListarVentas();
    alert("Venta agregada correctamente");
}

function SeleccionarVenta(){
    let codigoSeleccionado = document.getElementById('lista-ventas').value;
    
    for (let objVenta of ventas) {
        if(objVenta.codigo == codigoSeleccionado){
            document.getElementById("codigo").value = objVenta.codigo;
            document.getElementById("fecha").value = objVenta.fecha;
            document.getElementById("codigo-vendedor").value = objVenta.vendedor.codigo;
            document.getElementById("codigo-producto").value = objVenta.producto.codigo;
            CargarPrecioProducto();
            document.getElementById("cantidad").value = objVenta.cantidad;
            document.getElementById("total").value = objVenta.total;
        }
    }
}

function ModificarVenta(){
    
    let codigoSeleccionado = document.getElementById("lista-ventas").value;
    let fecha = document.getElementById("fecha").value;
    let codigoVendedor = document.getElementById("codigo-vendedor").value;
    let codigoProducto = document.getElementById("codigo-producto").value;
    let cantidad = parseInt(document.getElementById("cantidad").value);
    let total = parseInt(document.getElementById("total").value);

    
    if(codigoSeleccionado == "" || fecha == "" || codigoVendedor == "" || codigoProducto == ""){
        alert("Debe ingresar todos los campos!");
        return;
    }
    if(isNaN(cantidad) || isNaN(total)){
        alert("Los valores ingresados no son correctos!");
        return;
    }

    let unProducto = BuscarProducto(codigoProducto);
   
    let unVendedor = BuscarVendedor(codigoVendedor);


    
    let unVenta = BuscarVenta(codigoSeleccionado);

    unVenta.fecha = fecha;
    unVenta.vendedor = unVendedor;
    unVenta.producto = unProducto;
    unVenta.cantidad = cantidad;
    unVenta.total = total;

    const LaMemoria = new Memoria();
    LaMemoria.escribir('ventas', ventas);
    
    InicializarVenta();
    ListarVentas();
}

function BuscarVenta(pCodigo){
    for (let objVenta of ventas) {
        if(objVenta.codigo == pCodigo){
            return objVenta;
        }
    }
    return null;
}


function EliminarVenta(){
    
    let codigoSeleccionado = document.getElementById("lista-ventas").value;
    let posicionVenta = -1;

  
    if(codigoSeleccionado == ""){
        alert("Debe seleccionar una Venta!");
        return;
    }

    let unaVenta = BuscarVenta(codigoSeleccionado);

    for (let pos = 0; pos < ventas.length; pos++) {
        if(ventas[pos].codigo == codigoSeleccionado){
            posicionVenta = pos;
        }
    }
    if(posicionVenta != -1){
        ventas.splice(posicionVenta, 1);
    }

    const LaMemoria = new Memoria();
    LaMemoria.escribir('ventas', ventas);

    DevolverStock(unaVenta.producto.codigo, unaVenta.cantidad);
    DevolverCantidadVendidos(unaVenta.producto.codigo, unaVenta.cantidad);
    LaMemoria.escribir('productos', productos);

   
    DevolverCantidadVentas(unaVenta.vendedor.codigo);
    LaMemoria.escribir('vendedores', vendedores);

    InicializarVenta();
    ListarVentas();
    alert("Se ha eliminado correctamente su venta");
}

document.getElementById("botones-ventas").addEventListener("click", function(evento) {

    if (evento.target.id === "btnAgregar") {
        AgregarVenta();
    }

    if (evento.target.id === "btnEliminar") {
        EliminarVenta();
    }

    if (evento.target.id === "btnLimpiar") {
        InicializarVenta();
    }

});

document.getElementById("codigo-producto").addEventListener("change", CargarPrecioProducto);
document.getElementById("cantidad").addEventListener("blur", CalculoTotal);
document.getElementById("lista-ventas").addEventListener("change", SeleccionarVenta);

CargoDatosVentas();

