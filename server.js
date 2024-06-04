const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

let products = require('./data/products.json');

app.get('/', (req, res) => {
  res.render('home', { products });
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products });
});

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.emit('updateProducts', products);

  socket.on('addProduct', (product) => {
    products.push(product);
    io.emit('updateProducts', products);
  });

  socket.on('deleteProduct', (id) => {
    products = products.filter(product => product.id !== id);
    io.emit('updateProducts', products);
  });
});

const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
