const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productType: {
        type: String,
        required: true,
    },
    productCategory: {
        type: String,
        required: true,
    },
    productBrand: {
        type: String,
        required: true,
    },
    normalSizes: [
        {
            type: String,
            enum: ["sm", "md", "lg", "xl", "xxl", "4", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9",
                "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13", "13.5", "14",
                "14.5", "15", "15.5", "16", "16.5", "17", "17.5", "18", "18.5", "19",
                "19.5", "20"
            ],
        },
    ],
    kidsSizes: [
        {
            type: String,
            enum: ["0.6-2y", "3-4y", "5-6y", "7-8y", "9-10y", "11-12y", "13-14y"],
        },
    ],
    productPrice: {
        type: Number,
        required: true,
    },
    productSalePrice: {
        type: Number,
        default: function () {
            return this.productPrice; // defaults to productPrice
        },
    },
    productStock: {
        type: Number,
        required: true,
        min: 0,
    },
    productImages: [
        {
            type: String,
            required: true,
        },
    ],
    productReviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            rating: { type: Number, min: 1, max: 5 },
            comment: { type: String },
            createdAt: { type: Date, default: Date.now },
        },
    ],
},
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);