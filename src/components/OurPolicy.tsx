import * as React from "react";
import {assets} from "../assets/frontend_assets/assets.ts";

const OurPolicy: React.FC = () => {

    return (
        <div className="ourpolicy-page">
            <div>
                <img src={assets.exchange_icon} style={{width: "3rem", margin: "auto", marginBottom: "1.25rem"}} alt={""}/>
                <p style={{fontWeight: "600"}}>Chính Sách Đổi Trả Dễ Dàng</p>
                <p style={{color: "#9CA3AF"}}>Đổi trả không rắc rối – Cam kết từ TechView</p>
            </div>

            <div>
                <img src={assets.quality_icon} style={{width: "3rem", margin: "auto", marginBottom: "1.25rem"}} alt={""}/>
                <p style={{fontWeight: "600"}}>Đổi Trả 7 Ngày</p>
                <p style={{color: "#9CA3AF"}}>Đổi trả miễn phí trong 7 ngày</p>
            </div>

            <div>
                <img src={assets.support_img} style={{width: "3rem", margin: "auto", marginBottom: "1.25rem"}} alt={""}/>
                <p style={{fontWeight: "600"}}>Hỗ Trợ Khách Hàng Tốt Nhất</p>
                <p style={{color: "#9CA3AF"}}>Hỗ trợ khách hàng 24/7 – Luôn có mặt khi bạn cần</p>
            </div>
        </div>
    )
}

export default OurPolicy;
