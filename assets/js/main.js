/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== TESTIMONIAL SWIPER ===============*/
let testimonialSwiper = new Swiper(".testimonial-swiper", {
    spaceBetween: 30,
    loop: 'true',

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    spaceBetween: 24,
    loop: 'true',

    breakpoints: {
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
    },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SHOW CART ===============*/
const cart = document.getElementById('cart'),
      cartShop = document.getElementById('cart-shop'),
      cartClose = document.getElementById('cart-close')

/*===== CART SHOW =====*/
/* Validate if constant exists */
if(cartShop){
    cartShop.addEventListener('click', () =>{
        cart.classList.add('show-cart')
    })
}

/*===== CART HIDDEN =====*/
/* Validate if constant exists */
if(cartClose){
    cartClose.addEventListener('click', () =>{
        cart.classList.remove('show-cart')
    })
}

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})




// cart and pyment integration

document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart__container");
  const cartTotal = document.querySelector(".cart__prices-total");
  const cartItemsCount = document.querySelector(".cart__prices-item");
  const cartCountBadge = document.getElementById("cart-count-badge");

  let cart = loadCartFromStorage();
  updateCartUI();

  // Add to Cart Buttons
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      const img = btn.dataset.img;

      if (cart[name]) {
        cart[name].quantity++;
      } else {
        cart[name] = { price, img, quantity: 1 };
      }

      saveCartToStorage();
      updateCartUI();
    });
  });

  // Load cart from localStorage
  function loadCartFromStorage() {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {};
  }

  // Save cart to localStorage
  function saveCartToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Update UI
  function updateCartUI() {
    cartContainer.innerHTML = "";
    let total = 0;
    let itemCount = 0;
  
    Object.keys(cart).forEach(name => {
      const item = cart[name];
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      itemCount += item.quantity;
  
      const article = document.createElement("article");
      article.classList.add("cart__card");
      article.innerHTML = `
        <div class="cart__box">
          <img src="${item.img}" alt="${name}" class="cart__img">
        </div>
        <div class="cart__details">
          <h3 class="cart__title">${name}</h3>
          <span class="cart__price">€${item.price}</span>
          <div class="cart__amount">
            <div class="cart__amount-content">
              <span class="cart__amount-box" data-action="decrease" data-name="${name}">
                <i class='bx bx-minus'></i>
              </span>
              <span class="cart__amount-number">${item.quantity}</span>
              <span class="cart__amount-box" data-action="increase" data-name="${name}">
                <i class='bx bx-plus'></i>
              </span>
            </div>
            <i class='bx bx-trash-alt cart__amount-trash' data-action="delete" data-name="${name}"></i>
          </div>
        </div>
      `;
      cartContainer.appendChild(article);
    });
  
    cartTotal.textContent = `€${total.toFixed(2)}`;
    cartItemsCount.textContent = `${itemCount} item${itemCount !== 1 ? "s" : ""}`;
  
    if (cartCountBadge) {
      cartCountBadge.textContent = itemCount;
      cartCountBadge.style.display = itemCount > 0 ? "inline-block" : "none";
    }
  
    attachCartActions();
  
    // Re-render PayPal Button
    document.getElementById("paypal-button-container").innerHTML = "";
    renderPayPalButton();
  }
  

  // Attach actions to cart buttons
  function attachCartActions() {
    cartContainer.querySelectorAll("[data-action]").forEach(btn => {
      const name = btn.dataset.name;
      const action = btn.dataset.action;

      btn.addEventListener("click", () => {
        if (action === "increase") {
          cart[name].quantity++;
        } else if (action === "decrease") {
          cart[name].quantity--;
          if (cart[name].quantity <= 0) {
            delete cart[name];
          }
        } else if (action === "delete") {
          delete cart[name];
        }

        saveCartToStorage();
        updateCartUI();
      });
    });
  }
  // PayPal Button
// PayPal Button
function renderPayPalButton() {
  if (typeof paypal === "undefined") return;

  paypal.Buttons({
    createOrder: function(data, actions) {
      // Calculate current total
      const total = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total.toFixed(2),
          },
        }],
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        // Optional: store transaction details
        const payerName = details.payer.name.given_name;

        // Optionally show message
        document.getElementById("paypal-status-message").textContent =
          `Transaction completed by ${payerName}!`;

        // Clear cart
        cart = {};
        saveCartToStorage();
        updateCartUI();

        // Redirect to success page
        window.location.href = "successfulpayment.html";
      });
    },
    onError: function(err) {
      console.error('PayPal Checkout Error:', err);
      document.getElementById("paypal-status-message").textContent = "Payment failed. Please try again.";
    }
  }).render("#paypal-button-container");
}

// Initialize PayPal after cart loads
// Call renderPayPalButton() after your cart loads or DOM is ready

// Initialize PayPal after cart loads


});

