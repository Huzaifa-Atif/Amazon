var api = 'https://dummyjson.com/products';

// Cart array to store added products
let cart = [];

// Fetch products from the API
fetch(api)
    .then(res => res.json())
    .then(data => {
        let products = data.products;
        var divTag = document.querySelector(".counts");

        // Loop through the products and display them on the page
        for (let i = 0; i < products.length; i++) {
            divTag.innerHTML += 
            `<div class='card'>
                <img src="${products[i].images[0]}" alt="Product Image">
                <p>${products[i].title}</p>
                <span>$${products[i].price}</span>
                <button class="cart" onclick="addToCart(${i})">Add To Cart</button>
            </div>`;
        }
    });

// Function to handle adding products to the cart
function addToCart(productIndex) {
    fetch(api)
        .then(res => res.json())
        .then(data => {
            let selectedProduct = data.products[productIndex];
            
            // Add the selected product to the cart
            cart.push(selectedProduct);

            // Update the cart quantity display
            document.querySelector('.quantity').innerText = cart.length;
        });
}

// Function to open the cart modal and display added products
function openCartModal() {
    const modal = document.getElementById('cartModal');
    modal.style.display = "block"; // Show the modal

    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = ''; // Clear previous items
    let total = 0; // Initialize total price

    cart.forEach((item, index) => {
        total += item.price; // Calculate total price
        cartItemsDiv.innerHTML += `
            <div>
                <img src="${item.images[0]}" alt="${item.title}" style="width: 100px; height: 100px;">
                <p>${item.title}</p>
                <span>$${item.price}</span>
                <button onclick="removeFromCart(${index})">Delete</button>
            </div>
            <hr>
        `;
    });

    // Display the total price
    document.getElementById('totalPrice').innerText = total.toFixed(2); // Ensure two decimal places
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item from the cart
    openCartModal(); // Refresh the modal to update items and total
}

// Function to close the cart modal
function closeCartModal() {
    document.getElementById('cartModal').style.display = "none";
}

// Add event listener to the cart image to open modal
document.querySelector('.image1').addEventListener('click', openCartModal);




