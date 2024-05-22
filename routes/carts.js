const express = require('express');
const fs = require('fs');
const router = express.Router();
const cartsFilePath = './data/carts.json';

// Leer carritos desde el archivo
const readCarts = () => {
  const data = fs.readFileSync(cartsFilePath);
  return JSON.parse(data);
};

// Escribir carritos al archivo
const writeCarts = (carts) => {
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
};

// Ruta POST /
router.post('/', (req, res) => {
  const carts = readCarts();
  const newId = carts.length ? carts[carts.length - 1].id + 1 : 1;
  const newCart = { id: newId.toString(), products: [] };
  carts.push(newCart);
  writeCarts(carts);
  res.status(201).json(newCart);
});

// Ruta GET /:cid
router.get('/:cid', (req, res) => {
  const { cid } = req.params;
  const carts = readCarts();
  const cart = carts.find(c => c.id === cid);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

// Ruta POST /:cid/product/:pid
router.post('/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;
  const carts = readCarts();
  const cart = carts.find(c => c.id === cid);
  if (cart) {
    const productIndex = cart.products.findIndex(p => p.product === pid);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }
    writeCarts(carts);
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

module.exports = router;
