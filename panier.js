// Déclaration Variables
let cartItems = localStorage.getItem("productsInCart");
cartItems = JSON.parse(cartItems);
let productsInCart = document.getElementById("products-in-cart");
let cartCost = localStorage.getItem('totalCost');
let totalCost = document.getElementById('totalCost');
total = 0

//Affichage des produits dans le panier
function displayCart() {
    if(cartItems && productsInCart) {
        productsInCart.innerHTML = '';
        Object.values(cartItems).map(item => {
            total = total + (item.price*item.quantity) / 100;
            productsInCart.innerHTML += 
            `<tr>
                <td scope="row" data-label="Produits" id="produits"><i data-id=${item._id} class="fas btn fa-trash col-1"></i>
                <img src=${item.imageUrl} alt=""/> ${item.name} </td>
                <td data-label="Prix"> ${item.price / 100},00 € </td>
                <td data-label="Quantité"><i class="fas fa-minus"></i>          ${item.quantity}          <i class="fas fa-plus"></i></td>
                <td data-label="Total">${item.quantity * item.price /100},00 €</td>
            </tr>`
        })

        //Affichage du prix total
        totalCost.innerHTML = '';
        totalCost.innerHTML +=
        `
        <h5>Panier Total : ${total},00 €</h5>
        <button type="button" class="btn btn-secondary" id="btnbasket">Valider le Panier</button>
        `

        //Affiche formulaire au click validation du panier
        let form = document.getElementById("formcontact");
        let btnbasket = document.getElementById("btnbasket");
        btnbasket.addEventListener('click', () => {
            form.classList.add('showformcontact');
        })

        //Suppression d'un produit du panier
        let btnDeleteTeddy = document.getElementsByClassName('fa-trash')
        for (let i = 0 ; i < btnDeleteTeddy.length; i++) {
            btnDeleteTeddy[i].addEventListener('click' , () => {  
                for (let teddy in cartItems) {                  
                    if (teddy == btnDeleteTeddy[i].dataset.id){
                        Reflect.deleteProperty(cartItems, teddy);
                        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
                        window.location.reload(true);
                    }
                }
            })  
        }
    // Si pas de produits dans le panier, affiche sélection vide
    } 
    else{
        document.getElementById('noproduct').innerHTML += "<p>Votre Sélection est vide</p>"
    }
}

displayCart();

// Envoi de la commande à l'API si formulaire validé
document.getElementById("formcontact").addEventListener("submit", (e) => {
    e.preventDefault();
    sendOrder()
})     

// Envoi de la commande (array des ID) + objet contact à l'API
function sendOrder() {
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;
    const products = Object.values(cartItems).map(item => {
        return item._id
    })
    const order = {
        contact : {
            firstName : firstname,
            lastName : lastname,
            address : address,
            city : city,
            email : email
        },
        products : products
    };
    const myInit = {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
    }
    fetch("http://localhost:3000/api/teddies/order", myInit)
    .catch(() => {alert(error)})
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      window.location.href = `${window.location.origin}/confirmation.html?orderId=${json.orderId}`
    });
}



