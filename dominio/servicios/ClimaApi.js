export async function obtenerClimaActual(ciudad) {
    const parametros = new URLSearchParams({
        latitude: ciudad.latitud,
        longitude: ciudad.longitud,
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
        timezone: 'America/Montevideo'
    });

    const respuesta = await fetch(`https://api.open-meteo.com/v1/forecast?${parametros.toString()}`);

    if (!respuesta.ok) {
        throw new Error('No se pudo obtener el clima.');
    }

    return respuesta.json();
}