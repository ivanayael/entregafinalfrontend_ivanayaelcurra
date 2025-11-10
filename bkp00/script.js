// API base - usa Fake Store API
const API_URL = 'https://fakestoreapi.com/products';

// DOM
const productsList = document.getElementById('productos-list');
const cartCount = document.getElementById('cart-count');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsList = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout');

let cart = JSON.parse(localStorage.getItem('cart_v1')) || {};

// ---------- UTILIDADES ----------
function saveCart() {
  localStorage.setItem('cart_v1', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const totalCount = Object.values(cart).reduce((s, p) => s + p.quantity, 0);
  cartCount.textContent = totalCount;
  renderCartItems();
}

// ---------- RENDER PRODUCTOS ----------
function renderProducts(products) {
  productsList.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h4>${p.title}</h4>
      <p class="price">$${p.price.toFixed(2)}</p>
      <div style="display:flex;gap:.5rem;margin-top:.5rem;">
        <button class="add-btn" data-id="${p.id}">Agregar</button>
      </div>
    `;
    productsList.appendChild(card);
  });
}

// ---------- RENDER CARRITO ----------
function renderCartItems() {
  cartItemsList.innerHTML = '';
  let total = 0;

  for (const id in cart) {
    const item = cart[id];
    total += item.price * item.quantity;

    const li = document.createElement('li');
    li.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:1rem;align-items:center;padding:.5rem 0;border-bottom:1px solid #eee">
        <div>
          <strong>${item.title}</strong>
          <div>Precio: $${item.price.toFixed(2)}</div>
        </div>
        <div style="display:flex;gap:.5rem;align-items:center">
          <input type="number" min="1" value="${item.quantity}" data-id="${id}" class="qty-input" style="width:60px">
          <button class="remove-btn" data-id="${id}">Eliminar</button>
        </div>
      </div>
    `;
    cartItemsList.appendChild(li);
  }

  cartTotalEl.textContent = total.toFixed(2);
  attachCartListeners();
}

// ---------- EVENTOS DEL CARRITO ----------
function attachCartListeners() {
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      delete cart[id];
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
    cart[id] = {
      id,
      title: product.title,
      price: product.price,
      quantity: 1
    };
  }
  saveCart();
}

// ---------- FETCH DE PRODUCTOS ----------
async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderProducts(data);

    // Asignar eventos "Agregar"
    document.querySelectorAll('.add-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const product = data.find(x => x.id == id);
        addToCart(product);
      };
    });
  } catch (e) {
    productsList.innerHTML = '<p>Error cargando productos.</p>';
    console.error(e);
  }
}

// ---------- MODAL ----------
cartBtn.onclick = () => {
  cartModal.setAttribute('aria-hidden', 'false');
};
closeCartBtn.onclick = () => {
  cartModal.setAttribute('aria-hidden', 'true');
};
checkoutBtn.onclick = () => {
  alert('Compra simulada. Gracias.');
  cart = {};
  saveCart();
  cartModal.setAttribute('aria-hidden', 'true');
};

// ---------- FORMULARIO DE CONTACTO ----------
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    // validación básica ya se hace con HTML5
  });
}

// ---------- INICIALIZACIÓN ----------
updateCartUI();
fetchProducts();
