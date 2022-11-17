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
    var inputElem = document.getElementsByTagName('input');
    for(var i = 0; i < inputElem.length; i++) {
    
        inputElem[i].addEventListener('change', function(){
        var test = getParentNode(this,4)
        //Recupération de l'id pour mettre a jour local storange si changement de quanttité
        console.log(test.dataset.id)
        console.log(test)
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
