import * as React from "react";
import {useContext} from "react";
import {ShopContext} from "../context/ShopContext.tsx";
import Title from "../components/Title.tsx";

export const Orders: React.FC = () => {
    const {products, currency} = useContext(ShopContext);

    return (
        <div style={{borderTop: "1px solid #e5e7eb"}}>
            <div style={{fontSize: "1.5rem", lineHeight: "2rem"}}>
                <Title text1={'MY'} text2={'ORDERS'}/>
            </div>

            <div>
                {
                    products.slice(1,4).map((item,index)=>(
                        <div key={index} className="orders-page">
                            <div style={{display: "flex", alignItems: "flex-start", gap: "1.5rem", fontSize: "0.875rem", lineHeight: "1.25rem"}}>
                                <img className="orders-page-img" src={item.image[0]} alt={""}/>
                                <div>
                                    <p className="orders-page-p">{item.name}</p>
                                    <div style={{display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.5rem", fontSize: "1rem", lineHeight: "1.5rem", color: "#374151"}}>
                                        <p style={{fontSize: "1.125rem", lineHeight: "1.75rem"}}>{currency}{item.price}</p>
                                        <p>Quantity: 1</p>
                                        <p>Size: M</p>
                                    </div>
                                    <p style={{marginTop: "0.5rem"}}>Date: <span style={{color: "#9ca3af"}}>25, Jul, 2024</span></p>
                                </div>
                            </div>
                            <div className="orders-page-div">
                                <div style={{display: "flex", alignItems: "center", gap: "0.5rem"}}>
                                    <p style={{minWidth: "0.5rem", height: "0.5rem", borderRadius: "9999px", backgroundColor: "#38a169"}}></p>
                                    <p className="orders-page-p2">Ready to ship</p>
                                </div>
                                <button style={{border: "1px solid", paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", fontSize: "0.875rem", fontWeight: "500", borderRadius: "0.125rem"}}>Track Order</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
