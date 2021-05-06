import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Register() {
    const [user, setUser] = useState({
        name:'',
        email:'',
        password:'',
    });

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({...user,[name]:value});
    }
    const registerSubmit = async e =>{
        e.preventDefault();
        try {
            await axios.post('/user/register',{...user});

            localStorage.setItem('firstLogin',true);
            
            window.location.href='/';
        } catch (error) {
            alert(error.response.data.msg);
        }
    }
    return (
        <>
            <form class="login-form" onSubmit={registerSubmit}>
                <h1>Đăng Ký</h1>
                <div class="form-input-material">
                    <input type="text" name="name" id="name" 
                        placeholder=" " value={ user.name } autocomplete="off"
                        required class="form-control-material"  onChange={onChangeInput}/>
                    <label for="username">Tên người dùng</label>
                </div>
                <div class="form-input-material">
                    <input type="email" name="email" id="email" 
                        placeholder=" " value={ user.email } autocomplete="off"
                        required class="form-control-material"  onChange={onChangeInput}/>
                    <label for="username">Email</label>
                </div>
                <div class="form-input-material">
                    <input type="password" name="password" id="password" 
                        placeholder=" " autocomplete="off" 
                        required class="form-control-material"  onChange={onChangeInput}/>
                    <label for="password">Mật khẩu</label>
                </div>
                <button type="submit" class="btn btn-ghost">Đăng ký</button>
                <Link to="/login" className="link"> Đăng nhập </Link>
            </form>
        </>
    );
}

export default Register;

