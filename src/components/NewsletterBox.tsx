import * as React from "react";

const NewsletterBox: React.FC = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault();
    }


    return (
        <div className="text-center">
            <p style={{fontSize: "1.5rem", fontWeight: "500", color: "#1F2937"}}>Subscribe now & get 20% off</p>
            <p style={{color: "#9CA3AF", marginTop: "0.75rem"}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <form onSubmit={onSubmitHandler} className="newsletterbox-form">
                <input className="newsletterbox-page" type="email" placeholder="Enter your email" required/>
                <button type="submit" style={{backgroundColor: "black", color: "white", fontSize: "0.75rem", paddingLeft: "2.5rem", paddingRight: "2.5rem", paddingTop: "1rem", paddingBottom: "1rem"}}>SUBSCRIBE</button>
            </form>
        </div>
    )
}

export default NewsletterBox;
