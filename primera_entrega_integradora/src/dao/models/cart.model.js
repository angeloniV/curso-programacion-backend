import mongoose from "mongoose";

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.type.ObjectId,
                ref: 'products'
            },
            quantity: Number
        }
    ]
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
