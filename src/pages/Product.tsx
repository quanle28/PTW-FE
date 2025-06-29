import * as React from "react";
import {useLocation, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ShopContext} from "../context/ShopContext.tsx";
import {assets} from "../assets/frontend_assets/assets.ts";
import RelatedProducts from "../components/RelatedProducts.tsx";

export const Product: React.FC = () => {
    const {productId} = useParams();
    const {products, currency, addToCart} = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');
    const [memory, setMemory] = useState('');
    const location = useLocation();

    const fetchProductData = async () => {
        const foundProduct = products.find(p => p.id === Number(productId));
        console.log("foundProduct", foundProduct)
        if (foundProduct) {
            setProductData(foundProduct);
            setImage(foundProduct.images[0]);
        }
    };


    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    return productData ? (
        <div style={{borderTop: "2px solid", paddingTop: "2.5rem", transition: "opacity 0.5s ease-in", opacity: "1"}}>
            {/*Product Data*/}
            <div className="product-page">
                {/*Product Image*/}
                <div className="product-page-img">
                    <div className="product-page-img-div">
                        {
                            productData.images.map((item, index)=>(
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
                    <p style={{marginTop: "1.25rem", fontSize: "1.875rem", fontWeight: "500"}}>{productData.price}{currency}</p>
                    <p className="product-page-infor-p">{productData.describes}</p>
                    <div style={{display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem", marginBottom: "2rem"}}>
                        <p>Chọn bộ nhớ</p>
                        <div style={{display: "flex", gap: "0.5rem"}}>
                            {
                                productData.memories.map((item,index)=>(
                                    <button
                                        onClick={() => setMemory(item)}
                                        className={`product-page-infor-button ${item === memory ? 'active' : ''}`}
                                        key={index}
                                    >
                                        {item === "1" ? "1 TB" : `${item} GB`}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                    <button
                        onClick={() => addToCart(productData.id, memory)}
                        className="product-page-infor-button2"
                    >
                        Thêm vào giỏ hàng
                    </button>
                    <hr className="product-page-infor-hr"/>
                    <div style={{fontSize: "0.875rem", color: "#6b7280", marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.25rem"}}>
                        <p>Sản Phẩm Chính Hãng 100%.</p>
                        <p>Sản phẩm này có hỗ trợ thanh toán khi nhận hàng (COD).</p>
                        <p>Đổi trả dễ dàng trong 7 ngày.</p>
                    </div>
                </div>
            </div>

            {/*Description & Review Section*/}
            <div style={{marginTop: "5rem"}}>
                <div style={{display: "flex"}}>
                    <p style={{border: "1px solid", paddingTop: "0.75rem", paddingBottom: "0.75rem", paddingLeft: "1.25rem", paddingRight: "1.25rem", fontSize: "0.875rem"}}>Mô tả</p>
                    <p style={{border: "1px solid", paddingTop: "0.75rem", paddingBottom: "0.75rem", paddingLeft: "1.25rem", paddingRight: "1.25rem", fontSize: "0.875rem"}}>Đánh giá (122)</p>
                </div>
                <div style={{display: "flex", flexDirection: "column", gap: "1rem", border: "1px solid", padding: "1.5rem 1.5rem", fontSize: "0.875rem", color: "#6b7280"}}>
                    <p>Website thương mại điện tử TechView là một nền tảng trực tuyến hỗ trợ việc mua và bán các sản phẩm camera, laptop và thiết bị công nghệ qua internet. TechView đóng vai trò như một showroom công nghệ ảo, nơi chúng tôi giới thiệu các sản phẩm chọn lọc, tương tác với quý khách hàng và thực hiện giao dịch một cách tiện lợi mà không cần đến cửa hàng thực tế. Các website thương mại điện tử như TechView đã trở nên vô cùng phổ biến nhờ sự thuận tiện, khả năng truy cập dễ dàng và phạm vi tiếp cận rộng rãi mà chúng mang lại.</p>
                    <p>TechView thường xuyên trưng bày các sản phẩm camera, laptop cùng với mô tả chi tiết, hình ảnh chất lượng cao, thông tin giá cả và các tùy chọn cấu hình sẵn có (ví dụ: dung lượng RAM, ổ cứng, màu sắc). Mỗi sản phẩm tại TechView thường có một trang riêng biệt với đầy đủ thông tin liên quan, giúp quý khách dễ dàng tìm hiểu và đưa ra quyết định mua sắm.</p>
                </div>
            </div>

            {/*display related products*/}
            <RelatedProducts category={productData.categories} subCategory={productData.brands}/>
        </div>
    ) : <div className="opacity-0"></div>
};
