// src/pages/VnpayReturn.tsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VnpayReturn = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const responseCode = params.get("vnp_ResponseCode");

        if (responseCode === "00") {
            alert("Thanh toán thành công!");
            navigate("/orders");
        } else {
            alert("Thanh toán thất bại!");
            navigate("/cart");
        }
    }, [location]);

    return <div>Đang xử lý kết quả thanh toán...</div>;
};

export default VnpayReturn;
