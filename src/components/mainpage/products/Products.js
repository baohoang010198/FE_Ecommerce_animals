import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';
import Loading from '../utils/loading/Loading';
import axios from 'axios';
import Filters from './Filters';
import LoadMore from './LoadMore';


function Products() {
    const state = useContext(GlobalState);
    const [products,setProducts] = state.ProductsAPI.products;
    const [isAdmin] = state.UserAPI.isAdmin;
    const [token] = state.token;
    const [callback,setCallBack] = state.ProductsAPI.callback;
    const [isCheck, setIsCheck] = useState(false);
    const handleCheck  = (id)=>{
        products.forEach(product=>{
            if(product._id===id) product.checked = !product.checked;
        })
        setProducts([...products]);
    }

    const deleteProduct = async (id,public_id)=>{
        try {
            await axios.post('https://animals-ecommerce.herokuapp.com/api/destroy',{public_id},{
                headers:{Authorization:token},
            });

            const destroyProduct =  await axios.delete(`https://animals-ecommerce.herokuapp.com/api/products/${id}`,{
                headers:{Authorization:token},
            });
            alert(destroyProduct.data.msg);
            setCallBack(!callback);
        } catch (error) {
            alert(error.response.data.msg);
        }
    }

    const checkAll = ()=>{
        products.forEach(product=>{
            product.checked = !isCheck;
        })
        setProducts([...products]);
        setIsCheck(!isCheck)
    }

    const deleteAll =  ()=>{
        products.forEach(product=>{
            if(product.checked) deleteProduct(product._id,product.images.public_id);
        })
    }

    
    return (
        <>
        <Filters/>
        {products.length===0&&<Loading/>}
        {
            isAdmin &&
            <div className="delete-all">
                <span>Chọn tất cả</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll}/>
                <button onClick={deleteAll}>Xoá tất cả</button>
            </div>
        }
            <div className="products">
                {
                    products.map((product,index)=>{
                        return <ProductItem key={ index } product={ product } 
                                isAdmin={isAdmin}  deleteProduct={deleteProduct} handleCheck={handleCheck}
                                 />
                    })
                }
            </div>
            <LoadMore />
        </>
    );
}
export default Products;

