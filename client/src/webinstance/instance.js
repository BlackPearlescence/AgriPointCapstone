import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    }
});

instance.interceptors.request.use(config => {
    const token = Cookies.get("agrijwt");
    if (token) {
        console.log(token)
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


// Add response interceptor to remove the JWT cookie when the user logs out!!!
instance.interceptors.response.use(
    (resp) => {
        return resp
    },
    (err) => {
        if (err.response.status === 401){
            Cookies.remove("agrijwt");
        }
        return Promise.reject(err)
    }
)

export default instance;
