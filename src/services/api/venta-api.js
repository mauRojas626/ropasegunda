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

export { getSell, createSell, updateSell, deleteSell } 