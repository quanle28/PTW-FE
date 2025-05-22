import * as React from "react";
import {assets} from "../assets/frontend_assets/assets.ts";

const OurPolicy: React.FC = () => {

    return (
        <div className="ourpolicy-page">
            <div>
                <img src={assets.exchange_icon} style={{width: "3rem", margin: "auto", marginBottom: "1.25rem"}} alt={""}/>
                <p style={{fontWeight: "600"}}>Easy Exchange Policy</p>
                <p style={{color: "#9CA3AF"}}>We offer hassle free exchange policy</p>
            </div>

            <div>
                <img src={assets.quality_icon} style={{width: "3rem", margin: "auto", marginBottom: "1.25rem"}} alt={""}/>
                <p style={{fontWeight: "600"}}>7 Days Return Policy</p>
                <p style={{color: "#9CA3AF"}}>We provide 7 days free return policy</p>
            </div>

            <div>
                <img src={assets.support_img} style={{width: "3rem", margin: "auto", marginBottom: "1.25rem"}} alt={""}/>
                <p style={{fontWeight: "600"}}>Best customer support</p>
                <p style={{color: "#9CA3AF"}}>We provide 24/7 customer support</p>
            </div>
        </div>
    )
}

export default OurPolicy;
