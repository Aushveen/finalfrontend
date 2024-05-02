document.addEventListener('DOMContentLoaded', () => {
    const basketCount = document.getElementById('basket-count');
    const basketForm = document.getElementById('basket-form');
    const flowerImage = document.getElementById('flower-image');
    const flowerName = document.getElementById('flower-name');
    const flowerPrice = document.getElementById('flower-price');

    function updateBasketCount() {
        const basket = JSON.parse(localStorage.getItem('basket')) || [];
        basketCount.textContent = basket.length > 0 ? basket.length : '0';
    }

    function displayFlowerDetails() {
        const basket = JSON.parse(localStorage.getItem('basket')) || [];
        if (basket.length > 0) {
            // Load image from backend using the URL stored in local storage
            flowerImage.src = `http://localhost:8080/flowers/${basket[0].id}/image`;
            flowerName.textContent = basket[0].name;
            flowerPrice.textContent = `$${basket[0].price.toFixed(2)}`;
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        const deliveryDate = document.getElementById('delivery-date').value;
        const purchaseOption = document.getElementById('purchase-option').value;

        let basket = JSON.parse(localStorage.getItem('basket')) || [];
        if (basket.length > 0) {
            basket[0].deliveryDate = deliveryDate;

            if (purchaseOption === "Subscription (Save $10)") {
                basket[0].purchaseOption = "Subscription";
                basket[0].price = Math.max(basket[0].price - 10, 0); // Apply $10 discount
            } else {
                basket[0].purchaseOption = "One-time Purchase";
            }

            localStorage.setItem('basket', JSON.stringify(basket));
        }

        updateBasketCount();
        window.location.href = 'add_delivery_information.html'; // Navigate to the next page
    }

    updateBasketCount();
    displayFlowerDetails();
    basketForm.addEventListener('submit', handleFormSubmit);
});
