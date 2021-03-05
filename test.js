let cartIcon = document.getElementById('fa-shopping-cart');
let cartItems = localStorage.getItem("productsInCart");

function colorCartItem () {
    if(cartItems){
        cartIcon..classList.add('cartColor');
    }
}