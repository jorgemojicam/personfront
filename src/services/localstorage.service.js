export default {
    setUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    },
    setToken(token) {
        localStorage.setItem("token", JSON.stringify(token));
    },
    getUser() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user;
    },
    getToken() {
        const tkn = JSON.parse(localStorage.getItem("token"));
        return tkn;
    },
    setState(state){
        localStorage.setItem("isAuthenticated", state);
    },
    isAuthenticated(){       
        return localStorage.getItem("isAuthenticated");
    },
    deleteStorage(){
        localStorage.clear();
    }


}