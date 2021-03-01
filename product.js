// Déclaration Variables
const product = document.getElementById("product");
const getTeddies = fetch('http://localhost:3000/api/teddies');
const indice = window.location.search;

// Get Teddies API
getTeddies.then((res) => res.json())
        .then((teddies) => {
            showTeddy(teddies);
})

// Show Teddy --- Création d'une carte pour produit sélectionné avec ID
function showTeddy (teddies) {
    for (let i = 0; i < teddies.length; i++) {
        let id = "?id="+teddies[i]._id;

        if(indice == id){
            let name = teddies[i].name;
            let price = teddies[i].price / 100;
            let photo = teddies[i].imageUrl;
            let desc = teddies[i].description;
            let colors = teddies[i].colors;
            teddies[i].quantity = 0                                   //Ajout quantité pour gestion panier
            let productDetails = document.createElement('div');
            productDetails.className = "productDetails";
            productDetails.innerHTML = 
            "<h1>" + name + "</h1>" + 
            "<img src='" + photo + "'/>" +
            "<p>" + desc + "</p>" +
            '<select id="selectColors" class="form-select"></select>' +
            "<p>" + price + ',00 €' + "</p>" +
            '<button type="button" class="btn btn-secondary" id="btn">Ajouter au Panier</button>';
            document.getElementById("product").appendChild(productDetails);
           
                //Affiche sélécteur de couleurs
                for (let i=0; i<colors.length; i++) {                           
                    let selectColors = document.getElementById("selectColors");
                    let colorsOption = document.createElement('option');
                    colorsOption.textContent = colors[i];
                    selectColors.appendChild(colorsOption);  
                }

            //Ajout du produit au panier au clic sur boutton --- calcul du prix total
            let btn = document.getElementById("btn")  
            btn.addEventListener('click', () => {
                addProduct(teddies[i]);
                //totalCost(teddies[i]);
                alert("Votre Teddy a bien été ajouté au Panier!");
            })

            //Ajout d'un produit au panier
            function addProduct(teddy) {
                let cartProducts = localStorage.getItem('productsInCart');
                cartProducts = JSON.parse(cartProducts);
                if(cartProducts != null) {
                    if(cartProducts[teddy._id] == undefined){
                        cartProducts = {
                            ...cartProducts,
                            [teddy._id]: teddy
                        }
                    }
                    cartProducts[teddy._id].quantity += 1;
                } else {
                    teddy.quantity = 1;
                    cartProducts = {
                        [teddy._id]: teddy
                    }
                }
                localStorage.setItem("productsInCart", JSON.stringify(cartProducts));
            }

            //Calcul du prix total
            /*function totalCost() {
                let cartCost = localStorage.getItem('totalCost');
                if(cartCost != null) {
                    cartCost = parseInt(cartCost);
                    localStorage.setItem('totalCost', cartCost + price);
                } else {
                    localStorage.setItem('totalCost', price);
                }
            }*/

        }
    }
};





