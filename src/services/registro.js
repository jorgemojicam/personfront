import axios from 'axios';

const tkn = JSON.parse(localStorage.getItem("token"))
const head = {
    headers: {
        'Authorization': `Bearer ${tkn}`
    }
}

export default {
    get() {
        return axios.get(process.env.VUE_APP_BASEURL + 'registro', head);
    },
    insert(data) {
        return axios.post(`${process.env.VUE_APP_BASEURL}registro`, data, head);
    },
    update() {
        return axios.put('http://localhost:3000/api/registro');
    }


}