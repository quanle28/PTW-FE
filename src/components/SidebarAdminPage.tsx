import {Link, useLocation} from "react-router-dom";
import {assetsAdmin} from "../assets/admin_assets/assets.ts";
import {Nav} from "react-bootstrap";

export const SidebarAdminPage = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (

        <div
            style={{
                width: "18%",
                minHeight: "100vh",
                borderRight: "2px solid #e5e7eb",
                backgroundColor: "#ffffff",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    paddingTop: "1.5rem",
                    paddingLeft: "20%",
                    fontSize: "15px",
                }}
            >
                {/* Revenue Items */}
                <Nav.Link
                    as={Link}
                    to="/admin/revenue"
                    className={`sidebar-admin-link ${isActive("/admin/revenue") ? "active" : ""}`}
                >
                    <img
                        src={assetsAdmin.revenue_icon}
                        alt=""
                        style={{ width: "1.8rem", height: "1.8rem" }}
                    />
                    <p className="sidebar-admin-page-p">Quản lý doanh thu</p>
                </Nav.Link>

                {/* Add Items */}
                <Nav.Link
                    as={Link}
                    to="/admin/add"
                    className={`sidebar-admin-link ${isActive("/admin/add") ? "active" : ""}`}
                >
                    <img
                        src={assetsAdmin.add_icon}
                        alt=""
                        style={{ width: "1.25rem", height: "1.25rem" }}
                    />
                    <p className="sidebar-admin-page-p">Thêm sản phẩm</p>
                </Nav.Link>

                {/* List Items */}
                <Nav.Link
                    as={Link}
                    to="/admin/list"
                    className={`sidebar-admin-link ${isActive("/admin/list") ? "active" : ""}`}
                >
                    <img
                        src={assetsAdmin.order_icon}
                        alt=""
                        style={{ width: "1.25rem", height: "1.25rem" }}
                    />
                    <p className="sidebar-admin-page-p">Danh sách sản phẩm</p>
                </Nav.Link>

                {/* Orders */}
                <Nav.Link
                    as={Link}
                    to="/admin/orders"
                    className={`sidebar-admin-link ${isActive("/admin/orders") ? "active" : ""}`}
                >
                    <img
                        src={assetsAdmin.orders}
                        alt=""
                        style={{ width: "1.25rem", height: "1.25rem" }}
                    />
                    <p className="sidebar-admin-page-p">Đơn hàng</p>
                </Nav.Link>
            </div>
        </div>

    )
}
