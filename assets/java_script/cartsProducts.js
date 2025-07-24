// menu bar ==>
let menuList = document.querySelector(".menu__down");
let menuDown = document.querySelector(".drop__down__icon");
let outMenu = document.querySelector(".close_menu");
function open_menu() {
    menuDown.classList.add("toggle__menu__bar");
}
function close_menu() {
    menuDown.classList.remove("toggle__menu__bar");
}
// header
window.addEventListener("scroll", () => {
    if (scrollY >= 200) {
        document.querySelector("header").classList.add("change_header_color");
    } else {
        document.querySelector("header").classList.remove("change_header_color");
    }
});
//cards
const buttons = document.querySelectorAll(".btn button");
const spans = document.querySelectorAll(".selected-sizes span");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.value;

        spans.forEach((span) => {
            span.textContent = "";
        });

        const targetSpan = document.querySelector(`span.${value}`);
        if (targetSpan) {
            targetSpan.textContent = value;
        }

        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
    });
});

// color => product
const buttonColor = document.querySelectorAll(".btn_color button");
const spanColor = document.querySelectorAll(".selected-color span");

buttonColor.forEach((btn) => {
    btn.addEventListener("click", () => {
        const value = btn.value;

        spanColor.forEach((span) => {
            span.textContent = "";
        });

        const target = document.querySelector(`span.${value}`);
        if (target) {
            target.textContent = value;
        }

        buttonColor.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
    });
});
// slide => view product
let img = document.querySelector(".img-bk");
function phones(phone) {
    img.src = phone;
}
//counter
const inp = document.querySelector(".num");
const pls = document.querySelector(".pls");
const min = document.querySelector(".min");
let n = 0;

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
