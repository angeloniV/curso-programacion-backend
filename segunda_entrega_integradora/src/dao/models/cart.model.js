import mongoose, { mongo } from "mongoose";

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'products'
                }
            }
        ],
        default: []
    }
});

mongoose.set("strictQuery", false)

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
