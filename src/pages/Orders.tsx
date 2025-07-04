import React, { useEffect, useState } from "react";
import Title from "../components/Title";

type OrderItem = {
    id: number;
    name: string;
    images: string;
    price: number;
    number: number;
    capicity: string;
    date: number;
    status: string;
    orderId: number;
    shipFee: number;
    paymentMethod: string;
    address: string;
};

const formatCurrency = (amount: number) =>
    amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("vi-VN"); // ví dụ: 4/7/2025
};

export const Orders: React.FC = () => {
    const [ordersData, setOrdersData] = useState<OrderItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch("http://localhost:8080/shopqtq/order", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Lỗi khi fetch đơn hàng");

                const data = await response.json();
                setOrdersData(data);
            } catch (error) {
                console.error("Lỗi khi tải đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Gom nhóm các item theo orderId
    const groupedOrders = ordersData.reduce((acc: any, item: OrderItem) => {
        const orderId = item.orderId || item.id;
        if (!acc[orderId]) {
            acc[orderId] = {
                orderId,
                date: item.date,
                status: item.status,
                shipFee: item.shipFee || 20000,
                paymentMethod: item.paymentMethod || "cod",
                address: item.address,
                items: [],
                total: 0,
            };
        }
        acc[orderId].items.push(item);
        acc[orderId].total += item.price * item.number;
        return acc;
    }, {});

    const ordersArray = Object.values(groupedOrders);

    return (
        <div className="orders-container">
            <Title text1="ĐƠN HÀNG" text2="CỦA TÔI" />

            {loading ? (
                <p>Đang tải đơn hàng...</p>
            ) : ordersArray.length === 0 ? (
                <p>Không có đơn hàng nào.</p>
            ) : (
                ordersArray.map((order: any) => (
                    <div key={order.orderId} className="order-card">
                        <div className="order-header">
                            <p><strong>Mã đơn:</strong> {order.orderId}</p>
                            <p><strong>Ngày đặt:</strong> {formatDate(order.date)}</p>
                            <p><strong>Địa chỉ:</strong> {order.address}</p>
                            <p><strong>Phương thức thanh toán:</strong> {order.paymentMethod.toUpperCase()}</p>
                            <p><strong>Trạng thái:</strong> {
                                order.status === "APPROVE" ? "Đã phê duyệt" :
                                    order.paymentMethod === "vnpay" ? "Đã thanh toán" :
                                        "Chưa thanh toán"
                            }</p>
                        </div>

                        {/* Danh sách sản phẩm trong đơn */}
                        {order.items.map((item: OrderItem, idx: number) => (
                            <div key={idx} className="order-items">
                                <img src={item.images} alt={item.name} />
                                <div className="product-info">
                                    <p><strong>{item.name}</strong></p>
                                    <p>Giá: {formatCurrency(item.price)} x {item.number}</p>
                                    <p>Bộ nhớ: {item.capicity ? `${item.capicity} GB` : "Không rõ"}</p>
                                </div>
                            </div>
                        ))}

                        <div className="order-total">
                            <p><span>Tổng sản phẩm:</span> <span>{formatCurrency(order.total)}</span></p>
                            <p><span>Phí giao hàng:</span> <span>{formatCurrency(order.shipFee)}</span></p>
                            <p className="total">
                                <span>Tổng cộng:</span> <span>{formatCurrency(order.total + order.shipFee)}</span>
                            </p>
                        </div>

                        <div className="order-status">
                            <div className="order-status-indicator">
                                <div className={`order-status-dot ${
                                    order.status === "APPROVE" || order.paymentMethod === "vnpay"
                                        ? "status-ok"
                                        : "status-pending"
                                }`}></div>
                                <p>
                                    {
                                        order.status === "APPROVE"
                                            ? "Đã phê duyệt"
                                            : order.paymentMethod === "vnpay"
                                                ? "Đã thanh toán"
                                                : "Thanh toán khi nhận hàng"
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
