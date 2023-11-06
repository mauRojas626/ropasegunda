import { apiGet } from '../api/api'

const getCities = async () => {
    return await apiGet(`cities/list`);
}

export { getCities } 