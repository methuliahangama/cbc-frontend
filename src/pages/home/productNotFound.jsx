export default function ProductNotFound() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      
      <div className="bg-white shadow-2xl rounded-2xl p-10 flex flex-col items-center max-w-md w-full">
        
        {/* Icon */}
        <div className="text-7xl mb-6">🚫</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3 text-center">
          Product Not Found
        </h1>

        {/* Divider */}
        <div className="w-16 h-1 bg-blue-500 rounded-full mb-4"></div>

        {/* Description */}
        <p className="text-gray-600 text-center mb-6">
          We couldn’t find the product you’re looking for. 
          It might have been removed or doesn’t exist.
        </p>

        {/* Dummy Buttons (design only) */}
        <div className="flex gap-4 w-full">
          <button className="w-full py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition">
            Go Back
          </button>

          <button className="w-full py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
            Home
          </button>
        </div>

      </div>

    </div>
  );
}