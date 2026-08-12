# Obligatorio Café ☕

## Descripción

**Obligatorio Café** es una aplicación web desarrollada originalmente en Programación 1 y continuada en el Taller de Profesionalización de una Aplicación Web.

El objetivo del Taller es mejorar progresivamente el proyecto original, incorporando una estructura más organizada, JavaScript moderno, una interfaz responsive, validaciones visuales, persistencia de datos y consumo de servicios externos, manteniendo las funcionalidades existentes.

La aplicación permite gestionar:

- Productos
- Vendedores
- Ventas
- Estadísticas
- Consulta del clima actual para distintas ciudades de Uruguay

Los datos de productos, vendedores y ventas se almacenan mediante `LocalStorage`.

---

## Integrantes

- Abril Sosa
- Victoria Keiran
- David Rodríguez

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Clases JavaScript
- Módulos ES6 (`import` / `export`)
- Bootstrap
- LocalStorage
- Fetch API
- Async / Await
- API pública Open-Meteo
- Git
- GitHub

---

## Estructura del proyecto

El código se encuentra organizado separando responsabilidades.

### Clases

En `dominio/clases/` se encuentran las entidades principales:

- `Producto.js`
- `Vendedor.js`
- `Venta.js`
- `Ciudad.js`

### Controladores

Cada sección posee su propio controlador:

- `productoControlador.js`
- `vendedorControlador.js`
- `ventaControlador.js`
- `estadisticaControlador.js`
- `controladorClima.js`

### Servicios

En `dominio/servicios/` se encuentran:

- `Memoria.js`: lectura y escritura de información en LocalStorage.
- `ClimaApi.js`: comunicación con la API pública Open-Meteo.
- `Ui.js`: manejo de mensajes de interfaz utilizados en la sección Clima.

### Módulos

En `dominio/modulos/` se encuentra:

- `util.js`: funciones reutilizables para mostrar y limpiar errores de validación.

---

## Entrega 1 - Refactorización inicial

Durante la primera etapa se realizaron las siguientes mejoras:

- Reorganización de la estructura del proyecto.
- Separación del código en carpetas.
- Creación de clases para Producto, Vendedor y Venta.
- Implementación de módulos ES6.
- Separación de los controladores por responsabilidad.
- Creación del servicio `Memoria` para trabajar con LocalStorage.
- Refactorización del módulo de estadísticas.
- Eliminación de código sin uso.
- Pruebas de las funcionalidades originales después de la refactorización.

### Problema encontrado

Durante la refactorización, la sección de estadísticas dejó de mostrar correctamente la información almacenada.

### Solución implementada

Se adaptó `estadisticaControlador.js` a la nueva estructura modular, leyendo productos, vendedores y ventas mediante `Memoria`.

También se simplificó el cálculo del mejor vendedor para evitar recorridos innecesarios.

---

## Entrega 2 - Interfaz, DOM y validaciones

Durante esta etapa se incorporaron mejoras en la interfaz y la interacción con el usuario:

- Incorporación de Bootstrap.
- Mejoras de CSS.
- Diseño responsive para dispositivos móviles.
- Manejo de eventos desde JavaScript mediante `addEventListener`.
- Delegación de eventos en Productos, Vendedores y Ventas.
- Eliminación de eventos inline del HTML.
- Validaciones visuales en formularios.
- Mensajes de error específicos debajo de cada campo.
- Identificación visual de campos incorrectos mediante borde e ícono de advertencia.
- Funciones reutilizables `mostrarError()` y `limpiarError()`.
- Validación de códigos repetidos.
- Validación de precio, stock y cantidad.
- Validación de cédula.
- Control de stock disponible antes de registrar una venta.
- Prevención de eliminación de productos o vendedores asociados a ventas.
- Eliminación de funcionalidades sin uso, como la modificación de ventas.
- Mejoras de accesibilidad mediante asociación correcta entre `label` e `id` y definición del idioma del documento.

---

## Entrega 3 - Aplicación dinámica

El proyecto ya incorpora varios contenidos correspondientes a esta etapa:

- Consumo de una API pública.
- Uso de `fetch`.
- Uso de `async` / `await`.
- Manejo de errores mediante `try`, `catch` y `finally`.
- Clase `Ciudad`.
- Consulta del clima actual para distintas ciudades de Uruguay.
- Renderizado dinámico de temperatura, sensación térmica, humedad, viento y estado del clima.
- Mensajes visuales ante errores en la consulta externa.

La información meteorológica se obtiene mediante la API pública **Open-Meteo**.

---

## Funcionalidades principales

### Productos

Permite:

- Agregar productos.
- Modificar productos.
- Eliminar productos.
- Listar productos.

Incluye controles de campos obligatorios, código único, precio, stock y restricciones para eliminar productos asociados a ventas.

### Vendedores

Permite:

- Agregar vendedores.
- Modificar vendedores.
- Eliminar vendedores.
- Listar vendedores.

Incluye controles de campos obligatorios, código único, cédula y restricciones para eliminar vendedores asociados a ventas.

### Ventas

Permite:

- Registrar ventas.
- Eliminar ventas.
- Listar ventas.

Al registrar una venta:

- Se valida el vendedor seleccionado.
- Se valida el producto seleccionado.
- Se controla la cantidad.
- Se verifica el stock disponible.
- Se calcula el total.
- Se descuenta el stock.
- Se actualiza la cantidad vendida del producto.
- Se actualiza la cantidad de ventas del vendedor.

Al eliminar una venta, se restituyen los valores correspondientes de stock y estadísticas.

### Estadísticas

La aplicación muestra:

- Total recaudado.
- Producto más vendido.
- Mejor vendedor.
- Productos con stock disponible.

### Clima

Permite consultar el clima actual de distintas ciudades de Uruguay utilizando Open-Meteo.

Se muestran:

- Estado del clima.
- Temperatura.
- Sensación térmica.
- Humedad.
- Velocidad del viento.
- Hora de actualización.

---

## Persistencia

La información de productos, vendedores y ventas se guarda en el navegador mediante `LocalStorage`.

El servicio `Memoria` centraliza la lectura y escritura de estos datos utilizando `JSON.parse()` y `JSON.stringify()`.

---

## Estado actual

Actualmente el proyecto cuenta con:

- Estructura modular.
- Clases JavaScript.
- Separación de responsabilidades.
- LocalStorage.
- Delegación de eventos.
- Validaciones visuales.
- Diseño responsive.
- Bootstrap.
- Mejoras básicas de accesibilidad.
- Integración con una API pública mediante Fetch y Async/Await.

---

## Próximas mejoras

De acuerdo con las siguientes etapas del Taller, quedan por profundizar:

- Accesibilidad y usabilidad.
- Seguridad básica y prevención de XSS.
- Optimización final del código.
- SEO.
- Publicación de la aplicación.
- Documentación final.
- Preparación de la defensa oral.