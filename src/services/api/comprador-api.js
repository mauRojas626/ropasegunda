import { apiGet, apiPost, apiDelete } from '../api/api'

const getBuyers = async () => {
    return await apiGet(`buyers/list`);
}

const createBuyer = async (buyer) => {
    return await apiPost(`buyers/create`, buyer);
}

const updateBuyer = async (buyer) => {
    return await apiPost(`buyers/edit`, buyer, {
        'Content-Type': 'multipart/form-data',
    });
}

const deleteBuyer = async (id) => {
    return await apiDelete(`buyers/delete/`+id);
}

const validateBuyer = async (buyer) => {
    return await apiPost(`buyers/validate`, buyer);
}

const validateRuc = async (buyer) => {
    return await apiPost(`buyers/validateRuc`, buyer);
}

const reportUser = async (user) => {
    return await apiPost(`buyers/reportar`, user, {
        'Content-Type': 'multipart/form-data',
    })
}

const blockUser = async (user) => {
    return await apiPost(`buyers/bloquear`, user)
}
export { getBuyers, createBuyer, updateBuyer, deleteBuyer, validateBuyer, validateRuc, reportUser, blockUser } 