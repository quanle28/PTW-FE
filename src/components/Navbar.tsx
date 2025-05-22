import * as React from "react";
import {assetsAdmin} from "../assets/admin_assets/assets.ts";
import {assets} from "../assets/frontend_assets/assets.ts";
import '../App.scss'
import {Nav} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import {ShopContext} from "../context/ShopContext.tsx";

export const Navbar: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const {setShowSearch, getCartCount} = useContext(ShopContext);

    console.log(getCartCount)

    return (
        <div className="nav-container">
            <Link to="/" ><img src={assetsAdmin.logo} alt={"Logo"} className="img-logo-nav"/></Link>

            <ul className="nav-item">
                <Nav.Link as={Link} to='/' className="nav-links">
                    <p>HOME</p>
                    <hr className="nav-hr"/>
                </Nav.Link>
                <Nav.Link as={Link} to='/collection' className="nav-links">
                    <p>COLLECTION</p>
                    <hr className="nav-hr"/>
                </Nav.Link>
                <Nav.Link as={Link} to='/about' className="nav-links">
                    <p>ABOUT</p>
                    <hr className="nav-hr"/>
                </Nav.Link>
                <Nav.Link as={Link} to='/contact' className="nav-links">
                    <p>CONTACT</p>
                    <hr className="nav-hr"/>
                </Nav.Link>
            </ul>

            <div className="nav-account">
                <img onClick={()=> setShowSearch(true)} src={assets.search_icon} className="search-icon" alt=""/>

                <div className="group-menu">
                    <Link to="/login">
                        <img className="profile-icon" src={assets.profile_icon} alt=""/>
                    </Link>
                    <div className="dropdown-menu-nav">
                        <div className="menu-content">
                            <p className="menu-item">My Profile</p>
                            <p className="menu-item">Orders</p>
                            <p className="menu-item">Logout</p>
                        </div>
                    </div>
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
                    <p>HOME</p>
                </NavLink>
                <NavLink className="sidebar-nav-drop" onClick={() => setVisible(false)} to='/collection'>
                    <p>COLLECTION</p>
                </NavLink>
                <NavLink className="sidebar-nav-drop" onClick={() => setVisible(false)} to='/about'>
                    <p>ABOUT</p>
                </NavLink>
                <NavLink className="sidebar-nav-drop" onClick={() => setVisible(false)} to='/contact'>
                    <p>CONTACT</p>
                </NavLink>
            </div>
        </div>
    );
};
