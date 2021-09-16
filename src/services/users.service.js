import axios from 'axios';

const tkn = JSON.parse(localStorage.getItem("token"))
const head = {
    headers: {
        'Authorization': `Bearer ${tkn}`
    }
}

export default {
    get() {
        return axios.get(`${process.env.VUE_APP_BASEURL}user`, head);
    },
    insert(data) {
        return axios.post(`${process.env.VUE_APP_BASEURL}user`, data, head);
    },
    update(data) {
        return axios.put(`${process.env.VUE_APP_BASEURL}user`, data, head);
    },
    getbyid(id) {
        return axios.get(`${process.env.VUE_APP_BASEURL}user/${id}`, head);
    },
    getcoordinadores() {
        return axios.get(`${process.env.VUE_APP_BASEURL}user/getbycoordinador/1`, head);
    }


}