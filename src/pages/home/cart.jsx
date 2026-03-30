import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cartFunction";
import ProductCard from "../../components/productCard";
import CartCard from "../../components/cartCard";
import axios from "axios";


export default function Cart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [labeledTotal, setLabeledTotal] = useState(0);
    useEffect(() => {
        setCart(loadCart());
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
            orderedItems: loadCart()
        }).then((res) => {
            //console.log(res.data);
            setTotal(res.data.total);
            setLabeledTotal(res.data.labeledTotal);

        })
    }, []);

    function onOrderCheckOutClick() {
        const token = localStorage.getItem("token");
        if(token == null) { 
            return;
        }
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
            orderedItems: cart,
            name : "John Doe",
            address: "123 Main St, Anytown, USA",
            contactNumber: "123-456-7890"
        },
         {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((res) => {
                console.log(res.data);
            });
    }

    return (
        <div className="h-full w-full bg-gray-100 overflow-y-scroll flex flex-col justify-items-end items-end">
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Product ID</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
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
            <h1 className="text-3xl font-bold text-accent">Total: LKR. {labeledTotal.toFixed(2)}</h1>
            <h1 className="text-xl font-semibold text-gray-700">Discount: LKR. {(labeledTotal - total).toFixed(2)}</h1>
            <h1 className="text-2xl font-bold text-accent">Total with Discount: LKR. {total.toFixed(2)}</h1>
            <button className="w-[300px] bg-accent text-white px-4 py-2 rounded-lg mt-4 flex flex-col justify-end hover:bg-blue-500" onClick={onOrderCheckOutClick}>
                Checkout
            </button>
        </div>
    )
}