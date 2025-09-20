import React from "react";
import { IoMdClose } from "react-icons/io";

const ProductDetails = ({ productData, setShowProductDetails }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      {/* Modal box */}
      <div className="relative w-[80%] max-w-3xl max-h-[80vh] bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 top-0 bg-white z-10">
          <h1 className="text-xl font-bold">Product Details</h1>
          <IoMdClose
            className="cursor-pointer text-2xl text-black/50 hover:text-black"
            onClick={() => setShowProductDetails(false)}
          />
        </div>

        <div className="border-b border-gray-300 mb-4"></div>

        {/* Product info */}
        <div className="text-gray-700 space-y-2">
          <p><span className="font-semibold">Name:</span> {productData?.productName}</p>
          <p><span className="font-semibold">Brand:</span> {productData?.productBrand}</p>
          <p><span className="font-semibold">Category:</span> {productData?.productCategory}</p>
          <p><span className="font-semibold">Description:</span> {productData?.productDescription}</p>
          <p><span className="font-semibold">Price:</span> ₹{productData?.productPrice}</p>
          <p><span className="font-semibold">Sale Price:</span> ₹{productData?.productSalePrice}</p>
          <p><span className="font-semibold">Stock:</span> {productData?.productStock}</p>
        </div>
        <div className="text-gray-700 space-y-2">
          <p><span className="font-semibold">Name:</span> {productData?.productName}</p>
          <p><span className="font-semibold">Brand:</span> {productData?.productBrand}</p>
          <p><span className="font-semibold">Category:</span> {productData?.productCategory}</p>
          <p><span className="font-semibold">Description:</span> {productData?.productDescription}</p>
          <p><span className="font-semibold">Price:</span> ₹{productData?.productPrice}</p>
          <p><span className="font-semibold">Sale Price:</span> ₹{productData?.productSalePrice}</p>
          <p><span className="font-semibold">Stock:</span> {productData?.productStock}</p>
        </div>
        <div className="text-gray-700 space-y-2">
          <p><span className="font-semibold">Name:</span> {productData?.productName}</p>
          <p><span className="font-semibold">Brand:</span> {productData?.productBrand}</p>
          <p><span className="font-semibold">Category:</span> {productData?.productCategory}</p>
          <p><span className="font-semibold">Description:</span> {productData?.productDescription}</p>
          <p><span className="font-semibold">Price:</span> ₹{productData?.productPrice}</p>
          <p><span className="font-semibold">Sale Price:</span> ₹{productData?.productSalePrice}</p>
          <p><span className="font-semibold">Stock:</span> {productData?.productStock}</p>
        </div>
        <div className="text-gray-700 space-y-2">
          <p><span className="font-semibold">Name:</span> {productData?.productName}</p>
          <p><span className="font-semibold">Brand:</span> {productData?.productBrand}</p>
          <p><span className="font-semibold">Category:</span> {productData?.productCategory}</p>
          <p><span className="font-semibold">Description:</span> {productData?.productDescription}</p>
          <p><span className="font-semibold">Price:</span> ₹{productData?.productPrice}</p>
          <p><span className="font-semibold">Sale Price:</span> ₹{productData?.productSalePrice}</p>
          <p><span className="font-semibold">Stock:</span> {productData?.productStock}</p>
        </div>
        <div className="text-gray-700 space-y-2">
          <p><span className="font-semibold">Name:</span> {productData?.productName}</p>
          <p><span className="font-semibold">Brand:</span> {productData?.productBrand}</p>
          <p><span className="font-semibold">Category:</span> {productData?.productCategory}</p>
          <p><span className="font-semibold">Description:</span> {productData?.productDescription}</p>
          <p><span className="font-semibold">Price:</span> ₹{productData?.productPrice}</p>
          <p><span className="font-semibold">Sale Price:</span> ₹{productData?.productSalePrice}</p>
          <p><span className="font-semibold">Stock:</span> {productData?.productStock}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;