import * as React from "react";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ShopContext} from "../context/ShopContext.tsx";
import {assets} from "../assets/frontend_assets/assets.ts";
import RelatedProducts from "../components/RelatedProducts.tsx";

export const Product: React.FC = () => {
    const {productId} = useParams();
    const {products, currency, addToCart} = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');

    const fetchProductData = async () => {
        products.map((item) => {
            if(item._id === productId){
                setProductData(item);
                setImage(item.image[0]);
                return null;
            }
        })
    }

    useEffect(() => {
        fetchProductData();
    }, [productId]);

    return productData ? (
        <div style={{borderTop: "2px solid", paddingTop: "2.5rem", transition: "opacity 0.5s ease-in", opacity: "1"}}>
            {/*Product Data*/}
            <div className="product-page">
                {/*Product Image*/}
                <div className="product-page-img">
                    <div className="product-page-img-div">
                        {
                            productData.image.map((item, index)=>(
                                <img onClick={() => setImage(item)} src={item} key={index} className="product-page-img-div-img" alt={""}/>
                            ))
                        }
                    </div>
                    <div className="product-page-img-div2">
                        <img style={{width: "100%", height: "auto"}} src={image} alt={""}/>
                    </div>
                </div>

                {/*Product Info*/}
                <div style={{flex: "1"}}>
                    <h1 style={{fontWeight: "500", fontSize: "1.5rem", marginTop: "0.5rem"}}>{productData.name}</h1>
                    <div style={{display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.5rem"}}>
                        <img src={assets.star_icon} alt={""} className="product-page-infor-img"/>
                        <img src={assets.star_icon} alt={""} className="product-page-infor-img"/>
                        <img src={assets.star_icon} alt={""} className="product-page-infor-img"/>
                        <img src={assets.star_icon} alt={""} className="product-page-infor-img"/>
                        <img src={assets.star_dull_icon} alt={""} className="product-page-infor-img"/>
                        <p style={{paddingLeft: "0.5rem", paddingTop: "1rem" }}>(122)</p>
                    </div>
                    <p style={{marginTop: "1.25rem", fontSize: "1.875rem", fontWeight: "500"}}>{currency}{productData.price}</p>
                    <p className="product-page-infor-p">{productData.description}</p>
                    <div style={{display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem", marginBottom: "2rem"}}>
                        <p>Select Size</p>
                        <div style={{display: "flex", gap: "0.5rem"}}>
                            {
                                productData.sizes.map((item,index)=>(
                                    <button onClick={()=> setSize(item)} className={`product-page-infor-button ${item === size ? 'active': ''}`} key={index}>{item}</button>
                                ))
                            }
                        </div>
                    </div>
                    <button onClick={()=> addToCart(productData._id,size)} className="product-page-infor-button2">ADD TO CART</button>
                    <hr className="product-page-infor-hr"/>
                    <div style={{fontSize: "0.875rem", color: "#6b7280", marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.25rem"}}>
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            {/*Description & Review Section*/}
            <div style={{marginTop: "5rem"}}>
                <div style={{display: "flex"}}>
                    <p style={{border: "1px solid", paddingTop: "0.75rem", paddingBottom: "0.75rem", paddingLeft: "1.25rem", paddingRight: "1.25rem", fontSize: "0.875rem"}}>Description</p>
                    <p style={{border: "1px solid", paddingTop: "0.75rem", paddingBottom: "0.75rem", paddingLeft: "1.25rem", paddingRight: "1.25rem", fontSize: "0.875rem"}}>Reviews (122)</p>
                </div>
                <div style={{display: "flex", flexDirection: "column", gap: "1rem", border: "1px solid", padding: "1.5rem 1.5rem", fontSize: "0.875rem", color: "#6b7280"}}>
                    <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
                    <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
                </div>
            </div>

            {/*display related products*/}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
        </div>
    ) : <div className="opacity-0"></div>
};
