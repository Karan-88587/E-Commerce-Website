import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Image, ImageKitProvider } from "@imagekit/react";

const ProductDetails = () => {

  const imageKitUrl = import.meta.env.VITE_APP_IMAGE_KIT_URL_ENDPOINT;
  const location = useLocation();
  const { product } = location.state || {};
  const { user } = useSelector((state) => state.auth);
  const [selectedIndex, setSelectedIndex] = useState(0); // default first image

  if (!product) return <p className="text-center mt-8">No product data available</p>;

  return (
    <div className="container mx-auto p-4 md:max-h-[500px] overflow-y-auto">
      <div className="flex flex-col bg-white rounded-lg shadow-lg p-4 md:p-6 ">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side: Image gallery */}
          <ImageKitProvider urlEndpoint={imageKitUrl}>
            <div className="flex flex-col md:flex-row w-full md:w-1/2 gap-4">
              {/* Main Image */}
              <div className="flex-1 flex justify-center items-center bg-gray-50 rounded-lg p-2">
                <Image
                  src={product.productImages[selectedIndex]}
                  alt={product.productName}
                  className="w-full max-h-[400px] md:max-h-full object-contain rounded-lg"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex md:flex-col flex-row md:mt-0 mt-2 gap-2 overflow-x-auto md:overflow-x-hidden">
                {product.productImages.map((imgUrl, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 mx-auto border-2 rounded-lg cursor-pointer transition-all duration-200 ${index === selectedIndex ? "border-blue-500" : "border-gray-300"
                      }`}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <Image
                      src={imgUrl}
                      alt={product.productName}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </ImageKitProvider>

          {/* Right side: Product info */}
          <div className="flex-1 flex flex-col justify-start gap-3 text-gray-800">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.productName}</h1>
            <p className="text-sm md:text-base text-gray-600">
              <span className="font-semibold">Brand:</span> {product.productBrand}
            </p>
            <p className="text-sm md:text-base text-gray-600">
              <span className="font-semibold">Category:</span> {product.productCategory}
            </p>
            <p className="text-sm md:text-base text-gray-700 mt-2">{product.productDescription}</p>

            <div className="mt-4 flex items-center gap-4 flex-wrap">
              <p className="text-xl md:text-2xl font-bold text-green-600">₹{product.productSalePrice}</p>
              {product.productSalePrice && (
                <div className="flex items-baseline gap-1">
                  <p className="text-lg md:text-xl font-semibold text-red-600 line-through">
                    ₹{product.productPrice}
                  </p>
                  <p className="text-sm text-gray-500">({Math.round(((product.productPrice - product.productSalePrice) / product.productPrice) * 100)}% OFF)</p>
                </div>
              )}
            </div>

            <p className="text-sm md:text-base mt-1">
              {product.productStock > 0 && <span className="font-semibold">Stock: </span>}
              {product.productStock < 10 && product.productStock > 0 && <span className="text-red-600 font-bold">Only {product.productStock} {product.productStock === 1 ? "item" : "items"} available</span>}
              {product.productStock === 0 && <span className="text-red-600 font-bold">Item is out of stock</span>}
              {product.productStock > 10 && product.productStock}
            </p>

            {user.role !== "admin" && (
              <div className="mt-4 flex sm:flex-row gap-3">
                <button className={`w-40 sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${product.productStock === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} disabled={product.productStock === 0}>
                  Buy Now
                </button>
                <button className={`w-40 sm:w-auto px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition ${product.productStock === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} disabled={product.productStock === 0}>
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Product Review Section */}
        {user.role !== "admin" && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Product Review</h2>
            <textarea className="w-full p-2 border border-gray-300 rounded-lg" rows="2" placeholder="Write your review..."></textarea>
            <button className="my-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Publish
            </button>
            {/* Add some dummy reviews */}
            <div className="space-y-4 p-2">
              <div className="border-b pb-2">
                <div className="flex justify-between items-center text-sm">
                  <p>John Doe</p>
                  <p>(4.5 / 5)</p>
                </div>
                <p className="text-gray-600">Great product! Highly recommend.</p>
              </div>
              <div className="border-b pb-2">
                <div className="flex justify-between items-center text-sm">
                  <p>Jane Smith</p>
                  <p>(4.0 / 5)</p>
                </div>
                <p className="text-gray-600">Good quality, but a bit expensive.</p>
              </div>
              <div className="border-b pb-2">
                <div className="flex justify-between items-center text-sm">
                  <p>Alice Johnson</p>
                  <p>(4.2 / 5)</p>
                </div>
                <p className="text-gray-600">Satisfied with the purchase. Will buy again.</p>
              </div>
              <div className="border-b pb-2">
                <div className="flex justify-between items-center text-sm">
                  <p>Bob Brown</p>
                  <p>(2 / 5)</p>
                </div>
                <p className="text-gray-600">Not as described. Disappointed.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;