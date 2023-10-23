import { apiGet, apiPost, apiDelete } from '../api/api'

const getBuyers = async () => {
    return await apiGet(`buyers/list`);
}

const createBuyer = async (buyer) => {
    return await apiPost(`buyers/create`, buyer);
}

const updateBuyer = async (buyer) => {
    return await apiPost(`buyers/edit`, buyer);
}

const deleteBuyer = async (id) => {
    return await apiDelete(`buyers/delete/`+id);
}

const validateBuyer = async (buyer) => {
    return await apiPost(`buyers/validate`, buyer);
}

export { getBuyers, createBuyer, updateBuyer, deleteBuyer, validateBuyer } 