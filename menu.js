// Get canteen from URL
const urlParams = new URLSearchParams(window.location.search);
const canteen = urlParams.get('canteen') || "A";

const canteenNameElem = document.getElementById('canteen-name');
canteenNameElem.textContent = `Canteen ${canteen} Menu`;

// Menu data
const menus = {
  "A": {
    "Main": [
      { name: "Chhole Bhature", price: 30 },
      { name: "Chowmin Egg", price: 50 },
      { name: "Chowmin Chicken", price: 70 }
    ]
  },
  "B": {
    "Beverages": [
      { name: "Tea", price: 10 },
      { name: "Black Tea", price: 10 }
    ],
    "Breakfast/Snacks": [
      { name: "Puri", price: 30 },
      { name: "Paratha", price: 30 },
      { name: "Alu Paratha", price: 50 },
      { name: "Maggi", price: 30 },
      { name: "Chicken Maggi", price: 60 },
      { name: "Egg Maggi", price: 50 },
      { name: "Bread Omelette", price: 30 },
      { name: "Omelette", price: 15 },
      { name: "Boiled Egg", price: 15 }
    ],
    "Rice Dishes": [
      { name: "Rice", price: 50 },
      { name: "Rice/Chicken", price: 90 },
      { name: "Rice/Fish (Small)", price: 80 },
      { name: "Rice/Fish (Large)", price: 90 },
      { name: "Chicken Fried Rice", price: 70 },
      { name: "Veg Fried Rice", price: 40 },
      { name: "Egg Fried Rice", price: 50 }
    ],
    "Other": [
      { name: "Chicken Fry", price: 70 },
      { name: "Roti", price: 30 }
    ]
  },
  "C": {
    "Blended Cold Beverages & More Coolers": [
      { name: "Lemon Iced Tea", price: 40 },
      { name: "Masala Lemon Tea", price: 50 },
      { name: "Peach Iced Tea", price: 60 }
    ],
    "Cold Coffee, Chocolate & Others": [
      { name: "Café Frappe (Cold Coffee)", price: 60 },
      { name: "Frappe Mocha / Cold Chocolate", price: 65 },
      { name: "Irish / Caramel Frappe", price: 70 },
      { name: "Hazelnut Frappe", price: 70 },
      { name: "Kitkat / Munch Frappe", price: 90 },
      { name: "Espresso Black Coffee", price: 40 },
      { name: "Cardamom Tea", price: 20 },
      { name: "Masala Tea / Green Tea", price: 25 },
      { name: "Nescafe Regular Coffee", price: 25 },
      { name: "Cappuccino", price: 35 },
      { name: "Café Latte", price: 35 },
      { name: "Café Mocha", price: 40 },
      { name: "Hot Chocolate", price: 40 },
      { name: "Irish Cappuccino", price: 50 },
      { name: "Hazelnut Cappuccino", price: 50 },
      { name: "Caramel Cappuccino", price: 50 }
    ],
    "Blended Coffees & Teas": [
      { name: "Lemon Tea / Black Tea", price: 15 },
      { name: "Lemon Iced Tea", price: 55 },
      { name: "Masala Tea (Iced)", price: 20 },
      { name: "Peach Iced Tea", price: 60 },
      { name: "NESTEA", price: 65 },
      { name: "Cold Coffee", price: 65 },
      { name: "Café Frappe", price: 65 },
      { name: "Frappe (Kitkat/Trish/C)", price: 90 },
      { name: "Hazelnut Frappe", price: 65 }
    ]
  }
};

let cart = [];

// Render menu
function renderMenu(canteen) {
  const menuContainer = document.getElementById('menu-container');
  menuContainer.innerHTML = '';
  const categories = menus[canteen];

  for (let category in categories) {
    const catDiv = document.createElement('div');
    catDiv.className = 'menu-category';

    const catTitle = document.createElement('h2');
    catTitle.textContent = category;
    catDiv.appendChild(catTitle);

    categories[category].forEach(item => {
      const div = document.createElement('div');
      div.className = 'menu-item';
      div.innerHTML = `<span>${item.name} - ₹${item.price}</span><button>Add to Cart</button>`;
      div.querySelector('button').addEventListener('click', () => addToCart(item));
      catDiv.appendChild(div);
    });

    menuContainer.appendChild(catDiv);
  }
  renderCart();
}

// Add to cart
function addToCart(item) {
  const existing = cart.find(i => i.name === item.name);
  if (existing) existing.qty += 1;
  else cart.push({ ...item, qty: 1 });
  renderCart();
}

// Remove from cart
function removeFromCart(name) {
  cart = cart.filter(i => i.name !== name);
  renderCart();
}

// Render cart
function renderCart() {
  const cartDiv = document.getElementById('cart-summary');
  cartDiv.innerHTML = '<h2>Cart</h2>';

  if (cart.length === 0) {
    cartDiv.innerHTML += '<p>Your cart is empty</p>';
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    cartDiv.innerHTML += `<p>${item.name} x${item.qty} - ₹${item.price * item.qty} 
      <button onclick="removeFromCart('${item.name}')">Remove</button></p>`;
  });

  cartDiv.innerHTML += `
    <h3>Total: ₹${total}</h3>
    <label for="pickup-time">Select Pickup Time:</label>
    <input type="time" id="pickup-time" required>
    <button id="checkout-btn" onclick="checkout()">Checkout</button>
  `;
}

// Checkout
function checkout() {
  const timeInput = document.getElementById('pickup-time');
  if (!timeInput.value) {
    alert('Please select pickup time!');
    return;
  }
  alert(`Order placed! Pickup time: ${timeInput.value}`);
  cart = [];
  renderCart();
}

// Initial render
renderMenu(canteen);

