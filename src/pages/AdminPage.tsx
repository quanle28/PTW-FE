import {SidebarAdminPage} from "../components/SidebarAdminPage.tsx";
import {NavbarAdmin} from "../components/NavbarAdmin.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import {AddAdmin} from "../components/AddAdmin.tsx";
import {ListAdmin} from "../components/ListAdmin.tsx";
import {OrdersAdmin} from "../components/OrdersAdmin.tsx";
import {Login} from "./Login.tsx";
import {Navbar} from "../components/Navbar.tsx";
import {useContext, useEffect} from "react";
import {ShopContext} from "../context/ShopContext.tsx";
import {toast} from "react-toastify";
import {UpdateAdmin} from "../components/UpdateAdmin.tsx";
import {Revenue} from "../components/Revenue.tsx";

export const AdminPage = () => {
    const token = localStorage.getItem("token");
    const {userInfo} = useContext(ShopContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            toast.error("Bạn cần đăng nhập để truy cập trang quản trị!");
        }

        try {
            if (userInfo.role !== "ADMIN") {
                toast.error("Bạn không có quyền truy cập trang quản trị!");
                navigate("/");
            }
        } catch (error) {
            navigate("/login");
        }
    }, [token, navigate]);

    return (
        <div className="admin-page">
            <NavbarAdmin />
            <hr style={{ margin: 0 }} />

            <div style={{ display: "flex", width: "100%" }}>
                {/* Sidebar */}
                <SidebarAdminPage />

                {/* Nội dung chính */}
                <div
                    style={{
                        flex: 1,
                        marginLeft: "max(5vw, 25px)",
                        marginRight: "auto",
                        marginTop: "2rem",
                        marginBottom: "2rem",
                        color: "#4b5563",
                        fontSize: "1rem",
                        paddingRight: "2rem",
                    }}
                >
                    <Routes>
                        <Route path="/revenue" element={<Revenue />} />
                        <Route path="/add" element={<AddAdmin />} />
                        <Route path="/update/:productId" element={<UpdateAdmin />} />
                        <Route path="/list" element={<ListAdmin />} />
                        <Route path="/orders" element={<OrdersAdmin />} />
                    </Routes>
                </div>
            </div>
        </div>

    );
};
