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
    }, []);

    return (
        <div style={{marginTop: "2.5rem", marginBottom: "2.5rem"}}>
            <div style={{textAlign: "center", fontSize: "1.875rem", paddingTop: "2rem", paddingBottom: "2rem"}}>
                <Title text1={'BEST'} text2={'SELLERS'}/>
                <p className="bestseller-page">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
                </p>
            </div>

            <div className="product-grid">
                {
                    bestSeller.map((item,index)=> (
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller;
