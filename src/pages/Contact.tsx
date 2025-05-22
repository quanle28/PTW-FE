import * as React from "react";
import Title from "../components/Title.tsx";
import {assets} from "../assets/frontend_assets/assets.ts";
import NewsletterBox from "../components/NewsletterBox.tsx";

export const Contact: React.FC = () => {
    return (
        <div>
            <div style={{textAlign: "center", fontSize: "1.5rem", paddingTop: "2.5rem", borderTop: "1px solid"}}>
                <Title text1={'CONTACT'} text2={'US'}/>
            </div>

            <div className="contact-page">
                <img className="contact-page-img" src={assets.contact_img} alt={""}/>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: "1.5rem"}}>
                    <p style={{fontWeight: "600", fontSize: "1.25rem", color: "#4B5563"}}>Our Store</p>
                    <p style={{color: "#6B7280"}}>54709 Willms Station <br />Suite 350, Washington, USA</p>
                    <p style={{color: "#6B7280"}}>Tel: (415) 555-0132 <br />Email: admin@forever.com</p>
                    <p style={{fontWeight: "600", fontSize: "1.25rem", color: "#4B5563"}}>Careers at Forever</p>
                    <p style={{color: "#6B7280"}}>Learn more about our teams and job openings.</p>
                    <button className="contact-page-button">Explore Jobs</button>
                </div>
            </div>

            <NewsletterBox />
        </div>
    );
};
