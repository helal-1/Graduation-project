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
// password
const pass = document.getElementById("password");
const btn_eye = document.getElementById("eye_open");
const icon = document.getElementById("icon");
btn_eye.addEventListener("click", () => {
    if (pass.type === "password") {
        pass.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
    } else {
        pass.type = "password";
        icon.classList.add("bi-eye");
        icon.classList.remove("bi-eye-slash");
    }
});
// menu log in
let login = document.querySelector(".login");
let account = document.querySelector(".account");
let close_menu_login = document.getElementById("close_menu_login");
function open_log() {
    console.log("hello");
    account.style.display = "flex";
}
function close_log() {
    console.log("hello");
    account.style.display = "none";
}
// product
function product() {
    const btn_card = document.getElementsByClassName("btn_close");
    const cards = document.getElementsByClassName("card");

    for (let i = 0; i < cards.length; i++) {
        btn_card[i].addEventListener("click", () => {
            cards[i].style.display = "none";
        });
    }
}
product();
