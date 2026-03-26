import { Link, Routes } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";
import { FaUsers, FaBoxOpen, FaShoppingCart } from "react-icons/fa";
import { Route } from "react-router-dom";
import AdminProductsPage from "./admin/adminProductsPage.jsx";
import AddProductForm from "./admin/addProductForm.jsx";

export default function AdminHomePage() {
    return (
        <div className="w-full h-screen flex bg-gray-100">

            {/* Sidebar */}
            <div className="w-[250px] h-full bg-gradient-to-b from-blue-600 to-indigo-700 text-white flex flex-col shadow-lg">

                <h1 className="text-2xl font-bold text-center py-6 border-b border-blue-400">

                </h1>

                <nav className="flex flex-col mt-4 space-y-2">

                    <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-3 py-3 px-6 hover:bg-blue-700 transition"
                    >
                        <BsGraphUp className="text-lg" />
                        Dashboard
                    </Link>

                    <Link
                        to="/admin/users"
                        className="flex items-center gap-3 py-3 px-6 hover:bg-blue-700 transition"
                    >
                        <FaUsers className="text-lg" />
                        Users
                    </Link>

                    <Link
                        to="/admin/products"
                        className="flex items-center gap-3 py-3 px-6 hover:bg-blue-700 transition"
                    >
                        <FaBoxOpen className="text-lg" />
                        Products
                    </Link>

                    <Link
                        to="/admin/orders"
                        className="flex items-center gap-3 py-3 px-6 hover:bg-blue-700 transition"
                    >
                        <FaShoppingCart className="text-lg" />
                        Orders
                    </Link>

                </nav>
            </div>

            {/* Main Content */}
            <div className="w-[80%] h-screen">

                <Routes path="/*">
                    <Route path="/" element={<h1>Admin Dashboard</h1>} />
                    <Route path="/users" element={<h1>Manage Users</h1>} />
                    <Route path="/products" element={<AdminProductsPage />} />
                    <Route path="/products/addProduct" element={<AddProductForm />} />
                    <Route path="/orders" element={<h1>Manage Orders</h1>} />
                    <Route path="/*" element={<h1>404 - Page Not Found</h1>} />
                </Routes>

            </div>

        </div>
    );
}