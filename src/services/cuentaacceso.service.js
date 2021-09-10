import axios from 'axios';

const tkn = JSON.parse(localStorage.getItem("token"))
const head = {
    headers: {
        'Authorization': `Bearer ${tkn}`
    }
}

export default {
    auth(data) {
        return axios.post(process.env.VUE_APP_BASEURL + 'cuentaacceso/auth', data);
    },
    get() {
        return axios.get(process.env.VUE_APP_BASEURL + 'registro');
    },
    insert(data) {
        return axios.post(`${process.env.VUE_APP_BASEURL}/cuentaacceso`, data, head);
    },
    update() {
        return axios.put('http://localhost:3000/api/registro');
    }
}