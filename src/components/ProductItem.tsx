import {useContext} from "react";
import {ShopContext} from "../context/ShopContext.tsx";
import {Link, NavLink} from "react-router-dom";
import {Nav} from "react-bootstrap";

const ProductItem = ({id, image, name,price}) => {
    const {currency} = useContext(ShopContext);

    return (
        // <Nav.Link as={Link} style={{color: "#374151", cursor: "pointer"}} to={`/product/${id}`}>
        //     <div className="overflow-hidden">
        //         <img className="productitem-page" src={image[0]} alt={""}/>
        //     </div>
        //     <p style={{paddingTop: "0.75rem", paddingBottom: "0.25rem", fontSize: "0.875rem", textDecoration: "none"}}>{name}</p>
        //     <p style={{fontSize: "0.875rem", fontWeight: "500", textDecoration: "none"}}>{price}{currency}</p>
        // </Nav.Link>
        <Nav.Link
            as={Link}
            to={`/product/${id}`}
            className="product-card"
            style={{ textDecoration: "none" }}
        >
            <div className="product-img-wrapper">
                <img className="productitem-page" src={image[0]} alt={name} />
            </div>
            <div className="product-info">
                <p className="product-name">{name}</p>
                <p className="product-price">{price.toLocaleString("vi-VN")}{currency}</p>
            </div>
        </Nav.Link>

    )
}

export default ProductItem;
