import {assets} from "../assets/frontend_assets/assets.ts";
import LOOOGO from '../assets/frontend_assets/logothaythe.png'


const Footer = () => {
    return (
        // <div>
        //     <div className="footer-page">
        //         <div>
        //             <img src={LOOOGO} style={{marginBottom: "1.25rem", width: "8rem"}} alt={""} />
        //             <p className="footer-p">
        //                 Cùng TechView khám phá thế giới thiết bị công nghệ đỉnh cao! Dù bạn đang tìm kiếm những chiếc flagship "khủng" nhất hay các sản phẩm tầm trung với hiệu năng tối ưu, TechView đều có sẵn vô vàn lựa chọn cho mọi nhu cầu và túi tiền. Chúng mình sẽ sớm cập nhật đầy đủ thông tin chi tiết, cấu hình, review từ người dùng và cách thức mua hàng. Nhớ theo dõi TechView thường xuyên để "săn" được những món đồ công nghệ hot nhất nhé!
        //             </p>
        //         </div>
        //
        //         <div>
        //             <p style={{fontSize: "1.25rem", fontWeight: 600, marginBottom: "1.25rem"}}>CÔNG TY</p>
        //             <ul style={{display: "flex", flexDirection: "column", gap: "0.25rem", color: "#4B5563"}}>
        //                 <li>Trang chủ</li>
        //                 <li>Về chúng tôi</li>
        //                 <li>Chính Sách Giao Hàng</li>
        //                 <li>Chính Sách Bảo Mật</li>
        //             </ul>
        //         </div>
        //
        //         <div>
        //             <p style={{fontSize: "1.25rem", fontWeight: 600, marginBottom: "1.25rem"}}>LIÊN HỆ</p>
        //             <ul style={{display: "flex", flexDirection: "column", gap: "0.25rem", color: "#4B5563"}}>
        //                 <li>(+84) 12345678</li>
        //                 <li>techview@gmail.com</li>
        //             </ul>
        //         </div>
        //     </div>
        //
        //     <div>
        //         <hr/>
        //         <p style={{paddingTop: "1.25rem", paddingBottom: "1.25rem", fontSize: "0.875rem", textAlign: "center"}}>Copyright 2025@ aql.com - All Right Reserved.</p>
        //     </div>
        // </div>

        <div className="footer-container">
            <div className="footer-page">
                {/* Logo + mô tả */}
                <div className="footer-col">
                    <img src={LOOOGO} className="footer-logo" alt="TechView Logo" />
                    <p className="footer-p">
                        Cùng TechView khám phá thế giới thiết bị công nghệ đỉnh cao! Dù bạn đang tìm kiếm những chiếc flagship "khủng" nhất hay các sản phẩm tầm trung với hiệu năng tối ưu, TechView đều có sẵn vô vàn lựa chọn cho mọi nhu cầu và túi tiền.
                    </p>
                </div>

                {/* Công ty */}
                <div className="footer-col">
                    <p className="footer-title">CÔNG TY</p>
                    <ul className="footer-list">
                        <li>Trang chủ</li>
                        <li>Về chúng tôi</li>
                        <li>Chính Sách Giao Hàng</li>
                        <li>Chính Sách Bảo Mật</li>
                    </ul>
                </div>

                {/* Liên hệ */}
                <div className="footer-col">
                    <p className="footer-title">LIÊN HỆ</p>
                    <ul className="footer-list">
                        <li>(+84) 12345678</li>
                        <li>techview@gmail.com</li>
                    </ul>
                </div>
            </div>

            <hr className="footer-divider" />
            <p className="footer-copy">
                Copyright 2025@ aql.com - All Rights Reserved.
            </p>
        </div>

    )
}

export default Footer;
