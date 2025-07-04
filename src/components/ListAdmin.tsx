import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {Link, useLocation} from "react-router-dom";
import {Nav} from "react-bootstrap";

export const ListAdmin = () =>{
    const token = localStorage.getItem("token");
    const [list, setList] = useState([]);
    const location = useLocation();

    const fetchList = async () =>{
        try {
            const response = await axios.get("http://localhost:8080/shopqtq/allproducts")
            if (response.status === 200) {
                console.log(response.data)
                setList(response.data);
            } else {
                toast.error("Lỗi!")
            }

        }catch (e) {
            toast.error("Lỗi server!")
        }
    }

    const removeProduct = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/shopqtq/deleteproduct/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                toast.success("Xóa sản phẩm thành công!");
                await fetchList();
            } else {
                toast.error("Lỗi xóa sản phẩm");
            }
        } catch (e) {
            toast.error("Lỗi server");
        }
    }

    useEffect(() => {
        fetchList();
    }, [location]);

    return (
        <>
            <p style={{ marginBottom: "0.75rem", fontWeight: "600", fontSize: "1.25rem" }}>
                Tất cả sản phẩm
            </p>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                }}
            >
                {/* Header table */}
                <div className="list-admin">
                    <b>Hình ảnh</b>
                    <b>Sản phẩm</b>
                    {/*<b>Mô tả</b>*/}
                    <b>Giá</b>
                    <b>Loại sản phẩm</b>
                    <b>Hãng</b>
                    <b>Bộ nhớ</b>
                    <b className="text-center">Bestseller</b>
                    <b className="text-center">Thao tác</b>
                </div>

                {/* Dòng sản phẩm */}
                {list.map((item, index) => (
                    <div className="list-admin-div" key={index}>
                        {/* Hình ảnh */}
                        <img
                            style={{
                                width: "3rem",
                                height: "3rem",
                                objectFit: "cover",
                                borderRadius: "6px",
                            }}
                            src={item.images[0]}
                            alt="ảnh sản phẩm"
                        />

                        {/* Tên sản phẩm */}
                        <p style={{ fontWeight: "500", color: "#1f2937" }}>{item.name}</p>

                        {/* Mô tả */}
                        {/*<p style={{ color: "#374151" }}>{item.describes}</p>*/}

                        {/* Giá */}
                        <p style={{ fontWeight: "500", color: "#2563eb" }}>{item.price.toLocaleString()} VND</p>

                        {/* Loại */}
                        <p>{item.categories}</p>

                        {/* Hãng */}
                        <p>{item.brands}</p>

                        {/* Bộ nhớ */}
                        <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.4", color: "#374151" }}>
                            {item.memories
                                .map((m) => (m === "1" ? "1 TB" : `${m} GB`))
                                .join(", ")}
                        </p>

                        {/* Bestseller */}
                        <p className="list-admin-img">{item.bestseller ? "✔" : "❌"}</p>

                        {/* Thao tác */}
                        <div
                            style={{
                                display: "flex",
                                gap: "0.5rem",
                                justifyContent: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            <Nav.Link
                                as={Link}
                                style={{ color: "#374151", textDecoration: "none" }}
                                to={`/admin/update/${item.id}`}
                            >
                                <button className="list-admin-button update">Sửa</button>
                            </Nav.Link>
                            <button
                                className="list-admin-button delete"
                                onClick={() => removeProduct(item.id)}
                            >
                                X
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}
