import axios from 'axios';
// import callAPILogin from './index';

const callAPILogin =  axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        "Content-type": 'application/json',
    }
    
})
// export default callAPILogin;

class LoginAPI {


    // [POST]
    login (data: any) {
        return callAPILogin.post('auth/token', data)
    }

    // [PUT]
    register (data: any) {
        return callAPILogin.put('register/',data)
    }


}
export default new LoginAPI();