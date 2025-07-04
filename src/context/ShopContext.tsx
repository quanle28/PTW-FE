import {createContext, useEffect, useState} from "react";
// import {products} from "../assets/frontend_assets/assets.ts";
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = 'đ';
    const delivery_fee = 20000;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [products, setProduct] = useState([]);
    const token = localStorage.getItem("token");

    const getProductListData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/shopqtq/allproducts")
            if (response.status === 200) {
                console.log(response.data)
                setProduct(response.data);
            } else {
                toast.error("Lỗi!")
            }

        }catch (e) {
            toast.error("Lỗi server!")
        }
    }

    useEffect(() => {
        // getProductListData();
        console.log("products.length", products.length)
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:8080/shopqtq/allproducts');
                const data = await res.json();
                console.log("tokenHome", token)
                setProduct(data);
            } catch (error) {
                console.error("Không thể load product:", error);
            }
        };

        if (products.length === 0) {
            fetchData();
        }
    }, []);

    const [userInfo, setUserInfo] = useState(() => {
        const stored = localStorage.getItem("userInfo");
        console.log("userInfo", stored)
        return stored ? JSON.parse(stored) : null;
    });

    // Hàm logout dùng chung
    const logout = () => {
        setUserInfo(null);
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        toast.info("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        navigate("/login");
    };

    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const now = Date.now() / 1000;
                const remaining = decoded.exp - now;

                if (remaining <= 0) {
                    logout();
                }
            } catch (e) {
                logout();
            }
        }
    }, [location.pathname]);

    const addToCart = async (productId, memoriesId) => {
        const token = localStorage.getItem("token");

        if (!memoriesId) {
            toast.error("Chọn bộ nhớ trước khi thêm vào giỏ hàng");
            return;
        }

        console.log("productId", productId)
        console.log("memoriesId", memoriesId)

        const response = await fetch("http://localhost:8080/shopqtq/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                productId: Number(productId),
                memoriesId: Number(memoriesId),
                number: 1,
                update: false
            })
        });

        if (response.ok) {
            toast.success("Đã thêm vào giỏ hàng");
            await fetchCartData();
        } else {
            toast.error("Thêm thất bại");
        }
    };


    const [cartData, setCartData] = useState([]);

    const fetchCartData = async () => {
        const response = await fetch("http://localhost:8080/shopqtq/cart", {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
            const data = await response.json();
            setCartData(data);
        }
    };

    useEffect(() => {
        if (token) fetchCartData();
    }, [token]);

    const getCartCount = () => {
        return cartData.reduce((total, item) => total + item.number, 0);
    };

    const updateQuantity = async (productId, memoriesId, quantity) => {
        const token = localStorage.getItem("token");
        console.log("productId", productId)
        console.log("memoriesId", memoriesId)
        console.log("quantity", quantity)

        await fetch("http://localhost:8080/shopqtq/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                productId: Number(productId),
                memoriesId: Number(memoriesId),
                number: Number(quantity),
                update: true
            })
        });

        await fetchCartData();
    };



    const getCartAmount = () => {
        let totalAmount = 0;
        for (const productId in cartItems) {
            const itemInfo = products.find(product => product.id === Number(productId));
            for (const memory in cartItems[productId]) {
                if (itemInfo && cartItems[productId][memory] > 0) {
                    totalAmount += itemInfo.price * cartItems[productId][memory];
                }
            }
        }
        return totalAmount;
    };


    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch,
        setShowSearch, cartItems, setCartItems, addToCart, getCartCount,
        updateQuantity, getCartAmount, navigate, userInfo, setUserInfo,
        logout, fetchCartData
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
