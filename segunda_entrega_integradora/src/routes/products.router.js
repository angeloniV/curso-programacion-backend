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
    // const products = await productModel.find().lean().exec();
    
    const limit = req.query?.limit || 10;
    const page = req.query?.page || 1;
    // const filter = req.query?.filter || '';
    const sort = req.query?.sort || 'asc'
    const category = req.query?.category;
    const status = req.query?.status;

    const search = {};
    if (category){
        search.category = category;
    }
    if (status) {
        search.status = status;
    }

    const options = {limit, page, lean: true, sort: {'price': sort}};
    const result = await productModel.paginate(search,options);

    result.prevLink = result.hasPrevPage ? `/products/list?page=${result.prevPage}` : '';
    result.nextLink = result.hasNextPage ? `/products/list?page=${result.nextPage}` : '';

    res.render('listproduct',
        {
            products: result
        })
});

// Ruta para pagina para crear productos
router.get('/create', (req, res) => {
    res.render('createproduct', {});
});

// Ruta para pagina para actualizar producto
router.get('/actualizar/:pcode', async (req, res) => {
    const code = req.params.pcode
    const product = await productModel.findOne({code: code}).lean().exec()
    res.render('actualizarproduct',
        {
            product: product
        })
});

// Ruta para pagina para mostrar producto
router.get('/ver/:pcode', async (req, res) => {
    const code = req.params.pcode
    const product = await productModel.findOne({code: code}).lean().exec()
    res.render('showproduct',
        {
            product: product
        })
});

// Ruta para pagina para mostrar producto y eliminarlo
router.get('/eliminar/:pcode', async (req, res) => {
    const code = req.params.pcode
    const product = await productModel.findOne({code: code}).lean().exec()
    res.render('deleteproduct',
        {
            product: product
        })
});

export default router;
