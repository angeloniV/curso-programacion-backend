import {Router} from 'express'
import cartModel from '../dao/models/cart.model.js';

const router = Router();

router.get("/", async (req, res) => {
    const carts = await cartModel.find().lean().exec();
    res.json({ carts });
});

router.get('/:cid', async (req, res) => {
    const id = req.params.cid;
    const cart = await cartModel.findOne({_id: id});
    res.render('showcart',
    {
        cartId : cart._id,
        products: cart.products
    })
})


router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity= req.body.quantity || 1;
    const cart = await cartModel.findById(cartId);
    
    let found = false
    for (let i = 0; i < cart.products.length; i++) {
      //  console.log(cart.products[i]._id); // new ObjectId("63cd88b0d1ccdfa5f8035c66")
      //  console.log(productId); // 63cd88b0d1ccdfa5f8035c66
      //  por que esa diferencia?
        if (cart.products[i]._id == productId) {
            cart.products[i].quantity++;
            found = true;
            break;
        }
    }
    if (found == false) {
        cart.products.push({ _id: productId, quantity});
    }

    await cart.save();

    res.redirect(`/carts/${cart._id}`);
})

export default router;
