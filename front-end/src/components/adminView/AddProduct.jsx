import React, { useState } from 'react';
import { Loader2Icon } from "lucide-react"
import axios from "axios";
import Swal from 'sweetalert2';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReactSelect from "react-select"; // 👈 renamed here
import ImageUpload from './ImageUpload';
import { useInfiniteProducts } from "../../../hooks/useInfiniteProducts"; // ✅ Import custom hook

const AddProduct = ({
    open,
    setOpen,
    productData,
    setProductData,
    imageFile,
    setImageFile,
    isEditingMode,
    setIsEditingMode
}) => {

    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

    const { refetch } = useInfiniteProducts();

    let normalSizes = ["sm", "md", "lg", "xl", "xxl"];
    const kidsSizes = ["0.6-2y", "3-4y", "5-6y", "7-8y", "9-10y", "11-12y", "13-14y"];

    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageFile || imageFile.length === 0) {
            setError({ ...error, image: "Image is required" });
            return;
        }

        if (productData.productName === "") {
            setError({ ...error, productName: "Product Name is required" });
            return;
        }

        if (productData.productDescription === "") {
            setError({ ...error, productDescription: "Product Description is required" });
            return;
        }

        if (productData.productType === "") {
            setError({ ...error, productType: "Product Type is required" });
            return;
        }

        if (productData.productCategory === "") {
            setError({ ...error, productCategory: "Product Category is required" });
            return;
        }

        if (productData.productBrand === "") {
            setError({ ...error, productBrand: "Product Brand is required" });
            return;
        }

        if ((productData.productCategory === "Men" || productData.productCategory === "Women") && productData.normalSizes.length === 0) {
            setError({ ...error, productSize: "Product Size is required" });
            return;
        }

        if (productData.productCategory === "Kids" && productData.kidsSizes.length === 0) {
            setError({ ...error, productSize: "Product Size is required" });
            return;
        }

        if (productData.productPrice === "") {
            setError({ ...error, productPrice: "Product Price is required" });
            return;
        }

        if (productData.productSalePrice && Number(productData.productSalePrice) > Number(productData.productPrice)) {
            setError({ ...error, productSalePrice: "Sale Price must be less than or equal to Product Price" });
            return;
        }

        if (productData.productStock === "") {
            setError({ ...error, productStock: "Product Stock is required" });
            return;
        }

        // Validate fields (as you have)

        const formData = new FormData();
        formData.append("productName", productData.productName);
        formData.append("productDescription", productData.productDescription);
        formData.append("productType", productData.productType);
        formData.append("productCategory", productData.productCategory);
        formData.append("productBrand", productData.productBrand);
        formData.append("normalSizes", JSON.stringify(productData.normalSizes || []));
        formData.append("kidsSizes", JSON.stringify(productData.kidsSizes || []));
        formData.append("productPrice", productData.productPrice);
        formData.append("productSalePrice", productData.productSalePrice || productData.productPrice);
        formData.append("productStock", productData.productStock);

        // Append images (multiple)
        imageFile.forEach((file) => {
            formData.append("images", file);  // 'images' must match backend multer.array('images')
        });

        let res;
        try {
            setIsLoading(true);
            if (!isEditingMode) {
                res = await axios.post(`${backendUrl}/products/create-product`, formData, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            } else {
                res = await axios.put(`${backendUrl}/products/update-product/${productData._id}`, productData, {
                    withCredentials: true
                });
            }
            Swal.fire("Success", !isEditingMode ? "Product added successfully" : "Product updated successfully", "success");
            refetch();
            setOpen(false);
            setImageFile([]);
            setProductData({});
            setError({});
        } catch {
            setIsLoading(false);
            console.log(`Error ${!isEditingMode ? "adding" : "updating"} product : `, error);
            Swal.fire("Error", !isEditingMode ? "Error adding a product" : "Error updating a product", "error");
        } finally {
            setIsLoading(false);
        }
    };

    if ((productData?.productCategory === "Men" || productData?.productCategory === "Women") && productData?.productType === "Shoes") {
        normalSizes = [];
        normalSizes.push("4", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9",
            "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13", "13.5", "14",
            "14.5", "15", "15.5", "16", "16.5", "17", "17.5", "18", "18.5", "19",
            "19.5", "20"
        );
    }

    return (
        <Sheet
            open={open}
            onOpenChange={() => {
                setOpen(false);
                setIsEditingMode(false);
                setError({});
                setImageFile([]);
                setProductData({});
            }}
        >
            <SheetContent side='right' className='overflow-auto'>
                <SheetHeader>
                    <SheetTitle className='text-xl'>
                        {isEditingMode ? "Edit Product" : "Add New Product"}
                    </SheetTitle>
                </SheetHeader>


                <div className='ms-5 flex flex-col gap-2'>

                    <ImageUpload imageFile={imageFile} setImageFile={setImageFile} error={error} setError={setError} isEditingMode={isEditingMode} />
                    {error.image && <span className='text-red-600'>{error.image}</span>}

                    <div>
                        <Label className='text-sm mb-1'>Product Name : <span className='text-red-600'>*</span></Label>
                        <Input className='border border-gray-300 w-80' placeholder='Product Name' value={productData.productName}
                            onChange={(e) => {
                                setProductData({ ...productData, productName: e.target.value });
                                setError({ ...error, productName: "" });
                            }}
                        />
                        {error.productName && <span className='text-red-600'>{error.productName}</span>}
                    </div>

                    <div className='mt-2'>
                        <Label className='text-sm mb-1'>Product Description : <span className='text-red-600'>*</span></Label>
                        <Textarea className='border border-gray-300 w-80' placeholder="Product Description"
                            value={productData.productDescription} onChange={(e) => {
                                setProductData({ ...productData, productDescription: e.target.value });
                                setError({ ...error, productDescription: "" });
                            }}
                        />
                        {error.productDescription && <span className='text-red-600'>{error.productDescription}</span>}
                    </div>

                    <div className='mt-2'>
                        <Label className='text-sm mb-1'>Select Type : <span className='text-red-600'>*</span></Label>
                        <Select value={productData.productType} onValueChange={(value) => {
                            setProductData({ ...productData, productType: value });
                            setError({ ...error, productType: "" });  // ✅ Clear error properly
                        }}
                        >
                            <SelectTrigger className="w-80">
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Type</SelectLabel>
                                    <SelectItem value="Clothes">Clothes</SelectItem>
                                    <SelectItem value="Shoes">Shoes</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {error.productType && <span className='text-red-600'>{error.productType}</span>}
                    </div>

                    <div className='mt-2'>
                        <Label className='text-sm mb-1'>Select Category : <span className='text-red-600'>*</span></Label>
                        <Select value={productData.productCategory} onValueChange={(value) => {
                            setProductData({ ...productData, productCategory: value });
                            setError({ ...error, productCategory: "" });  // ✅ Clear error properly
                        }}
                        >
                            <SelectTrigger className="w-80">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Category</SelectLabel>
                                    <SelectItem value="Men">Men</SelectItem>
                                    <SelectItem value="Women">Women</SelectItem>
                                    <SelectItem value="Kids">Kids</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {error.productCategory && <span className='text-red-600'>{error.productCategory}</span>}
                    </div>

                    <div className='mt-2'>
                        <Label className='text-sm mb-1'>Select Brand : <span className='text-red-600'>*</span></Label>
                        <Select
                            value={productData.productBrand}
                            onValueChange={(value) => {
                                setProductData({ ...productData, productBrand: value });
                                setError({ ...error, productBrand: "" });  // ✅ Clear error properly
                            }}
                        >
                            <SelectTrigger className="w-80">
                                <SelectValue placeholder="Select Brand" />
                            </SelectTrigger>
                            {productData.productType === "Clothes" ? (
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select Brand</SelectLabel>
                                        <SelectItem value="Adidas">Adidas</SelectItem>
                                        <SelectItem value="Biba">Biba</SelectItem>
                                        <SelectItem value="Manyavar">Manyavar</SelectItem>
                                        <SelectItem value="Nike">Nike</SelectItem>
                                        <SelectItem value="Pantaloons">Pantaloons</SelectItem>
                                        <SelectItem value="Puma">Puma</SelectItem>
                                        <SelectItem value="Raymond">Raymond</SelectItem>
                                        <SelectItem value="Zara">Zara</SelectItem>
                                        <SelectItem value="Zudio">Zudio</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            ) : (
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select Brand</SelectLabel>
                                        <SelectItem value="Adidas">Adidas</SelectItem>
                                        <SelectItem value="Bata">Bata</SelectItem>
                                        <SelectItem value="Campus">Campus</SelectItem>
                                        <SelectItem value="Nike">Nike</SelectItem>
                                        <SelectItem value="Puma">Puma</SelectItem>
                                        <SelectItem value="Reebok">Reebok</SelectItem>
                                        <SelectItem value="Sparx">Sparx</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            )}
                        </Select>
                        {error.productBrand && <span className='text-red-600'>{error.productBrand}</span>}
                    </div>

                    <div className="mt-2">
                        <Label className="text-sm mb-1">
                            Select Size : <span className="text-red-600">*</span>
                        </Label>

                        {productData.productCategory === "Kids" ? (
                            <ReactSelect
                                className='w-80'
                                isMulti
                                closeMenuOnSelect={false}
                                options={kidsSizes?.map((size) => ({ value: size, label: size }))}
                                value={productData?.kidsSizes?.map((size) => ({ value: size, label: size }))}
                                onChange={(selected) =>
                                    setProductData({
                                        ...productData,
                                        kidsSizes: selected.map((s) => s.value),
                                    })
                                }
                            />
                        ) : (
                            <ReactSelect
                                className='w-80'
                                isMulti
                                closeMenuOnSelect={false}
                                options={normalSizes?.map((size) => ({ value: size, label: size }))}
                                value={productData?.normalSizes?.map((size) => ({ value: size, label: size }))}
                                onChange={(selected) =>
                                    setProductData({
                                        ...productData,
                                        normalSizes: selected.map((s) => s.value),
                                    })
                                }
                            />
                        )}

                        {error.productSize && <span className="text-red-600">{error.productSize}</span>}
                    </div>

                    <div className='mt-2'>
                        <Label className='text-sm mb-1'>Enter Price : <span className='text-red-600'>*</span></Label>
                        <Input type='number' className='border border-gray-300 w-80' placeholder='Enter Price' value={productData.productPrice}
                            onChange={(e) => {
                                setProductData({ ...productData, productPrice: e.target.value });
                                setError({ ...error, productPrice: "" });
                            }}
                        />
                        {error.productPrice && <span className='text-red-600'>{error.productPrice}</span>}
                    </div>

                    <div className='mt-2'>
                        <Label className='text-sm mb-1'>Sale Price :</Label>
                        <Input type='number' className='border border-gray-300 w-80' placeholder='Enter Sell Price'
                            value={productData.productSalePrice}
                            onChange={(e) => {
                                setProductData({ ...productData, productSalePrice: e.target.value });
                                setError({ ...error, productSalePrice: "" });
                            }}
                        />
                        {error.productSalePrice && <span className='text-red-600'>{error.productSalePrice}</span>}
                    </div>

                    <div className='mt-2'>
                        <Label className='text-sm mb-1'>Total Stock : <span className='text-red-600'>*</span></Label>
                        <Input type='number' className='border border-gray-300 w-80' placeholder='Enter Available Stock'
                            value={productData.productStock} onChange={(e) => {
                                setProductData({ ...productData, productStock: e.target.value });
                                setError({ ...error, productStock: "" });
                            }}
                        />
                        {error.productStock && <span className='text-red-600'>{error.productStock}</span>}
                    </div>
                </div>

                <SheetFooter className='flex flex-row'>
                    {!isLoading ? (
                        <Button className='cursor-pointer w-82 bg-green-700 text-white font-bold hover:bg-green-600 hover:text-white' onClick={handleSubmit}>
                            {isEditingMode ? "Update" : "Submit"}
                        </Button>
                    ) : (
                        <Button disabled className='cursor-pointer w-82 bg-green-700 text-white font-bold hover:text-white'>
                            <Loader2Icon className="animate-spin" />
                            Please wait
                        </Button>
                    )}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default AddProduct;