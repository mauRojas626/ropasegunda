import { apiGet, apiPost, apiDelete } from '../api/api'

const getBuyers = async () => {
    return await apiGet(`buyers/list`);
}

const createBuyer = async (semester) => {
    return await apiPost(`buyers/create`, semester);
}

const updateBuyer = async (semester) => {
    return await apiPost(`buyers/edit`, semester);
}

const deleteBuyer = async (id) => {
    return await apiDelete(`buyers/delete/`+id);
}

export { getBuyers, createBuyer, updateBuyer, deleteBuyer } 