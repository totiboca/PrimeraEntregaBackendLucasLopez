const fs = require('fs');
const path = './data/products.json';

class ProductManager {
  constructor() {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify([]));
    }
  }

  getProducts() {
    const data = fs.readFileSync(path);
    return JSON.parse(data);
  }

  addProduct(product) {
    const products = this.getProducts();

    // Verificar si el código ya existe
    if (products.some(p => p.code === product.code)) {
      throw new Error('El código de producto ya existe');
    }

    // Crear un nuevo producto con ID autogenerado
    const newProduct = {
      ...product,
      id: (products.length + 1).toString()
    };

    products.push(newProduct);
    fs.writeFileSync(path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  getProductById(id) {
    const products = this.getProducts();
    const product = products.find(p => p.id === id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }
}

module.exports = ProductManager;
