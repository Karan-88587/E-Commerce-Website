import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import AddProduct from '@/components/adminView/AddProduct';
import ProductList from '@/components/adminView/ProductList';

const Products = () => {

    const [open, setOpen] = useState(false);
    const [imageFile, setImageFile] = useState([]);
    const [isEditingMode, setIsEditingMode] = useState(false);
    const [productData, setProductData] = useState({
        productName: "",
        productDescription: "",
        productType: "",
        productCategory: "",
        productBrand: "",
        normalSizes: [],
        kidsSizes: [],
        productPrice: "",
        productSalePrice: "",
        productStock: "",
    });

    return (
        <>
            <div className='w-full flex justify-end'>
                <Button className='p-2 bg-orange-400 text-white shadow-xs hover:bg-orange-500 cursor-pointer font-bold' onClick={() => setOpen(true)}>
                    <span className='mr-0.8'>+</span>
                    Add New Product
                </Button>
            </div>

            <AddProduct
                open={open}
                setOpen={setOpen}
                productData={productData}
                setProductData={setProductData}
                imageFile={imageFile}
                setImageFile={setImageFile}
                isEditingMode={isEditingMode}
                setIsEditingMode={setIsEditingMode}
            />

            <ProductList
                setOpen={setOpen}
                productData={productData}
                setProductData={setProductData}
                setImageFile={setImageFile}
                setIsEditingMode={setIsEditingMode}
            />
        </>
    );
}

export default Products;