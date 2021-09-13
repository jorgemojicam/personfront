import axios from 'axios';
export default {
    get() {
        return axios.get(process.env.VUE_APP_BASEURL + 'registro');
    },
    getbyuser(iduser) {
        return axios.get(`${process.env.VUE_APP_BASEURL}registro/get/${iduser}`);
    },
    insert(data) {
        return axios.post(`${process.env.VUE_APP_BASEURL}registro`, data);
    },
    update() {
        return axios.put('http://localhost:3000/api/registro');
    }


}