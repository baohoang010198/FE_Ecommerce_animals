import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { GlobalState } from '../../../GlobalState';

function OrderDetails() {
    const state = useContext(GlobalState);
    const [history] = state.UserAPI.history;
    const [orderDetails, setOrderDetails] = useState([]);

    const params =  useParams();
    useEffect(() => {
        if(params.id){
            history.forEach(item=>{
                if(item._id === params.id) setOrderDetails(item);
            })
        }
    }, [params.id,history]);
    if(orderDetails.length===0) return null;
    return (
        <div  className="history-page">
            <table>
                <caption>
                    <h2>Thông tin khách hàng</h2>
                </caption>
                <thead>
                    <tr>
                        <th scope="col">Tên khách hàng</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Mã bưu điện</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-label="Tên khách hàng">{orderDetails.address.recipient_name}</td>
                        <td data-label="Địa chỉ">{orderDetails.address.line1 +" - "+ orderDetails.address.city}</td>
                        <td data-label="Mã bưu điện">{orderDetails.address.postal_code}</td>
                    </tr>
                </tbody>
            </table>
            <table style={{margin:" 30px 0px "}}>
                <caption>
                    <h2>Đơn hàng</h2>
                </caption>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Sản phẩm</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Đơn giá</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart.map(item=>(
                            <tr key={ item._id }>
                                <td data-label=""><img src={item.images.url} alt="" /></td>
                                <td data-label="Sản phẩm">{item.title}</td>
                                <td data-label="Số lượng">{item.quantity}</td>
                                <td data-label="Đơn giá">{item.price}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderDetails
