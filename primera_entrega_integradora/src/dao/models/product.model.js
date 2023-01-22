import mongoose from "mongoose";

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnails: String,
    code: String,
    stock: Number,
    category: String,
    status: String
});

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;
