import axios from "axios";

export default function AdminProductsPage() {

   getProducts();

  return (
    <div className="admin-home-container">
      <h1>Admin Products Page</h1>
    </div>
  );
}

async function getProducts() {
  const res = await axios.get("http://localhost:3000/api/products");
  console.log(res);
}