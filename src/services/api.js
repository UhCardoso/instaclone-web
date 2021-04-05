import axios from "axios";

const api = axios.create({
    baseURL: "https://api--instagram-clone.herokuapp.com:443"
});

export default api;
