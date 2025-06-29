import * as React from "react";
import {assetsAdmin} from "../assets/admin_assets/assets.ts";
import {assets} from "../assets/frontend_assets/assets.ts";
import '../App.scss'
import {Nav} from "react-bootstrap";
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import {useContext, useState, useEffect} from "react";
import {ShopContext} from "../context/ShopContext.tsx";
import LOOOGO from '../assets/frontend_assets/logothaythe.png'

export const Navbar: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const {setShowSearch, userInfo, getCartCount, setUserInfo, setCartItems} = useContext(ShopContext);
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const token = localStorage.getItem("token");

    console.log(getCartCount)

    return (
        <div className="nav-container">
            <Link to="/" ><img src={LOOOGO} alt={"Logo"} className="img-logo-nav"/></Link>

            <ul className="nav-item">
                <Nav.Link as={Link} to='/' className="nav-links">
                    <p>TRANG CHỦ</p>
                    <hr className="nav-hr"/>
                </Nav.Link>
                <Nav.Link as={Link} to='/collection' className="nav-links">
                    <p>SẢN PHẨM</p>
                    <hr className="nav-hr"/>
                </Nav.Link>
                <Nav.Link as={Link} to='/about' className="nav-links">
                    <p>GIỚI THIỆU</p>
                    <hr className="nav-hr"/>
                </Nav.Link>
                <Nav.Link as={Link} to='/contact' className="nav-links">
                    <p>LIÊN HỆ</p>
                    <hr className="nav-hr"/>
                </Nav.Link>
            </ul>

            <div className="nav-account">
                <img onClick={()=> setShowSearch(true)} src={assets.search_icon} className="search-icon" alt=""/>

                <div className="group-menu">
                    <Link to="/login">
                        <img className="profile-icon" src={assets.profile_icon} alt=""/>
                    </Link>
                    {token && <div className="dropdown-menu-nav">
                        <div className="menu-content">
                            <p className="menu-item">
                                {userInfo ? `Xin chào, ${userInfo.username}` : "Hồ sơ của tôi"}
                            </p>
                            <p onClick={() => navigate("/orders")} className="menu-item">Đơn đặt hàng</p>
                            <p className="menu-item" onClick={() => {
                                setUserInfo(null);
                                localStorage.removeItem("userInfo");
                                localStorage.removeItem("token");
                                setCartItems({});
                                navigate("/login");
                            }}>Đăng xuất</p>
                        </div>
                    </div>}
                </div>

                <Link to='/cart' className="nav-cart-icon">
                    <img src={assets.cart_icon} className="img-cart-icon" alt={""}/>
                    <p className="badge">{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className="img-menu-icon" alt={""}/>
            </div>

            {/*Sidebar menu */}
            <div className={`sidebar-menu ${visible ? 'visible' : ''}`}>
                <div className="sidebar-menu-item">
                    <div onClick={() => setVisible(false)} className="sidebar-menu-icon">
                        <img className="img-drop-icon" src={assets.dropdown_icon} alt={""}/>
                        <p>Back</p>
                    </div>
                </div>

                <NavLink className="sidebar-nav-drop" onClick={() => setVisible(false)} to='/'>
                    <p>TRANG CHỦ</p>
                </NavLink>
                <NavLink className="sidebar-nav-drop" onClick={() => setVisible(false)} to='/collection'>
                    <p>SẢN PHẨM</p>
                </NavLink>
                <NavLink className="sidebar-nav-drop" onClick={() => setVisible(false)} to='/about'>
                    <p>GIỚI THIỆU</p>
                </NavLink>
                <NavLink className="sidebar-nav-drop" onClick={() => setVisible(false)} to='/contact'>
                    <p>LIÊN HỆ</p>
                </NavLink>
            </div>
        </div>
    );
};
