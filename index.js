// Déclaration Variables
const products = document.getElementById("products");
const getTeddies = fetch('http://localhost:3000/api/teddies');

// Show Teddies -- Création de cartes par produit
getTeddies.then((res) => res.json())
        .then((teddies) => {
        for (let i = 0; i < teddies.length; i++) {
            let name = teddies[i].name;
            let price = teddies[i].price / 100;
            let photo = teddies[i].imageUrl;
            let linkProduct = document.createElement('a');
            linkProduct.className = "linkProduct col-md-5";
            linkProduct.setAttribute('href','product.html?id=' + teddies[i]._id);
            let cardProduct = document.createElement('div');
            cardProduct.className = "cardProduct";
            cardProduct.innerHTML = 
            "<h1>" + name + "</h1>" +
            "<img src='" + photo + "' style='width:90%' />" +
            "<p>" + price + ',00 €' + "</p>";
            document.getElementById("products").appendChild(linkProduct).appendChild(cardProduct);
        }
    });