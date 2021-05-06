import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';

function BtnRender(props) {
    const { product, deleteProduct } = props;
    const state = useContext(GlobalState);
    const [isAdmin] = state.UserAPI.isAdmin;
    const addCart = state.UserAPI.addCart;
    return (
        <div className="row_btn">
            {
                isAdmin?
                <>
                    <Link id="btn_delete" to="#!" onClick={()=>deleteProduct(product._id,product.images.public_id)}>
                        Xoá
                    </Link>
                    <Link id="btn_edit" to={`/edit_product/${product._id}`}>
                        Sửa
                    </Link>
                </>
                :
                <>
                    <Link id="btn_buy" to="/" onClick={()=>addCart(product)}>
                        Mua ngay
                    </Link>
                    <Link id="btn_view" to={`/detail/${product._id}`}>
                        Thông tin 
                    </Link>
                </>
            }

        </div>
    )
}

export default BtnRender;
