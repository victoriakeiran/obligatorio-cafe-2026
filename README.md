# Obligatorio Café 

## Descripción

Obligatorio Café es una aplicación web desarrollada originalmente durante
Programación 1.

El objetivo del Taller es continuar trabajando sobre el proyecto original,
mejorando progresivamente su estructura, organización y calidad de código,
sin perder las funcionalidades ya desarrolladas.

La aplicación permite gestionar:

- Productos
- Vendedores
- Ventas
- Estadísticas

Los datos de la aplicación se almacenan utilizando LocalStorage.

---

## Integrantes

- Abril Sosa
- Victoria Keiran
- David Rodríguez

---

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript
- LocalStorage
- Git
- GitHub

---

## Estructura del proyecto

El código JavaScript se encuentra organizado separando las distintas
responsabilidades de la aplicación.

### Clases

Se utilizan clases para representar las principales entidades:

- Producto
- Vendedor
- Venta

### Controladores

Cada sección de la aplicación posee su propio controlador:

- productoControlador.js
- vendedorControlador.js
- ventaControlador.js
- estadisticaControlador.js

### Servicios

La clase `Memoria` se encarga de leer y escribir los datos almacenados
en LocalStorage.

---

## Entrega 1 - Refactorización inicial

Durante la primera etapa del Taller se realizaron las siguientes mejoras:

- Reorganización de la estructura del proyecto.
- Separación del código en carpetas.
- Creación de clases para Producto, Vendedor y Venta.
- Implementación de módulos ES6 mediante import y export.
- Separación de los controladores.
- Creación del servicio Memoria para trabajar con LocalStorage.
- Refactorización del módulo de estadísticas.
- Eliminación de código que ya no era utilizado.
- Pruebas de las funcionalidades existentes luego de la refactorización.

### Problemas encontrados

Durante la refactorización, la sección de estadísticas dejó de mostrar
los datos almacenados.

### Solución implementada

Se adaptó el controlador de estadísticas a la nueva estructura de módulos
ES6, importando la clase Memoria y realizando la carga de los datos desde
el propio controlador.

Luego del cambio se comprobó nuevamente el funcionamiento de Productos,
Vendedores, Ventas y Estadísticas.

---

## Funcionalidades pendientes

El proyecto continuará evolucionando durante las próximas etapas del Taller.

Entre las mejoras pendientes se encuentran:

- Renovación de la interfaz.
- Bootstrap.
- Responsive Design.
- Mejoras en la manipulación del DOM.
- Delegación de eventos.
- Integración con una API pública.
- Fetch y async/await.
- Mejoras de accesibilidad y usabilidad.
- Seguridad básica.
- Optimización y SEO.
- Publicación de la aplicación en Internet.