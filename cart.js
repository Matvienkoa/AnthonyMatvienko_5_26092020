// Déclaration Variables
let cartItems = localStorage.getItem("productsInCart");
cartItems = JSON.parse(cartItems);
let productsInCart = document.getElementById("products-in-cart");
let totalCost = document.getElementById('totalCost');
let deleteCard = document.getElementById('deleteCard');
total = 0                                                               //Initialisation du prix total

//Affichage des produits dans le panier, prix total par produit et quantité
//Si Produit dans le panier, affichage du boutton pour valider le panier et afficher le formulaire de contact
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
                <td data-label="Quantité"><i data-id=${item._id} class="fas fa-minus"></i>${item.quantity}<i data-id=${item._id} class="fas fa-plus"></i></td>
                <td data-label="Total">${item.quantity * item.price /100},00 €</td>
            </tr>`
        })

        //Gestion quantité
        //Ajout
        let btnPlus = document.getElementsByClassName('fa-plus');
        for (let i=0 ; i < btnPlus.length; i++) {
            btnPlus[i].addEventListener('click' , () => {
                Object.values(cartItems).map(teddy => {
                    if (teddy._id == btnPlus[i].dataset.id) {
                        teddy.quantity += 1;
                        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
                        window.location.reload(true);
                    }
                })
            })
        }
        //Retrait
        let btnMinus = document.getElementsByClassName('fa-minus');
        for (let i=0 ; i < btnMinus.length; i++) {
            btnMinus[i].addEventListener('click' , () => {
                Object.values(cartItems).map(teddy => {
                    if (teddy._id == btnMinus[i].dataset.id && teddy.quantity > 1) {
                        teddy.quantity -= 1
                        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
                        window.location.reload(true);                           
                    }
                })
            })
        }


        //Suppression d'un produit du panier (suppression d'un produit du localStorage au click sur boutton)
        let btnDeleteTeddy = document.getElementsByClassName('fa-trash');
        for (let i = 0 ; i < btnDeleteTeddy.length; i++) {
            btnDeleteTeddy[i].addEventListener('click' , () => {  
                for (let teddy in cartItems) {                  
                    if (teddy == btnDeleteTeddy[i].dataset.id){
                        Reflect.deleteProperty(cartItems, teddy);
                        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
                        window.location.reload(true);
                    }
                }
                if(Object.values(cartItems).length == 0){                           //Si 0 produit dans le panier, supprime le localStorage
                    localStorage.removeItem("productsInCart");
                }
            })  
        }

        //Affichage du Boutton "Vider le panier"
        deleteCard.innerHTML = '';
        deleteCard.innerHTML +=
        '<i class="fas fa-trash deleteTrash"></i><button type="button" class="btn btn-danger" id="btnDeleteCard">Vider le Panier</button>'

        //Vider le panier
        btnDeleteCard.addEventListener('click', () => {
            localStorage.removeItem("productsInCart");
            localStorage.removeItem("totalPrice");
            window.location.reload(true);
        })

        //Affichage du prix total du panier
        totalCost.innerHTML = '';
        totalCost.innerHTML +=
        `
        <h5>Panier Total : ${total},00 €</h5>
        <button type="button" class="btn btn-secondary" id="btnbasket">Valider le Panier</button>
        `

        //Affichage du formulaire au click sur boutton "Valider le Panier"
        let form = document.getElementById("formcontact");
        let btnbasket = document.getElementById("btnbasket");
        btnbasket.addEventListener('click', () => {
            form.classList.add('showformcontact');
            localStorage.setItem("totalPrice", JSON.stringify(total));
        })

    // Si 0 produit dans le panier, affiche "sélection vide"
    } 
    else{
        document.getElementById('noproduct').innerHTML += "<p>Votre Sélection est vide</p>"
    }
}

displayCart();

// Envoi de la commande à l'API si formulaire validé (via HTML et pattern)
document.getElementById("formcontact").addEventListener("submit", (e) => {
    e.preventDefault();
    sendOrder()
})     

// Envoi de la commande (array des ID) + objet contact à l'API
function sendOrder() {
    const firstname = document.getElementById("firstName").value;
    const lastname = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;
    const products = Object.values(cartItems).map(item => {
        return item._id
    })
    const order = {                                         //Objet contact
        contact : {
            firstName : firstname,
            lastName : lastname,
            address : address,
            city : city,
            email : email
        },
        products : products                                 //array product_id
    };

    //configuration méthode POST
    const myInit = {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
    }

    //Envoi de la commande au serveur
    fetch("http://localhost:3000/api/teddies/order", myInit)
    .catch(() => {alert(error)})
    .then((response) => response.json())
    .then((json) => {
      window.location.href = `${window.location.origin}/confirmation.html?orderId=${json.orderId}`
    });
}
