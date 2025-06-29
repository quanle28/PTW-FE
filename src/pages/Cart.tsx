import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {ShopContext} from "../context/ShopContext.tsx";
import Title from "../components/Title.tsx";
import {assets} from "../assets/frontend_assets/assets.ts";
import CartTotal from "../components/CartTotal.tsx";
import {toast} from "react-toastify";

export const Cart: React.FC = () => {
    const {products, currency, cartItems, updateQuantity, navigate, fetchCartData} = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    const token = localStorage.getItem("token");

    const fetchCart = async () => {
        console.log("token", token)
        const response = await fetch("http://localhost:8080/shopqtq/cart", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Lỗi fetch cart:", response.status, errorText);
            toast.error("Không thể tải giỏ hàng: " + response.status);
            return;
        }

        const data = await response.json();
        console.log("dataCart", data);
        setCartData(data);
    };

    useEffect(() => {
        fetchCart();
    }, [updateQuantity]);

    const deleteCartItem = async (cartItemId) => {
        const response =  await fetch(`http://localhost:8080/shopqtq/cart/${cartItemId}`, {
            method: "DELETE",
            headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });

        if (response.ok) {
            toast.success("Xóa thành công!")
            fetchCart(); // gọi lại để cập nhật giao diện
        } else {
            toast.error("Xóa thất bại!")
        }

        await fetchCartData();
    };


    return (
        <div style={{borderTop: "1px solid", paddingTop: "3.5rem"}}>
            <div style={{fontSize: "1.5rem", marginBottom: "0.75rem"}}>
                <Title text1={'GIỎ HÀNG'} text2={'CỦA BẠN'}/>
            </div>

            <div>
                {
                    cartData.map((item, index)=>{
                        const productData = products.find((product)=> product.id === Number(item.id));
                        return (
                            <div key={index} className="cart-page">
                                <div style={{display: "flex", alignItems: "flex-start", gap: "1.5rem"}}>
                                    <img className="cart-page-img" src={item.images} alt={""}/>
                                    <div>
                                        <p className="cart-page-p">{item.name}</p>
                                        <div style={{display: "flex", alignItems: "center", gap: "1.25rem", marginTop: "0.5rem"}}>
                                            <p>{Math.round(item.price)}{currency}</p>
                                            <p className="cart-page-p2">
                                                {item.capacity === "1" ? "1 TB" : `${item.capacity} GB`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                                    <input onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item.productId, item.capacity, Number(e.target.value))} className="cart-page-input" type="number" min={1} defaultValue={item.number}/>
                                    <img onClick={() => deleteCartItem(item.id)} className="cart-page-img2" src={assets.bin_icon} alt={""}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div style={{display: "flex", justifyContent: "flex-end", margin: "5rem"}}>
                <div className="cart-page-cart-total">
                    <CartTotal cartData={cartData}/>
                    <div style={{width: "100%", textAlign: "end"}}>
                        <button onClick={()=> navigate('/place-order')} style={{backgroundColor: "black", color: "white", fontSize: "0.875rem", marginTop: "2rem", marginBottom: "2rem", paddingLeft: "2rem", paddingRight: "2rem", paddingTop: "0.75rem", paddingBottom: "0.75rem"}}>TIẾN HÀNG THANH TOÁN</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
