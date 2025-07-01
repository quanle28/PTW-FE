// src/pages/VnpayReturn.tsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";

const VnpayReturn = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const responseCode = params.get("vnp_ResponseCode");
        console.log("responseCode", responseCode)

        if (responseCode === "00") {
            toast.success("Thanh toán thành công!");
            navigate("/orders");
        } else {
            toast.error("Thanh toán thất bại!");
            navigate("/cart");
        }
    }, [location]);

    return <div>Đang xử lý kết quả thanh toán...</div>;
};

export default VnpayReturn;
