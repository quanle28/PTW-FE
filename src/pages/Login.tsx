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
