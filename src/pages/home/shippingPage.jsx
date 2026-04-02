import { useLocation, useNavigate } from "react-router-dom";
import CartCard from "../../components/cartCard";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShippingPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const cart = location.state?.items || [];

    const [total, setTotal] = useState(0);
    const [labeledTotal, setLabeledTotal] = useState(0);

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (!cart || cart.length === 0) {
            toast.error("No items in cart");
            navigate("/cart");
            return;
        }

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
            orderedItems: cart,
        })
        .then((res) => {
            if (res.data.total != null) {
                setTotal(res.data.total);
                setLabeledTotal(res.data.labeledTotal);
            }
        })
        .catch(() => {
            toast.error("Failed to calculate total");
        });

    }, []);

    function validateForm() {
        if (!name.trim()) {
            toast.error("Name is required");
            return false;
        }
        if (!address.trim()) {
            toast.error("Address is required");
            return false;
        }
        if (!phone.trim()) {
            toast.error("Phone number is required");
            return false;
        }
        if (!/^0\d{9}$/.test(phone)) {
            toast.error("Enter valid Sri Lankan phone number");
            return false;
        }
        return true;
    }

    function createOrder() {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first");
            return;
        }

        if (!validateForm()) return;

        axios.post(
            import.meta.env.VITE_BACKEND_URL + "/api/orders",
            {
                orderedItems: cart,
                name,
                address,
                phone
            },
            {
                headers: {
                    Authorization: "Bearer " + token
                },
            }
        )
        .then(() => {
            toast.success("Order placed successfully!");

            // ✅ REDIRECT TO ORDERS PAGE
            setTimeout(() => {
                navigate("/orders");
            }, 1200); // small delay so user can see toast
        })
        .catch(() => {
            toast.error("Failed to place order");
        });
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
            <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6 space-y-6">

                <h1 className="text-3xl font-bold text-gray-800">
                    Shipping & Checkout
                </h1>

                {/* USER DETAILS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Phone Number (07XXXXXXXX)"
                        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <textarea
                        placeholder="Full Address"
                        className="border p-3 rounded-lg md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                {/* CART TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-2">Image</th>
                                <th className="p-2">Product</th>
                                <th className="p-2">ID</th>
                                <th className="p-2">Qty</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <CartCard
                                    key={item.productID}
                                    productID={item.productID}
                                    qty={item.qty}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* TOTALS */}
                <div className="text-right space-y-2">
                    <h1 className="text-lg text-gray-600">
                        Subtotal: LKR {labeledTotal.toFixed(2)}
                    </h1>
                    <h1 className="text-lg text-green-600">
                        Discount: LKR {(labeledTotal - total).toFixed(2)}
                    </h1>
                    <h1 className="text-2xl font-bold text-blue-600">
                        Total: LKR {total.toFixed(2)}
                    </h1>
                </div>

                {/* CHECKOUT BUTTON */}
                <div className="flex justify-end">
                    <button
                        className="w-[250px] bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition"
                        onClick={createOrder}
                    >
                        Checkout
                    </button>
                </div>

            </div>
        </div>
    );
}