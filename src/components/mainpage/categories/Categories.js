import axios from 'axios';
import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'

function Categories() {
    const state = useContext(GlobalState);
    const[categories] = state.CategoriesAPI.categories;
    const[callback,setCallback] = state.CategoriesAPI.callback;
    const[token] = state.token;
    const [category, setCategory] = useState('');
    const [onEdit, setOnEdit] = useState(false);
    const [id, setId] = useState('');


    const createCategory= async (e)=>{
        e.preventDefault();
        try {
            if(onEdit){
                const res = await axios.put(`/api/category/${id}`,{name:category},{
                    headers:{Authorization:token}
                })
                alert(res.data.msg);
            }else{
                const res = await axios.post('/api/category',{name:category},{
                    headers:{Authorization:token}
                })
                alert(res.data.msg);
            }
            setOnEdit(false);
            setCallback(!callback)
            setCategory('');
        } catch (error) {
            alert(error.response.data.msg);
        }
    }

    const editCategory= async (id,name)=>{
        setId(id);
        setCategory(name);
        setOnEdit(true);
    }

    const deleteCategory = async (id)=>{
        try {
            const res = await axios.delete(`/api/category/${id}`,{
                headers:{Authorization:token}
            });
            setCallback(!callback);
            alert(res.data.msg);
        } catch (error) {
            alert(error.response.data.msg);
        }
    }
    return (
        <div className="categories">
            <form onSubmit={createCategory}>
                <label htmlFor="category">Danh mục</label>

                <input type="text"  name="category" value={ category } required
                onChange={e=>setCategory(e.target.value)}/>

                <button type="submit">{onEdit?'Sửa':'+'}</button>
            </form>
            <div className='col'>
                {
                    categories.map(category=>(
                        <div className="row" key={ category._id }>
                            <p>{category.name}</p>
                            <div>
                                <button  onClick={()=>editCategory(category._id ,category.name)}>Sửa</button>
                                <button onClick={()=>deleteCategory(category._id )}>Xoá</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories
