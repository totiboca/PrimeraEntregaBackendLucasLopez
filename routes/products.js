const express = require('express');
const ProductManager = require('../ProductManager');
const router = express.Router();
const productManager = new ProductManager();

// Ruta GET /api/products/ - Lista todos los productos
router.get('/', (req, res) => {
  try {
    const products = productManager.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta GET /api/products/:pid - Obtener producto por ID
router.get('/:pid', (req, res) => {
  try {
    const product = productManager.getProductById(req.params.pid);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Ruta POST /api/products/ - Agregar nuevo producto
router.post('/', (req, res) => {
  try {
    const newProduct = productManager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta PUT /api/products/:pid - Actualizar producto por ID
router.put('/:pid', (req, res) => {
  try {
    const updatedProduct = productManager.updateProduct(req.params.pid, req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Ruta DELETE /api/products/:pid - Eliminar producto por ID
router.delete('/:pid', (req, res) => {
  try {
    productManager.deleteProduct(req.params.pid);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
