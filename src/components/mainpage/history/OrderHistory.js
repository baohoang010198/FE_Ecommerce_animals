import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState'

function OrderHistory() {
    const state = useContext(GlobalState);
    const [history,setHistory] = state.UserAPI.history;
    const [isAdmin] = state.UserAPI.isAdmin;
    const [token] = state.token;

    useEffect(() => {
        if(token){
            const getHistory = async () =>{
                if(isAdmin){
                    const res = await axios.get('/api/payment',{
                        headers:{Authorization:token}
                    });
                    setHistory(res.data);
                }
                else{
                    const res = await axios.get('/user/history',{
                        headers:{Authorization:token}
                    });
                    setHistory(res.data);
                }
            }
            getHistory()
        }
    }, [token, isAdmin, setHistory])

    return (
        <div  className="history-page">
            <table>
                <caption>
                    <h2>Lịch sử giao dịch</h2>
                    <h4>Bạn có {history.length} lần giao dịch</h4>
                </caption>
                <thead>
                    <tr>
                        <th scope="col">Mã giao dịch</th>
                        <th scope="col">Ngày giao dịch</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {
                        history.map((items,index)=>(
                            <tr key={index}>
                                <td data-label="Mã giao dịch">{items.paymentID}</td>
                                <td data-label="Ngày giao dịch">{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td data-label=""><Link to={`/history/${items._id}`}>Xem</Link></td>
                            </tr>
                        ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default OrderHistory
