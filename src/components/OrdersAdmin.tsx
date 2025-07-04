import React, { useEffect, useState } from "react";
import {toast} from "react-toastify";

export const OrdersAdmin = () => {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem("token");

    const handleApprove = async (orderId) => {
        try {
            const res = await fetch(`http://localhost:8080/shopqtq/approveOrder/${orderId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                toast.success("Đã phê duyệt đơn hàng!");

                // Cập nhật trạng thái trong state
                setOrders((prev) =>
                    prev.map((order) =>
                        order.id === orderId ? { ...order, status: "APPROVE" } : order
                    )
                );
            } else {
                toast.error("Không thể phê duyệt đơn hàng.");
            }
        } catch (err) {
            toast.error("Lỗi khi phê duyệt!");
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const resUsers = await fetch("http://localhost:8080/shopqtq/getUsers", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });

                const users = await resUsers.json();

                const allOrders = await Promise.all(
                    users.map(async (user) => {
                        const res = await fetch(`http://localhost:8080/shopqtq/getOrder/${user.id}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            }
                        });
                        const data = await res.json();
                        return data;
                    })
                );

                const flatOrders = allOrders.flat();

                // ✅ GROUP theo order.id
                const grouped = flatOrders.reduce((acc, item) => {
                    if (!acc[item.id]) {
                        acc[item.id] = {
                            id: item.id,
                            username: item.username,
                            date: item.date,
                            adress: item.adress,
                            status: item.status,
                            items: []
                        };
                    }

                    acc[item.id].items.push({
                        productName: item.productName,
                        capicity: item.capicity,
                        image: item.image,
                        price: item.price
                    });

                    return acc;
                }, {});

                setOrders(Object.values(grouped).reverse()); // để đơn mới nhất lên đầu
            } catch (err) {
                toast.error("Lỗi khi lấy dữ liệu đơn hàng!");
                console.error(err);
            }
        };

        fetchOrders();
    }, []);


    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString("vi-VN");
    };

    return (
        <div className="orders-container">
            <h2 className="text-xl font-semibold mb-4">Danh sách đơn hàng</h2>

            {orders.map((order) => (
                <div key={order.id} className="order-card">
                    {/* Header */}
                    <div className="order-header">
                        <p><strong>Mã đơn hàng:</strong> {order.id}</p>
                        <p><strong>Người đặt:</strong> {order.username}</p>
                        <p><strong>Ngày đặt hàng:</strong> {formatDate(order.date)}</p>
                        <p><strong>Địa chỉ:</strong> {order.adress}</p>
                    </div>

                    {/* Items */}
                    <div className="order-items-container">
                        {order.items.map((product, idx) => (
                            <div className="order-items" key={idx}>
                                <img src={product.image} alt={product.productName} />
                                <div className="product-info">
                                    <p className="font-medium">{product.productName}</p>
                                    <p>Dung lượng: {product.capicity} GB</p>
                                    <p>Giá: {product.price.toLocaleString()} VND</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tổng giá và trạng thái */}
                    <div className="order-total">
                        <p><span>Tổng sản phẩm:</span> <span>{order.items.length}</span></p>
                        <p><span>Tổng tiền:</span> <span className="total">{order.items.reduce((total, item) => total + item.price, 0).toLocaleString()} VND</span></p>
                    </div>

                    <div className="order-status">
                        <div className="order-status-indicator">
                            <div
                                className={`order-status-dot ${
                                    order.status === "APPROVE" ? "status-ok" : "status-pending"
                                }`}
                            ></div>
                            <span>
                                {order.status === "APPROVE" ? "Đã phê duyệt" : "Đã đặt hàng"}
                            </span>
                        </div>

                        {order.status === "OK" && (
                            <button
                                className="order-track-btn"
                                onClick={() => handleApprove(order.id)}
                            >
                                Phê duyệt đơn
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
