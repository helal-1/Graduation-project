document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons(); // لتحويل <i data-lucide="..."> إلى SVGs فعلية
    const loginIcon = document.getElementById("login-icon");
    const loginBox = document.getElementById("login-box");
    const container_login = document.querySelector(".container_login");
    const notification = document.getElementById("notification");
    const togglePassword = document.getElementById("toggle-password");
    const passwordInput = document.getElementById("password");
    const closeLogin = document.getElementById("close-login");
    const userError = document.getElementById("user-error");
    const passError = document.getElementById("pass-error");

    // تأكد أن العناصر موجودة قبل إضافة الأحداث
    if (loginIcon && loginBox && container_login) {
        loginIcon.addEventListener("click", () => {
            loginBox.style.display = "flex";
            container_login.style.display = "flex";
        });
    }

    if (closeLogin && loginBox && container_login) {
        closeLogin.addEventListener("click", () => {
            loginBox.style.display = "none";
            container_login.style.display = "none";
        });
    }

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", () => {
            const isPassword = passwordInput.type === "password";
            passwordInput.type = isPassword ? "text" : "password";
            togglePassword.classList.toggle("bi-eye");
            togglePassword.classList.toggle("bi-eye-slash");
        });
    }

    // login function
    window.login = function () {
        const username = document.getElementById("username").value.trim();
        const password = passwordInput.value.trim();
        let valid = true;

        if (username.length < 3) {
            userError.textContent = "الاسم يجب أن يكون 3 أحرف فأكثر.";
            valid = false;
        } else {
            userError.textContent = "";
        }

        if (password.length < 6) {
            passError.textContent = "كلمة المرور يجب أن تكون 6 أحرف فأكثر.";
            valid = false;
        } else {
            passError.textContent = "";
        }

        if (valid) {
            loginBox.style.display = "none";
            container_login.style.display = "none";

            if (notification) {
                notification.style.display = "flex";
                setTimeout(() => {
                    notification.style.display = "none";
                }, 5000);
            }
        }
    };
});
