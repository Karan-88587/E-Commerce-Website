const { uploadImageToCloudinary, deleteImageFromCloudinary } = require("../config/clodinary");
const UserModel = require("../models/UserModel");
const ProductModel = require("../models/ProductModel");
const sharp = require("sharp");

// Create a new product with images
exports.addProduct = async (req, res) => {
    try {
        const {
            productName,
            productDescription,
            productType,
            productCategory,
            productBrand,
            normalSizes,
            kidsSizes,
            productPrice,
            productSalePrice,
            productStock
        } = req.body;

        const userId = req.user._id;
        const files = req.files;

        // console.log("Product data :", req.body);
        // console.log("Product files :", req.files);

        const user = await UserModel.findById(userId);

        if (user.role !== "admin") {
            return res.status(401).json({
                result: false,
                message: "You are not authorized to add a product",
            });
        }

        // Upload images to Cloudinary and store their URLs
        let imageUrls = [];
        if (files && files.length > 0) {
            const uploadPromises = files.map(async (file) => {
                // Convert buffer to webp using sharp
                const webpBuffer = await sharp(file.buffer)
                    // .resize(1000) // optional: resize max width to 1000px for optimization
                    .webp({ quality: 80 }) // quality: 0-100 (80 is a good balance)
                    .toBuffer();

                // Convert optimized buffer to base64 for Cloudinary upload
                const base64 = webpBuffer.toString("base64");
                const image = `data:image/webp;base64,${base64}`;

                // Upload to Cloudinary
                const result = await uploadImageToCloudinary(image);
                return result.secure_url || result.url;
            });

            imageUrls = await Promise.all(uploadPromises);
        } else {
            return res.status(400).json({
                result: false,
                message: "Please upload at least one product image.",
            });
        }

        // console.log("Image URLs :", imageUrls);

        const product = await ProductModel.create({
            productName,
            productDescription,
            productType,
            productCategory,
            productBrand,
            normalSizes: Array.isArray(normalSizes) ? normalSizes : JSON.parse(normalSizes || "[]"),
            kidsSizes: Array.isArray(kidsSizes) ? kidsSizes : JSON.parse(kidsSizes || "[]"),
            productPrice: Number(productPrice),
            productSalePrice: Number(productSalePrice) || Number(productPrice),  // fallback if sale price missing
            productStock: Number(productStock),
            productImages: imageUrls,  // Save image URLs array
        });

        return res.status(200).json({
            result: true,
            message: "Product added successfully",
            data: product
        });

    } catch (error) {
        console.log("Error adding product :", error);
        return res.status(500).json({
            result: false,
            message: "Error adding product",
            error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
        });
    }
};

// Fettching all the products
exports.getAllProducts = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const skip = (page - 1) * limit;

        const products = await ProductModel.find({}).skip(skip).limit(limit).sort({ createdAt: -1 });

        return res.status(200).json({
            result: true,
            message: "Products fetched successfully",
            data: products
        });

    } catch (error) {
        return res.status(500).json({
            result: false,
            message: "Error fetching products",
            error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
        });
    }
};

// Fetching a single product
exports.getProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await ProductModel.findById(productId);

        return res.status(200).json({
            result: true,
            message: "Product fetched successfully",
            data: product
        });

    } catch (error) {
        return res.status(500).json({
            result: false,
            message: "Error fetching product",
            error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
        });
    }
};

// Updating a product
exports.updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const {
            productName,
            productDescription,
            productType,
            productCategory,
            productBrand,
            normalSizes,
            kidsSizes,
            productPrice,
            productSalePrice,
            productStock
        } = req.body;
        const { _id } = req.user;

        const user = await UserModel.findById(_id);
        if (user && user.role !== "admin") {
            return res.status(401).json({
                result: false,
                message: "You are not authorized to update this product",
            });
        }

        const product = await ProductModel.findByIdAndUpdate(productId, {
            productName,
            productDescription,
            productType,
            productCategory,
            productBrand,
            normalSizes,
            kidsSizes,
            productPrice,
            productSalePrice: productSalePrice || productPrice,
            productStock
        },
            { new: true }
        );
        return res.status(200).json({
            result: true,
            message: "Product updated successfully",
            data: product
        });

    } catch (error) {
        return res.status(500).json({
            result: false,
            message: "Error updating product",
            error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
        });
    }
};

// Deleting a product
exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { _id } = req.user;

        const user = await UserModel.findById(_id);
        if (user && user.role !== "admin") {
            return res.status(401).json({
                result: false,
                message: "You are not authorized to delete this product",
            });
        }

        // Deleting image from Cloudinary before deleting product
        const deleteProductImage = await ProductModel.findById(productId);
        if (deleteProductImage.productImages && deleteProductImage.productImages.length > 0) {
            for (const imageUrl of deleteProductImage.productImages) {
                await deleteImageFromCloudinary(imageUrl);
            }
        }

        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        return res.status(200).json({
            result: true,
            message: "Product deleted successfully",
            data: deletedProduct
        });

    } catch (error) {
        return res.status(500).json({
            result: false,
            message: "Error deleting product",
            error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
        });
    }
};