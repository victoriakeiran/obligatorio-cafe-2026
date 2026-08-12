import { Ciudad } from './clases/Ciudad.js';
import { obtenerClimaActual } from './servicios/ClimaApi.js';
import { mostrarMensaje, ocultarMensaje } from './servicios/Ui.js';

const ciudades = [
    new Ciudad('Colonia del Sacramento', -34.4626, -57.8398),
    new Ciudad('Rosario', -34.3139, -57.3525),
    new Ciudad('Juan Lacaze', -34.4311, -57.4483),
    new Ciudad('Montevideo', -34.9011, -56.1645),
    new Ciudad('Canelones', -34.5228, -56.2778),
    new Ciudad('Maldonado', -34.9000, -54.9500),
    new Ciudad('Paysandu', -32.3214, -58.0756),
    new Ciudad('Rivera', -30.9053, -55.5508),
    new Ciudad('Salto', -31.3880, -57.9606)
    
];

const climaPorCodigo = {
    0: 'Despejado',
    1: 'Mayormente despejado',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Niebla',
    48: 'Niebla con escarcha',
    51: 'Llovizna leve',
    53: 'Llovizna moderada',
    55: 'Llovizna intensa',
    61: 'Lluvia leve',
    63: 'Lluvia moderada',
    65: 'Lluvia intensa',
    80: 'Chaparrones leves',
    81: 'Chaparrones moderados',
    82: 'Chaparrones fuertes',
    95: 'Tormenta'
};

const comboCiudades = document.querySelector('#ciudad');
const btnConsultar = document.querySelector('#btn-consultar');
const resultado = document.querySelector('#resultado-clima');
const nombreCiudad = document.querySelector('#nombre-ciudad');
const descripcionClima = document.querySelector('#descripcion-clima');
const temperatura = document.querySelector('#temperatura');
const sensacion = document.querySelector('#sensacion');
const humedad = document.querySelector('#humedad');
const viento = document.querySelector('#viento');
const actualizacion = document.querySelector('#actualizacion');

function cargarCiudades() {
    ciudades.forEach((ciudad, indice) => {
        const opcion = document.createElement('option');
        opcion.value = indice;
        opcion.textContent = ciudad.nombre;
        comboCiudades.appendChild(opcion);
    });
}

function mostrarCargando() {
    btnConsultar.disabled = true;
    btnConsultar.textContent = 'Consultando...';
    resultado.classList.add('d-none');
    ocultarMensaje();
}

function ocultarCargando() {
    btnConsultar.disabled = false;
    btnConsultar.textContent = 'Consultar clima';
}

function descripcionPorCodigo(codigo) {
    return climaPorCodigo[codigo] || 'Clima disponible';
}

function renderizarClima(ciudad, datos) {
    const actual = datos.current;

    nombreCiudad.textContent = ciudad.nombre;
    descripcionClima.textContent = descripcionPorCodigo(actual.weather_code);
    temperatura.textContent = `${Math.round(actual.temperature_2m)} °C`;
    sensacion.textContent = `${Math.round(actual.apparent_temperature)} °C`;
    humedad.textContent = `${actual.relative_humidity_2m}%`;
    viento.textContent = `${Math.round(actual.wind_speed_10m)} km/h`;
    actualizacion.textContent = `Actualizado: ${actual.time.replace('T', ' ')}`;
    resultado.classList.remove('d-none');
}

async function consultarClima() {
    const ciudad = ciudades[comboCiudades.value];

    if (ciudad === undefined) {
        mostrarMensaje('Seleccione una ciudad.', 'warning');
        return;
    }

    try {
        mostrarCargando();
        const datos = await obtenerClimaActual(ciudad);
        renderizarClima(ciudad, datos);
    } catch (error) {
        mostrarMensaje('No se pudo consultar el clima. Revise la conexion e intente nuevamente.', 'danger');
    } finally {
        ocultarCargando();
    }
}

btnConsultar.addEventListener('click', consultarClima);
comboCiudades.addEventListener('change', consultarClima);

cargarCiudades();
consultarClima();
