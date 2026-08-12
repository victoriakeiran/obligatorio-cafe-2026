import { Vendedor } from "./clases/Vendedor.js";
import { Memoria } from "./servicios/Memoria.js";
import { mostrarError, limpiarError } from "./modulos/util.js";

let vendedores = [];
let ventas = [];

function CargoDatosVendedor(){
    const LaMemoria = new Memoria();
    vendedores = LaMemoria.leer('vendedores');
    ventas = LaMemoria.leer('ventas');

    
    if(!vendedores){
        vendedores = [];
    }

    if (!ventas) {
        ventas = [];
    }
    InicializarVendedor();
    ListarVendedores();
}

function AgregarVendedor(){
   
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let cedula = document.getElementById("cedula").value;

    limpiarError("codigo");
    limpiarError("nombre");
    limpiarError("cedula");

    let hayError = false;

    if (codigo === "") {
        mostrarError("codigo", "El código es obligatorio.");
        hayError = true;
    }

    if (nombre === "") {
        mostrarError("nombre", "El nombre es obligatorio.");
        hayError = true;
    }

    if (cedula === "") {
        mostrarError("cedula", "La cédula es obligatoria.");
        hayError = true;
    }

    if (hayError) {
        return;
    }

    if (cedula.length !== 8) {
        mostrarError("cedula", "La cédula debe tener 8 dígitos.");
        return;
    }

    if (BuscarVendedor(codigo) != null) {
        mostrarError("codigo", "Ya existe un vendedor con ese código.");
        return;
    }

    if (BuscarVendedorCedula(cedula) != null) {
        mostrarError("cedula", "Ya existe un vendedor con esa cédula.");
        return;
    }
    

    let unVendedor = new Vendedor(codigo, nombre, cedula);
    vendedores.push(unVendedor);

    const LaMemoria = new Memoria();
    LaMemoria.escribir('vendedores', vendedores);

    InicializarVendedor();
    ListarVendedores();
    alert("Vendedor agregado correctamente");
}

function SeleccionarVendedor(){
    let codigoSeleccionado = document.getElementById('lista-vendedores').value;
    
    for (let objVendedor of vendedores) {
        if(objVendedor.codigo == codigoSeleccionado){
            document.getElementById("codigo").value = objVendedor.codigo;
            document.getElementById("nombre").value = objVendedor.nombre;
            document.getElementById("cedula").value = objVendedor.cedula;
             document.getElementById("codigo").disabled = true;

        }
    }
}

function ListarVendedores(){
    let lista = document.getElementById('lista-vendedores').options;
    lista.length = 0;

    for (let objVendedor of vendedores) {
        let texto = 'Codigo: ' + objVendedor.codigo + ' : Nombre: ' + objVendedor.nombre 
        + ' - Cedula: ' + objVendedor.cedula;
        let elemento = new Option(texto, objVendedor.codigo);
        lista.add(elemento);
    }
}

function InicializarVendedor(){
  
    document.getElementById("codigo").value = "";
    document.getElementById("cedula").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("codigo").disabled = false;
   
    document.getElementById("codigo").focus();
    document.getElementById("codigo").value = vendedores.length+1;
}

function ModificarVendedor(){
   
    let codigoSeleccionado = document.getElementById("lista-vendedores").value;
    let nombre = document.getElementById("nombre").value;
    let cedula = document.getElementById("cedula").value;

   
    if(codigoSeleccionado == "" || nombre == "" || cedula == ""){
        alert("Debe seleccionar un vendedor para modificar");
        return;
    }

    let unVendedor = BuscarVendedor(codigoSeleccionado);

    unVendedor.nombre = nombre;
    unVendedor.cedula = cedula;

    const LaMemoria = new Memoria();
    LaMemoria.escribir('vendedores', vendedores);
    
    InicializarVendedor();
    ListarVendedores();
    alert("Se ha modificado correctamente su vendedor");
}

function BuscarVendedor(pCodigo){
    for (let objVendedor of vendedores) {
        if(objVendedor.codigo == pCodigo){
            return objVendedor;
        }
    }
    return null;
}

function BuscarVendedorCedula(pCedula){
    for (let objVendedor of vendedores) {
        if(objVendedor.cedula == pCedula){
            return objVendedor;
        }
    }
    return null;
}

function EliminarVendedor(){
   
    let codigoSeleccionado = document.getElementById("lista-vendedores").value;
    let posicionVendedor = -1;

    if(codigoSeleccionado == ""){
        alert("Debe seleccionar un vendedor para eliminar");
        return;
    }

        for (let venta of ventas){
        if (venta.vendedor.codigo == codigoSeleccionado) {
            alert("No se puede eliminar un vendedor que tiene ventas");
            return;
        }
    }

    for (let pos = 0; pos < vendedores.length; pos++) {
        if(vendedores[pos].codigo == codigoSeleccionado){
            posicionVendedor = pos;
        }
    }



    if(posicionVendedor != -1){
        vendedores.splice(posicionVendedor, 1);
    }


    const LaMemoria = new Memoria();
    LaMemoria.escribir('vendedores', vendedores);

    InicializarVendedor();
    ListarVendedores();
    alert("El vendedor se elimino correctamente");
}

document.getElementById("botones-vendedores").addEventListener("click", function(evento) {

    if (evento.target.id === "btnAgregar") {
        AgregarVendedor();
    }

    if (evento.target.id === "btnModificar") {
        ModificarVendedor();
    }

    if (evento.target.id === "btnEliminar") {
        EliminarVendedor();
    }

    if (evento.target.id === "btnLimpiar") {
        InicializarVendedor();
    }

});

document.getElementById("lista-vendedores").addEventListener("change", SeleccionarVendedor);

CargoDatosVendedor();