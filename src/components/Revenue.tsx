import React, { useEffect, useState } from "react";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

type OrderItem = {
    id: number;
    name: string;
    price: number;
    number: number;
    date: number;
    status: string;
    paymentMethod: string;
};

export const Revenue: React.FC = () => {
    const [orders, setOrders] = useState<OrderItem[]>([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const response = await fetch("http://localhost:8080/shopqtq/orderadmin", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    const errorText = await response.text(); // xem lỗi backend trả ra
                    console.log("errorText", errorText)
                    throw new Error(`HTTP ${response.status} - ${errorText}`);
                }
                console.log("response", response)
                const data = await response.json();
                console.log("data", data)
                console.log("Token FE:", token);
                console.log("Dữ liệu đơn hàng:", data);
                console.log("Timestamp -> Date:", new Date(data[0]?.date));
                setOrders(data);

                setOrders(data);
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu doanh thu", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRevenueData();
    }, []);

    const formatCurrency = (amount: number) =>
        amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

    const today = new Date();
    const isSameDay = (timestamp: number) => {
        const d = new Date(timestamp); // ✔️ để nguyên kiểu số
        return (
            d.getDate() === today.getDate() &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear()
        );
    };


    const isSameMonth = (timestamp: number) => {
        const d = new Date(timestamp);
        return (
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear()
        );
    };

    const approvedOrders = orders.filter((o) =>
        o.status === "APPROVE" || o.status === "OK"
    );

    const totalRevenue = approvedOrders.reduce(
        (sum, item) => sum + item.price * item.number,
        0
    );

    const todayRevenue = approvedOrders
        .filter((item) => isSameDay(item.date))
        .reduce((sum, item) => sum + item.price * item.number, 0);

    const monthRevenue = approvedOrders
        .filter((item) => isSameMonth(item.date))
        .reduce((sum, item) => sum + item.price * item.number, 0);

    const uniqueOrderIds = new Set(approvedOrders.map((item) => item.id));

    // Lấy 7 ngày gần nhất
    const getLast7DaysRevenue = () => {
        const result: { date: string; revenue: number }[] = [];

        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);

            const dateKey = date.toLocaleDateString("en-CA"); // yyyy-mm-dd
            const revenue = approvedOrders
                .filter((item) => {
                    const itemDateKey = new Date(item.date).toLocaleDateString("en-CA");
                    return itemDateKey === dateKey;
                })
                .reduce((sum, item) => sum + item.price * item.number, 0);

            result.push({
                date: dateKey.slice(5), // mm-dd format
                revenue,
            });
        }

        return result;
    };

    const chartData = getLast7DaysRevenue();


    return (
        <div className="revenue-container">
            <h2 className="revenue-title">📊 Thống kê doanh thu</h2>

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <>
                    <div className="revenue-grid">
                        <div className="revenue-card">
                            <h3>Doanh thu hôm nay</h3>
                            <p>{formatCurrency(todayRevenue)}</p>
                        </div>
                        <div className="revenue-card">
                            <h3>Doanh thu tháng này</h3>
                            <p>{formatCurrency(monthRevenue)}</p>
                        </div>
                        <div className="revenue-card">
                            <h3>Tổng doanh thu</h3>
                            <p>{formatCurrency(totalRevenue)}</p>
                        </div>
                        <div className="revenue-card">
                            <h3>Tổng đơn hàng</h3>
                            <p>{uniqueOrderIds.size}</p>
                        </div>
                    </div>

                    {/* Biểu đồ doanh thu 7 ngày gần nhất */}
                    <div className="revenue-chart-section">
                        <h3>📈 Doanh thu 7 ngày gần nhất</h3>
                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart
                                data={chartData}
                                margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                            >
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#4ade80" stopOpacity={0.9} />
                                        <stop offset="100%" stopColor="#22c55e" stopOpacity={0.5} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis
                                    tickFormatter={(value) =>
                                        `${(value / 1_000_000).toFixed(0)}tr`
                                    }
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#ffffff", borderRadius: 8 }}
                                    formatter={(value: number) =>
                                        value.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })
                                    }
                                    labelFormatter={(label: string) => `Ngày ${label}`}
                                />
                                <Bar
                                    dataKey="revenue"
                                    fill="url(#colorRevenue)"
                                    barSize={40}
                                    radius={[8, 8, 0, 0]}
                                    animationDuration={800}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </>
            )}
        </div>
    );
};
