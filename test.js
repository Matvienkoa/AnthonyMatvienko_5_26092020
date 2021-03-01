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
         /*if(cartItems.value == undefined){
             localStorage.removeItem('productsInCart');
         }*/
     })
 }