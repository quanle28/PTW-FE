import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {ShopContext} from "../context/ShopContext.tsx";
import Title from "../components/Title.tsx";
import {assets} from "../assets/frontend_assets/assets.ts";
import CartTotal from "../components/CartTotal.tsx";

export const Cart: React.FC = () => {
    const {products, currency, cartItems, updateQuantity, navigate} = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const tempData = [];
        for (const items in cartItems){
            for (const item in cartItems[items]){
                if (cartItems[items][item]>0){
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItems[items][item],
                    })
                }
            }
        }
        setCartData(tempData);
    }, [cartItems]);

    return (
        <div style={{borderTop: "1px solid", paddingTop: "3.5rem"}}>
            <div style={{fontSize: "1.5rem", marginBottom: "0.75rem"}}>
                <Title text1={'GIỎ HÀNG'} text2={'CỦA BẠN'}/>
            </div>

            <div>
                {
                    cartData.map((item, index)=>{
                        const productData = products.find((product)=> product._id === item._id);
                        return (
                            <div key={index} className="cart-page">
                                <div style={{display: "flex", alignItems: "flex-start", gap: "1.5rem"}}>
                                    <img className="cart-page-img" src={productData.image[0]} alt={""}/>
                                    <div>
                                        <p className="cart-page-p">{productData.name}</p>
                                        <div style={{display: "flex", alignItems: "center", gap: "1.25rem", marginTop: "0.5rem"}}>
                                            <p>{currency}{productData.price}</p>
                                            <p className="cart-page-p2">{item.size}</p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                                    <input onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className="cart-page-input" type="number" min={1} defaultValue={item.quantity}/>
                                    <img onClick={()=> updateQuantity(item._id, item.size, 0)} className="cart-page-img2" src={assets.bin_icon} alt={""}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div style={{display: "flex", justifyContent: "flex-end", margin: "5rem"}}>
                <div className="cart-page-cart-total">
                    <CartTotal />
                    <div style={{width: "100%", textAlign: "end"}}>
                        <button onClick={()=> navigate('/place-order')} style={{backgroundColor: "black", color: "white", fontSize: "0.875rem", marginTop: "2rem", marginBottom: "2rem", paddingLeft: "2rem", paddingRight: "2rem", paddingTop: "0.75rem", paddingBottom: "0.75rem"}}>TIẾN HÀNG THANH TOÁN</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
