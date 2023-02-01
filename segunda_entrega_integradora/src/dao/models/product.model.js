import mongoose from "mongoose";
import mongooPaginate from 'mongoose-paginate-v2'

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

productSchema.plugin(mongooPaginate);
const productModel = mongoose.model(productCollection, productSchema);

export default productModel;
