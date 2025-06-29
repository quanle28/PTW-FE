import {Link, useLocation} from "react-router-dom";
import {assetsAdmin} from "../assets/admin_assets/assets.ts";
import {Nav} from "react-bootstrap";

export const SidebarAdminPage = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        // <div style={{
        //     width: "18%",
        //     minHeight: "100vh",
        //     borderRightWidth: "2px",
        //     borderRightStyle: "solid",
        //     borderRightColor: "#e5e7eb"
        // }}>
        //     <div style={{
        //         display: "flex",
        //         flexDirection: "column",
        //         gap: "1rem",
        //         paddingTop: "1.5rem",
        //         paddingLeft: "20%",
        //         fontSize: "15px"
        //     }}
        //     >
        //         <Nav.Link style={{
        //             display: "flex",
        //             alignItems: "center",
        //             gap: "0.75rem",
        //             borderWidth: "1px",
        //             borderStyle: "solid",
        //             borderColor: "#d1d5db",
        //             borderRightWidth: 0,
        //             paddingLeft: "0.75rem",
        //             paddingRight: "0.75rem",
        //             paddingTop: "0.5rem",
        //             paddingBottom: "0.5rem",
        //             borderRadius: "0.25rem",
        //         }} as={Link} to='/admin/add' >
        //             <img style={{ width: "1.25rem", height: "1.25rem" }}
        //                  src={assetsAdmin.add_icon} alt={""}/>
        //             <p className="sidebar-admin-page-p">Add Items</p>
        //         </Nav.Link>
        //
        //         <Nav.Link style={{
        //             display: "flex",
        //             alignItems: "center",
        //             gap: "0.75rem",
        //             borderWidth: "1px",
        //             borderStyle: "solid",
        //             borderColor: "#d1d5db",
        //             borderRightWidth: 0,
        //             paddingLeft: "0.75rem",
        //             paddingRight: "0.75rem",
        //             paddingTop: "0.5rem",
        //             paddingBottom: "0.5rem",
        //             borderRadius: "0.25rem",
        //         }} as={Link} to='/admin/list' >
        //             <img style={{ width: "1.25rem", height: "1.25rem" }}
        //                  src={assetsAdmin.order_icon} alt={""}/>
        //             <p className="sidebar-admin-page-p">List Items</p>
        //         </Nav.Link>
        //
        //         <Nav.Link style={{
        //             display: "flex",
        //             alignItems: "center",
        //             gap: "0.75rem",
        //             borderWidth: "1px",
        //             borderStyle: "solid",
        //             borderColor: "#d1d5db",
        //             borderRightWidth: 0,
        //             paddingLeft: "0.75rem",
        //             paddingRight: "0.75rem",
        //             paddingTop: "0.5rem",
        //             paddingBottom: "0.5rem",
        //             borderRadius: "0.25rem",
        //         }} as={Link} to='/admin/orders' >
        //             <img style={{ width: "1.25rem", height: "1.25rem" }}
        //                  src={assetsAdmin.order_icon} alt={""}/>
        //             <p className="sidebar-admin-page-p">Orders</p>
        //         </Nav.Link>
        //     </div>
        // </div>

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
                    <p className="sidebar-admin-page-p">Add Items</p>
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
                    <p className="sidebar-admin-page-p">List Items</p>
                </Nav.Link>

                {/* Orders */}
                <Nav.Link
                    as={Link}
                    to="/admin/orders"
                    className={`sidebar-admin-link ${isActive("/admin/orders") ? "active" : ""}`}
                >
                    <img
                        src={assetsAdmin.order_icon}
                        alt=""
                        style={{ width: "1.25rem", height: "1.25rem" }}
                    />
                    <p className="sidebar-admin-page-p">Orders</p>
                </Nav.Link>
            </div>
        </div>

    )
}
