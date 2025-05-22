import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {ShopContext} from "../context/ShopContext.tsx";
import {assets} from "../assets/frontend_assets/assets.ts";
import Title from "../components/Title.tsx";
import ProductItem from "../components/ProductItem.tsx";

export const Collection: React.FC = () => {
    const {products, search, showSearch} = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relavent');

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)){
            setCategory(prev=> prev.filter(item => item !== e.target.value))
        }
        else {
            setCategory(prev => [...prev, e.target.value]);
        }
    }

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)){
            setSubCategory(prev=> prev.filter(item => item !== e.target.value))
        }
        else {
            setSubCategory(prev => [...prev, e.target.value]);
        }
    }

    const applyFilter = () => {
        let productsCopy = products.slice();

        if (showSearch && search){
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (category.length > 0){
            productsCopy = productsCopy.filter(item => category.includes(item.category));
        }

        if (subCategory.length > 0){
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
        }
        setFilterProducts(productsCopy);
    }

    const sortProduct = () => {
        let fpCopy = filterProducts.slice();

        switch (sortType){
            case 'low-high':
                setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)))
                break;
            case 'high-low':
                setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)))
                break;

            default:
                applyFilter();
                break;

        }

    }

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, showSearch]);

    useEffect(() => {
        sortProduct();
    }, [sortType]);

    return (
        <div className="collection-page">
            {/*Filter Options*/}
            <div style={{minWidth: "200px"}}>
                <p onClick={()=> setShowFilter(!showFilter)} style={{marginTop: "0.5rem", marginBottom: "0.5rem", fontSize: "1.25rem", display: "flex", alignItems: "center", cursor: "pointer", gap: "0.5rem"}}>FILTERS
                    <img className={`img-category-filter ${showFilter ? 'rotate-90':''}`} src={assets.dropdown_icon} alt={""}/>
                </p>
                {/*Category Filter*/}
                <div className={`category-filter ${showFilter ? '' : 'hidden'}`}>
                    <p style={{marginBottom: "0.75rem", fontSize: "0.875rem", fontWeight: "500"}}>CATEGORIES</p>
                    <div style={{display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem", fontWeight: "300", color: "#4A5568"}}>
                        <p style={{display:"flex", gap: "0.5rem"}}>
                            <input style={{width: "0.75rem"}} type="checkbox" value={'Men'} onChange={toggleCategory}/>Men
                        </p>
                        <p style={{display:"flex", gap: "0.5rem"}}>
                            <input style={{width: "0.75rem"}} type="checkbox" value={'Women'} onChange={toggleCategory}/>Women
                        </p>
                        <p style={{display:"flex", gap: "0.5rem"}}>
                            <input style={{width: "0.75rem"}} type="checkbox" value={'Kids'} onChange={toggleCategory}/>Kids
                        </p>
                    </div>
                </div>
                {/*SubCategory Filter*/}
                <div className={`SubCategory-filter ${showFilter ? '' : 'hidden'}`}>
                    <p style={{marginBottom: "0.75rem", fontSize: "0.875rem", fontWeight: "500"}}>TYPE</p>
                    <div style={{display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem", fontWeight: "300", color: "#4A5568"}}>
                        <p style={{display:"flex", gap: "0.5rem"}}>
                            <input style={{width: "0.75rem"}} type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/>Topwear
                        </p>
                        <p style={{display:"flex", gap: "0.5rem"}}>
                            <input style={{width: "0.75rem"}} type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
                        </p>
                        <p style={{display:"flex", gap: "0.5rem"}}>
                            <input style={{width: "0.75rem"}} type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear
                        </p>
                    </div>
                </div>
            </div>

            {/*Right Side*/}
            <div style={{flex: "1", display: "flex", flexDirection: "column"}}>
                <div className="collection-rigt-side">
                    <Title text1={'ALL'} text2={'COLLECTIONS'}/>
                    {/*Product Sort*/}
                    <select onChange={(e)=> setSortType(e.target.value)} className="collection-product-sort">
                        <option value="relavent">Sort by: Relavent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>
                {/*Map Products*/}
                <div className="collection-product-map">
                    {
                        filterProducts.map((item,index)=>(
                            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};
