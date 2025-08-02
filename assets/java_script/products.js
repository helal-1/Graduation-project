
productsCard = [
    {
        category: ["Accessories", "Decoration"],
        id: 1,
        image: "/assets/images/1_1-300x300.webp",
        title: "Black vase with green roses",
        rate: 4,
        price: "$29.00",
    },
    {
        category: ["Chair", "Decoration"],
        id: 2,
        image: "/assets/images/1_2-300x300.webp",
        title: "Simple Chair",
        rate: 4,
        price: "$22.00",
    },
    {
        category: ["Furniture", "Decoration"],
        id: 3,
        image: "/assets/images/1_3-300x300.webp",
        title: "Smooth Disk",
        rate: 5,
        price: "$33.00",
    },
    {
        category: "Accessories",
        id: 4,
        image: "/assets/images/1_4-300x300.webp",
        title: "Wooden Flowerpot",
        rate: 2,
        price: "$66.00",
    },
    {
        id: 5,
        category: "Decoration",
        title: "Living room & Bedroom lights",
        price: "$54.00",
        image: "/assets/images/1_5-300x300.webp",
        links: {
            plus: "#6",
            cart: "./page_carts/carts.html",
            wishlist: "./page__Wishlist/main.html",
        },
        rate: 5,
    },
    {
        id: 6,
        category: "Decoration",
        title: "Gray lamp",
        price: "$77.00",
        image: "/assets/images/1_6-300x300.webp",
        rate: 5,
    },
    {
        id: 7,
        category: [ "Decoration", "Table"],
        title: "Decoration wood",
        price: "$55.00",
        image: "/assets/images/1_7-300x300.webp",
        rate: 5,
    },
    {
        id: 8,
        category: ["Decoration", "Furniture", "Table"],
        title: "Teapot with black tea",
        price: "$66.00",
        image: "/assets/images/1_8-300x300.webp",
        rate: 5,
    },
    {
        id: 9,
        category: ["Accessories", "Decoration", "Furniture"],
        title: "Luxury wall clock",
        price: "$70.00",
        image: "/assets/images/1_9-300x300.webp",
        rate: 5,
    },
    {
        id: 10,
        category: ["Chair", "Decoration"],
        title: "Gray nancy chair",
        price: "$40.00",
        image: "/assets/images/10-300x300.webp",
        rate: 5,
    },
    {
        id: 11,
        category: ["Chair", "Decoration"],
        title: "Wooden chair",
        price: "$99.00",
        image: "/assets/images/11-300x300.webp",
        rate: 5,
    },
];

// const displayProducts = document.getElementById("container_products");

function cardProduct(products) {
    let html = ``;
    products.forEach((product) => {
        html += `
            <div class="card" data-aos="zoom-in" data-aos-duration="1000">
                <div class="image__one">
                    <img src="${product.image}" loading="lazy">
                    <div class="hover__icons">
                        <a href="#3" onclick="openPopupFun(${product.id})"><i class="bi bi-plus-lg"></i></a>
                        <a href="/carts/carts.html"><i class="bi bi-bag-check"></i></a>
                        <a href="/wishlist/wishlist.html"><i class="bi bi-heart"></i></a>
                    </div>
                </div>
                <div class="title__image">
                    <h6><a href="product-details.html">${product.title}</a></h6>
                    <span>$${product.price}</span>
                </div>
            </div>
        `;
    });
    displayProducts.innerHTML = html;
}

// cardProduct(products);
document.addEventListener("DOMContentLoaded", function () {
    let categoryType = "All Products";
    const displayProducts = document.getElementById("container_products");
    const categoriesContainer = document.getElementById("category");

    function cardProduct(products) {
        let html = ``;
        products.forEach((product) => {
            html += `
        <div class="card" data-aos="zoom-in" data-aos-duration="1000">
          <div class="image__one">
            <img src="${product.image}" loading="lazy">
            <div class="hover__icons">
              <a href="#3" onclick="openPopupFun(${product.id})"><i class="bi bi-plus-lg"></i></a>
              <a href="/carts.html"><i class="bi bi-bag-check"></i></a>
              <a href="/wishlist.html"><i class="bi bi-heart"></i></a>
            </div>
          </div>
          <div class="title__image">
            <h6><a href="product-details.html">${product.title}</a></h6>
            <span>${product.price}</span>
          </div>
        </div>
      `;
        });
        displayProducts.innerHTML = html;
    }
function handleAllCategories() {
    // اجمع كل التصنيفات من كل منتج (حتى لو مصفوفة)
    const allCategories = productsCard
        .flatMap((p) => p.category) // ← تحويل جميع التصنيفات إلى قائمة واحدة
        .filter(Boolean);

    const uniqueCategories = ["All Products", ...new Set(allCategories)];

    const results = uniqueCategories.map((cat) => ({
        label: String(cat).replaceAll("-", " "),
        value: cat,
    }));

    let html = `<ul class="category_list">`;
    results.forEach((cat, index) => {
        html += `
      <li data-category="${cat.value}" class="${cat.value === categoryType ? "active" : ""}">
        ${cat.label}
      </li>
      ${index !== results.length - 1 ? `<span>|</span>` : ""}
    `;
    });
    html += `</ul>`;
    categoriesContainer.innerHTML = html;

    const items = categoriesContainer.querySelectorAll("li");
    items.forEach((item) => {
        item.onclick = () => {
            categoryType = item.dataset.category;
            items.forEach((el) => el.classList.remove("active"));
            item.classList.add("active");
            handleProductsFilter();
        };
    });
}

    function handleProductsFilter() {
        if (categoryType === "All Products") {
            cardProduct(productsCard);
        } else {
            const filtered = productsCard.filter((p) => {
      if (Array.isArray(p.category)) {
        return p.category.includes(categoryType); // ✅ دعم المصفوفة
      } else {
        return p.category === categoryType; // في حالة قديمة واحدة
      }
    });
    cardProduct(filtered);
  }
}


    handleAllCategories();
    handleProductsFilter();
});
