import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductNotFound from "./productNotFound";
import ImageSlider from "../../components/imageSlider";
import { addToCart, clearCart } from "../../utils/cartFunction";
import toast from "react-hot-toast/headless";
import { useNavigate } from "react-router-dom";

export default function ProductOverview() {

    const params = useParams();
    const productId = params.id;
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");
    const navigate = useNavigate();

    useEffect(
        () => {
            console.log("Product ID:", productId);
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
                .then((res) => {
                    console.log("Product Details:", res.data);
                    //if null
                    if (res.data == null) {
                        setStatus("not found");
                    }

                    if (res.data != null) {
                        setProduct(res.data);
                        setStatus("found");
                    }

                });
        }, []);

    function onAddtoCartClick() {
        addToCart(product.productID, 1);
        toast.success(`${product.productName} added to cart!`);
    }

    function onBuyNowClick() {
        navigate("/shipping", {
            state: {
                items: [
                    {
                        productID: product.productID,
                        qty: 1,
                    }
                ]
            }
        });
    }

    return (
        <div className="w-full h-[calc(100vh-100px)]">
            {
                status === "loading" && (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-2 border-gray-800 border-b-accent b-4">

                        </div>
                    </div>
                )
            }
            {
                status === "not found" && (
                    <ProductNotFound />
                )
            }
            {
                status === "found" && (
                    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center">
                        <h1 className="text-4xl font-bold text-gray-800 font-serif lg:hidden">
                            {product.productName}
                        </h1>

                        <p className="text-gray-600 lg:hidden">
                            {product.price > product.lastPrice && (
                                <span className="text-red-500 line-through mr-2">
                                    ${product.lastPrice.toFixed(2)}
                                </span>
                            )}
                            <span className="text-2xl font-bold text-gray-800">
                                ${product.price.toFixed(2)}
                            </span>
                        </p>





                        <div className="w-[100%] border-[3px] border-blue-900 lg:w-[35%] lg:h-full">
                            <ImageSlider images={product.images} />
                        </div>
                        <div className="w-[65%] h-full p-4">
                            <h1 className="text-4xl font-bold text-gray-800 font-serif hidden lg:block">
                                {product.productName}
                            </h1>
                            <h1 className="text-4xl font-bold text-gray-500">
                                {product.altNames.join(" | ")}
                            </h1>

                            <p className="text-gray-600 hidden lg:block">
                                {product.price > product.lastPrice && (
                                    <span className="text-red-500 line-through mr-2">
                                        ${product.lastPrice.toFixed(2)}
                                    </span>
                                )}
                                <span className="text-2xl font-bold text-gray-800">
                                    ${product.price.toFixed(2)}
                                </span>
                            </p>

                            <p className="text-gray-600">
                                {product.description}
                            </p>
                            <button className="bg-accent text-white px-4 py-2 rounded-lg w-max" onClick={onAddtoCartClick}>
                                Add to Cart
                            </button>
                            <button className="border mx-1 border-accent text-accent p-2 rounded-lg" onClick={onBuyNowClick}>
                                Buy Now
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}