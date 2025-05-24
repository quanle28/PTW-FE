import * as React from "react";
import {useState} from "react";

export const Login: React.FC = () => {
    const [currentState, setCurrentState] = useState('Sign Up');

    const onSubmitHandler = async (event) =>{
        event.preventDefault();
    }

    return (
        <form onSubmit={onSubmitHandler} className="login-page">
            <div style={{display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "2.5rem", marginBottom: "0.5rem"}}>
                <p className="login-page-font-family">{currentState}</p>
                <hr style={{border: "none", height: "1.5px", width: "2rem", backgroundColor: "#2D3748"}}/>
            </div>
            {currentState === 'Login' ? '': <input type="text" style={{width: "100%", paddingLeft: "0.75rem", paddingRight: "0.75rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", border: "1px solid #2D3748"}} placeholder="Name" required/>}
            <input type="email" style={{width: "100%", paddingLeft: "0.75rem", paddingRight: "0.75rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", border: "1px solid #2D3748"}} placeholder="Email" required/>
            <input type="password" style={{width: "100%", paddingLeft: "0.75rem", paddingRight: "0.75rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", border: "1px solid #2D3748"}} placeholder="Password" required/>
            <div style={{width: "100%", display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginTop: "-8px"}}>
                <p style={{cursor: "pointer"}}>Quên mật khẩu?</p>
                {
                    currentState === 'Login'
                    ? <p onClick={() => setCurrentState('Sign Up')} style={{cursor: "pointer"}}>Đăng ký</p>
                    : <p onClick={() => setCurrentState('Login')} style={{cursor: "pointer"}}>Đăng nhập</p>
                }
            </div>
            <button style={{backgroundColor: "#000000", color: "#FFFFFF", fontWeight: "300", paddingLeft: "2rem", paddingRight: "2rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", marginTop: "1rem"}}>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
        </form>
    );
};
