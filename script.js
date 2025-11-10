const API_URL = 'https://fakestoreapi.com/products?limit=12';
const productsList = document.getElementById('productos-list');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout');

let cart = JSON.parse(localStorage.getItem('cart_v1')) || {};

// === CARRITO ===
function saveCart() {
  localStorage.setItem('cart_v1', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const totalCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalCount;
  renderCartItems();
}

function renderCartItems() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  for (const id in cart) {
    const item = cart[id];
    total += item.price * item.quantity;

    const row = document.createElement('div');
    row.className = 'd-flex justify-content-between align-items-center border-bottom py-2';
    row.innerHTML = `
      <div>
        <strong>${item.title}</strong>
        <div>$${item.price.toFixed(2)}</div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <input type="number" min="1" value="${item.quantity}" data-id="${id}" class="form-control form-control-sm qty-input" style="width: 60px;">
        <button class="btn btn-danger btn-sm remove-btn" data-id="${id}">X</button>
      </div>
    `;
    cartItemsContainer.appendChild(row);
  }

  cartTotal.textContent = `$${total.toFixed(2)}`;
  attachCartListeners();
}

function attachCartListeners() {
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.onclick = () => {
      delete cart[btn.dataset.id];
      saveCart();
    };
  });

  document.querySelectorAll('.qty-input').forEach(input => {
    input.onchange = () => {
      const id = input.dataset.id;
      const q = parseInt(input.value) || 1;
      cart[id].quantity = q;
      saveCart();
    };
  });
}

function addToCart(product) {
  const id = product.id;
  if (cart[id]) {
    cart[id].quantity += 1;
  } else {
    cart[id] = { id, title: product.title, price: product.price, quantity: 1 };
  }
  saveCart();
}

// === PRODUCTOS ===
function renderProducts(products) {
  productsList.classList.add('grid-container');
  productsList.innerHTML = '';

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card h-100 shadow-sm';
    card.innerHTML = `
      <img src="${p.image}" class="card-img-top" alt="${p.title}">
      <div class="card-body d-flex flex-column">
        <h6 class="card-title">${p.title}</h6>
        <div class="text-warning mb-2">★★★☆☆</div>
        <p class="card-text fw-bold mb-3">$${p.price.toFixed(2)}</p>
        <button class="btn btn-primary mt-auto add-btn" data-id="${p.id}">Agregar al carrito</button>
      </div>
    `;
    productsList.appendChild(card);
  });

  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      const product = products.find(p => p.id == id);
      addToCart(product);
    };
  });
}

async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener productos');
    const data = await res.json();
    renderProducts(data);
  } catch (error) {
    productsList.innerHTML = `<div class="alert alert-danger">No se pudieron cargar los productos.</div>`;
    console.error(error);
  }
}

checkoutBtn.onclick = () => {
  alert('Compra simulada. Gracias por tu compra.');
  cart = {};
  saveCart();
};

updateCartUI();
fetchProducts();
