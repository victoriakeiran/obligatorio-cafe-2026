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
- `climaUi.js`: manejo de mensajes de interfaz utilizados en la sección Clima.

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

Durante esta etapa se incorporaron mejoras relacionadas con aplicaciones dinámicas, servicios externos, persistencia, accesibilidad y usabilidad.

### Fetch, API pública y Async/Await

Se incorporó una sección de Clima que consume la API pública Open-Meteo.

La consulta se realiza mediante:

- `fetch`
- `async`
- `await`

La lógica de comunicación con la API se encuentra separada en `ClimaApi.js`.

También se implementó manejo de errores mediante `try`, `catch` y `finally`.

Cuando no existe conexión o la API no responde correctamente:

- Se informa el problema al usuario.
- El resto de la aplicación continúa funcionando.
- El botón de consulta vuelve a su estado normal.
- Una nueva consulta funciona correctamente cuando se recupera la conexión.

### Clima

Se incorporó la clase `Ciudad` y una lista de ciudades de Uruguay.

La sección permite consultar:

- Estado actual del clima.
- Temperatura.
- Sensación térmica.
- Humedad.
- Velocidad del viento.
- Hora de actualización.

La interfaz muestra un estado de carga mientras se realiza la consulta y mensajes visuales cuando ocurre un error.

### Mejoras de LocalStorage

Se mejoró el servicio `Memoria` utilizado para almacenar y recuperar los datos de la aplicación.

Las operaciones de lectura y escritura ahora utilizan `try/catch` para evitar que un error en LocalStorage interrumpa el funcionamiento de la aplicación.

La función `leer()` devuelve `null` si ocurre un problema durante la lectura o conversión de los datos.

La función `escribir()` devuelve `true` cuando la información se guarda correctamente y `false` cuando ocurre un error.

Se comprobó que Productos, Vendedores y Ventas continúan almacenándose correctamente luego de recargar la aplicación.

### Accesibilidad

Se realizaron mejoras básicas de accesibilidad, entre ellas:

- Uso de `lang="es"` en los documentos HTML.
- Asociación correcta entre `label` e `id` en los formularios.
- Uso de textos alternativos en imágenes.
- Eliminación de eventos inline en HTML.
- Mensajes de error asociados visualmente a los campos correspondientes.

### Usabilidad

Se revisó el comportamiento de Productos, Vendedores y Ventas desde el punto de vista del usuario.

Se comprobó:

- Visualización clara de errores en los formularios.
- Limpieza de errores al reiniciar los formularios.
- Validación de códigos repetidos.
- Validación de precios, stock, cantidades y cédula.
- Control de stock antes de registrar una venta.
- Recuperación del stock al eliminar una venta.
- Persistencia de los datos después de recargar.
- Mensajes claros cuando una operación no puede realizarse.
- Manejo visual de errores al consultar la API de Clima.

Luego de las pruebas realizadas, las funcionalidades de Productos, Vendedores, Ventas, Estadísticas y Clima continúan funcionando correctamente.

## Entrega 4 - Calidad profesional

En esta etapa se realizaron mejoras orientadas a la calidad, seguridad, optimización y experiencia de usuario de la aplicación.

### Seguridad básica y prevención de XSS
- Se revisó la manipulación de datos ingresados por el usuario.
- Se utiliza `textContent` para mostrar contenido dinámico en el DOM, evitando insertar directamente contenido HTML ingresado por el usuario.
- Se mantuvieron las validaciones implementadas en los formularios de productos, vendedores y ventas.

### Optimización
- Se optimizaron recursos gráficos utilizados en el sitio.
- Se incorporaron imágenes en formato WebP para reducir el peso de los recursos y mejorar los tiempos de carga.
- Se revisó la organización general del código y los recursos del proyecto.

### SEO
- Se incorporaron descripciones mediante etiquetas `meta description` en las páginas del sitio.
- Se mantuvieron títulos descriptivos para identificar las diferentes secciones de la aplicación.

### Responsive Design
- Se mejoró la adaptación de la interfaz para dispositivos móviles.
- Se implementó un menú hamburguesa propio utilizando HTML, CSS y JavaScript.
- El menú permite mostrar y ocultar las opciones de navegación mediante manipulación de clases CSS.
- Se realizaron ajustes específicos para mejorar la visualización del encabezado y la navegación en pantallas pequeñas.

### Mejoras de usabilidad
- Se reemplazaron los mensajes `alert()` del navegador por modales personalizados acordes al diseño visual de Obligatorio Café.

### Publicación

La aplicación se encuentra publicada en Internet mediante Netlify.

URL del sitio:
https://obligatoriocafe.netlify.app/