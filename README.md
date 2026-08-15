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
- WebP
- Netlify

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

Durante esta etapa se incorporaron mejoras relacionadas con seguridad, optimización, SEO y publicación de la aplicación.

### Seguridad básica y prevención de XSS

Se revisó la forma en que la aplicación muestra los datos ingresados por el usuario.

Para evitar la ejecución de código HTML o JavaScript no deseado, se utiliza `textContent` y creación de elementos mediante el DOM en lugar de insertar contenido mediante `innerHTML`.

Se realizaron pruebas ingresando código HTML en los formularios y se comprobó que la aplicación lo muestra como texto, sin ejecutarlo.

De esta manera se implementa una medida básica de prevención frente a ataques XSS.

### SEO

Se revisaron todas las páginas HTML del proyecto y se incorporaron elementos básicos para mejorar su identificación y posicionamiento:

- `meta charset`
- `meta viewport`
- `meta description`
- títulos específicos mediante la etiqueta `title`
- textos alternativos mediante el atributo `alt` en las imágenes

Cada sección posee un título y una descripción relacionados con su contenido.

### Optimización

Se optimizaron las imágenes utilizadas por la aplicación para reducir el peso del sitio y mejorar los tiempos de carga.

Las imágenes principales fueron convertidas del formato PNG al formato WebP, manteniendo una buena calidad visual y reduciendo considerablemente el tamaño de los archivos.

También se ajustó la resolución de las imágenes de productos para adaptarlas mejor al tamaño en que se muestran dentro de la aplicación.

Se verificó el funcionamiento de las nuevas imágenes tanto en escritorio como en dispositivos móviles.

El archivo `.gitignore` se encuentra configurado para evitar incorporar al repositorio archivos innecesarios generados por macOS, Visual Studio Code y archivos de registro.

### Publicación preliminar

La aplicación se encuentra publicada en Internet mediante Netlify.

Netlify está conectado al repositorio de GitHub, permitiendo realizar el despliegue del proyecto a partir del código almacenado en el repositorio.

Se comprobó el correcto funcionamiento de las diferentes secciones del sistema en la versión publicada.

## Correcciones finales y pruebas funcionales

Se realizó una revisión funcional completa de las principales secciones de la aplicación:

- Productos
- Vendedores
- Ventas
- Estadísticas
- Clima

Durante las pruebas se verificaron altas, modificaciones, eliminaciones, validaciones, persistencia en LocalStorage, control de stock y manejo de errores.

### Corrección realizada

Durante la revisión de Estadísticas se detectó que, cuando dos o más productos tenían la misma cantidad máxima de unidades vendidas, la aplicación mostraba solamente uno.

Se modificó la función encargada de calcular el producto más vendido para permitir almacenar y mostrar todos los productos que se encuentren empatados con la mayor cantidad de ventas.

Luego de la corrección se volvió a probar la funcionalidad y se comprobó que, en caso de empate, se muestran correctamente todos los productos más vendidos.