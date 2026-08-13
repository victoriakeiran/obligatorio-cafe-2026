export class Memoria {
    constructor(){}
leer(clave){
    try {
        const datos = localStorage.getItem(clave);

        if (datos) {
            return JSON.parse(datos);
        }

        return null;

    } catch (error) {
        return null;
    }
}

escribir(clave, dato){
    try {
        localStorage.setItem(clave, JSON.stringify(dato));
        return true;
    } catch (error) {
        return false;
    }
}
}