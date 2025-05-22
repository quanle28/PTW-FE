import * as React from "react";
import Title from "../components/Title.tsx";
import {assets} from "../assets/frontend_assets/assets.ts";
import NewsletterBox from "../components/NewsletterBox.tsx";

export const About: React.FC = () => {
    return (
        <div>
            <div style={{fontSize: "1.5rem", textAlign: "center", paddingTop: "2rem", borderTop: "1px solid"}}>
                <Title text1={'ABOUT'} text2={'US'}/>
            </div>

            <div className="about-page">
                <img className="about-page-img" src={assets.about_img} alt={""}/>
                <div className="about-page-div">
                    <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
                    <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
                    <b style={{color: "#4A5568"}}>Our Mission</b>
                    <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
                </div>
            </div>

            <div style={{fontSize: "1.25rem", paddingTop: "1rem", paddingBottom: "1rem"}}>
                <Title text1={'WHY'} text2={'CHOOSE US'}/>
            </div>

            <div className="about-page-div2">
                <div className="about-page-div3">
                    <b>Quality Assurance:</b>
                    <p style={{color: "#4B5563"}}>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
                </div>
                <div className="about-page-div3">
                    <b>Convenience:</b>
                    <p style={{color: "#4B5563"}}>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
                </div>
                <div className="about-page-div3">
                    <b>Exceptional Customer Service:</b>
                    <p style={{color: "#4B5563"}}>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
                </div>
            </div>

            <NewsletterBox />

        </div>
    );
};
