import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {ShopContext} from "../context/ShopContext.tsx";
import Title from "./Title.tsx";
import ProductItem from "./ProductItem.tsx";

const LatestCollection:React.FC = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0,10));
    }, []);

    console.log(products);

    console.log(latestProducts)

    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Title text1={'SẢN PHẨM'} text2={'MỚI NHẤT'} />
                <p className="latestcollection-page">
                    TechView là điểm đến của bạn với vô vàn lựa chọn thiết bị công nghệ. TechView từ lâu đã là nơi để bạn tìm thấy mọi thứ
                </p>
            </div>

            {/*Rendering Products*/}
            <div className="product-grid">
                {
                    latestProducts.map((item,index)=>(
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                    ))
                }
            </div>
        </div>
    )
}
export default LatestCollection;
