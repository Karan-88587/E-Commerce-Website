import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, ImageKitProvider } from "@imagekit/react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { useInfiniteProducts } from "../../../hooks/useInfiniteProducts"; // ✅ Import custom hook

const ProductList = ({ setOpen, setProductData, setImageFile, setIsEditingMode }) => {

  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const imageKitUrl = import.meta.env.VITE_APP_IMAGE_KIT_URL_ENDPOINT;
  const navigate = useNavigate();
  
  const { ref, inView } = useInView();

  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteProducts();

  // Trigger fetch when user scrolls to bottom
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleShowDetails = (product) => {
    navigate(`../product/${encodeURIComponent(product.productName)}/${product._id}`, { state: { product } });
  };

  const handleUpdate = (product) => {
    setOpen(true);
    setIsEditingMode(true);
    setProductData(product);
    setImageFile(product?.productImages);
  };

  const handleDelete = async (productId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this product?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        setIsDeleting(true);
        await axios.delete(`${backendUrl}/products/delete-product/${productId}`, {
          withCredentials: true,
        });

        refetch(); // ✅ refresh products
        Swal.fire("Deleted!", "Product deleted successfully", "success");
      }
    } catch (error) {
      setIsDeleting(false);
      refetch();
      Swal.fire("Error", "Error deleting product", "error");
      console.log("Error deleting product :", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading || isDeleting) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) return <p className="text-center text-red-500">Error fetching products</p>;

  return (
    <div className="relative mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:max-h-[470px] overflow-y-auto">
      {data?.pages.flatMap((page) =>
        page.data.map((product) => {
          const discount = Math.round(
            ((product.productPrice - product.productSalePrice) / product.productPrice) * 100
          );

          return (
            <Card
              key={product?._id}
              className="bg-white max-sm:max-w-80 max-sm:ms-18 shadow-md rounded-xl relative group hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <CardHeader className="p-0 relative mt-[-24px]">
                <ImageKitProvider urlEndpoint={imageKitUrl}>
                  <Image
                    src={product?.productImages[0]}
                    alt={product?.productName}
                    loading="lazy"
                    className="w-full h-52 object-cover rounded-t-xl"
                  />
                </ImageKitProvider>

                <div className="absolute top-2 right-2 hidden group-hover:flex gap-2">
                  <button
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-200 transition cursor-pointer"
                    onClick={() => handleUpdate(product)}
                  >
                    <FaEdit className="text-blue-600" />
                  </button>
                  <button
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-200 transition cursor-pointer"
                    onClick={() => handleDelete(product?._id)}
                  >
                    <FaTrash className="text-red-600" />
                  </button>
                </div>
              </CardHeader>

              <CardContent className="py-0 px-4">
                <CardTitle className="text-2xl font-bold truncate">
                  {product?.productName}
                </CardTitle>

                <div className="flex items-center gap-2 mt-2">
                  {product?.productSalePrice < product?.productPrice ? (
                    <>
                      <span className="text-gray-500 line-through">₹{product?.productPrice}</span>
                      <span className="text-green-600 font-semibold">₹{product?.productSalePrice}</span>
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded font-bold">
                        {discount}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-black font-semibold">₹{product?.productPrice}</span>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition cursor-pointer" onClick={() => handleShowDetails(product)}>
                  View Details
                </button>
              </CardFooter>
            </Card>
          );
        })
      )}

      {/* Infinite scroll trigger */}
      <div ref={ref} className="col-span-full flex justify-center py-4">
        {isFetchingNextPage ? (
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        ) : hasNextPage ? (
          <p className="text-gray-500">Scroll to load more</p>
        ) : (
          <p className="text-gray-500">No more products to load</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;