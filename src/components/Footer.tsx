import {assets} from "../assets/frontend_assets/assets.ts";

const Footer = () => {
    return (
        <div>
            <div className="footer-page">
                <div>
                    <img src={assets.logo} style={{marginBottom: "1.25rem", width: "8rem"}} alt={""} />
                    <p className="footer-p">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>

                <div>
                    <p style={{fontSize: "1.25rem", fontWeight: 500, marginBottom: "1.25rem"}}>COMPANY</p>
                    <ul style={{display: "flex", flexDirection: "column", gap: "0.25rem", color: "#4B5563"}}>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                <div>
                    <p style={{fontSize: "1.25rem", fontWeight: 500, marginBottom: "1.25rem"}}>GET IN TOUCH</p>
                    <ul style={{display: "flex", flexDirection: "column", gap: "0.25rem", color: "#4B5563"}}>
                        <li>+1-212-456-7890</li>
                        <li>contact@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr/>
                <p style={{paddingTop: "1.25rem", paddingBottom: "1.25rem", fontSize: "0.875rem", textAlign: "center"}}>Copyright 2025@ alq.com - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer;
