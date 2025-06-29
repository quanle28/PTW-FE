import * as React from "react";
import {useContext, useRef, useState} from "react";
import {ShopContext} from "../context/ShopContext.tsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const Login: React.FC = () => {
    const [currentState, setCurrentState] = useState('Login');
    const { setUserInfo } = useContext(ShopContext);
    const navigate = useNavigate();
    const formRef = useRef(null);


    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const username = event.target[0].value;
        const password = event.target[1].value;

        if (currentState === "Login") {
            // Đăng nhập
            try {
                const response = await fetch("http://localhost:8080/shopqtq/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (response.ok) {
                    setUserInfo({ username: data.username, role: data.role });
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("userInfo", JSON.stringify({ username: data.username, role: data.role }));
                    toast.success("Đăng nhập thành công!");
                    navigate(data.role === "ADMIN" ? "/admin" : "/");
                } else {
                    toast.error(data.message || "Đăng nhập thất bại");
                }
            } catch (error) {
                toast.error("Tài khoản hoặc mật khẩu không đúng");
            }
        } else {
            // Đăng ký
            const confirmPassword = event.target[2].value;
            const email = event.target[3].value;
            const phone = event.target[4].value;

            if (password !== confirmPassword) {
                toast.error("Mật khẩu xác nhận không khớp");
                return;
            }

            try {
                const response = await fetch("http://localhost:8080/shopqtq/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password, email, phone, role: "CUS" }) // hoặc "ADMIN" tùy thiết kế
                });

                if (response.ok) {
                    toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
                    formRef.current?.reset(); // 👉 reset input
                    setCurrentState("Login"); // chuyển về màn đăng nhập
                } else {
                    const data = await response.json();
                    toast.error(data.message || "Đăng ký thất bại");
                }
            } catch (error) {
                toast.error("Lỗi kết nối server!");
            }
        }
    };

    return (
        // <form ref={formRef} onSubmit={onSubmitHandler} className="login-page">
        //     <div style={{display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "2.5rem", marginBottom: "0.5rem"}}>
        //         <p className="login-page-font-family">{currentState}</p>
        //         <hr style={{border: "none", height: "1.5px", width: "2rem", backgroundColor: "#2D3748"}}/>
        //     </div>
        //     <input type="text" style={{width: "100%", paddingLeft: "0.75rem", paddingRight: "0.75rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", border: "1px solid #2D3748"}} placeholder="Username" required/>
        //     <input type="password" style={{width: "100%", paddingLeft: "0.75rem", paddingRight: "0.75rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", border: "1px solid #2D3748"}} placeholder="Password" required/>
        //     {currentState === 'Login' ? '': <input type="password" style={{width: "100%", paddingLeft: "0.75rem", paddingRight: "0.75rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", border: "1px solid #2D3748"}} placeholder="Confirm Password" required/>}
        //     {currentState === 'Login' ? '': <input type="email" style={{width: "100%", paddingLeft: "0.75rem", paddingRight: "0.75rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", border: "1px solid #2D3748"}} placeholder="Email" required/>}
        //     {currentState === 'Login' ? '': <input type="number" style={{width: "100%", paddingLeft: "0.75rem", paddingRight: "0.75rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", border: "1px solid #2D3748"}} placeholder="Phone" required/>}
        //     <div style={{width: "100%", display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginTop: "-8px"}}>
        //         <p style={{cursor: "pointer"}}>Quên mật khẩu?</p>
        //         {
        //             currentState === 'Login'
        //             ? <p onClick={() => setCurrentState('Sign Up')} style={{cursor: "pointer"}}>Đăng ký</p>
        //             : <p onClick={() => {
        //                 formRef.current?.reset(); // 👉 reset input
        //                 setCurrentState('Login')
        //             }} style={{cursor: "pointer"}}>Đăng nhập</p>
        //         }
        //     </div>
        //     <button style={{backgroundColor: "#000000", color: "#FFFFFF", fontWeight: "300", paddingLeft: "2rem", paddingRight: "2rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", marginTop: "1rem"}}>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
        // </form>

        <form ref={formRef} onSubmit={onSubmitHandler} className="login-page">
            {/* Title section */}
            <div className="login-title">
                <p className="login-page-font-family">{currentState}</p>
                <hr className="login-title-line" />
            </div>

            {/* Input fields */}
            <input
                type="text"
                className="login-input"
                placeholder="Username"
                required
            />
            <input
                type="password"
                className="login-input"
                placeholder="Password"
                required
            />
            {currentState !== 'Login' && (
                <>
                    <input
                        type="password"
                        className="login-input"
                        placeholder="Confirm Password"
                        required
                    />
                    <input
                        type="email"
                        className="login-input"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="number"
                        className="login-input"
                        placeholder="Phone"
                        required
                    />
                </>
            )}

            {/* Switch links */}
            <div className="login-switch-line">
                <p style={{ cursor: "pointer" }}>Quên mật khẩu?</p>
                {currentState === 'Login' ? (
                    <p onClick={() => setCurrentState('Sign Up')} style={{ cursor: "pointer" }}>
                        Đăng ký
                    </p>
                ) : (
                    <p
                        onClick={() => {
                            formRef.current?.reset();
                            setCurrentState('Login');
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        Đăng nhập
                    </p>
                )}
            </div>

            {/* Submit button */}
            <button type="submit" className="login-submit-button">
                {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
            </button>
        </form>

    );
};
