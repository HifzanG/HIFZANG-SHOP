let cart = [];
let total = 0;
let currentModalItem = null;

// Load cart from localStorage
function loadCart(){
  const storedCart = localStorage.getItem('cart');
  const storedTotal = localStorage.getItem('total');
  if(storedCart){
    cart = JSON.parse(storedCart);
    total = parseFloat(storedTotal);
    updateCart();
  }
}

// Save cart to localStorage
function saveCart(){
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('total', total);
}

// Add to cart
function addToCart(name, price, img){
  cart.push({name, price, img});
  total += price;
  updateCart();
  saveCart();
  alert(`${name} added to cart!`);
}

// Modal functions
function openModal(name, price, img){
  currentModalItem = {name, price, img};
  document.getElementById('modal-name').textContent = name;
  document.getElementById('modal-price').textContent = price;
  document.getElementById('modal-img').src = img;
  document.getElementById('productModal').style.display = 'flex';
}

function closeModal(){
  document.getElementById('productModal').style.display = 'none';
}

function addToCartModal(){
  if(currentModalItem){
    addToCart(currentModalItem.name, parseFloat(currentModalItem.price.replace('RM','')), currentModalItem.img);
    closeModal();
  }
}

// Update cart preview in homepage
function updateCart(){
  const cartList = document.getElementById('cart-items');
  if(!cartList) return;
  cartList.innerHTML = '';
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <p>${item.name}</p>
        <p>RM${item.price}</p>
      </div>
    `;
    cartList.appendChild(div);
  });
  const totalEl = document.getElementById('total');
  if(totalEl) totalEl.textContent = total;
}

// Navbar Cart click → go to cart.html
window.onload = function(){
  loadCart();
  const cartNavLink = document.querySelector('nav .nav-links li:nth-child(3) a');
  if(cartNavLink){
    cartNavLink.addEventListener('click', function(e){
      e.preventDefault();
      window.location.href = 'cart.html';
    });
  }
}

// Close modal on outside click
window.onclick = function(event){
  const modal = document.getElementById('productModal');
  if(event.target == modal){
    closeModal();
  }
}
