import axios from 'axios';

export default {
    auth(data){
        return axios.post(process.env.VUE_APP_BASEURL + 'cuentaacceso/auth',data);
    },
    get() {
        return axios.get(process.env.VUE_APP_BASEURL + 'registro');
    },
    insert(data) {
        return axios.post('http://localhost:3000/', data);
    },
    update() {
        return axios.put('http://localhost:3000/api/registro');
    }
}