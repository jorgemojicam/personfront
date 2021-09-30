import axios from 'axios';

export default {
    auth(data) {
        return axios.post(process.env.VUE_APP_BASEURL + 'cuentaacceso/auth', data);
    },
    get() {
        return axios.get(process.env.VUE_APP_BASEURL + 'cuentaacceso');
    },
    insert(data) {
        return axios.post(`${process.env.VUE_APP_BASEURL}cuentaacceso`, data);
    },
    update(data) {
        return axios.put(`${process.env.VUE_APP_BASEURL}cuentaacceso`, data);
    }
}