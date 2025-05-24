import {useContext} from "react";
import {ShopContext} from "../context/ShopContext.tsx";
import Title from "./Title.tsx";

const CartTotal = () => {
    const {getCartAmount, currency, delivery_fee} = useContext(ShopContext);

    return (
        <div style={{width: "100%"}}>
            <div style={{fontSize: "1.5rem"}}>
                <Title text1={'TỔNG SỐ'} text2={'GIỎ HÀNG'}/>
            </div>

            <div style={{display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem", fontSize: "0.875rem"}}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p>Giá</p>
                    <p>{currency} {getCartAmount()}.00</p>
                </div>
                <hr />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p>Phí vận chuyển</p>
                    <p>{currency} {delivery_fee}.00</p>
                </div>
                <hr />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p>Tổng cộng</p>
                    <p>{currency} {getCartAmount() === 0 ? '0' : getCartAmount() + delivery_fee}.00</p>
                </div>
            </div>
        </div>
    )
}

export default CartTotal;
