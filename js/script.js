// ===== Hamburger Menu =====
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const closeMenu = document.getElementById('close-menu');
const menuOverlay = document.getElementById('menu-overlay');
if (hamburger && menu && closeMenu && menuOverlay) {
  hamburger.addEventListener('click', () => {
    menu.classList.add('active');
    menuOverlay.classList.add('active');
  });

  closeMenu.addEventListener('click', () => {
    menu.classList.remove('active');
    menuOverlay.classList.remove('active');
  });

  menuOverlay.addEventListener('click', () => {
    menu.classList.remove('active');
    menuOverlay.classList.remove('active');
  });
}
// ===== Cart Sidebar =====
const cartBtn = document.getElementById("cart-btn");
const cart = document.getElementById("cart");
const closeCart = document.getElementById("close-cart");
const addCartBtns = document.querySelectorAll(".add-to-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const cartOverlay = document.getElementById("cart-overlay");

// ✅ تحميل السلة من localStorage أو عمل Array فاضي
let cartData = JSON.parse(localStorage.getItem("cartData")) || [];

function saveCart() {
  localStorage.setItem("cartData", JSON.stringify(cartData));
}

if (cartBtn && cart && closeCart && cartOverlay && cartItemsContainer && cartTotal && cartCount) {
  cartBtn.addEventListener("click", () => {
    cart.classList.add("active");
    cartOverlay.classList.add("active");
  });

  closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
    cartOverlay.classList.remove("active");
  });

  cartOverlay.addEventListener("click", () => {
    cart.classList.remove("active");
    cartOverlay.classList.remove("active");
  });

  addCartBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const productCard = e.target.closest(".product-card");
      const id = productCard.id || Date.now(); // لو مفيش id نعمل واحد عشوائي
      const title = productCard.querySelector("h3").innerText;
      const price = productCard.querySelector(".price").innerText;
      const img = productCard.querySelector("img").src;

      const existing = cartData.find(item => item.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        cartData.push({id, title, price, img, qty:1});
      }
      saveCart(); // ✅ نحفظ كل إضافة
      updateCart();
    });
  });

  function updateCart(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if(cartData.length === 0){
      cartItemsContainer.innerHTML = "<p>لا يوجد منتجات بعد.</p>";
    } else {
      cartData.forEach(item => {
        const priceNumber = parseFloat(item.price.replace('$',''));
        total += priceNumber * item.qty;

        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
          <img src="${item.img}" alt="${item.title}">
          <div class="cart-item-details">
            <h4>${item.title}</h4>
            <span>${item.price} × ${item.qty}</span>
          </div>
          <button class="remove-item">×</button>
        `;
        const removeBtn = div.querySelector(".remove-item");
        removeBtn.addEventListener("click", () => {
          cartData = cartData.filter(i => i.id !== item.id);
          saveCart(); // ✅ حفظ بعد الحذف
          updateCart();
        });

        cartItemsContainer.appendChild(div);
      });
    }

    cartTotal.innerText = `$${total.toFixed(2)}`;
    cartCount.innerText = cartData.length;

    saveCart(); // ✅ حفظ بعد كل تحديث
  }

  // ✅ أول ما تفتح أي صفحة نحمل السلة
  updateCart();
}

// ===== Slider =====
const slides = document.querySelectorAll(".slides img");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

if (slides.length > 0 && prev && next) {
  let currentIndex = 0;

  // إظهار الصورة الأولى
  slides[currentIndex].classList.add("active");

  function showSlide(index) {
    slides.forEach(img => img.classList.remove("active"));
    slides[index].classList.add("active");
  }

  next.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  prev.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });
    // ✅ تحريك تلقائي كل 4 ثواني
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 4000);
}
// إعداد العداد (ساعة واحدة مثلاً)
let countDownDate = new Date().getTime() + (60 * 60 * 1000);

let timer = setInterval(function() {
  let now = new Date().getTime();
  let distance = countDownDate - now;

  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000*60*60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000*60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("hours").innerHTML = ("0" + hours).slice(-2);
  document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2);
  document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2);

  if (distance < 0) {
    clearInterval(timer);
    document.getElementById("countdown").innerHTML = "انتهى العرض 🎉";
  }
}, 1000);
// زرار العوده لاعلي
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
// ركن الهدايا
const giftData = {
  partner: [
    { name: "خاتم فضة أنيق", price: "750 جنيه", img: "images/1.webp" },
    { name: "عقد كريستال", price: "1200 جنيه", img: "images/3.avif" }
  ],
  friend: [
    { name: " حلق دائري شيك", price: "450 جنيه", img: "images/5.avif" },
    { name: "خاتم عقله", price: "500 جنيه", img: "images/20.jpeg" }
  ],
  family: [
    { name: "ساعة كلاسيك", price: "1500 جنيه", img: "images/17.jpg" },
    { name: "عقد ذهبي", price: "2000 جنيه", img: "images/12.jpg" }
  ]
};

document.querySelectorAll(".gift-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    const results = document.getElementById("gift-results");
    results.innerHTML = giftData[type].map(item => `
      <div class="gift-card">
        <img src="${item.img}" alt="${item.name}">
        <h4>${item.name}</h4>
        <span>${item.price}</span>
      </div>
    `).join("");
  });
});
// نهايه ركن الهدايا