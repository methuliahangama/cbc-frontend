import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductNotFound from "./productNotFound";
import ImageSlider from "../../components/imageSlider";

export default function ProductOverview() {

    const params = useParams();
    const productId = params.id;
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");

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
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-[35%] h-full">
                            <ImageSlider images={product.images} />
                        </div>
                        <div className="w-[65%] h-full flex flex-col justify-start gap-5 px-10">
                            <h1 className="text-4xl font-bold text-gray-800 font-serif">
                                {product.productName}
                            </h1>
                            <h1 className="text-4xl font-bold text-gray-500">
                                {product.altNames.join(" | ")}
                            </h1>
                            <p className="text-gray-600">
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

                        </div>

                    </div>
                )
            }
        </div>
    );
}