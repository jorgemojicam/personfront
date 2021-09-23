import axios from 'axios';
export default {
    get() {
        return axios.get(process.env.VUE_APP_BASEURL + 'permisos');
    },
    getbyfilters(iduser){
        return axios.get(`${process.env.VUE_APP_BASEURL}permisos/getbyfilters/${iduser}`);
    },
    getbyuser(iduser) {
        return axios.get(`${process.env.VUE_APP_BASEURL}permisos/${iduser}`);
    },
    insert(data) {
        return axios.post(`${process.env.VUE_APP_BASEURL}permisos`, data);
    },
    update(data) {
        return axios.put(`${process.env.VUE_APP_BASEURL}permisos`, data);
    }


}