import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import { useHistory, useParams } from 'react-router-dom';
const initialState = {
    product_Id:'',
    title:'',
    price: 0,
    description: 'Mô tả sản phẩm',
    content:'Nội dung sản phẩm',
    category:'',
    _id:'',
}

function CreateProduct() {
    const state = useContext(GlobalState);
    const [product, setProduct] = useState(initialState);
    const [categories] = state.CategoriesAPI.categories;
    const [token] = state.token;
    const [images, setImages] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAdmin] = state.UserAPI.isAdmin;
    const [products] = state.ProductsAPI.products;
    const [onEdit,setOnEdit] = useState(false);
    const [callback,setCallback] = state.ProductsAPI.callback;
    const history = useHistory();
    const param = useParams();
    useEffect(() => {
        if(param.id){
            products.forEach(product=>{
                if(product._id===param.id){
                    setProduct(product);
                    setImages(product.images);
                } 
            })
            setOnEdit(true);
        }else{
            setOnEdit(false);
            setProduct(initialState);
            setImages(false);
        }
    }, [param.id,products]);

    const styleUpload={
        display:images ? "block" : "none",
    }

    const handleUpload = async (e)=>{
        e.preventDefault();
        try {
            if(!isAdmin) return alert('Bạn không phải là quản trị viên!');
            const file = e.target.files[0];
            if(!file) return alert('Tập tin không tồn tại!')
            if(file.size>1024*1024) return alert('Kích thước không phù hợp!');
            if(file.type!=='image/jpeg' && file.type !=='image/png') return alert('Tập tin sai định dạng!');
            let formData = new FormData();
            formData.append('file',file);

            setLoading(true);
            const res = await axios.post('/api/upload',formData,{
                headers:{'content-type':'multipart/form-data', Authorization:token}
            });
            setImages(res.data);
            setLoading(false);

        } catch (error) {
            alert(error.response.data.msg); 
        }

    }

    const handleDestroy = async ()=>{
        try {
            if(!isAdmin) return alert('Bạn không phải là quản trị viên!');
            setLoading(true);
            await axios.post('/api/destroy',{public_id:images.public_id},{
                headers:{Authorization:token}
            });
            setImages(false);
            setLoading(false);
        } catch (error) {
            alert(error.response.data.msg);
        }
    }

    const handleChangeInput = (e)=>{
 
        const { name, value } = e.target;
        setProduct({...product,[name]:value});
    }

    const handleSubmit = async e =>{
        e.preventDefault();
        try {
            if(!isAdmin) return alert('Bạn không phải là quản trị viên!');
            if(!images) return alert('Thêm hình ảnh sản phẩm!');
            if(onEdit){
                const res= await axios.put(`/api/products/${product._id}`,{...product,images},{
                    headers:{Authorization:token}
                });
                alert(res.data.msg);
            }
            else{
                const res = await axios.post('/api/products',{...product,images},{
                    headers:{Authorization:token}
                });
                alert(res.data.msg);
            }
            setCallback(!callback);
            history.push('/');
        } catch (error) {
            return alert(error.response.data.msg);
        }
    }

    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img" style={styleUpload}><Loading/></div> :
                    <div id="file_img" style={styleUpload}>
                        <img src={images? images.url : ''} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
            </div>

            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="product_Id">Mã sản phẩm</label>
                    <input type="text" name="product_Id" id="product_Id" required
                    placeholder="Mã sản phẩm" value={product.product_Id} onChange={handleChangeInput} disabled={onEdit}/>
                </fieldset>
                <fieldset>
                    <label htmlFor="title">Tên sản phẩm</label>
                    <input type="text" name="title" id="title" required
                    placeholder="Tên sản phẩm"  value={product.title} onChange={handleChangeInput}/>
                </fieldset>
                <fieldset>
                    <label htmlFor="price">Đơn giá</label>
                    <input type="number" name="price" id="price" required
                      value={product.price} onChange={handleChangeInput}/>
                </fieldset>
                <fieldset>
                    <label htmlFor="description">Mô tả</label>
                    <textarea 
                        type="text" name="description" id="description" placeholder="Mã sản phẩm" 
                        value={product.description} rows="5" required onChange={handleChangeInput}/>
                </fieldset>
                <fieldset>
                    <label htmlFor="content">Nội dung</label>
                    <textarea 
                    type="text" name="content" id="content" placeholder="Nội dung" 
                    value={product.content} rows="7" required  onChange={handleChangeInput}/>
                </fieldset>
                <fieldset>
                    <label htmlFor="category">Danh mục</label>
                    <select name="category" value={product.category} onChange={handleChangeInput}>
                    <option value="">Chọn danh mục</option>
                    {
                        categories.map(category=>(
                            <option value={category._id} key={category._id}>{category.name}</option>
                        ))
                    }
                    </select>
                </fieldset>
                <button type="submit">{onEdit?'Cập nhật sản phẩm':'Thêm sản phẩm'}</button>
            </form>
        </div>
    )
}

export default CreateProduct
