import * as React from "react";
import Title from "../components/Title.tsx";
import {assets} from "../assets/frontend_assets/assets.ts";
import NewsletterBox from "../components/NewsletterBox.tsx";
import AboutIMG from '../assets/frontend_assets/about_img_thaythe.png'

export const About: React.FC = () => {
    return (
        // <div>
        //     <div style={{fontSize: "1.5rem", textAlign: "center", paddingTop: "2rem", borderTop: "1px solid"}}>
        //         <Title text1={'GIỚI THIỆU VỀ'} text2={'CHÚNG TÔI'}/>
        //     </div>
        //
        //     <div className="about-page">
        //         <img className="about-page-img" src={AboutIMG} alt={""}/>
        //         <div className="about-page-div">
        //             <p>TechView được khai sinh từ niềm đam mê cháy bỏng với công nghệ nhiếp ảnh và sức mạnh của những chiếc laptop hiện đại, cùng với mong muốn định nghĩa lại trải nghiệm mua sắm thiết bị công nghệ trực tuyến. Chúng tôi khởi đầu với một tầm nhìn rõ ràng: tạo ra một không gian nơi những người yêu công nghệ có thể dễ dàng tiếp cận, khám phá chuyên sâu và tự tin lựa chọn những chiếc camera và laptop tốt nhất.</p>
        //             <p>Từ khi thành lập, TechView đã cống hiến không ngừng để xây dựng một danh mục sản phẩm chọn lọc, bao gồm những chiếc máy ảnh từ mirrorless full-frame đến compact du lịch, và các dòng laptop từ ultrabook mỏng nhẹ đến workstation mạnh mẽ, phục vụ mọi đối tượng từ nhiếp ảnh gia chuyên nghiệp, nhà sáng tạo nội dung, game thủ đến doanh nhân và sinh viên. Chúng tôi chỉ hợp tác với các thương hiệu danh tiếng và nhà phân phối chính thức để đảm bảo chất lượng và nguồn gốc sản phẩm.</p>
        //             <b style={{color: "#4A5568"}}>Sứ Mệnh Của TechView</b>
        //             <p>Tại TechView, sứ mệnh của chúng tôi là mang đến cho khách hàng sự am hiểu, lựa chọn tối ưu và niềm tin vững chắc vào quyết định mua sắm của mình. Chúng tôi cam kết cung cấp một hành trình mua sắm công nghệ vượt trội, từ việc tìm hiểu thông tin sản phẩm chi tiết, nhận tư vấn chuyên sâu, cho đến quy trình đặt hàng thuận tiện và dịch vụ hỗ trợ sau bán hàng tận tình. Chúng tôi tin rằng việc sở hữu một thiết bị công nghệ phù hợp sẽ mở ra những tiềm năng sáng tạo và hiệu suất không giới hạn.</p>
        //         </div>
        //     </div>
        //
        //     <div style={{fontSize: "1.25rem", paddingTop: "1rem", paddingBottom: "1rem"}}>
        //         <Title text1={'TẠI SAO CHỌN'} text2={'CHÚNG TÔI'}/>
        //     </div>
        //
        //     <div className="about-page-div2">
        //         <div className="about-page-div3">
        //             <b>Đảm bảo chất lượng:</b>
        //             <p style={{color: "#4B5563"}}>Chúng tôi đánh giá chuyên môn và kiểm tra từng sản phẩm camera và laptop để đảm bảo đáp ứng các tiêu chuẩn cao về hiệu năng và độ tin cậy của TechView.</p>
        //         </div>
        //         <div className="about-page-div3">
        //             <b>Sự tiện lợi:</b>
        //             <p style={{color: "#4B5563"}}>TechView mang đến giao diện trực quan và quy trình đặt hàng không rắc rối, giúp bạn sở hữu camera và laptop yêu thích một cách nhanh chóng và thuận tiện nhất.</p>
        //         </div>
        //         <div className="about-page-div3">
        //             <b>Dịch vụ khách hàng đặc biệt:</b>
        //             <p style={{color: "#4B5563"}}>Đội ngũ chuyên viên tận tâm của TechView luôn sẵn sàng hỗ trợ bạn trên mọi bước đường, đảm bảo sự hài lòng của bạn là ưu tiên hàng đầu của chúng tôi.</p>
        //         </div>
        //     </div>
        //
        //     <NewsletterBox />
        //
        // </div>

        <div>
            {/* Giới thiệu chung */}
            <div className="about-section-title">
                <Title text1="GIỚI THIỆU VỀ" text2="CHÚNG TÔI" />
            </div>

            <div className="about-page">
                <img className="about-page-img" src={AboutIMG} alt="Ảnh giới thiệu" />
                <div className="about-page-div">
                    <p>
                        TechView được khai sinh từ niềm đam mê cháy bỏng với công nghệ nhiếp ảnh và sức mạnh của những chiếc laptop hiện đại, cùng với mong muốn định nghĩa lại trải nghiệm mua sắm thiết bị công nghệ trực tuyến.
                    </p>
                    <p>
                        Từ khi thành lập, TechView đã cống hiến không ngừng để xây dựng một danh mục sản phẩm chọn lọc – từ máy ảnh mirrorless đến laptop workstation – phục vụ mọi nhu cầu sáng tạo và công việc.
                    </p>
                    <b className="about-subtitle">Sứ Mệnh Của TechView</b>
                    <p>
                        Chúng tôi cam kết cung cấp trải nghiệm mua sắm công nghệ vượt trội – từ tìm hiểu sản phẩm, tư vấn chuyên sâu đến đặt hàng và hậu mãi tận tình. Sở hữu thiết bị phù hợp là chìa khóa mở ra sáng tạo & hiệu suất.
                    </p>
                </div>
            </div>

            {/* Tại sao chọn chúng tôi */}
            <div className="about-subsection-title">
                <Title text1="TẠI SAO CHỌN" text2="CHÚNG TÔI" />
            </div>

            <div className="about-page-div2">
                <div className="about-page-div3">
                    <b>Đảm bảo chất lượng:</b>
                    <p>Chúng tôi kiểm định kỹ lưỡng từng sản phẩm để đảm bảo hiệu năng & độ tin cậy tuyệt đối.</p>
                </div>
                <div className="about-page-div3">
                    <b>Sự tiện lợi:</b>
                    <p>TechView có giao diện mượt mà & đặt hàng dễ dàng – sở hữu sản phẩm bạn yêu chỉ trong vài cú click.</p>
                </div>
                <div className="about-page-div3">
                    <b>Dịch vụ khách hàng đặc biệt:</b>
                    <p>Đội ngũ chuyên viên hỗ trợ tận tâm 24/7 – luôn đặt sự hài lòng của bạn là ưu tiên số 1.</p>
                </div>
            </div>

            {/* Box đăng ký nhận tin */}
            <NewsletterBox />
        </div>

    );
};
