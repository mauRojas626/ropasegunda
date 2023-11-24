import { apiGet, apiPost, apiDelete } from '../api/api'

const getSell = async (id) => {
    return await apiGet(`sell/list/`+id);
}

const createSell = async (sell) => {
    return await apiPost(`sell/create`, sell, {
        'Content-Type': 'multipart/form-data',
      });
}

const updateSell = async (sell) => {
    return await apiPost(`sell/edit`, sell, {
        'Content-Type': 'multipart/form-data',
    });
}

const deleteSell = async (id) => {
    return await apiDelete(`sell/delete/`+id);
}

const validateSell = async (sell) => {
    return await apiPost(`sell/validate`, sell, {
        'Content-Type': 'multipart/form-data',
    });
}

const requestShipping = async (sell) => {
    return await apiPost(`sell/requestShip`, sell);
}

const priceShiping = async (sell) => {
    return await apiPost(`sell/cotizarEnvio`, sell);
}

const payShip = async (sell) => {
    return await apiPost(`sell/payEnvio`, sell, {
        'Content-Type': 'multipart/form-data',
    });
}

const validateShip = async (sell) => {
    return await apiPost(`sell/validateShip`, sell);
}

const enviar = async (sell) => {
    return await apiPost(`sell/enviar`, sell);
}

const calificar = async (sell) => {
    return await apiPost(`sell/calificar`, sell);
}

const getQuejas = async () => {
    return await apiGet(`sell/quejas`);
}

const resolverQueja = async (id) => {
    return await apiGet(`sell/resolverQueja/`+id);
}

export { getSell, createSell, updateSell, deleteSell, validateSell, requestShipping, priceShiping, payShip, validateShip, enviar, calificar, getQuejas, resolverQueja } 