import {assets} from "../assets/frontend_assets/assets.ts";
import {useContext} from "react";
import {ShopContext} from "../context/ShopContext.tsx";
import {Link, useNavigate} from "react-router-dom";
import LOOOGO from '../assets/frontend_assets/logothaythe.png'
import * as React from "react";

export const NavbarAdmin = () => {
    const {userInfo, setUserInfo} = useContext(ShopContext);
    const navigate = useNavigate();

    return (
        // <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.5rem", paddingBottom: "0.5rem", paddingLeft: "4%", paddingRight: "4%"}}>
        //     <Link to="/" ><img src={LOOOGO} alt={"Logo"} className="img-logo-nav"/></Link>
        //
        //     <button className="navbar-admin-btn" onClick={() => {
        //         setUserInfo(null);
        //         localStorage.removeItem("userInfo");
        //         localStorage.removeItem("token");
        //         navigate("/login");
        //     }}>Logout</button>
        // </div>

        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.5rem 4%",
                backgroundColor: "#f9fafb",
                borderBottom: "1px solid #e5e7eb",
            }}
        >
            {/* Logo */}
            <Link to="/">
                <img src={LOOOGO} alt="Logo" className="img-logo-nav" />
            </Link>

            {/* Logout button */}
            <button
                className="navbar-admin-btn"
                onClick={() => {
                    setUserInfo(null);
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("token");
                    navigate("/login");
                }}
            >
                Logout
            </button>
        </div>

    )
}
