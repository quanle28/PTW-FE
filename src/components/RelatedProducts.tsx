import {useContext, useEffect, useState} from "react";
import {ShopContext} from "../context/ShopContext.tsx";
import Title from "./Title.tsx";
import ProductItem from "./ProductItem.tsx";

const RelatedProducts = ({category, subCategory}) => {
    const {products} = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0){
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item)=> category === item.category);
            productsCopy = productsCopy.filter((item)=> subCategory === item.subCategory);
            setRelated(productsCopy.slice(0,5));
        }
    }, [products]);

    return (
        <div style={{marginTop: "6rem", marginBottom: "6rem"}}>
            <div style={{textAlign: "center", fontSize: "1.875rem", paddingTop: "0.5rem", paddingBottom: "0.5rem"}}>
                <Title text1={'RELATED'} text2={'PRODUCTS'}/>
            </div>

            <div className="product-grid">
                {related.map((item,index)=> (
                    <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts;
