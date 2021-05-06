import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Login() {
    const [user, setUser] = useState({
        email:'',
        password:'',
    });

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({...user,[name]:value});
    }


    const loginSubmit = async e =>{
        e.preventDefault();
        try {
            await axios.post('https://animals-ecommerce.herokuapp.com/user/login',{...user});
            localStorage.setItem('firstLogin',true);
            window.location.href='/';
        } catch (error) {
            alert(error.response.data.msg);
        }
    }
    return (
        <>
        <form className="login-form" onSubmit={loginSubmit}>
            <h1>Đăng Nhập</h1>
            <div className="form-input-material">
                <input type="email" name="email" id="email" 
                    placeholder=" " value={ user.email } autoComplete="off"
                    required className="form-control-material"  onChange={onChangeInput}/>
                <label htmlFor="username">Email</label>
            </div>
            <div className="form-input-material">
                <input type="password" name="password" id="password" 
                    placeholder=" " autoComplete="off" 
                    required className="form-control-material"  onChange={onChangeInput}/>
                <label htmlFor="password">Mật khẩu</label>
            </div>
            <button type="submit" className="btn btn-ghost">Đăng Nhập</button>
            <Link to="/register" className="link"> Đăng ký </Link>
        </form>
        </>
    );
}

export default Login;

