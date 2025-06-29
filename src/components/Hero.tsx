import * as React from "react";
import {assets} from "../assets/frontend_assets/assets.ts";
import Herooo from '../assets/frontend_assets/herothaythe.png'

export const Hero: React.FC = () => {
    return (
        // <div className="container-hero">
        //     {/*Hello left side*/}
        //     <div className="hero-side-left">
        //         <div style={{color: "#414141"}}>
        //             <div style={{display: "flex", alignItems: "center", gap: "0.5rem"}}>
        //                 <p className="hero-side-left-p1"></p>
        //                 <p className="hero-side-left-p2">BE THE FIRST</p>
        //             </div>
        //             <h1 className="prata-regular hero-side-left-h1">New Tech</h1>
        //             <div style={{display: "flex", alignItems: "center", gap: "0.5rem"}}>
        //                 <p className="hero-side-left-p3">SHOP NOW</p>
        //                 <p className="hero-side-left-p1"></p>
        //             </div>
        //         </div>
        //     </div>
        //
        //     {/*Hero right side*/}
        //     <img className="hero-side-right" src={Herooo} alt={""}/>
        // </div>

        <div className="container-hero">
            <div className="hero-side-left">
                <div className="hero-content">
                    <div className="hero-subtitle">
                        <div className="hero-line" />
                        <p className="hero-subtext">BE THE FIRST</p>
                    </div>
                    <h1 className="hero-title prata-regular">New Tech</h1>
                    <div className="hero-subtitle">
                        <p className="hero-cta">SHOP NOW</p>
                        <div className="hero-line" />
                    </div>
                </div>
            </div>
            <img className="hero-side-right" src={Herooo} alt="Product Banner" />
        </div>

    );
};
