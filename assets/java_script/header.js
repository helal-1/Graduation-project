// Scroll تأثير الهيدر
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (scrollY >= 400) {
        header.classList.add("active_header");
    } else {
        header.classList.remove("active_header");
    }
});
