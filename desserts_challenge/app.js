//create an object to hold individual cart items
const cart = {};

//select all the cards to collect individual information
const cards = document.querySelectorAll(".card");

//Loop through each card to define logic for each card

cards.forEach((card) => {
  //get the name of the dessert
  const item_name = card.querySelector("#item--title p").textContent;

  //get the price of the dessert and convert it to a floating point number
  const item_price = parseFloat(
    card.querySelector(".pricing p").textContent.replace("$", "")
  );

  // Get the + and - buttons, and the quantity display span
  const incBtn = card.querySelector(".inc");
  const decBtn = card.querySelector(".dec");
  const quantityDisplay = card.querySelector(".counter");

  //event lister for the increment button
  incBtn.addEventListener("click", () => {
    //check if the item already exists in the cart, if not, initialize it
    if (!cart[item_name]) {
      cart[item_name] = {
        price: item_price,
        quanity: 0,
      };
    }
    cart[item_name].quanity++;

    quantityDisplay.textContent = cart[item_name].quanity;
    console.log(cart);

    updateCart();
  });
  //event lister for the decrement button
  decBtn.addEventListener("click", () => {
    //check if the item already exists in the cart, if not, initialize it
    if (!cart[item_name]) {
      cart[item_name] = {
        price: item_price,
        quanity: 0,
      };
    }
    //check if the quantity is greater than 0 before decrementing
    if (cart[item_name].quanity > 0) {
      cart[item_name].quanity--;
    }
    quantityDisplay.textContent = cart[item_name].quanity;
    updateCart();
  });
});

updateCart = () => {
  // Select the cart container where items will be displayed
  const cartContainer = document.querySelector(".cart");

  // Clear existing cart content to avoid duplicates
  cartContainer.innerHTML = "";

  // Get reference to cart total element
  const totalContainer = document.querySelector(".total");

  // Get reference to the cart count in the heading
  const cartCount = document.querySelector(".cart--number");

  let total = 0;
  let totalItems = 0;
  itemChecker = false;
  // Update the cart count in the heading

  for (let item in cart) {
    if (cart[item].quantity === 0) {
      continue;
    }
    //Shows that there is at least one item in the cart
    itemChecker = true;

    const itemTotal = cart[item].quanity * cart[item].price;
    total += itemTotal;
    totalItems += cart[item].quanity;

    //create .content div
    const content = document.createElement("div");
    content.classList.add("content");

    content.innerHTML = ` <div class="order">
        <p>${item}</p>
        <div class="order--price">
          <p>${cart[item].quanity}x</p>
          <p>@${cart[item].price.toFixed(2)}</p>
          <p>$${itemTotal.toFixed(2)}</p>
        </div>
      </div>
      <div class="remove">
        <button class="cart--remove" data-item="${item}">x</button>
      </div>
      `;

    cartContainer.appendChild(content);
  }

  // If there are no items, show an empty cart message instead
  if (!itemChecker) {
    const emptyMsg = document.createElement("div");
    emptyMsg.classList.add("empty--msg");
    emptyMsg.textContent = "Your cart is empty. Add something!";
    cartContainer.appendChild(emptyMsg);

    // Hide total and reset cart count
    totalContainer.style.display = "none";
    cartCount.textContent = "(0)";
    return;
  }
  // If there are items, show the total container
  totalContainer.style.display = "block";

  // Update cart count in the header
  cartCount.textContent = `(${totalItems})`;

  // Update the total HTML content
  totalContainer.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;

  // Set up remove buttons for each cart item
  const removeButtons = document.querySelectorAll(".cart--remove");
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemName = btn.dataset.item;
      // Set quantity to 0 and update UI
      delete cart[itemName];
      // Remove the item from the cart display
      updateCart();
      // Also reset the quantity display on the card
      document.querySelectorAll(".card").forEach((card) => {
        const name = card.querySelector("#item--title p").textContent;
        if (name === itemName) {
          card.querySelector(".counter").textContent = "0";
        }
      });
    });
  });
};
