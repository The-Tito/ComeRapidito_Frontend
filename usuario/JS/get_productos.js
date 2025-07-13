import { API_URL } from "./constantes_API"

async function getProduct() {
    try {
        const respose = await fetch(API_URL + '/productos');

        if (respose) {
            console.log(respose)
        } else {
            console.log('error')
        }
    } catch (error) {
        console.log('ocurrio un error al obtener', error)
    }
}
