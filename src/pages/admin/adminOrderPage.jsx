import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // 🔥 NEW STATES
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [status, setStatus] = useState("");
    const [notes, setNotes] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            toast.error("Please login first");
            return;
        }

        fetchOrders();
    }, []);

    function fetchOrders() {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setOrders(res.data))
        .catch(() => toast.error("Failed to fetch orders"));
    }

    function calculateTotal(items) {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    // 🔥 OPEN UPDATE MODAL
    function openUpdateModal(order) {
        setStatus(order.status);
        setNotes(order.notes || "");
        setShowUpdateModal(true);
    }

    // 🔥 UPDATE ORDER
    function handleUpdateOrder() {
        axios.put(
            import.meta.env.VITE_BACKEND_URL + `/api/orders/${selectedOrder.orderId}`,
            { status, notes },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(() => {
            toast.success("Order updated");
            setShowUpdateModal(false);
            setSelectedOrder(null);
            fetchOrders();
        })
        .catch(() => {
            toast.error("Update failed");
        });
    }

    return (
        <div className="w-full min-h-screen p-6 flex flex-col items-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>

            <div className="w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order._id}
                                onClick={() => setSelectedOrder(order)}
                                className="border-t hover:bg-gray-50 cursor-pointer"
                            >
                                <td className="p-4">{order.orderId}</td>
                                <td className="p-4">{order.status}</td>
                                <td className="p-4">
                                    {new Date(order.date).toLocaleDateString()}
                                </td>
                                <td className="p-4">
                                    Rs. {calculateTotal(order.orderedItems).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 🔥 VIEW MODAL */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white w-[90%] max-w-3xl rounded-lg p-6 relative">

                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="absolute top-3 right-3 text-xl"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold mb-4">
                            Order #{selectedOrder.orderId}
                        </h2>

                        {/* Customer */}
                        <div className="mb-4">
                            <p><strong>Name:</strong> {selectedOrder.name}</p>
                            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                            <p><strong>Address:</strong> {selectedOrder.address}</p>
                        </div>

                        {/* Items */}
                        <div className="max-h-60 overflow-y-auto border rounded">
                            {selectedOrder.orderedItems.map((item, i) => (
                                <div key={i} className="flex justify-between p-3 border-b">
                                    <span>{item.name} (x{item.quantity})</span>
                                    <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        {/* Notes */}
                        <div className="mt-4">
                            <strong>Notes:</strong> {selectedOrder.notes || "None"}
                        </div>

                        {/* Total */}
                        <div className="mt-4 font-bold text-right">
                            Total: Rs. {calculateTotal(selectedOrder.orderedItems).toFixed(2)}
                        </div>

                        {/* 🔥 UPDATE BUTTON */}
                        <button
                            onClick={() => openUpdateModal(selectedOrder)}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Update Order
                        </button>

                    </div>
                </div>
            )}

            {/* 🔥 UPDATE MODAL */}
            {showUpdateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white w-[90%] max-w-md p-6 rounded-lg">

                        <h2 className="text-xl font-bold mb-4">Update Order</h2>

                        {/* Status */}
                        <label className="block mb-2">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full border p-2 mb-4"
                        >
                            <option value="pending">Pending</option>
                            <option value="preparing">Preparing</option>
                            <option value="paused">Paused</option>
                            <option value="delivered">Delivered</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>

                        {/* Notes */}
                        <label className="block mb-2">Notes</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full border p-2 mb-4"
                            rows="3"
                        />

                        {/* Buttons */}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowUpdateModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdateOrder}
                                className="px-4 py-2 bg-green-500 text-white rounded"
                            >
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}