import axios from "axios";
import { useEffect, useState } from "react";
import { deleteItem } from "../utils/cartFunction";

export default function CartCard(props) {
    const productID = props.productID;
    const qty = props.qty;

    const [product, setProduct] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productID)
                .then((res) => {
                    if (res.data != null) {
                        setProduct(res.data);
                        //console.log(res.data);
                        setLoaded(true);
                    } else {
                        deleteItem(productID);
                        window.location.reload();
                    }
                }).catch((err) => {
                    console.log(err);
                });
        }
    }, []);


    return (
        <>
            {
                !loaded ? <tr>
                    <td>Loading...</td>
                </tr> :
                    <tr className="hover:bg-accent hover:text-white">
                        <td className=""><img src={product?.images[0]} alt={product?.productName} className="w-16 h-16 object-cover rounded-lg mx-auto" /></td>
                        <td className="text-center">{product?.productName}</td>
                        <td className="text-center">{product?.productID}</td>
                        <td className="text-center">{qty}</td>
                        <td className="text-center">LKR. {product?.lastPrice.toFixed(2)}</td>
                        <td className="text-center">LKR. {(product?.lastPrice * qty).toFixed(2)}</td>
                    </tr>
            }

        </>
    )
}