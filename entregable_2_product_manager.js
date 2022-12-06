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

    refreshProductInProductManagerFile = (products) => {
        fs.writeFileSync(this.path, JSON.stringify({ 'products': products }));
    }

    readProductManagerFile() {
        return fs.readFileSync(this.path, 'utf-8');
    }

    getProductManagerJSONFromFile() {
        const productManagerFile = this.readProductManagerFile(); // leo el archivo del product manager
        return JSON.parse(productManagerFile); // lo convierto a objeto JSON
    }

    getNextId = () => {
        const productManagerJSON = this.getProductManagerJSONFromFile();
        const count = productManagerJSON.products.length; // obtengo la propiedad product del objeto JSON y me fijo su longitud
        return (count > 0) ? productManagerJSON.products[count - 1].id + 1 : 1; // calculo proximo id
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const id = this.getNextId();
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
            const productManagerJSON = this.getProductManagerJSONFromFile();
            productManagerJSON.products.push(product);
            this.refreshProductInProductManagerFile(productManagerJSON.products);
        } else {
            return "El codigo ya existe o falta valor en campo";
        }
    }

    deleteProductByCode = (code) => {
        if (this.existsProductByCode(code)) {
            const productManagerJSON = this.getProductManagerJSONFromFile();
            this.refreshProductInProductManagerFile(productManagerJSON.products.filter(product => product.code != code));
        } else {
            return 'No existe el producto'
        }
    }

    deleteProductById = (id) => {
        if (this.existsProductById(id)) {
            const productManagerJSON = this.getProductManagerJSONFromFile();
            const productsFiltered = productManagerJSON.products.filter(product => product.id !== id);
            this.refreshProductInProductManagerFile(productsFiltered);
        } else {
            return 'No existe el archivo'
        }
    }

    getProducts = () => {
        const productManagerJSON = this.getProductManagerJSONFromFile();
        return productManagerJSON.products;
    }

    getProductById = (id) => {
        const productManagerJSON = this.getProductManagerJSONFromFile();
        const product = productManagerJSON.products.find(product => product.id == id);
        if (product) {
            return product;
        }
        return "Not found";
    }

    existsProductByCode = (code) => {
        const productManagerJSON = this.getProductManagerJSONFromFile();
        const product = productManagerJSON.products.find(product => product.code == code);
        if (product) {
            return true;
        }
        return false;
    }


    existsProductById = (id) => {
        const productManagerJSON = this.getProductManagerJSONFromFile();
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

    updateProduct = (id, title, description, price, thumbnail, code, stock) => {
        this.deleteProductById(id);
        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        const productManagerJSON = this.getProductManagerJSONFromFile();
        productManagerJSON.products.push(product);
        this.refreshProductInProductManagerFile(productManagerJSON.products);
    }
}


// Proceso testing
// Se creará una instancia de la clase “ProductManager”
const productManager = new ProductManager('./product_manager.json');

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(productManager.getProducts());

// Se llamará al método “addProduct” 
productManager.addProduct("Producto prueba", "Este es un producto prueba",
    200, "Sin imagen", "abc123", 25);
productManager.addProduct("Producto prueba 2", "Este es un producto prueba 2",
    300, "Sin imagen 2", "abc1234", 50);
productManager.addProduct("Producto prueba 3", "Este es un producto prueba 3",
    300, "Sin imagen 3", "abc12345", 50);

//Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(productManager.getProducts());

//Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, 
//en caso de no existir, debe arrojar un error.
console.log(productManager.getProductById(1));

console.log(productManager.getProductById(4)); // Error ya que no existe producto con ese id.

// Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto,
//se evaluará que no se elimine el id y que sí se haya hecho la actualización.
productManager.updateProduct(1, "Producto prueba actualizaado", "Este es un producto prueba actualizado",
    200, "Sin imagen", "abc123", 25);

console.log(productManager.getProductById(1));

//Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto
//o que arroje un error en caso de no existir.
productManager.deleteProductByCode('abc123');
console.log(productManager.deleteProductByCode('abc124')); // caso no existir

console.log(productManager.getProducts());
