import axios from 'axios';
export default {
    get() {
        return axios.get(process.env.VUE_APP_BASEURL + 'modulos');
    },
    getbyrol(idrol){
        return axios.get(`${process.env.VUE_APP_BASEURL}modulos/getbyrol?idrol=${idrol}`);
    },
    getbyver(idrol){
        return axios.get(`${process.env.VUE_APP_BASEURL}modulos/getbyrol?idrol=${idrol}&ver=1`);
    }

}