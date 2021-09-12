import axios from 'axios';
const URL = process.env.VUE_APP_BASEURL

export default {
    get() {
        return axios.get(`${URL}roles`);
    }
}