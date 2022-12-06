const fs = require('fs');

// Product Manager

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
        this.createProducManagerFile();
    }

    createProducManagerFile() {
        fs.writeFileSync(this.path, JSON.stringify({ 'products': this.products })); // creo archivo con lista de productos vacio
    }

    refreshProductInProductManagerFile = async (products) => {
        fs.promises.writeFile(this.path, JSON.stringify({ 'products': products }));
    }

    readProductManagerFile = async () => {
        return fs.promises.readFile(this.path, 'utf-8');
    }

    getProductManagerJSONFromFile = async () => {
        const productManagerFile = await this.readProductManagerFile(); // leo el archivo del product manager
        productManagerFile.then(contenido => JSON.parse(contenido))
            .catch(e => { if (e) return [] })
    }

    getNextId = async () => {
        const productManagerJSON = this.getProductManagerJSONFromFile();
        const count = productManagerJSON.products.length; // obtengo la propiedad product del objeto JSON y me fijo su longitud
        return (count > 0) ? productManagerJSON.products[count - 1].id + 1 : 1; // calculo proximo id
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        const id = await this.getNextId();
        if (!this.existsProductByCode(code) && this.validateField(title, description, price, thumbnail, code, stock)) {
            const product = {
                id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            const productManagerJSON = await this.getProductManagerJSONFromFile();
            productManagerJSON.products.push(product);
            await this.refreshProductInProductManagerFile(productManagerJSON.products);
        } else {
            return "El codigo ya existe o falta valor en campo";
        }
    }

    deleteProductByCode = async (code) => {
        if (this.existsProductByCode(code)) {
            const productManagerJSON = this.getProductManagerJSONFromFile();
            this.refreshProductInProductManagerFile(productManagerJSON.products.filter(product => product.code != code));
        } else {
            return 'No existe el producto'
        }
    }

    deleteProductById = async (id) => {
        if (this.existsProductById(id)) {
            const productManagerJSON = await this.getProductManagerJSONFromFile();
            const productsFiltered = productManagerJSON.products.filter(product => product.id !== id);
            this.refreshProductInProductManagerFile(productsFiltered);
        } else {
            return 'No existe el archivo'
        }
    }

    getProducts = async () => {
        const productManagerJSON = await this.getProductManagerJSONFromFile();
        productManagerJSON.then(contenido => JSON.parse(contenido))
            .catch(e => { if (e) return [] })
    }

    getProductById = async (id) => {
        const productManagerJSON = await this.getProductManagerJSONFromFile();
        const product = productManagerJSON.products.find(product => product.id == id);
        if (product) {
            return product;
        }
        return "Not found";
    }

    existsProductByCode = async (code) => {
        const productManagerJSON = await this.getProductManagerJSONFromFile();
        const product = productManagerJSON.products.find(product => product.code == code);
        if (product) {
            return true;
        }
        return false;
    }


    existsProductById = async (id) => {
        const productManagerJSON = await this.getProductManagerJSONFromFile();
        const product = productManagerJSON.products.find(product => product.id == id);
        if (product) {
            return true;
        }
        return false;
    }

    validateField = (title, description, price, thumbnail, code, stock) => {
        return title != null && description != null && price != null && thumbnail != null && code != null
            && stock != null;
    }

    updateProduct = async (id, title, description, price, thumbnail, code, stock) => {
        await this.deleteProductById(id);
        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        const productManagerJSON = await this.getProductManagerJSONFromFile();
        productManagerJSON.products.push(product);
        await this.refreshProductInProductManagerFile(productManagerJSON.products);
    }
}


// Proceso testing
// Se creará una instancia de la clase “ProductManager”
const productManager = new ProductManager('./product_manager.json');

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(await productManager.getProducts());

// Se llamará al método “addProduct” 
await productManager.addProduct("Producto prueba", "Este es un producto prueba",
    200, "Sin imagen", "abc123", 25);
await productManager.addProduct("Producto prueba 2", "Este es un producto prueba 2",
    300, "Sin imagen 2", "abc1234", 50);
await productManager.addProduct("Producto prueba 3", "Este es un producto prueba 3",
    300, "Sin imagen 3", "abc12345", 50);
await productManager.addProduct("Producto prueba 4", "Este es un producto prueba 4",
    300, "Sin imagen 3", "abc123456", 50);
await productManager.addProduct("Producto prueba 5", "Este es un producto prueba 5",
    300, "Sin imagen 3", "abc1234567", 50);
await productManager.addProduct("Producto prueba 6", "Este es un producto prueba 6",
    300, "Sin imagen 3", "abc12345678", 50);
await productManager.addProduct("Producto prueba 7", "Este es un producto prueba 7",
    300, "Sin imagen 3", "abc123456789", 50);
await productManager.addProduct("Producto prueba 8", "Este es un producto prueba 8",
    300, "Sin imagen 3", "abc1234A", 50);
await productManager.addProduct("Producto prueba 9", "Este es un producto prueba 9",
    300, "Sin imagen 3", "abc1234B", 50);
await productManager.addProduct("Producto prueba 10", "Este es un producto prueba 10",
    300, "Sin imatusgen 3", "abc1234C", 50);
