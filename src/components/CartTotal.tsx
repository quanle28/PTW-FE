import {useContext} from "react";
import {ShopContext} from "../context/ShopContext.tsx";
import Title from "./Title.tsx";

const CartTotal = ({ cartData }) => {
    const {currency, delivery_fee} = useContext(ShopContext);

    const getCartAmount = () => {
        return cartData.reduce((total, item) => {
            return total + Math.round(item.price) * item.number;
        }, 0);
    };

    return (
        <div style={{width: "100%"}}>
            <div style={{fontSize: "1.5rem"}}>
                <Title text1={'TỔNG SỐ'} text2={'GIỎ HÀNG'}/>
            </div>

            <div style={{display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem", fontSize: "0.875rem"}}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p>Giá</p>
                    <p>{getCartAmount().toLocaleString()} {currency}</p>
                </div>
                <hr />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p>Phí vận chuyển</p>
                    <p>{delivery_fee.toLocaleString()} {currency}</p>
                </div>
                <hr />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p>Tổng cộng</p>
                    <p>{getCartAmount() === 0 ? '0' : (getCartAmount() + delivery_fee).toLocaleString()} {currency}</p>
                </div>
            </div>
        </div>
    )
}

export default CartTotal;
