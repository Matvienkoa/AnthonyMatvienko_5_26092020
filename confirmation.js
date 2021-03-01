// Déclaration Variables
let cartCost = localStorage.getItem('totalCost');
let totalOrder = document.getElementById('totalOrder');
let orderNumber = document.getElementById('orderId');

// Affiche prix total de commande
function showTotalOrder () {
    totalOrder.innerHTML += ` ${cartCost},00 €` 
};

// Affiche ID Commande retourné par API
function showCommandId () {
    const commandId = new URL(location.href).searchParams.get("orderId");
    orderNumber.innerHTML += ` ${commandId}`
};

showTotalOrder();
showCommandId ();

