/*
*Récupération des produits, puis création des éléments HTML permettant de les afficher
*@param { Object[] } value
*@param { String[] } value[].colors
*@param { String } value[]._id
*@param { String } value[].name
*@param { Number } value[].price
*@param { String } value[].imgUrl
*@param { String } value[].description
*@param { String } value[].altTxt
*/
fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(value) {
    // Recherche de l'élément dans lequel seront placés les produits
    var target_Elmt = document.getElementById('cart__items');

    console.log("getting data from local storage");
    var product_Array = []

    var Total_price = 0;

    console.log(localStorage.length)

    for (var i = 0, len = localStorage.length; i < len; i++) {
        var newArr = JSON.parse(window.localStorage.getItem(localStorage.key(i)));
        console.log(newArr)
        product_Array.push(newArr)

    }
    for (var i = 0; i < product_Array.length; i++) {
        // Recherche du produit ayant l'id demandé
        for (let key in value) {

            // Si l'id est égal à l'id demandé
            if (value[key]._id === product_Array[i].id) {
                console.log(value[key]);
                console.log(product_Array[i].colors)
                // Création de la balise <img>
                var Element_image = document.createElement("img");

                // Assignation d'une source à la balise <img>
                Element_image.src = value[key].imageUrl;

                // Assignatiion du alt à la balise <img>
                Element_image.alt = value[key].altTxt;

                // Div contenant l'image
                var Image_container = document.createElement("div");
                Image_container.classList.add("cart__item__img");
                Image_container.appendChild(Element_image)

                //Création de la description du produit
                // Assignation du nom du canapé dans la balise <h2>
                var name = document.createTextNode(value[key].name)
                // Création d'une balise <h2> pour le nom du canapé
                var Element_name = document.createElement("h2");
                Element_name.appendChild(name)

                // Assignation de la couleur du canapé dans la balise <p>
                var color = document.createTextNode(product_Array[i].colors)
                // Création d'une balise <P> pour le nom du canapé
                var Element_color = document.createElement("p");
                Element_color.appendChild(color)

                // Assignation du prix du canapé dans la balise <p>
                var price = document.createTextNode(value[key].price + "€")
                // Création d'une balise <p> pour le nom du canapé
                var Element_price = document.createElement("p");
                Element_price.appendChild(price)

                // Div contenant la description
                var Description_container = document.createElement("div");
                Description_container.classList.add("cart__item__content__description");

                // Remplissage de la description
                Description_container.appendChild(Element_name);
                Description_container.appendChild(Element_color);
                Description_container.appendChild(Element_price);

                //Création des paramètres de quantité
                var quantity_text = document.createTextNode("Qté : ")
                // Création d'une balise <p> pour le texte quantité
                var Element_quantity_text = document.createElement("p");
                Element_quantity_text.appendChild(quantity_text);
                // Input quantité
                var quantity_input = document.createElement("input")
                quantity_input.setAttribute("type","number");
                quantity_input.setAttribute("class","itemQuantity");
                quantity_input.setAttribute("name","itemQuantity");
                quantity_input.setAttribute("min","1");
                quantity_input.setAttribute("max","100");
                quantity_input.value = product_Array[i].quantity;

                // Création du conteneur de parametre de quantité
                var quantity_setting_container = document.createElement("div");
                quantity_setting_container.classList.add("cart__item__content__settings__quantity");
                quantity_setting_container.appendChild(Element_quantity_text);
                quantity_setting_container.appendChild(quantity_input);

                //Création des paramètres de suppression d'un produit
                var delete_text = document.createTextNode("Supprimer")
                // Création d'une balise <p> pour le texte supprimer
                var Element_delete_text = document.createElement("p");
                Element_delete_text.classList.add("deleteItem");
                Element_delete_text.appendChild(delete_text);

                // Création du conteneur de parametre de suppression
                var delete_setting_container = document.createElement("div");
                delete_setting_container.classList.add("cart__item__content__settings__delete");
                delete_setting_container.appendChild(Element_delete_text);

                // Création du conteneur de paramètre
                var setting_container = document.createElement("div");
                setting_container.classList.add("cart__item__content__settings");
                setting_container.appendChild(quantity_setting_container);
                setting_container.appendChild(delete_setting_container);

                // Creation du conteneur du descriptif et des paramètre
                var card_content_container = document.createElement("div");
                card_content_container.classList.add("cart__item__content");
                card_content_container.appendChild(Description_container);
                card_content_container.appendChild(setting_container);

                // Création de la balise <article> contenu le produit
                var article_item = document.createElement("article");
                article_item.classList.add("cart__item");
                article_item.setAttribute("data-id", product_Array[i].id)
                article_item.setAttribute("data-color",product_Array[i].colors)
                article_item.appendChild(Image_container);
                article_item.appendChild(card_content_container);

                // Affichage dans le HTML
                target_Elmt.appendChild(article_item);

                // Prix total des canapés
                Total_price = Total_price + (value[key].price*product_Array[i].quantity)
                

            }
        }
    }

    //Création du total de produit
    var total_product_count = document.createTextNode(localStorage.length);
    var totalproduct = document.getElementById("totalQuantity")
    totalproduct.appendChild(total_product_count)

    //Création du prix total
    var total_product_price = document.createTextNode(Total_price);
    var totalproduct_price = document.getElementById("totalPrice")
    totalproduct_price.appendChild(total_product_price)

    // Mise à l'écoute de inputs de quantités
    var inputElem = document.getElementsByClassName('itemQuantity');
    for(var i = 0; i < inputElem.length; i++) {
        // SI il y a un changement 
        inputElem[i].addEventListener('change', function(){
        // Récupération de la Node parent ou est stocké l'id et la couleur
        var getNode = getParentNode(this,4)
        console.log(this.value)
        //Recupération de l'id pour mettre a jour local storage si changement de quantité
        console.log(getNode.dataset.id)
        console.log(getNode.dataset.color)
        // C réation de l'id pour modifié le local storage concerné
        var storageId = getNode.dataset.id + "//" + getNode.dataset.color
        var monobjet_json = localStorage.getItem(storageId)
        //console.log(test)
        var monobjet = JSON.parse(monobjet_json);
        console.log(monobjet)
        // Modification de la quantité
       var new_quantity = this.value
            var canape  = {
                id : getNode.dataset.id,
                quantity : new_quantity,
                colors : getNode.dataset.color
            };
        var canape_json = JSON.stringify(canape);
        localStorage.setItem(storageId,canape_json);

        updateTotalPrice();

        
    }, false);
}

    // Mise à l'écoute des bouttons supprimé
    var deleteElem = document.getElementsByClassName('deleteItem');
    for(var i = 0; i < deleteElem.length; i++) {
        // SI il y a un element cliqué
        deleteElem[i].addEventListener('click', function(){
        // Récupération de la Node parent ou est stocké l'id et la couleur
        var getNode = getParentNode(this,4)
        console.log(getNode)
        var storageId = getNode.dataset.id + "//" + getNode.dataset.color

        let text = "Voulez-vous vraiment supprimmer ce produit";
        if (confirm(text) == true) {
            alert("Produit supprimé")
            deleteProduct(storageId)
            const el1 = document.querySelector('[data-id="'+ getNode.dataset.id+'"]');
            while (el1.firstChild) {
                el1.removeChild(el1.firstChild);
            }
            updateTotalPrice()
        } else {
            alert("Aucun produit supprimé");
        }

    }, false);
}


var inputsElement = document.querySelectorAll('.cart__order__form__question input');
console.log(inputsElement)
 for(i=0; i<inputsElement.length; i++){
        inputsElement[i].addEventListener('change', function(){
        formValidity(this.id, this.value)

    }, false);
 }



})
.catch(function(err) {
// Une erreur est survenue
});



