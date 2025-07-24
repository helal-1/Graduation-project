const dots = document.querySelectorAll(".swiper-pagination-bullet");

const swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    // mousewheel: true,
    speed: 600,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    on: {
        init: function () {
            document.getElementById("total").textContent = this.slides.length;
        },
        slideChange: function () {
            document.getElementById("current").textContent = this.realIndex + 1;
        },
    },
});
