import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminProductsPage() {

  const [products, setProducts] = useState(
    [
      {
        "_id": "69c0098032bac3cf2b9dddce",
        "productID": "P100",
        "productName": "Hydrating Face Serum",
        "altNames": [
          "Face Serum",
          "Skin Serum",
          "Moisturizing Serum"
        ],
        "images": [
          "https://example.com/images/serum1.jpg",
          "https://example.com/images/serum2.jpg"
        ],
        "price": 4200,
        "lastPrice": 5000,
        "stock": 40,
        "description": "A lightweight hydrating face serum enriched with hyaluronic acid to keep your skin smooth, soft, and glowing.",
        "__v": 0
      },
      {
        "_id": "69c039388c41d404b54b9ba6",
        "productID": "P101",
        "productName": "Face Serum",
        "altNames": [
          "Face Serum",
          "Skin Serum",
          "Moisturizing Serum"
        ],
        "images": [
          "https://example.com/images/serum1.jpg",
          "https://example.com/images/serum2.jpg"
        ],
        "price": 4200,
        "lastPrice": 5000,
        "stock": 40,
        "description": "A lightweight hydrating face serum enriched with hyaluronic acid to keep your skin smooth, soft, and glowing.",
        "__v": 0
      },
      {
        "_id": "69c03df80087e520774b4d3c",
        "productID": "P102",
        "productName": "Vitamin C Cream",
        "altNames": [
          "Vitamin C Cream",
          "Brightening Cream",
          "Glow Cream"
        ],
        "images": [
          "https://example.com/images/cream1.jpg",
          "https://example.com/images/cream2.jpg"
        ],
        "price": 3800,
        "lastPrice": 4500,
        "stock": 25,
        "description": "A nourishing vitamin C cream that helps brighten the skin, reduce dark spots, and improve overall skin texture for a radiant look.",
        "__v": 0
      }
    ]
  )

  useEffect(
    () => {
      axios.get("http://localhost:3000/api/products")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
        }
        )
    }, []
  )

  return (
    <div className="admin-home-container">
      <h1>Admin Products Page</h1>
      {
        products.map(
          (product, index) => {
            return (
              <div key={product._id}>
                {index}
                {product.productName}
              </div>

            )
          }
        )
      }
    </div>
  );
}
