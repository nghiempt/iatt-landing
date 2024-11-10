"use client";
import React, { useState } from "react";

type Order = {
    id: string;
    date: string;
    status: string;
    total: number;
    items: {
        name: string;
        material: string;
        color: string;
        size: string;
    }[];
};

const sampleOrders: Order[] = [
    {
        id: "ORD12345",
        date: "2024-11-01",
        status: "Đang đợi",
        total: 250000,
        items: [
            { name: "Khung Titan A1", material: "Titan", color: "Bạc", size: "15 x 21" },
        ],
    },
    {
        id: "ORD12346",
        date: "2024-10-25",
        status: "Đã giao hàng",
        total: 150000,
        items: [
            { name: "Product C", material: "Nhôm", color: "Xanh", size: "20 x 30" },
        ],
    },
    {
        id: "ORD12345",
        date: "2024-11-01",
        status: "Đã giao hàng",
        total: 250000,
        items: [
            { name: "Product A", material: "Sắt", color: "Đỏ", size: "20 x 30" },
        ],
    },
    {
        id: "ORD12346",
        date: "2024-10-25",
        status: "Đã nhận hàng",
        total: 150000,
        items: [
            { name: "Product C", material: "Gỗ", color: "Vàng", size: "20 x 30" },
        ],
    },
    {
        id: "ORD12345",
        date: "2024-11-01",
        status: "Đã nhận hàng",
        total: 250000,
        items: [
            { name: "Product A", material: "Kim loại", color: "Đen", size: "40 x 60" },
        ],
    },
    {
        id: "ORD12346",
        date: "2024-10-25",
        status: "Đã huỷ đơn",
        total: 150000,
        items: [
            { name: "Product C", material: "Nhựa", color: "Trắng", size: "40 x 60" },
        ],
    },
];

// Status colors based on the status of each order
const statusColors: { [key: string]: string } = {
    "Đang đợi": "text-yellow-500",
    "Đã giao hàng": "text-green-500",
    "Đã nhận hàng": "text-blue-500",
    "Đã huỷ đơn": "text-red-500",
};

export default function OrderTab() {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order);
    };

    const handleBackToList = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="p-4">
            {!selectedOrder ? (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Danh sách đơn hàng</h2>
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border-b p-2">Mã đơn hàng</th>
                                <th className="border-b p-2">Ngày đặt</th>
                                <th className="border-b p-2">Trạng thái</th>
                                <th className="border-b p-2">Tổng tiền</th>
                                <th className="border-b p-2">Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sampleOrders.map((order) => (
                                <tr key={order.id} className="text-center">
                                    <td className="border-b p-2">{order.id}</td>
                                    <td className="border-b p-2">{order.date}</td>
                                    <td className={`border-b p-2 ${statusColors[order.status]}`}>
                                        {order.status}
                                    </td>
                                    <td className="border-b p-2">{order.total.toLocaleString()} VND</td>
                                    <td className="border-b p-2">
                                        <button
                                            onClick={() => handleViewDetails(order)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Xem chi tiết
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <button onClick={handleBackToList} className="text-blue-500 hover:underline mb-4">
                        &larr; Quay lại danh sách
                    </button>
                    <h2 className="text-xl font-semibold mb-4">Chi tiết đơn hàng {selectedOrder.id}</h2>
                    <div className="mb-4">
                        <p><strong>Ngày đặt:</strong> {selectedOrder.date}</p>
                        <p><strong>Trạng thái:</strong> {selectedOrder.status}</p>
                        <p><strong>Tổng tiền:</strong> {selectedOrder.total.toLocaleString()} VND</p>
                    </div>
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border-b p-2">Sản phẩm</th>
                                <th className="border-b p-2">Chất liệu</th>
                                <th className="border-b p-2">Màu sắc</th>
                                <th className="border-b p-2">Kích thước</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedOrder.items.map((item, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border-b p-2">{item.name}</td>
                                    <td className="border-b p-2">{item.material}</td>
                                    <td className="border-b p-2">{item.color}</td>
                                    <td className="border-b p-2">{item.size}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
