document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
  
    const productForm = document.getElementById('productForm');
    const productsList = document.getElementById('productsList');
  
    socket.on('updateProducts', (products) => {
      productsList.innerHTML = '';
      products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.title} - ${product.price}`;
        productsList.appendChild(li);
      });
    });
  
    productForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = event.target.title.value;
      const price = event.target.price.value;
  
      socket.emit('addProduct', { title, price, id: Date.now().toString() });
      event.target.reset();
    });
  
    productsList.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        const id = event.target.getAttribute('data-id');
        socket.emit('deleteProduct', id);
      }
    });
  });
  