function getParentNode(element, level = 1) { // 1 - default value (if no 'level' parameter is passed to the function)
    while (level-- > 0) {
      element = element.parentNode;
      if (!element) return null; // to avoid a possible "TypeError: Cannot read property 'parentNode' of null" if the requested level is higher than document
    }
    return element;
}

function updateTotalPrice(){
    fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        console.log("getting data from local storage");
    var product_Array = []

    var Total_price = 0;

    console.log(localStorage.length)

    for (var i = 0, len = localStorage.length; i < len; i++) {
        var newArr = JSON.parse(window.localStorage.getItem(localStorage.key(i)));
        console.log(newArr)
        product_Array.push(newArr)

    }
    for (var i = 0; i < product_Array.length; i++) {
        // Recherche du produit ayant l'id demandé
        for (let key in value) {

            // Si l'id est égal à l'id demandé
            if (value[key]._id === product_Array[i].id) {
                console.log(value[key]);
                console.log(product_Array[i].quantity)
                Total_price = Total_price + (product_Array[i].quantity*value[key].price)
            }
        }
    }

    console.log(Total_price)
     //Modification du prix total
     var totalproduct_price = document.getElementById("totalPrice")
     totalproduct_price.innerHTML = Total_price

     var totalproduct = document.getElementById("totalQuantity")
    totalproduct.innerHTML = localStorage.length

    })
    .catch(function(err) {
    // Une erreur est survenue
    });
}

