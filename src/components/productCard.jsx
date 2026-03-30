import { Link } from "react-router-dom";

export default function ProductCard(props) {

    console.log(props);
    
    return (
       <Link to={`/productInfo/${props.product.productID}`} >
        <div className="w-[300px] h-[400px] m-[50px] rounded-xl shadow-lg shadow-gray-500 hover:shadow-primary hover:border-gray-500 hover:border-[3px] transition-shadow duration-300 flex flex-col items-center gap-4 p-4 justify-center">
            <img src={props.product.images[0]} alt="Product Image" className="w-full h-[65%] object-cover rounded-md overflow-hidden flex flex-col" />
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-semibold text-center">{props.product.productName}</h2>
                <h3>{props.product.productID}</h3>
                <p className="font-semibold text-left text-xl">LKR.{props.product.price.toFixed(2)}</p>
                {
                    (props.product.lastPrice > props.product.price) &&
                    <p className="font-semibold text-left text-xl text-gray-500">You save LKR.{(props.product.lastPrice - props.product.price).toFixed(2)}</p>
                }
                <p className="font-semibold text-left text-lg text-gray-600 line-through">LKR.{props.product.lastPrice.toFixed(2)}</p>
                <p className="text-gray-600">{props.product.description}</p>
                
            </div>
        </div>
       </Link>
    )
}