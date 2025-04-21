// ITERATION 1

function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');
  const price = parseFloat(product.querySelector('.price span').textContent.trim ());
  const quantity = parseInt(product.querySelector('.quantity input').value);

  const subtotalValue = price * quantity;

  product.querySelector('.subtotal span').innerText = subtotalValue.toFixed(2);

  return subtotalValue; 

}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  //const singleProduct = document.querySelector('.product');
  //updateSubtotal(singleProduct);
  // end of test

  // ITERATION 2
  const products = document.querySelectorAll('#cart .product');

  let total = 0;

  // Recorre cada producto y actualiza su subtotal
  products.forEach(product => {
    total += updateSubtotal(product);
  });

  // Actualiza el valor total en el DOM
  

  // ITERATION 3
  const totalValueElement = document.querySelector('#total-value span');
  totalValueElement.innerText = total.toFixed(2);
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  const productRow = target.closest('.product'); // Encuentra la fila del producto
  productRow.remove(); // Elimina esa fila del DOM

  calculateAll(); // Recalcula el total después de eliminar
  console.log('The target in remove is:', target);
  //... your code goes here

}

// ITERATION 5

function createProduct() {
  const products = document.querySelectorAll('#cart .product');
  let total = 0;
  products.forEach(product => {
    total += updateSubtotal(product);
  });
  document.querySelector('#total-value span').innerText = total.toFixed(2);
}

function removeProduct(event) {
  const target = event.currentTarget;
  const productRow = target.closest('.product');
  productRow.remove();
  calculateAll();
}

function createProduct() {
  const nameInput = document.querySelector('.create-product td:nth-child(1) input');
  const priceInput = document.querySelector('.create-product td:nth-child(2) input');

  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value).toFixed(2);

  if (!name || isNaN(price) || price <= 0) {
    alert('Por favor, ingresa un nombre y un precio válido.');
    return;
  }

  const tbody = document.querySelector('#cart tbody');
  const newRow = document.createElement('tr');
  newRow.classList.add('product');
  newRow.innerHTML = `
    <td class="name">${name}</td>
    <td class="price">$<span>${price}</span></td>
    <td class="quantity"><input type="number" value="0" min="0" /></td>
    <td class="subtotal">$<span>0.00</span></td>
    <td class="action"><button class="btn btn-remove">Remove</button></td>
  `;

  tbody.appendChild(newRow);

  const removeBtn = newRow.querySelector('.btn-remove');
  removeBtn.addEventListener('click', removeProduct);

  nameInput.value = '';
  priceInput.value = '';
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const removeButtons = document.querySelectorAll('.btn-remove');

  // Agregar el evento click a cada botón
  removeButtons.forEach(button => {
    button.addEventListener('click', removeProduct);
  }); 

  const createBtn = document.getElementById('create');
      createBtn.addEventListener('click', createProduct);
    
  
});
