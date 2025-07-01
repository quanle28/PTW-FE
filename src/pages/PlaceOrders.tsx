import * as React from "react";
import Title from "../components/Title.tsx";
import CartTotal from "../components/CartTotal.tsx";
import {assets} from "../assets/frontend_assets/assets.ts";
import {useContext, useEffect, useState} from "react";
import {ShopContext} from "../context/ShopContext.tsx";
import {toast} from "react-toastify";

export const PlaceOrders: React.FC = () => {
    const [method, setMethod] = useState('cod');
    const {navigate} = useContext(ShopContext);

    const [cartData, setCartData] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCart = async () => {
            const response = await fetch("http://localhost:8080/shopqtq/cart", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCartData(data);
            } else {
                console.error("Không thể load giỏ hàng");
            }
        };

        fetchCart();
    }, []);

    const [addressInfo, setAddressInfo] = useState({
        firstName: "",
        lastName: "",
        street: "",
        ward: "",
        city: "",
        country: "",
        phone: ""
    });

    // const handleOrderSubmit = async () => {
    //     const requiredFields = ["firstName", "lastName", "street", "ward", "city", "country", "phone"];
    //
    //     // Kiểm tra từng trường
    //     for (let field of requiredFields) {
    //         if (!addressInfo[field]) {
    //             toast.error("Vui lòng nhập đầy đủ thông tin giao hàng.");
    //             return;
    //         }
    //     }
    //
    //     const fullAddress = `${addressInfo.firstName} ${addressInfo.lastName}, ${addressInfo.street}, ${addressInfo.ward}, ${addressInfo.city}, ${addressInfo.country}, ${addressInfo.phone}`;
    //
    //     const response = await fetch("http://localhost:8080/shopqtq/order", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${token}`,
    //         },
    //         body: JSON.stringify({
    //             adress: fullAddress,
    //             paymentMethod: method
    //         }),
    //     });
    //
    //     if (response.ok) {
    //         toast.success("Đặt hàng thành công!");
    //         navigate("/orders");
    //     } else {
    //         toast.error("Đặt hàng thất bại.");
    //     }
    // };

    const handleOrderSubmit = async () => {
        const requiredFields = ["firstName", "lastName", "street", "ward", "city", "country", "phone"];

        // Kiểm tra từng trường nhập
        for (let field of requiredFields) {
            if (!addressInfo[field]) {
                toast.error("Vui lòng nhập đầy đủ thông tin giao hàng.");
                return;
            }
        }

        const fullAddress = `${addressInfo.firstName} ${addressInfo.lastName}, ${addressInfo.street}, ${addressInfo.ward}, ${addressInfo.city}, ${addressInfo.country}, ${addressInfo.phone}`;
        const totalAmount = cartData.reduce((total, item) => total + item.price * item.quantity, 0);

        if (method === "cod") {
            // Thanh toán khi nhận hàng (COD)
            const response = await fetch("http://localhost:8080/shopqtq/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    adress: fullAddress,
                    paymentMethod: method
                }),
            });

            if (response.ok) {
                toast.success("Đặt hàng thành công!");
                navigate("/orders");
            } else {
                toast.error("Đặt hàng thất bại.");
            }
        } else if (method === "vnpay") {
            // Gọi API tạo link thanh toán VNPAY
            const response = await fetch("http://localhost:8080/api/vnpay/create-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    adress: fullAddress,
                    paymentMethod: method,
                    // totalAmount: 300000,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                window.location.href = data.url;
            } else {
                toast.error("Không thể tạo thanh toán VNPAY.");
            }
        }
    };



    return (
        <div className="placeorders-page">
            {/*Left side*/}
            <div className="placeorders-page-left-side-div">
                <div className="placeorders-page-left-side-div1">
                    <Title text1={'THÔNG TIN'} text2={'GIAO HÀNG'}/>
                </div>
                <div style={{display: "flex", gap: "0.75"}}>
                    <input style={{border: "1px solid #d1d5db", borderRadius: "0.375rem", paddingTop: "0.375rem", paddingBottom: "0.375rem", paddingLeft: "0.875rem", paddingRight: "0.875rem", width: "100%"}} type="text" placeholder='Tên'
                           value={addressInfo.firstName}
                           onChange={(e) => setAddressInfo({ ...addressInfo, firstName: e.target.value })}
                    />
                    <input style={{border: "1px solid #d1d5db", borderRadius: "0.375rem", paddingTop: "0.375rem", paddingBottom: "0.375rem", paddingLeft: "0.875rem", paddingRight: "0.875rem", width: "100%"}} type="text" placeholder='Họ'
                           value={addressInfo.lastName}
                           onChange={(e) => setAddressInfo({ ...addressInfo, lastName: e.target.value })}
                    />
                </div>
                <input style={{border: "1px solid #d1d5db", borderRadius: "0.375rem", paddingTop: "0.375rem", paddingBottom: "0.375rem", paddingLeft: "0.875rem", paddingRight: "0.875rem", width: "100%"}} type="text" placeholder='Đường'
                       value={addressInfo.street}
                       onChange={(e) => setAddressInfo({ ...addressInfo, street: e.target.value })}
                />
                <div style={{display: "flex", gap: "0.75"}}>
                    <input style={{border: "1px solid #d1d5db", borderRadius: "0.375rem", paddingTop: "0.375rem", paddingBottom: "0.375rem", paddingLeft: "0.875rem", paddingRight: "0.875rem", width: "100%"}} type="text" placeholder='Phường, thị xã'
                           value={addressInfo.ward}
                           onChange={(e) => setAddressInfo({ ...addressInfo, ward: e.target.value })}
                    />
                    <input style={{border: "1px solid #d1d5db", borderRadius: "0.375rem", paddingTop: "0.375rem", paddingBottom: "0.375rem", paddingLeft: "0.875rem", paddingRight: "0.875rem", width: "100%"}} type="text" placeholder='Thành phố'
                           value={addressInfo.city}
                           onChange={(e) => setAddressInfo({ ...addressInfo, city: e.target.value })}
                    />
                </div>
                <div style={{display: "flex", gap: "0.75"}}>
                    <input style={{border: "1px solid #d1d5db", borderRadius: "0.375rem", paddingTop: "0.375rem", paddingBottom: "0.375rem", paddingLeft: "0.875rem", paddingRight: "0.875rem", width: "100%"}} type="text" placeholder='Quốc gia'
                           value={addressInfo.country}
                           onChange={(e) => setAddressInfo({ ...addressInfo, country: e.target.value })}
                    />
                    <input style={{border: "1px solid #d1d5db", borderRadius: "0.375rem", paddingTop: "0.375rem", paddingBottom: "0.375rem", paddingLeft: "0.875rem", paddingRight: "0.875rem", width: "100%"}} type="number" placeholder='Số điện thoại'
                           value={addressInfo.phone}
                           onChange={(e) => setAddressInfo({ ...addressInfo, phone: e.target.value })}
                    />
                </div>
            </div>

            {/*Right side*/}
            <div style={{marginTop: "2rem"}}>
                <div style={{marginTop: "2rem", minWidth: "20rem"}}>
                    <CartTotal cartData={cartData}/>
                </div>

                <div style={{marginTop: "3rem"}}>
                    <Title text1={'PHƯƠNG THỨC'} text2={'THANH TOÁN'}/>
                    <div className="placeorders-page-right-side-div">
                        <div onClick={()=> setMethod('vnpay')} style={{display: "flex", alignItems: "center", gap: "0.75rem", border: "1px solid", padding: "0.5rem", paddingLeft: "0.75rem", paddingRight: "0.75rem", cursor: "pointer"}}>
                            <p className={`placeorders-page-right-side-p ${method === 'vnpay' ? 'bg-green1': ''}`}></p>
                            <img style={{height: "2.5rem", marginLeft: "1rem", marginRight: "1rem"}} src={assets.vnpay_icon} alt={""}/>
                        </div>
                        <div onClick={()=> setMethod('cod')} style={{display: "flex", alignItems: "center", gap: "0.75rem", border: "1px solid", padding: "0.5rem", paddingLeft: "0.75rem", paddingRight: "0.75rem", cursor: "pointer"}}>
                            <p className={`placeorders-page-right-side-p ${method === 'cod' ? 'bg-green1': ''}`}></p>
                            <p style={{color: "#6b7280", fontSize: "0.875rem", fontWeight: "500", marginLeft: "1rem", marginRight: "1rem", marginTop: "0.5rem"}}>THANH TOÁN KHI NHẬN HÀNG</p>
                        </div>
                    </div>

                    <div style={{width: "100%", textAlign: "end", marginTop: "2rem"}}>
                        <button onClick={() => handleOrderSubmit()} style={{backgroundColor: "black", color: "white", paddingLeft: "4rem", paddingRight: "4rem", paddingTop: "0.75rem", paddingBottom: "0.75rem", fontSize: "0.875rem"}}>ĐẶT HÀNG</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
