let vendedores = [];
let productos = [];
let ventas = [];

//#region Ventas!
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
//#endregion

//#region Productos!

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

//#endregion

//#region Vendedores!

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

//#endregion

//#region Estadísticas!

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
//#endregion