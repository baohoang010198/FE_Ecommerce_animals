import React, { useContext, useState } from 'react';
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart.svg";
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';


function Header() {
    const state = useContext(GlobalState);
    const [isLogged] = state.UserAPI.isLogged; 
    const [isAdmin] = state.UserAPI.isAdmin;
    const [cart] = state.UserAPI.cart;
    const [menu, setMenu] = useState(false);
    const logoutUser = async ()=>{
        await axios.get('/user/logout');
        localStorage.removeItem('firstLogin');
        window.location.href='/';
    }

    const adminRouter = ()=>{
        return(
            <>
                <li onClick={()=>toggleMenu()}><Link to='/create_product'>Thêm Sản Phẩm</Link></li>
                <li onClick={()=>toggleMenu()}><Link to='/category'>Danh mục</Link></li>
            </>

        )
    }

    const loggedRoute = ()=>{
        return(
            <>
                <li onClick={()=>toggleMenu()}><Link to='/history'>Lịch sử</Link></li>
                <li onClick={()=>toggleMenu()}><Link to='/' onClick={logoutUser}>Đăng xuất</Link></li>
            </>
        );
    }
    const toggleMenu = ()=>{
        setMenu(!menu);
    }
    const styleMenu = {
        left: menu? 0 :'-100%',
    }
    return (
        <header>
            <div className="menu" onClick={()=>toggleMenu()}>
                <img src={Menu} alt="" width="30"/>
            </div>
            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin?'Quản trị':'Thú Cưng'}</Link>
                </h1>
            </div>

            <ul style={styleMenu}>
                <li onClick={()=>toggleMenu()}>
                    <Link to="/">{isAdmin?'Sản Phẩm':'Cửa hàng'}</Link>
                </li>
                { isAdmin && adminRouter() }
                {
                    isLogged ? loggedRoute():<li onClick={()=>toggleMenu()}><Link to="/login"> Đăng nhập-Đăng ký </Link></li>
                }
                
                <li>
                    <img src={ Close } alt="" width="30" className="menu" onClick={()=>toggleMenu()}/>
                </li>
            </ul>
            {
                isAdmin ? '' :(
                                <div className="cart-icon">
                                    <span>{cart.length}</span>
                                    <Link to="/cart">
                                        <img src={ Cart } alt="" width="30" />
                                    </Link>
                                </div>
                            )
            }
        </header>
    );
}

export default Header;

