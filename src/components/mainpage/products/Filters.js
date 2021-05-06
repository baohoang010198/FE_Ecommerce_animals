import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
function Filters() {
    const state = useContext(GlobalState);
    const [categories] = state.CategoriesAPI.categories;
    const [category, setCategory] = state.ProductsAPI.category;
    const [sort, setSort] = state.ProductsAPI.sort;
    const [ search,setSearch] = state.ProductsAPI.search;


    const handleCategory =e=>{
        setCategory(e.target.value);
        setSearch('');
    }

    return (
        <div className="filter_menu">
            <div className="row">
                <span>Phân loại: </span>
                <select name="category" value={category} onChange={handleCategory}>
                    <option value=''>Tất cả sản phẩm</option>
                    {
                        categories.map(category=>(
                            <option value={"category="+ category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <input type="text" className="search-input" value={search} placeholder="Nhập từ khoá" onChange={e=>setSearch(e.target.value.toLowerCase())}/>
            <div className="row sort">
                <span>Sắp xếp: </span>
                <select value={sort} onChange={e=>setSort(e.target.value)}>
                    <option value=''>Mới nhất</option>
                    <option value='sort=oldest'>Cũ Nhất</option>
                    <option value='sort=sold'>Bán chạy nhất</option>
                    <option value='sort=price'>Giá :Thấp - Cao</option>
                    <option value='sort=-price'>Giá :Cao - Thấp</option>
                </select>
            </div>
        </div>
    )
}

export default Filters;
