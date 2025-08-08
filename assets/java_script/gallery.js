const scroll_container = document.querySelector(".gallery");
const Btn_prev = document.getElementById("left");
const nextBtn = document.getElementById("right");
const popup = document.querySelector(".popup");
const popupContainer = document.querySelector(".popup-container");

// تمرير يدوي
Btn_prev.addEventListener("click", () => {
    scroll_container.style.scrollBehavior = "smooth";
    scroll_container.scrollLeft -= 300;
});

nextBtn.addEventListener("click", () => {
    scroll_container.style.scrollBehavior = "smooth";
    scroll_container.scrollLeft += 300;
});

// تمرير تلقائي
setInterval(() => {
    const maxScroll = scroll_container.scrollWidth - scroll_container.clientWidth;
    scroll_container.style.scrollBehavior = "smooth";
    scroll_container.scrollLeft = scroll_container.scrollLeft >= maxScroll ? 0 : scroll_container.scrollLeft + 300;
}, 3000);

// ===========================
let products = [];
fetch("./assets/Api/data.json")
    .then((response) => response.json())
    .then((data) => {
        products = data;
        data.forEach((item) => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
               <div class="image__one">
                    <img src="${item.image}" loading="lazy">
                    <div class="hover__icons">
                        <a href="#1" onclick="openPopupFun(${item.id})"><i class="bi bi-plus-lg"></i></a>
                        <button class="add-to-cart" data-name="${item.title}" data-price="${item.price}" data-image="${item.image}">
                            <i class="bi bi-bag-check"></i>
                        </button>
                      <a href="wishlist/wishlist.html"><i class="bi bi-heart"></i></a>
                    </div>
                </div>
                <div class="title__image">
                    <h6><a href="product-details.html">${item.title}</a></h6>
                    <span>$${item.price} </span>
                </div>
            `;
            scroll_container.appendChild(card);
        });
    });

scroll_container.addEventListener("click", function (e) {
    const btn = e.target.closest(".add-to-cart");
    if (btn) {
        e.preventDefault();
        const name = btn.dataset.name;
        const price = parseFloat(btn.dataset.price);
        const image = btn.dataset.image;
        addToCart(name, price, image);
    }
});

const cartIcon = document.querySelector(".cart");
const cartDropdown = document.querySelector(".cart-dropdown");
const cartCount = document.querySelector(".cart-count");
const cartItemsContainer = document.querySelector(".cartItems");
const totalPriceContainer = document.querySelector(".total-price");
const emptyCartMsg = document.querySelector(".empty-cart");

let cart = [];

cartIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    cartDropdown.classList.add("show");
});

document.addEventListener("click", (e) => {
    if (!cartIcon.contains(e.target)) {
        cartDropdown.classList.remove("show");
    }
});

cartItemsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove")) {
        const index = Array.from(cartItemsContainer.children).indexOf(e.target.parentElement);
        removeFromCart(index);
    }
});

function addToCart(productName, price, image, quantity = 1) {
     let fixedImage = image.startsWith("/") ? image : image.replace("./", "/");
   cart.push({ name: productName, price: price, image: fixedImage, quantity: quantity });
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    cartCount.textContent = cart.length;
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        emptyCartMsg.style.display = "block";
        totalPriceContainer.textContent = "Total: 0 $";
    } else {
        emptyCartMsg.style.display = "none";
        cart.forEach((item) => {
            const li = document.createElement("li");
            li.style.display = "flex";
            li.style.alignItems = "center";
            li.style.gap = "10px";
            li.style.justifyContent = "space-between";

            li.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <img src="${item.image}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                    <div>
                        <div style="font-size: 14px;">${item.name}</div>
                        <div style="font-size: 12px; color: #888;">${item.price} $ x ${item.quantity}</div>
                    </div>
                </div>
                <span class="remove" style="cursor:pointer;color:red;">×</span>
            `;
            cartItemsContainer.appendChild(li);
        });

        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        totalPriceContainer.textContent = `Total: ${total} $`;
    }
}

const checkoutBtn = document.getElementById("checkout");
checkoutBtn.addEventListener("click", () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "/payment/payment.html";
});

// ===========================
let n = 0;
function openPopupFun(productId) {
    popup.classList.add("active");
    popupContainer.classList.add("active");
    popupContainer.innerHTML = ""; // تنظيف قبل إضافة

    const findSameProduct = products.find((product) => product.id == productId);

    popupContainer.innerHTML = `
        <div class="popup-container-close" onclick="closePopupFun()">
            <span></span>
        </div>
        <img src ="${findSameProduct.image}">
        <div class="popup-content">
        <div class="rate"> ${new Array(5)
            .fill(1)
            .map((_, index) =>
                findSameProduct.rate > index
                    ? `<svg class="active_color_rate stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="16" width="16"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z">
                                        </path>
                                     </svg>`
                    : `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path></svg>`,
            )
            .join("")}</div>
            <div class="displayContent">
            <h1>${findSameProduct.title}</h1>
           <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit aspernatur error facere dolores eaque ad nesciunt, temporibus iste dicta ex sapiente est quo maiores, officia qui? Ipsam perferendis corrupti alias!</p>
            <div class="price">${findSameProduct.price}$</div>
            </div>
            <div class="counter_btn">
                <div class="counter">
                    <button class="min">-</button>
                    <input type="text" class="num" value="0">
                    <button class="pls">+</button>
                </div>
                <div class="btn_cart">
                    <button><i class="bi bi-bag-check"></i> Add to cart</button>
                </div>
            </div>
        </div>
    `;

    addPopupListeners();
}

function addPopupListeners() {
    const inp = popupContainer.querySelector(".num");
    const pls = popupContainer.querySelector(".pls");
    const min = popupContainer.querySelector(".min");
    n = 0;

    pls.addEventListener("click", () => {
        n++;
        inp.value = n;
    });

    min.addEventListener("click", () => {
        if (n > 0) {
            n--;
            inp.value = n;
        }
    });
}

function closePopupFun() {
    popup.classList.remove("active");
    popupContainer.classList.remove("active");
}
