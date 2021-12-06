import axios from 'axios';


const callAPI =  axios.create({
    baseURL: 'http://localhost:8080/admin/',
    headers: {
        "Content-type": 'application/json',
    }
    
})
export default callAPI;
