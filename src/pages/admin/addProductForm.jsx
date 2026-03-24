import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddProductForm() {

    const [productID, setProductID] = useState("");
    const [productName, setProductName] = useState("");
    const [alternativeNames, setAlternativeNames] = useState("");
    const [imageURLs, setImageURLs] = useState("");
    const [price, setPrice] = useState("");
    const [lastPrice, setLastPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    async function handleSubmit() {
        const altNames = alternativeNames.split(",");
        const imgURLs = imageURLs.split(",");

        const poducts = {
            productID: productID,
            productName: productName,
            altNames: altNames,
            images: imgURLs,
            price: price,
            lastPrice: lastPrice,
            stock: stock,
            description: description
        }
        const token = localStorage.getItem("token");

        try {
            await axios.post("http://localhost:3000/api/products", poducts, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            navigate("/admin/products");
            toast.success("Product added successfully!");
        } catch (error) {
            toast.error("Failed to add product. Please try again.");
        }


    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

            {/* Card */}
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8">

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Add New Product
                </h1>

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Product ID */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">Product ID</label>
                        <input
                            type="text"
                            placeholder="Enter product id"
                            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={productID}
                            onChange={(e) => {
                                setProductID(e.target.value)
                            }}
                        />
                    </div>

                    {/* Product Name */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">Product Name</label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={productName}
                            onChange={(e) => {
                                setProductName(e.target.value)
                            }}
                        />
                    </div>

                    {/* Alternative Names */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">Alternative Names</label>
                        <input
                            type="text"
                            placeholder="Comma separated (e.g. Serum, Skin Care)"
                            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={alternativeNames}
                            onChange={(e) => {
                                setAlternativeNames(e.target.value)
                            }}
                        />
                    </div>

                    {/* Image URLs */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">Image URLs</label>
                        <input
                            type="text"
                            placeholder="Comma separated URLs"
                            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={imageURLs}
                            onChange={(e) => {
                                setImageURLs(e.target.value)
                            }}
                        />
                    </div>

                    {/* Price */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">Price</label>
                        <input
                            type="number"
                            placeholder="Enter price"
                            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value)
                            }}
                        />
                    </div>

                    {/* Last Price */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">Last Price</label>
                        <input
                            type="number"
                            placeholder="Enter last price"
                            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={lastPrice}
                            onChange={(e) => {
                                setLastPrice(e.target.value)
                            }}
                        />
                    </div>

                    {/* Stock */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">Stock</label>
                        <input
                            type="number"
                            placeholder="Enter stock"
                            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={stock}
                            onChange={(e) => {
                                setStock(e.target.value)
                            }}
                        />
                    </div>

                </div>

                {/* Description */}
                <div className="flex flex-col mt-5">
                    <label className="text-sm text-gray-600 mb-1">Description</label>
                    <textarea
                        placeholder="Enter product description"
                        className="border rounded-lg p-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                    />
                </div>

                {/* Button */}
                <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition"
                    onClick={handleSubmit}>
                    Add Product
                </button>

            </div>
        </div>
    );
}
