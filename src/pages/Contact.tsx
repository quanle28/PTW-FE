import * as React from "react";
import Title from "../components/Title.tsx";
import {assets} from "../assets/frontend_assets/assets.ts";
import NewsletterBox from "../components/NewsletterBox.tsx";

export const Contact: React.FC = () => {
    return (
        <div>
            {/* Tiêu đề */}
            <div className="contact-section-title">
                <Title text1="LIÊN HỆ" text2="CHÚNG TÔI" />
            </div>

            {/* Nội dung liên hệ */}
            <div className="contact-page">
                {/* Hình ảnh minh họa */}
                <img className="contact-page-img" src={assets.contact_img} alt="Liên hệ TechView" />

                {/* Thông tin liên hệ */}
                <div className="contact-info-block">
                    <div>
                        <p className="contact-heading">Cửa hàng chúng tôi</p>
                        <p className="contact-paragraph">
                            Học viện Kỹ thuật Mật Mã<br />
                            Thanh Trì, Tân Triều, Hà Nội
                        </p>
                        <p className="contact-paragraph">
                            SDT: (+84) 123456789<br />
                            Email: admin@techview.com
                        </p>
                    </div>

                    <div>
                        <p className="contact-heading">Phát Triển Sự Nghiệp Cùng TechView</p>
                        <p className="contact-paragraph">
                            Tìm hiểu về môi trường làm việc tại TechView và<br />
                            các vị trí đang mở tuyển để cùng chúng tôi phát triển.
                        </p>
                        <button className="contact-page-button">Khám phá</button>
                    </div>
                </div>
            </div>

            {/* Box nhận email */}
            <NewsletterBox />
        </div>

    );
};
