import * as React from "react";
import Title from "../components/Title.tsx";
import {assets} from "../assets/frontend_assets/assets.ts";
import NewsletterBox from "../components/NewsletterBox.tsx";

export const Contact: React.FC = () => {
    return (
        <div>
            <div style={{textAlign: "center", fontSize: "1.5rem", paddingTop: "2.5rem", borderTop: "1px solid"}}>
                <Title text1={'LIÊN HỆ'} text2={'CHÚNG TÔI'}/>
            </div>

            <div className="contact-page">
                <img className="contact-page-img" src={assets.contact_img} alt={""}/>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: "1.5rem"}}>
                    <p style={{fontWeight: "600", fontSize: "1.25rem", color: "#4B5563"}}>Cửa hàng chúng tôi</p>
                    <p style={{color: "#6B7280"}}>Học viện Kỹ thuật Mật Mã <br />Thanh Trì, Tân Triều, Hà Nội</p>
                    <p style={{color: "#6B7280"}}>SDT: (+84) 123456789 <br />Email: admin@techview.com</p>
                    <p style={{fontWeight: "600", fontSize: "1.25rem", color: "#4B5563"}}>Phát Triển Sự Nghiệp Cùng TechView</p>
                    <p style={{color: "#6B7280"}}>Tìm hiểu về môi trường làm việc tại TechView và <br /> các vị trí đang mở tuyển để cùng chúng tôi phát triển.</p>
                    <button className="contact-page-button">Khám phá</button>
                </div>
            </div>

            <NewsletterBox />
        </div>
    );
};
