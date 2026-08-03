                            Dynamic Shopping Cart
My Project Overview

This project is a Dynamic Shopping Cart created with HTML, CSS, and JavaScript. It allows users to add products to a shopping cart, update product quantities, remove products, and automatically calculate the total price. It demonstrates basic DOM manipulation, event handling, and dynamic content creation using JavaScript.

The Shopping Cart Features:
    Add products with a name and price
    Display products in the shopping cart
    Select and update product quantities
    Edit product names and prices
    Remove products from the cart
    Automatically update the total price
    Basic input validation for empty product names and invalid prices

Technologies I Used:
    HTML
    CSS
    JavaScript

How to Use the Shopping Cart:
    Enter a product name.
    Enter a product price.
    Select the quantity.
    Click the Add Product button.
    Update the quantity if needed.
    Click Edit to change the product name or price.
    Click Remove to delete a product.
    The total price will update  automatically when the cart changes.

Project Files:  
    index.html – Page structure
    styles.css – Styles for the shopping cart
    script.js – JavaScript functionality
    README.md – Project documentation

Reflection Questions:

1. How did you dynamically create and append new elements to the DOM?

I used document.createElement() to create the product list item, product information, quantity selector, item total, Edit button, and Remove button. I used appendChild() to place each element inside the cart item before adding it to the shopping cart.

2. What steps did you take to ensure accurate updates to the total price?

I created an updateCartTotal() function that loops through all of the cart items. It gets each item's price and quantity, multiplies them together, adds the totals, and displays the final amount with two decimal places. This function runs whenever a product is added, edited, removed, or when the quantity changes.

3. How did you handle invalid input for product name or price?

I checked whether the product name was empty before adding it to the cart. I also checked whether the product price was greater than zero and was a valid number. If the information was invalid, the user was asked to enter the correct information before the product could be added.

4. What challenges did you face when implementing the remove functionality?

One challenge was making sure the correct product was removed while keeping the total price accurate. I solved this by adding a click event listener to each Remove button. When the button is clicked, the selected product is removed from the cart, and the updateCartTotal() function recalculates the total automatically.  I also had to figure out how to allow the price to be represented with at dollar sign, comma and allow price values to be represented up to the thousands.  I also wanted to be able to select the quantiy of the item and had to look up how to create the option. 

Author
Dr. Chantell McDowell
Created as part of the Per Scholas Software Engineering Program.# Dynamic_Shopping_Cart