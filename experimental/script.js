// Config
const API_PRODUCTS = 'https://fakestoreapi.com/products?limit=12';
const API_CATEGORIES = 'https://fakestoreapi.com/products/categories';

// DOM
const productsList = document.getElementById('productos-list');
const loader = document.getElementById('loader');
const cartCount = document.getElementById('cart-count');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout');
const clearCartBtn = document.getElementById('clear-cart');

const searchInput = document.getElementById('search-input') || null;
const searchInputSm = document.getElementById('search-input-sm') || null;
const searchClear = document.getElementById('search-clear') || null;
const categorySelect = document.getElementById('category-select');
const sortSelect = document.getElementById('sort-select');
const themeSelector = document.getElementById('theme-selector');

let allProducts = [];
let filteredProducts = [];
let cart = JSON.parse(localStorage.getItem('cart_v1')) || {};
let currentTheme = localStorage.getItem('rwby_theme') || 'ruby';

// Initialize theme
document.body.classList.add(`theme-${currentTheme}`);
if (themeSelector) themeSelector.value = currentTheme;

// Theme selector
if (themeSelector) {
  themeSelector.addEventListener('change', () => {
    document.body.className = '';
    document.body.classList.add(`theme-${themeSelector.value}`);
    localStorage.setItem('rwby_theme', themeSelector.value);
  });
}

// Helpers
function saveCart() {
  localStorage.setItem('cart_v2', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const totalCount = Object.values(cart).reduce((s, i) => s + i.quantity, 0);
  cartCount.textContent = totalCount;
  renderCartItems();
}

function renderCartItems() {
  if (!cartItemsEl) return;
  cartItemsEl.innerHTML = '';
  let total = 0;
  for (const id in cart) {
    const item = cart[id];
    total += item.price * item.quantity;
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
      <div style="max-width:70%"><strong>${escapeHtml(item.title)}</strong><div class="text-muted small">$${item.price.toFixed(2)}</div></div>
      <div class="d-flex gap-2 align-items-center">
        <input class="form-control form-control-sm qty-input" data-id="${id}" type="number" min="1" value="${item.quantity}" style="width:80px">
        <button class="btn btn-sm btn-danger remove-btn" data-id="${id}">Eliminar</button>
      </div>
    `;
    cartItemsEl.appendChild(li);
  }
  cartTotalEl.textContent = total.toFixed(2);

  // attach handlers
  document.querySelectorAll('.remove-btn').forEach(b => {
    b.onclick = () => { delete cart[b.dataset.id]; saveCart(); };
  });
  document.querySelectorAll('.qty-input').forEach(inp => {
    inp.onchange = () => {
      const id = inp.dataset.id;
      cart[id].quantity = Math.max(1, parseInt(inp.value) || 1);
      saveCart();
    };
  });
}

// Safe text
function escapeHtml(s){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

// Add to cart
function addToCart(product) {
  const id = product.id;
  if (cart[id]) cart[id].quantity += 1;
  else cart[id] = { id, title: product.title, price: product.price, quantity: 1 };
  saveCart();
}

// Render stars from rating (rounded)
function renderStars(rate){
  const n = Math.round(rate || 3);
  return '★'.repeat(n) + '☆'.repeat(5-n);
}

// Render products with staggered animation
function renderProducts(list){
  productsList.innerHTML = '';
  if (!list.length) {
    productsList.innerHTML = '<div class="text-center py-5 text-muted">No hay productos que coincidan.</div>';
    return;
  }

  list.forEach((p, idx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'product-card fade-in';
    wrapper.style.animationDelay = `${idx * 60}ms`; // stagger
    wrapper.innerHTML = `
      <img class="product-img img-zoom img-grey" src="${p.image}" alt="${escapeHtml(p.title)}" loading="lazy">
      <div class="card-body">
        <h5 class="card-title">${escapeHtml(p.title)}</h5>
        <div class="stars">${renderStars(p.rating?.rate)}</div>
        <div class="card-price">$${p.price.toFixed(2)}</div>
        <div class="card-actions mt-2">
          <button class="btn btn-primary w-100 add-btn" data-id="${p.id}">Agregar al carrito</button>
        </div>
      </div>
    `;
    productsList.appendChild(wrapper);
  });

  // add handlers
  document.querySelectorAll('.add-btn').forEach(btn=>{
    btn.onclick = () => {
      const id = btn.dataset.id;
      const product = allProducts.find(x=>x.id == id);
      if (product) addToCart(product);
    };
  });
}

// Fetch categories
async function loadCategories(){
  try {
    const res = await fetch(API_CATEGORIES);
    const cats = await res.json();
    if (categorySelect) {
      categorySelect.innerHTML = `<option value="all">Todas las categorías</option>` + cats.map(c=>`<option value="${c}">${c}</option>`).join('');
    }
  } catch(e){ console.error('Categorias:',e); }
}

// Apply filters / search / sort
function applyFilters(){
  const q = (searchInput?.value || searchInputSm?.value || '').trim().toLowerCase();
  const cat = categorySelect?.value || 'all';
  const sort = sortSelect?.value || 'default';

  filteredProducts = allProducts.filter(p=>{
    const matchQ = !q || p.title.toLowerCase().includes(q);
    const matchC = (cat === 'all') || (p.category === cat);
    return matchQ && matchC;
  });

  if (sort === 'price-asc') filteredProducts.sort((a,b)=>a.price - b.price);
  else if (sort === 'price-desc') filteredProducts.sort((a,b)=>b.price - a.price);

  renderProducts(filteredProducts);
}

// Load products
async function loadProducts(){
  try {
    loader.style.display = 'flex';
    const res = await fetch(API_PRODUCTS);
    allProducts = await res.json();
    filteredProducts = [...allProducts];
    // hide loader
    loader.style.display = 'none';
    renderProducts(filteredProducts);
  } catch(e){
    loader.style.display = 'none';
    productsList.innerHTML = `<div class="text-danger py-4">Error cargando productos.</div>`;
    console.error(e);
  }
}

// Events
if (searchInput) {
  searchInput.addEventListener('input', debounce(()=>applyFilters(), 300));
  searchClear?.addEventListener('click', ()=>{
    searchInput.value = ''; applyFilters();
  });
}
if (searchInputSm) {
  searchInputSm.addEventListener('input', debounce(()=>applyFilters(), 300));
}
if (categorySelect) categorySelect.onchange = applyFilters;
if (sortSelect) sortSelect.onchange = applyFilters;

// cart modal open shows items (modal from bootstrap)
document.getElementById('cart-btn').addEventListener('click', ()=> {
  updateCartUI();
  const modal = new bootstrap.Modal(document.getElementById('cartModal'));
  modal.show();
});

if (checkoutBtn) checkoutBtn.onclick = ()=>{
  alert('Compra simulada. Gracias por su compra.');
  cart = {}; saveCart();
};

if (clearCartBtn) clearCartBtn.onclick = ()=>{
  cart = {}; saveCart();
};

// debounce helper
function debounce(fn, ms=200){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), ms); }; }

// escape already implemented above

// Init
loadCategories();
loadProducts();
updateCartUI();
