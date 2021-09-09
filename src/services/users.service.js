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
    getbyid(id) {
        return axios.get(`${process.env.VUE_APP_BASEURL}user/${id}`, head);
    },
    getcoordinadores() {
        return axios.get(`${process.env.VUE_APP_BASEURL}user/getbycoordinador/1`, head);
    }


}