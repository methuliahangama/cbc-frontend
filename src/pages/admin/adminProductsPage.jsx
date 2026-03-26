import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AdminProductsPage() {

  const [products, setProducts] = useState([]);
  const [productLoaded, setProductLoaded] = useState(false);

  useEffect(() => {
    if (!productLoaded) {
      axios.get("http://localhost:3000/api/products")
        .then((res) => {
          //console.log("Use effect is running");
          setProducts(res.data);
          //console.log(res.data);
          setProductLoaded(true);
        });
    }

  }, [productLoaded]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">

      <Link to="/admin/products/addProduct" className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-xl transition absolute right-[25px] bottom-0 text-[25px]">
        <FaPlus />
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Products
        </h1>
        <p className="text-gray-500">
          Manage your product inventory easily
        </p>
      </div>

      {
      productLoaded ?  <div className="w-full h-full flex justify-center items-center">

        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">

          <table className="w-full text-left border-collapse">

            {/* Table Head */}
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Last Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-4 font-medium text-gray-700">
                    {product.productID}
                  </td>

                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt="product"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="font-semibold text-gray-800">
                      {product.productName}
                    </span>
                  </td>

                  <td className="p-4 text-green-600 font-semibold">
                    Rs. {product.price}
                  </td>

                  <td className="p-4 line-through text-gray-400">
                    Rs. {product.lastPrice}
                  </td>

                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${product.stock > 30 ? "bg-green-100 text-green-700" :
                        product.stock > 10 ? "bg-yellow-100 text-yellow-700" :
                          "bg-red-100 text-red-700"}
                  `}>
                      {product.stock}
                    </span>
                  </td>

                  <td className="p-4 text-gray-600 max-w-xs truncate">
                    {product.description}
                  </td>

                  {/* Actions */}
                  <td className="p-4 flex justify-center gap-4">

                    <button className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition"
                      onClick={() => {
                        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
                        if (!confirmDelete) return;

                        const token = localStorage.getItem("token");

                        axios.delete(
                          `http://localhost:3000/api/products/${product.productID}`,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`
                            }
                          }
                        )
                          .then(() => {
                            toast.success("Product deleted successfully");
                            setProductLoaded(false);

                            // ✅ update UI instantly
                            setProducts(prev =>
                              prev.filter(p => p.productID !== product.productID)
                            );
                          })
                          .catch((err) => {
                            console.error(err);
                            toast.error("Error deleting product");
                          });
                      }}>
                      <FaTrash />
                    </button>

                    <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-lg transition">
                      <FaPencil />
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div> :   <div className="w-full h-full flex justify-center items-center">
        <div className="w-[60px] h-[60px] border-[2px] border-gray-200 border-b-blue-500 rounded-full animate-spin flex justify-center items-center mb-6">
        </div>
      </div>
      }
    </div>
  );
}