function deleteProduct(product_id){
    localStorage.removeItem(product_id);
    console.log("produit avec l'id " + product_id + " supprimé")
}

function formValidity(id,content){
    switch(id){
        case "lastName":
            if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(content)) {
                return true;
              } else {
                let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
                lastNameErrorMsg.innerText = "Merci de vérifier le nom, 3 caractères minimum, avec des lettres uniquement";
              }
        break;
        case "firstName":
            if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(content)) {
                return true;
              } else {
                let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
                firstNameErrorMsg.innerText = "Merci de vérifier le prénom, 3 caractères minimum";
              }
            break;
        case "email":
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content)) {
                return true;
              } else {
                let emailErrorMsg = document.getElementById('emailErrorMsg');
                emailErrorMsg.innerText = "Erreur ! Email non valide";
              }   
            break;
        
            case "city" :
                if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,10}$/.test(content)) {
                    return true;
                  } else {
                    let cityErrorMsg = document.getElementById('cityErrorMsg');
                    cityErrorMsg.innerText = "Merci de vérifier le nom de la ville, 3 caractères minimum, avec des lettres uniquement";
                  }
                break;
            
            
    }
}

function postForm() {
    const order = document.getElementById('order');
  order.addEventListener('click', (event) => {
  event.preventDefault();
    const contact = {
        firstName : document.getElementById('firstName').value,
        lastName : document.getElementById('lastName').value,
        address : document.getElementById('address').value,
        city : document.getElementById('city').value,
        email : document.getElementById('email').value
    }

    console.log("getting data from local storage");
    var product_Array = []


    console.log(localStorage.length)

    for (var i = 0, len = localStorage.length; i < len; i++) {
        var newArr = JSON.parse(window.localStorage.getItem(localStorage.key(i)));
        console.log(newArr)
        product_Array.push(newArr)

    }

    var products = []
    for (i=0; i<product_Array.length; i++){
        products.push(product_Array[i].id)
    }
    console.log(products)
    alert(products)
    
    const sendFormData = {
        contact,
        products,
      }

      alert(sendFormData)
    
      // j'envoie le formulaire + localStorage (sendFormData) 
      // ... que j'envoie au serveur
    
      const options = {
        method: 'POST',
        body: JSON.stringify(sendFormData),
        headers: { 
          'Content-Type': 'application/json',
        }
      };
    
      fetch("http://localhost:3000/api/products/order", options)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('orderId', data.orderId);
            
              document.location.href = 'confirmation.html?id='+ data.orderId;
            
        });
    });
} 
postForm()


