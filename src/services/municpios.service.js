import axios from 'axios';

const tkn = JSON.parse(localStorage.getItem("token"))
const head = {
    headers: {
        'Authorization': `Bearer ${tkn}`
    }
}
const URL = process.env.VUE_APP_BASEURL

export default {
    get() {
        return axios.get(`${URL}municipios`, head);
    },
    getbydep(iddepartamento) {
        return axios.get(`${URL}municipios/${iddepartamento}`, head);
    }
}