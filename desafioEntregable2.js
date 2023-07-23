const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
        const data = fs.readFileSync(this.path, 'utf8');
        this.products = JSON.parse(data);
        // Calculo el ID más alto actualmente en el arreglo de productos
        const maxId = this.products.reduce((max, product) => Math.max(max, product.id), 0);
        ProductManager.nextId = maxId + 1;
        } catch (error) {
        this.products = [];
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data, 'utf8');
    }

    addProduct(product) {
        // Verifico si el código del producto ya existe
        const isCodeDuplicate = this.products.some((existingProduct) => existingProduct.code === product.code);
        if (isCodeDuplicate) {
        console.log(`Error: El código ${product.code} ya existe en otro producto.`);
        return;
        }

        product.id = ProductManager.nextId++;
        this.products.unshift(product);

        this.saveProducts();
        console.log(`Producto agregado correctamente - ID: ${product.id}`);
    }

    getProducts() {
        console.log(`Productos Obtenidos:`);
        return this.products;
    }

    getProductById(productId) {
        const product = this.products.find((product) => product.id === productId);
        return product; 
    }

    updateProduct(productId, updatedFields) {
        const productIndex = this.products.findIndex((product) => product.id === productId);
        if (productIndex !== -1) {
        this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
        this.saveProducts();
        console.log(`El producto con ID ${productId} fue actualizado correctamente`);
        return true;
        } else {
        console.log(`Hubo un error al actualizar el producto con ID: ${productId}`);
        return false;
        }
    }

    deleteProduct(productId) {
        const productIndex = this.products.findIndex((product) => product.id === productId);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.saveProducts();
            console.log(`Producto con ID ${productId} eliminado correctamente.`);
        } else {
            console.log(`Error: Producto con ID ${productId} no encontrado. No se pudo eliminar.`);
        }
    }
}

// Inicializo el ID base como propiedad estática de la clase
ProductManager.nextId = 1;

const productManager = new ProductManager('datos.txt');

////////// Agregar productos //////////
const product1 = {
    title: "Iphone 14",
    description: "El iPhone 14 es la última incorporación a la reconocida línea de teléfonos inteligentes de Apple.",
    price: 1500,
    thumbnail: "https://techcrunch.com/wp-content/uploads/2022/09/Apple-iphone-14-Pro-review-1.jpeg?w=1024",
    code: 5445,
    stock: 20,
};

const product2 = {
    title: "S23 Ultra",
    description: "El S23 Ultra es el último buque insignia de la reconocida serie de teléfonos Samsung Galaxy.",
    price: 1300,
    thumbnail: "https://static.hendel.com/media/catalog/product/cache/0c3e9ac8430b5a3e77d1544ae1698a10/4/9/49604_be-min.jpg",
    code: 5685,
    stock: 26,
};

const product3 = {
    title: "Otro producto",
    description: "Descripción del otro producto",
    price: 999,
    thumbnail: "https://example.com/imagen.jpg",
    code: 5445, // Código duplicado
    stock: 10,
};

productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);

////////// Obtener y mostrar todos los productos //////////
// const allProducts = productManager.getProducts();
// console.log(allProducts);

////////// Obtener un producto por su ID //////////
// const productId = 3;
// const foundProduct = productManager.getProductById(productId);
// if (foundProduct) {
//     console.log(`Producto encontrado - ID: ${productId}`);
//     console.log(foundProduct);
// } else {
//     console.log(`Producto no encontrado - ID: ${productId}`);
// }

////////// Modificar un producto por su ID //////////
// const updatedFields = { price: 1300, stock: 35 };
// const updated = productManager.updateProduct(3, updatedFields);

////////// Eliminar un producto por su ID //////////
// const productIdToDelete = 2;
// productManager.deleteProduct(productIdToDelete); 
