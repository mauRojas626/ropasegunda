import { apiGet, apiPost, apiDelete } from '../api/api'

const getClothes = async () => {
    return await apiGet(`clothes/list`, null, { 'x-amz-acl': 'public-read' });
}

const createClothes = async (clothes) => {
    return await apiPost(`clothes/create`, clothes, {
        'Content-Type': 'multipart/form-data',
      });
}

const updateClothes = async (clothes) => {
    return await apiPost(`clothes/edit`, clothes, {
        'Content-Type': 'multipart/form-data',
    });
}

const deleteClothes = async (id) => {
    return await apiDelete(`clothes/delete/`+id);
}

const blockClothes = async (id) => {
    return await apiGet(`clothes/block/`+id);
}

const unBlockClothes = async (id) => {
    return await apiGet(`clothes/unblock/`+id);
}

export { getClothes, createClothes, updateClothes, deleteClothes, blockClothes, unBlockClothes } 