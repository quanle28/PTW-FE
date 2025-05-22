import * as React from "react";

const Title:React.FC = ({text1,text2}) => {
    return (
        <div style={{display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem"}}>
            <p style={{color: "#6B7280"}}>{text1} <span style={{color: "#374151", fontWeight: "500"}}>{text2}</span></p>
            <p className="title-page"></p>
        </div>
    )
}
export default Title;
