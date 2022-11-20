// Product Manager

class ProductManager {
    constructor() {
        this.products = [];
    }

    getNextId = () => {
        const count = this.products.length;
        return (count > 0) ? this.products[count - 1].id + 1 : 1;
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
            this.products.push(product);
        } else {
            return "El codigo ya existe o falta valor en campo";
        }

    }

    getProducts = () => { return this.products }

    getProductById = (id) => {
        const product = this.products.find(product => product.id == id);
        if (product) {
            return product;
        }
        return "Not found";
    }

    existsProductByCode = (code) => {
        const product = this.products.find(product => product.code == code)
        if (product) {
            return true;
        }
        return false;
    }

    validateField = (title, description, price, thumbnail, code, stock) => {
        return title != null && description != null && price != null && thumbnail != null && code != null
            && stock != null;
    }
}


// Proceso testing

// Se creará una instancia de la clase “ProductManager”
const productManager = new ProductManager();

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(productManager.getProducts());

// Se llamará al método “addProduct” 
productManager.addProduct("Producto prueba", "Este es un producto prueba",
    200, "Sin imagen", "abc123", 25);

// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(productManager.getProducts());

// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
productManager.addProduct("Producto prueba", "Este es un producto prueba",
    200, "Sin imagen", "abc123", 25);

// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo. Response: Product
console.log(productManager.getProductById(1));

// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo. Response: Not found
console.log(productManager.getProductById(2));

// Comprobacion de agregar producto con campo incompleto
console.log(productManager.addProduct("Producto prueba", "Este es un producto prueba",
    200, "Sin imagen", "abc123", null)); 
