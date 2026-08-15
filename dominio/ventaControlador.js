import { Venta } from "./clases/Venta.js";
import { Memoria } from "./servicios/Memoria.js";
import { mostrarError, limpiarError } from "./modulos/util.js";

let ventas = [];
let productos = [];
let vendedores = [];


function CargoDatosVentas(){
    const LaMemoria = new Memoria();
    ventas = LaMemoria.leer('ventas');
    productos = LaMemoria.leer('productos');
    vendedores = LaMemoria.leer('vendedores');
    
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
            break;
        }
    }
}

function ActualizarStock(pCodigoProducto, pCantidad){
    for (const unProducto of productos) {
        if(unProducto.codigo == pCodigoProducto){
            unProducto.stock = unProducto.stock - pCantidad;
            break;
        }
    }
}

function DevolverStock(pCodigoProducto, pCantidad){
    for (const unProducto of productos) {
        if(unProducto.codigo == pCodigoProducto){
            unProducto.stock = unProducto.stock + pCantidad;
            break;
        }
    }
}

function ActualizarCantidadVendidos(pCodigoProducto, pCantidad){
    for (const unProducto of productos) {
        if(unProducto.codigo == pCodigoProducto){
            unProducto.cantVendidos = unProducto.cantVendidos + pCantidad;
            break;
        }
    }
}

function DevolverCantidadVendidos(pCodigoProducto, pCantidad){
    for (const unProducto of productos) {
        if(unProducto.codigo == pCodigoProducto){
            unProducto.cantVendidos = unProducto.cantVendidos - pCantidad;
            break;
        }
    }
}

function DevolverCantidadVentas(pCodigoVendedor){
    for (const unVendedor of vendedores) {
        if(unVendedor.codigo == pCodigoVendedor){
            unVendedor.cantVentas -= 1;
            break;
        }
    }
}

function ActualizarCantidadVentas(pCodigoVendedor){
    for (const unVendedor of vendedores) {
        if(unVendedor.codigo == pCodigoVendedor){
            unVendedor.cantVentas += 1;
            break;
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
    limpiarError("codigo");
    limpiarError("fecha");
    limpiarError("codigo-vendedor");
    limpiarError("codigo-producto");
    limpiarError("cantidad");
    limpiarError("lista-ventas");

    let hoy = new Date();
    
    let anio = hoy.getFullYear();
    let mes = ""+(hoy.getMonth()+1);
    mes = (mes.length == 1)?"0"+mes:mes;
    let dia = ""+hoy.getDate();
    dia = (dia.length == 1)?"0"+dia:dia;

    let fecha = anio + "-" + mes + "-" + dia;
    
    document.getElementById("codigo").value = "";
    document.getElementById("fecha").value = fecha;
    document.getElementById("codigo-vendedor").value = "";
    document.getElementById("codigo-producto").value = "";
    document.getElementById("precio-producto").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("total").value = "";
    document.getElementById("codigo").focus();
    let mayorCodigo = 0;

    for (let unaVenta of ventas) {
        if (Number(unaVenta.codigo) > mayorCodigo) {
            mayorCodigo = Number(unaVenta.codigo);
        }
    }

    document.getElementById("codigo").value = mayorCodigo + 1;
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
    let total = parseFloat(document.getElementById("total").value);

    limpiarError("codigo");
    limpiarError("fecha");
    limpiarError("codigo-vendedor");
    limpiarError("codigo-producto");
    limpiarError("cantidad");

    let hayError = false;

    if (codigo === "") {
        mostrarError("codigo", "El código es obligatorio.");
        hayError = true;
    }

    if (fecha === "") {
        mostrarError("fecha", "La fecha es obligatoria.");
        hayError = true;
    }

    if (codigoVendedor === "") {
        mostrarError("codigo-vendedor", "Debe seleccionar un vendedor.");
        hayError = true;
    }

    if (codigoProducto === "") {
        mostrarError("codigo-producto", "Debe seleccionar un producto.");
        hayError = true;
    }

    if (isNaN(cantidad) || cantidad <= 0) {
        mostrarError("cantidad", "La cantidad debe ser mayor a 0.");
        hayError = true;
    }

    if (hayError) {
        return;
    }

    if (BuscarVenta(codigo) != null) {
        mostrarError("codigo", "Ya existe una venta con ese código.");
        return;
    }
    
    let unProducto = BuscarProducto(codigoProducto);
    
    let unVendedor = BuscarVendedor(codigoVendedor);
    
    if (cantidad > Number(unProducto.stock)) {
        mostrarError("cantidad", "No hay stock suficiente para esta venta.");
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
    MostrarModal("Venta agregada correctamente");
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
            break;
        }
    }
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

    limpiarError("lista-ventas");

    if (codigoSeleccionado === "") {
        mostrarError("lista-ventas", "Debe seleccionar una venta.");
        return;
    }

    let unaVenta = BuscarVenta(codigoSeleccionado);

    for (let pos = 0; pos < ventas.length; pos++) {
        if (ventas[pos].codigo == codigoSeleccionado) {
            posicionVenta = pos;
            break;
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
    MostrarModal("Se ha eliminado correctamente su venta");
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

