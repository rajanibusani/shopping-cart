console.log("shopping cart")
const carts = document.querySelectorAll(".add-cart");
const noOfCartProducts = document.querySelector(".cart span");

const products = [
    {
        name: "cheesecake",
        tag: "cheesecake",
        price: 100,
        inCart: 0
    },
    {
        name: "carrotcake",
        tag: "carrotcake",
        price: 85,
        inCart: 0
    },
    {
        name: "choclatecake",
        tag: "choclatecake",
        price: 120,
        inCart: 0
    },
    {
        name: "cupcake",
        tag: "cupcake",
        price: 50,
        inCart: 0
    },
    {
        name: "choclatecupcake",
        tag: "choclatecupcake",
        price: 50,
        inCart: 0
    },
    {
        name: "macarons",
        tag: "macarons",
        price: 50,
        inCart: 0
    },
    {
        name: "doughnut",
        tag: "doughnut",
        price: 80,
        inCart: 0
    },
    {
        name: "doughnut1",
        tag: "doughnut1",
        price: 80,
        inCart: 0
    },
    {
        name: "lemontart",
        tag: "lemontart",
        price: 75,
        inCart: 0
    }
]
const keys = Object.keys(products).length;
// console.log(keys)

// adding eventlister to each item
carts.forEach((item, index) => {
    item.addEventListener("click", () => {
        console.log("added to cart")
        // as index of each carts(html tag cart) item is same as products index
        console.log(products[index])
        // fn to update cart items after clicked
        totalItems(products[index]);
        // fn to get  cart items total price
        totalPrice(products[index]);
    })
})

// function to get no of items in the local storage and displaying in cart
const onLoadCartProducts = function () {
    let productNumbers = localStorage.getItem("cart items");
    if (productNumbers) {
        noOfCartProducts.textContent = productNumbers;
    }
}

// function to add object of cartitems to local storage after clicking each item, i.e total no of items clicked
const totalItems = function (product, action) {
    // console.log(product)
    let productNumbers = localStorage.getItem("cart items")
    // console.log(typeof productNumbers)
    // as it returns as a string from localstorage, converting to number
    productNumbers = parseInt(productNumbers);
    if (action === "decrease") {
        localStorage.setItem("cart items", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
    } else if (productNumbers) {
        localStorage.setItem("cart items", productNumbers + 1);
        noOfCartProducts.textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cart items", 1);
        noOfCartProducts.textContent = 1;
    }
    //  function to change products.incart value, whenever user adding more items, and setting local storage products in cart, which is
    // cart items = { product.tag : product}
    setItems(product)
}


function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    // converting to object fro json object.
    cartItems = JSON.parse(cartItems);
    // console.log("inside setItems", product)
    if (cartItems != null) {
        // for adding the other item than the first one in the cart items and increasing incart value
        if (cartItems[product.tag] === undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        // increasing incart value in cartitems[product.tag]
        cartItems[product.tag].inCart += 1;
    } else {
        // for the first item
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

// adding totalprice of the cart items to local storage
function totalPrice(product, action) {
    let totalPrice = localStorage.getItem("totalPrice");
    if (action === "decrease") {
        totalPrice = parseInt(totalPrice);
        localStorage.setItem("totalPrice", totalPrice - product.price);
    } else if (totalPrice != null) {
        totalPrice = parseInt(totalPrice);
        // console.log(totalPrice + product.price)
        localStorage.setItem("totalPrice", totalPrice + product.price)
    } else {
        // console.log(totalPrice)
        localStorage.setItem("totalPrice", product.price)
    }
}
// function to display products in cart.html by using productsInCart from local storage
function displaycart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    console.log(cartItems)
    // for basket total price
    let totalPrice = localStorage.getItem("totalPrice");
    // to display shopping products 
    let productsIncart = document.querySelector(".products");
    if (cartItems && productsIncart) {
        productsIncart.innerHTML = "";
        // getting only product object from cartitems
        let cartItemsArray = Object.values(cartItems);
        console.log(Object.values(cartItems))
        //mapping of each item
        cartItemsArray.map(item => {
            // for each product in cart
            productsIncart.innerHTML += `
            <div class= "product">
            <ion-icon class="remove-button" name = "close-circle"></ion-icon>
            <img src="./img/${item.tag}.jpg">
            <span>${item.name}</span>
            </div>
            <div class= "price"> ${item.price}</div>
            <div class= "quantity">
            <ion-icon  class = "increase" name="add-circle-outline"></ion-icon>                     
            <span>${item.inCart}</span>
            <ion-icon  class = "decrease" name="remove-circle-outline"></ion-icon>            
            </div>
            <div class= "total">
            ${item.inCart * item.price}
            </div>
            `;
        });
        console.log(totalPrice)
        // for basket total in cart.html
        productsIncart.innerHTML += `
        <div class= "basketTotalContainer">
        <h4 class= "basketTotalTitle"> Basket Total </h4>
        <h4 class= "basketTotal"> ${totalPrice}.00</h4>        
        </div>
        `;
    }
    changingQuantityOfCartItems();
    RemoveCartItem();


}

function changingQuantityOfCartItems() {
    // to get specific product and qty for + and - buttons
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    // to decrease the qty with -
    let decreaseButtons = document.querySelectorAll('.decrease');

    decreaseButtons.forEach((decreaseButton) => {
        decreaseButton.addEventListener('click', () => {
            // to get specific product and qty and  for - button
            currentQuantity = decreaseButton.parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButton.parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent
            console.log(currentProduct, cartItems[currentProduct]);

            if (cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                totalItems(cartItems[currentProduct], "decrease");
                totalPrice(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displaycart();
            }
        });
    })
    // to increase the qty with +
    let increaseButtons = document.querySelectorAll('.increase');
    increaseButtons.forEach((increaseButton) => {
        increaseButton.addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButton.parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButton.parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent
            console.log(currentProduct);
            console.log(cartItems[currentProduct])
            cartItems[currentProduct].inCart += 1;
            totalItems(cartItems[currentProduct]);
            totalPrice(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            // caaling displayCart() to update the changes
            displaycart();

        });
    })
}

function RemoveCartItem() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cart items');
    let cartCost = localStorage.getItem("totalPrice");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(productNumbers);

    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', () => {

            productName = deleteButton.parentElement.textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(productName, cartItems[productName]);
            localStorage.setItem('cart items', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalPrice', cartCost - (cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displaycart();
            onLoadCartProducts();
        })
    })
}


// calling displaycart for cart.html to display shopped products
displaycart();
// calling onloadCartProducts function 
onLoadCartProducts()

