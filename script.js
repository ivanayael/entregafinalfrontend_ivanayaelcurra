const API_URL = "https://fakestoreapi.com/products";
let allProducts = [];

const productsList = document.getElementById("productos-list");
const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout");

const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");

let cart = JSON.parse(localStorage.getItem("cart_v1")) || {};

// Carrito
function saveCart() {
  localStorage.setItem("cart_v1", JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const totalCount = Object.values(cart).reduce((s, i) => s + i.quantity, 0);
  cartCount.textContent = totalCount;
  renderCartItems();
}

function renderCartItems() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  for (const id in cart) {
    const item = cart[id];
    total += item.price * item.quantity;

    const row = document.createElement("div");
    row.className = "d-flex justify-content-between align-items-center border-bottom py-2";

    row.innerHTML = `
      <div>
        <strong>${item.title}</strong>
        <div>$${item.price.toFixed(2)}</div>
      </div>

      <div class="d-flex align-items-center gap-2">
        <input type="number" class="form-control form-control-sm qty-input"
          min="1" value="${item.quantity}" data-id="${id}">

        <button class="btn btn-danger btn-sm remove-btn" data-id="${id}">X</button>
      </div>
    `;
    cartItemsContainer.appendChild(row);
  }

  cartTotal.textContent = `$${total.toFixed(2)}`;
  attachCartListeners();
}

function attachCartListeners() {
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.onclick = () => {
      delete cart[btn.dataset.id];
      saveCart();
    };
  });

  document.querySelectorAll(".qty-input").forEach(input => {
    input.onchange = () => {
      const id = input.dataset.id;
      cart[id].quantity = parseInt(input.value) || 1;
      saveCart();
    };
  });
}

function addToCart(product) {
  if (cart[product.id]) {
    cart[product.id].quantity += 1;
  } else {
    cart[product.id] = { ...product, quantity: 1 };
  }
  saveCart();
}

// Renderizado
function renderProducts(products) {
  productsList.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm fade-in";
    card.tabIndex = 0;

    card.innerHTML = `
      <img src="${p.image}" class="card-img-top img-fade" alt="${p.title}">
      <div class="card-body d-flex flex-column">
        <h6 class="card-title">${p.title}</h6>
        <div class="text-warning mb-2">★★★☆☆</div>
        <p class="card-text fw-bold mb-3">$${p.price.toFixed(2)}</p>
        <button class="btn btn-primary mt-auto add-btn" data-id="${p.id}">
          Agregar al carrito
        </button>
      </div>
    `;
    productsList.appendChild(card);
  });

  document.querySelectorAll(".add-btn").forEach(btn => {
    btn.onclick = () => {
      const prod = allProducts.find(p => p.id == btn.dataset.id);
      addToCart(prod);
    };
  });
}

// Filtros
function applyFilters() {
  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  let filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(search)
  );

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  renderProducts(filtered);
}

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);

// Categorías
async function loadCategories() {
  const res = await fetch(`${API_URL}/categories`);
  const categories = await res.json();
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat.toUpperCase();
    categoryFilter.appendChild(opt);
  });
}

// Productos
async function fetchProducts() {
  const res = await fetch(API_URL);
  allProducts = await res.json();
  renderProducts(allProducts);
}

// Checkout
checkoutBtn.onclick = () => {
  alert("Compra simulada.");
  cart = {};
  saveCart();
};

// Tema RWBY
const themeSelector = document.getElementById("theme-selector");
const currentTheme = localStorage.getItem("rwby_theme") || "ruby";

document.body.classList.add(`theme-${currentTheme}`);
themeSelector.value = currentTheme;

themeSelector.onchange = () => {
  document.body.className = "";
  document.body.classList.add(`theme-${themeSelector.value}`);
  localStorage.setItem("rwby_theme", themeSelector.value);
};

// Inicialización
updateCartUI();
loadCategories();
fetchProducts();

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".img-fade").forEach(img => {
    img.classList.add("loaded");
  });
});

const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.onclick = () => {
    localStorage.removeItem("usuario_logueado");
    window.location.href = "login.html";
  };
}