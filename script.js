// Get the HTML elements
const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const productQuantityInput = document.getElementById("product-quantity");
const addProductButton = document.getElementById("add-product");
const cart = document.getElementById("cart");
const totalPriceSpan = document.getElementById("total-price");
// Remove the $ sign and commas
function getPrice(priceText) {
  const cleanPrice = priceText
    .replace("$", "")
    .replaceAll(",", "")
    .trim();
  return Number(cleanPrice);
}
// Format the price
function formatPrice(price) {
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
// Update the cart total
function updateCartTotal() {
  let cartTotal = 0;
  const cartItems = document.querySelectorAll(".cart-item");
  cartItems.forEach(function (item) {
    const price = Number(item.dataset.price);
    const quantity = Number(item.querySelector(".quantity").value);
    cartTotal = cartTotal + price * quantity;
  });
  totalPriceSpan.textContent = formatPrice(cartTotal);
}

// Update one item's total
function updateItemTotal(cartItem) {
  const price = Number(cartItem.dataset.price);

  const quantity = Number(
    cartItem.querySelector(".quantity").value
  );

  const itemTotal = cartItem.querySelector(".item-total");

  itemTotal.textContent =
    "$" + formatPrice(price * quantity);
}

// Add a new product
function addProduct() {
  const productName = productNameInput.value.trim();
  const productPrice = getPrice(productPriceInput.value);
  const productQuantity = Number(productQuantityInput.value);

  // Check the product name
  if (productName === "") {
    alert("Please enter a product name.");
    return;}

  // Check the product price
  if (productPrice <= 0 || isNaN(productPrice)) {
    productPriceInput.focus();
    return;}

  // Remove the empty cart message
  const emptyMessage = document.querySelector(".empty-message");
  if (emptyMessage) {
    emptyMessage.remove();
  }
  // Create the cart item
  const cartItem = document.createElement("li");
  cartItem.classList.add("cart-item");
  cartItem.dataset.price = productPrice;

  // Create the product information
  const productInfo = document.createElement("span");
  productInfo.classList.add("product-info");
  productInfo.textContent =
    productName + " - $" + formatPrice(productPrice);

  // Create the quantity label
  const quantityLabel = document.createElement("span");
  quantityLabel.textContent = "Quantity:";

  // Create the quantity menu
  const quantitySelect = document.createElement("select");
  quantitySelect.classList.add("quantity");

  for (let number = 1; number <= 10; number++) {

    const option = document.createElement("option");

    option.value = number;
    option.textContent = number;

    if (number === productQuantity) {
      option.selected = true;
    }

    quantitySelect.appendChild(option);
  }

  // Create the item total
  const itemTotal = document.createElement("span");
  itemTotal.classList.add("item-total");

  itemTotal.textContent =
    "$" + formatPrice(productPrice * productQuantity);

  // Create the Edit button
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-button");

  // Create the Remove button
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove-button");

  // Update the quantity
  quantitySelect.addEventListener("change", function () {
    updateItemTotal(cartItem);
    updateCartTotal();
  });
  // Edit the product
  editButton.addEventListener("click", function () {
    editProduct(cartItem, productInfo);
  });

  // Remove the product
  removeButton.addEventListener("click", function () {
    cartItem.remove();
    updateCartTotal();
    showEmptyCart();
  });

  // Add everything to the cart
  cartItem.appendChild(productInfo);
  cartItem.appendChild(quantityLabel);
  cartItem.appendChild(quantitySelect);
  cartItem.appendChild(itemTotal);
  cartItem.appendChild(editButton);
  cartItem.appendChild(removeButton);
  cart.appendChild(cartItem);

  // Clear the form
  productNameInput.value = "";
  productPriceInput.value = "";
  productQuantityInput.value = "1";
  productNameInput.focus();
  updateCartTotal();
}
// Edit the product
function editProduct(cartItem, productInfo) {
  const currentName =
    productInfo.textContent.split(" - $")[0];
  const currentPrice =
    Number(cartItem.dataset.price);
  const newName = prompt(
    "Enter the new product name:",
    currentName );
  if (newName === null || newName.trim() === "") {
    return;}
  const newPriceText = prompt(
    "Enter the new product price:",
    "$" + formatPrice(currentPrice));
  if (newPriceText === null) {
    return;}
  const newPrice = getPrice(newPriceText);
  if (newPrice <= 0 || isNaN(newPrice)) {
    return; }
  // Save the new price
  cartItem.dataset.price = newPrice;

  // Update the product information
  productInfo.textContent =
    newName.trim() + " - $" + formatPrice(newPrice);
  updateItemTotal(cartItem);
  updateCartTotal();}
// Show an empty cart message
function showEmptyCart() {
  const cartItems =
    document.querySelectorAll(".cart-item");
  if (cartItems.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.textContent =
      "Your shopping cart is empty.";
    emptyMessage.classList.add("empty-message");
   cart.appendChild(emptyMessage);
  }
}
// Add a dollar sign
productPriceInput.addEventListener("focus", function () {
  if (productPriceInput.value === "") {
    productPriceInput.value = "$";
  }});
// Format the price
productPriceInput.addEventListener("blur", function () {
  const productPrice =
    getPrice(productPriceInput.value);
  if (productPriceInput.value === "$") {
    productPriceInput.value = "";
  } else if (productPrice > 0) {
    productPriceInput.value =
      "$" + formatPrice(productPrice);
  }
});
// Add a product
addProductButton.addEventListener("click", addProduct);

// Press Enter to add a product
productPriceInput.addEventListener("keydown", function (event) {

  if (event.key === "Enter") {
    addProduct();
  }
});

// Show the empty cart message
showEmptyCart();