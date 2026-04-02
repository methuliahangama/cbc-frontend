import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function MyOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first");
            return;
        }

        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            setOrders(res.data);
        })
        .catch(() => {
            toast.error("Failed to fetch orders");
        });
    }, []);

    function calculateTotal(items) {
        return items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    }

    return (
        <div className="w-full min-h-screen p-6 flex flex-col items-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">My Orders</h1>

            <div className="w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Total (LKR)</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center p-6 text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr
                                    key={order._id}
                                    onClick={() => setSelectedOrder(order)}
                                    className="border-t hover:bg-gray-50 cursor-pointer"
                                >
                                    <td className="p-4 font-medium">{order.orderId}</td>

                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold
                                            ${order.status === "completed" ? "bg-green-200 text-green-800" :
                                              order.status === "cancelled" ? "bg-red-200 text-red-800" :
                                              "bg-yellow-200 text-yellow-800"}`}>
                                            {order.status}
                                        </span>
                                    </td>

                                    <td className="p-4">
                                        {new Date(order.date).toLocaleDateString()}
                                    </td>

                                    <td className="p-4 font-semibold">
                                        Rs. {calculateTotal(order.orderedItems).toFixed(2)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* 🔥 MODAL */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white w-[90%] max-w-3xl rounded-lg shadow-lg p-6 relative">

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-red-500"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold mb-4">
                            Order #{selectedOrder.orderId}
                        </h2>

                        {/* Customer Info */}
                        <div className="mb-4">
                            <p><strong>Name:</strong> {selectedOrder.name}</p>
                            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                            <p><strong>Address:</strong> {selectedOrder.address}</p>
                        </div>

                        {/* Items */}
                        <div className="max-h-60 overflow-y-auto border rounded-md">
                            {selectedOrder.orderedItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 border-b">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />

                                    <div className="flex-1">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-gray-500">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>

                                    <div className="font-semibold">
                                        Rs. {(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Notes */}
                        {selectedOrder.notes && (
                            <div className="mt-4">
                                <p className="font-semibold">Notes:</p>
                                <p className="text-gray-600">{selectedOrder.notes}</p>
                            </div>
                        )}

                        {/* Total */}
                        <div className="mt-4 text-right text-xl font-bold">
                            Total: Rs. {calculateTotal(selectedOrder.orderedItems).toFixed(2)}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}