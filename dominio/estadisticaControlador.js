import { Memoria } from "./servicios/Memoria.js";

let ventas = [];
let productos = [];
let vendedores = [];

function CargoDatosEstadisticas(){
    const LaMemoria = new Memoria();
    ventas = LaMemoria.leer('ventas');
    productos = LaMemoria.leer('productos');
    vendedores = LaMemoria.leer('vendedores');

    if (!ventas) {
        ventas = [];
    }

    if (!productos) {
        productos = [];
    }

    if (!vendedores) {
        vendedores = [];
    }
    
    TotalRecaudado();
    ProductoMasVendido();
    MejorVendedor();
    ProductosConStock();
}

function TotalRecaudado(){
    let total = 0;
    for (const unaVenta of ventas) {
        total = total + unaVenta.total;
    }
    document.getElementById('totalRecaudado').value = total;
}

function ProductosConStock(){
    let lista = document.getElementById('productos-con-stock').options;
    lista.length = 0;

    for (const objProducto of productos) {
        if(objProducto.stock > 0){
            let texto = 'Codigo: ' + objProducto.codigo + ' : Nombre: ' + objProducto.nombre 
            + ' - Precio: ' + objProducto.precio + ' - Stock: ' + objProducto.stock;
            let elemento = new Option(texto, objProducto.codigo);
            lista.add(elemento);
        }
    }
}

function ProductoMasVendido(){
    let mayor = 0;
    let objMayor;
    for (const unProducto of productos) {
        if(unProducto.cantVendidos > mayor){
            mayor = unProducto.cantVendidos;
            objMayor = unProducto;
        }
    }
    if (objMayor) {
      document.getElementById('masVendido').value = objMayor.nombre
    + " con " + objMayor.cantVendidos + " unidades"; 
    }else{
        document.getElementById('masVendido').value = "Sin ventas";
    }
}

function MejorVendedor(){
    let mayor = 0;
    let cant = 0;
    let objMayor;
    for (const unVendedor of vendedores) {
        if(unVendedor.cantVentas > mayor){
            mayor = unVendedor.cantVentas;
            objMayor = unVendedor;
        }
    }
       if (objMayor) {

        for(let unaVenta of ventas){
            if(unaVenta.vendedor.codigo == objMayor.codigo){
                cant++;
            }
        }

      document.getElementById('mejorVendedor').value = objMayor.nombre
    + " con " + cant + " ventas";  
    }else{
        document.getElementById('mejorVendedor').value = "Sin ventas";
    }
   
}

CargoDatosEstadisticas();