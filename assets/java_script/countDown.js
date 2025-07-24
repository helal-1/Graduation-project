document.addEventListener("DOMContentLoaded", () => {
    const countdownDate = Math.floor(new Date("2030-12-12T23:59:59").getTime() / 1000); // بصيغة ثواني

    new FlipDown(countdownDate, {
        theme: "light",
    })
        .start()
        .ifEnded(() => {
            document.getElementById("flipdown").innerHTML = "<p>انتهى العرض!</p>";
        });
});
