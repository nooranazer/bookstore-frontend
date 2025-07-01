import axios from "axios";

const api = axios.create({
    baseURL:process.env.REACT_APP_BACKEND_URl ,   //'http://localhost:8000/api'-when deploy in vercel changed
    // headers: {
    //     'Content-Type': 'application/json'   give this with needed page
    // } 
})

export default api