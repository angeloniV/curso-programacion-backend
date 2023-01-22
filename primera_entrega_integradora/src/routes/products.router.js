import { Router } from 'express'
import productModel from '../dao/models/product.model.js';

const router = Router()
/*
router.get('/api/:pid', async (req, res) => {
    const id = req.params.pid
    const product = await manager.getProductById(id)
    res.send({ product })
})
*/

router.post('/api/', async (req, res) => {
    const productoNuevo = req.body;
    const productoGenerado = new productModel(productoNuevo);
    await productoGenerado.save()
    res.redirect('/products/list');
});

router.put('/api/:pcode', async (req, res) => {
    const code = req.params.pcode;
    const productToReplace = req.body;
    await productModel.updateOne({code: code}, productToReplace);
    res.redirect('/products/list');
});

router.delete('/api/:pcode', async (req, res) => {
    const code = req.params.pcode;
    await productModel.deleteOne({code: code});
    res.redirect('/products/list')
});

// Ruta para pagina para enlistar productos
router.get('/list', async (req, res) => {
    const products = await productModel.find().lean().exec();
    res.render('listproduct',
        {
            products: products
        })
});

// Ruta para pagina para crear productos
router.get('/create', (req, res) => {
    res.render('createproduct', {});
});

// Ruta pra pagina para actualizar poducto
router.get('/actualizar/:pcode', async (req, res) => {
    const code = req.params.pcode
    const product = await productModel.findOne({code: code}).lean().exec()
    res.render('actualizarproduct',
        {
            product: product
        })
});

// Ruta pra pagina para mostrar poducto
router.get('/ver/:pcode', async (req, res) => {
    const code = req.params.pcode
    const product = await productModel.findOne({code: code}).lean().exec()
    res.render('showproduct',
        {
            product: product
        })
});

// Ruta pra pagina para mostrar poducto y eliminarlo
router.get('/eliminar/:pcode', async (req, res) => {
    const code = req.params.pcode
    const product = await productModel.findOne({code: code}).lean().exec()
    res.render('deleteproduct',
        {
            product: product
        })
});

export default router;
