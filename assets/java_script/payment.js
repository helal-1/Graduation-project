const detailsContainer = document.getElementById("payment-details");
const paymentOptions = document.querySelectorAll('input[name="payment"]');
const confirmBtn = document.querySelector(".confirm-payment");
const cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;
const summaryContainer = document.getElementById("summary");

cart.forEach((item) => {
    total += item.price * item.quantity;
    summaryContainer.innerHTML += `
        <div class="summary-item" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <img src="${item.image}" style="width: 50px; height: 50px; object-fit: cover;">
            <div>
            
                <strong>${item.name}</strong><br>
                <small>${item.price} $ x ${item.quantity}</small>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto mollitia asperiores ducimus quae ipsa, dolores debitis nemo </p>
            </div>
        </div>
    `;
});
document.getElementById("total-payment").textContent = `Total: ${total} $`;

function createPaymentContent(option) {
    switch (option) {
        case "card":
            return `
                <h4>Enter Card Details:</h4>
                <input type="text" placeholder="Card Holder Name">
                <input type="number" placeholder="Card Number">
                <input type="number" placeholder="Expiry MM/YY">
                <input type="number" placeholder="CVV">
            `;
        case "paypal":
            return `
                <h4>PayPal Payment</h4>
                <p>After clicking Complete, you'll be redirected to PayPal.</p>
            `;
        case "cod":
            return `
                <h4>Cash on Delivery</h4>
                <p>You will pay cash when you receive the order.</p>
            `;
        case "bank":
            return `
                <h4>Bank Transfer Details:</h4>
                <p>Account Name: My Store LTD</p>
                <p>IBAN: SA00000000000000000000</p>
                <p>Bank: Al Rajhi Bank</p>
            `;
        default:
            return "";
    }
}

function renderDetails(option) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = createPaymentContent(option);
    detailsContainer.innerHTML = "";
    detailsContainer.appendChild(newDiv);

    setTimeout(() => {
        newDiv.classList.add("show");
    }, 50);
}

paymentOptions.forEach((option) => {
    option.addEventListener("change", () => renderDetails(option.id));
});

renderDetails("card");

confirmBtn.addEventListener("click", () => {
    Swal.fire({
        icon: "success",
        title: "Payment completed successfully",
        text: "Thank you! Your payment has been confirmed.",
        confirmButtonText: "Good",
    });
});



