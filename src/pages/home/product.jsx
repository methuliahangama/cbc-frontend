import { useEffect, useState } from "react";
import toast from "react-hot-toast/headless";
import axios from "axios";
import ProductCard from "../../components/productCard";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState("loading");
    useEffect(
        () => {
            if (loadingStatus === "loading") {
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
                    .then(
                        (res) => {
                            console.log(res.data);
                            setProducts(res.data);
                            setLoadingStatus("loaded");
                        }
                    ).catch(
                        (err) =>
                            toast.error("Failed to load products")
                    )
            }

        }, []);
    return (
        <div className="w-full h-full overflow-y-scroll flex flex-wrap justify-center">
            {
                products.map(
                    (product) =>
                        <ProductCard product={product} />

                )

            }
        </div>
    );
}