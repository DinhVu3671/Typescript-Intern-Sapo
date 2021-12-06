import React, { useEffect, useState } from 'react';
// import { stateLogin } from '../../redux/action/index';
import {useHistory} from 'react-router-dom';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { stateUser } from '../../redux/action';
import LoginAPI from '../../api/LoginAPI';



const Login: React.FC = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loginResult, setLoginResult] = useState("");

    const history = useHistory();
    // useEffect(() => {
    //     if (localStorage.getItem('sessionId')) {
    //         history.replace("/user-info")
    //     }
    // }, [])

    const dispatch = useDispatch();
    function handleClickLogin() {
        let item = { username, password };
        if (item.username === "" || item.password === "") {
            const loginResultcopy = 'Please enter your mail address/password';
            setLoginResult(loginResultcopy);
        }
        else 
        {   
            console.log(username);
            console.log(password);
            let result = LoginAPI.login({username, password});
            
            result.then( res => {
                const token: string = res.data.token;
                console.log(token)
                localStorage.setItem('token', token);
                dispatch(stateUser(username));
                history.replace("/category");
            });
            // dispatch(stateUser(username));
            // history.replace("/category");

        }
    }
    return (
        <div className="login-page">
            <h1 className="col-sm-3 title">SAPO </h1>
            <div className="col-sm-4 offset-sm-4">
                <input type="text" placeholder="Username"
                    id="userName-login" name="userName"
                    onChange={(e) => setUserName(e.target.value)}
                    className="form-control" required />
                <br />
                <input type="password" placeholder="Password"
                    id="password-login"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control" required />
                <br />
                <p className="login-Result">
                    {loginResult}
                    </p>
                <button
                 onClick={handleClickLogin}
                  className="btn btn-primary title">Login</button>
            </div>
        </div>
    )
}
export default (Login)