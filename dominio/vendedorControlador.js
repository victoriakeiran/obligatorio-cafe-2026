import { Vendedor } from "./clases/Vendedor.js";
import { Memoria } from "./servicios/Memoria.js";

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

    
    if(cedula == "" || nombre == "" || codigo == ""){
        alert("Debe ingresar todos los campos!");
        return;
    }

    if (BuscarVendedor(codigo) != null) {
        alert('Ya existe un vendedor con ese código.');
        return;
    }
    if (BuscarVendedorCedula(cedula) != null) {
        alert('Ya existe un vendedor con esa cédula.');
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

document.getElementById("btnAgregar").addEventListener("click", AgregarVendedor);
document.getElementById("btnModificar").addEventListener("click", ModificarVendedor);
document.getElementById("btnEliminar").addEventListener("click", EliminarVendedor);
document.getElementById("btnLimpiar").addEventListener("click", InicializarVendedor);

document.getElementById("lista-vendedores").addEventListener("change", SeleccionarVendedor);

CargoDatosVendedor();