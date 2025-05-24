import * as React from "react";
import Title from "../components/Title.tsx";
import CartTotal from "../components/CartTotal.tsx";
import {assets} from "../assets/frontend_assets/assets.ts";
import {useContext, useState} from "react";
import {ShopContext} from "../context/ShopContext.tsx";

export const PlaceOrders: React.FC = () => {
    const [method, setMethod] = useState('cod');
    const {navigate} = useContext(ShopContext);

    return (
        <div className="placeorders-page">
            {/*Left side*/}
            <div className="placeorders-page-left-side-div">
                <div className="placeorders-page-left-side-div1">
                    <Title text1={'THÔNG TIN'} text2={'GIAO HÀNG'}/>
                </div>
                <div style={{display: "flex", gap: "0.75"}}>
                    <input style={{border: "1px solid #d1d5db", borderRadius: "0.375rem", paddingTop: "0.375rem", paddingBottom: "0.375rem", paddingLeft: "0.875rem", paddingRight: "0.875rem", width: "100%"}} type="text" placeholder='Tên'/>
                    <input style={{border: "1px solid #d1d5db", borderRadius: "0.375rem", paddingTop: "0.375rem", paddingBottom: "0.375rem", paddingLeft: "0.875rem", paddingRight: "0.875rem", width: "100%"}} type="text" placeholder='Họ'/>
                </div>
                <input style={{border: "1px solid #d1d5db", borderRadius: "0.375rem", paddingTop: "0.375rem", paddingBottom: "0.375rem", paddingLeft: "0.875rem", paddingRight: "0.875rem", width: "100%"}} type="email" placeholder='Địa chỉ email'/>
                <input style={{border: "1px solid #d1d5db", borderRadius: "0.375rem", paddingTop: "0.375rem", paddingBottom: "0.375rem", paddingLeft: "0.875rem", paddingRight: "0.875rem", width: "100%"}} type="text" placeholder='Đường'/>
                <div style={{display: "flex", gap: "0.75"}}>
                    <input style={{border: "1px solid #d1d5db", borderRadius: "0.375rem", paddingTop: "0.375rem", paddingBottom: "0.375rem", paddingLeft: "0.875rem", paddingRight: "0.875rem", width: "100%"}} type="text" placeholder='Phường, thị xã'/>
                    <input style={{border: "1px solid #d1d5db", borderRadius: "0.375rem", paddingTop: "0.375rem", paddingBottom: "0.375rem", paddingLeft: "0.875rem", paddingRight: "0.875rem", width: "100%"}} type="text" placeholder='Thành phố'/>
                </div>
                <div style={{display: "flex", gap: "0.75"}}>
                    <input style={{border: "1px solid #d1d5db", borderRadius: "0.375rem", paddingTop: "0.375rem", paddingBottom: "0.375rem", paddingLeft: "0.875rem", paddingRight: "0.875rem", width: "100%"}} type="number" placeholder='Mã bưu điện'/>
                    <input style={{border: "1px solid #d1d5db", borderRadius: "0.375rem", paddingTop: "0.375rem", paddingBottom: "0.375rem", paddingLeft: "0.875rem", paddingRight: "0.875rem", width: "100%"}} type="text" placeholder='Quốc gia'/>
                </div>
                <input style={{border: "1px solid #d1d5db", borderRadius: "0.375rem", paddingTop: "0.375rem", paddingBottom: "0.375rem", paddingLeft: "0.875rem", paddingRight: "0.875rem", width: "100%"}} type="number" placeholder='Số điện thoại'/>
            </div>

            {/*Right side*/}
            <div style={{marginTop: "2rem"}}>
                <div style={{marginTop: "2rem", minWidth: "20rem"}}>
                    <CartTotal />
                </div>

                <div style={{marginTop: "3rem"}}>
                    <Title text1={'PHƯƠNG THỨC'} text2={'THANH TOÁN'}/>
                    <div className="placeorders-page-right-side-div">
                        <div onClick={()=> setMethod('stripe')} style={{display: "flex", alignItems: "center", gap: "0.75rem", border: "1px solid", padding: "0.5rem", paddingLeft: "0.75rem", paddingRight: "0.75rem", cursor: "pointer"}}>
                            <p className={`placeorders-page-right-side-p ${method === 'stripe' ? 'bg-green1': ''}`}></p>
                            <img style={{height: "1.25rem", marginLeft: "1rem", marginRight: "1rem"}} src={assets.stripe_logo} alt={""}/>
                        </div>
                        <div onClick={()=> setMethod('razorpay')} style={{display: "flex", alignItems: "center", gap: "0.75rem", border: "1px solid", padding: "0.5rem", paddingLeft: "0.75rem", paddingRight: "0.75rem", cursor: "pointer"}}>
                            <p className={`placeorders-page-right-side-p ${method === 'razorpay' ? 'bg-green1': ''}`}></p>
                            <img style={{height: "1.25rem", marginLeft: "1rem", marginRight: "1rem"}} src={assets.razorpay_logo} alt={""}/>
                        </div>
                        <div onClick={()=> setMethod('cod')} style={{display: "flex", alignItems: "center", gap: "0.75rem", border: "1px solid", padding: "0.5rem", paddingLeft: "0.75rem", paddingRight: "0.75rem", cursor: "pointer"}}>
                            <p className={`placeorders-page-right-side-p ${method === 'cod' ? 'bg-green1': ''}`}></p>
                            <p style={{color: "#6b7280", fontSize: "0.875rem", fontWeight: "500", marginLeft: "1rem", marginRight: "1rem", marginTop: "0.5rem"}}>THANH TOÁN KHI NHẬN HÀNG</p>
                        </div>
                    </div>

                    <div style={{width: "100%", textAlign: "end", marginTop: "2rem"}}>
                        <button onClick={() => navigate('/orders')} style={{backgroundColor: "black", color: "white", paddingLeft: "4rem", paddingRight: "4rem", paddingTop: "0.75rem", paddingBottom: "0.75rem", fontSize: "0.875rem"}}>ĐẶT HÀNG</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
