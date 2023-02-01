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

// cartSchema.pre('findOne', function(){
//     this.populate('products._id');
// });

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
