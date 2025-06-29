import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {ShopContext} from "../context/ShopContext.tsx";
import Title from "./Title.tsx";
import ProductItem from "./ProductItem.tsx";

const BestSeller: React.FC = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.slice(0,5));
    }, [products]);

    return (
        <div className="bestseller-section">
            <div className="bestseller-header">
                <Title text1="BÁN CHẠY" text2="NHẤT" />
                <p className="bestseller-page">
                    TechView là nơi khám phá các sản phẩm công nghệ. TechView vẫn luôn là nơi để tìm kiếm của chúng ta.
                </p>
            </div>

            <div className="product-grid">
                {
                    bestSeller.map((item,index)=> (
                        <ProductItem key={index} id={item.id} name={item.name} image={item.images} price={item.price}/>
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller;
