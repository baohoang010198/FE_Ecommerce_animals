import axios from 'axios';
import React,{ createContext, useEffect, useState } from 'react';
import CategoriesAPI from './api/CategoriesAPI';
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from './api/UserAPI';
export const GlobalState = createContext();


export const DataProvider = ({ children })=>{
    const [token, setToken] = useState(false);
    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if(firstLogin){
            const refreshToken = async ()=>{
                const res = await axios.get('https://animals-ecommerce.herokuapp.com/user/refresh_token');
                setToken(res.data.accesstoken);
    
                setTimeout(() => {
                    refreshToken();
                }, 10 * 60 *1000);
            }
            refreshToken()
        }
    }, [])
    
    const state={
        token:[token, setToken],
        ProductsAPI:ProductsAPI(),
        UserAPI:UserAPI(token),
        CategoriesAPI: CategoriesAPI(),
    }
    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
}