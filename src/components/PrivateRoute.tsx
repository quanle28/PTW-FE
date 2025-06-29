import {Navigate, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {toast} from "react-toastify";

export const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const location = useLocation();

    useEffect(() => {
        if (!token) {
            toast.warning("Bạn cần đăng nhập để truy cập trang này.");
        }
    }, [token, location]);

    return token ? children : <Navigate to="/login" />;
};
