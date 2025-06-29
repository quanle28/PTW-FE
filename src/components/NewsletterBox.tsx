import * as React from "react";

const NewsletterBox: React.FC = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault();
    }


    return (
        // <div className="text-center">
        //     <p style={{fontSize: "1.5rem", fontWeight: "500", color: "#1F2937"}}>Đăng ký ngay & giảm giá 20%</p>
        //     <p style={{color: "#9CA3AF", marginTop: "0.75rem"}}>
        //         Cảm ơn bạn đã thông cảm cho sự "lag" nhẹ này nhé! Hẹn gặp lại bạn sớm trên TechView!
        //     </p>
        //     <form onSubmit={onSubmitHandler} className="newsletterbox-form">
        //         <input className="newsletterbox-page" type="email" placeholder="Enter your email" required/>
        //         <button type="submit" style={{backgroundColor: "black", color: "white", fontSize: "0.75rem", paddingLeft: "2.5rem", paddingRight: "2.5rem", paddingTop: "1rem", paddingBottom: "1rem"}}>Đăng ký</button>
        //     </form>
        // </div>

        <div className="newsletter-section text-center">
            <p className="newsletter-title">Đăng ký ngay & giảm giá 20%</p>
            <p className="newsletter-subtext">
                Cảm ơn bạn đã thông cảm cho sự "lag" nhẹ này nhé! Hẹn gặp lại bạn sớm trên TechView!
            </p>
            <form onSubmit={onSubmitHandler} className="newsletterbox-form">
                <input
                    className="newsletterbox-page"
                    type="email"
                    placeholder="Nhập email của bạn"
                    required
                />
                <button type="submit" className="newsletter-submit-btn">Đăng ký</button>
            </form>
        </div>

    )
}

export default NewsletterBox;
