/*
*Récupération d'un produit particulié par le bias de l'url, puis création des éléments HTML permettant de l'afficher
*/

// Récupération de l'url
var url = window.location.href

// Récupération de l'id du produit dans l'url
var product_id = url.match(/id=(.*$)/)[1];

fetch("http://localhost:3000/api/products/" + product_id)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        // Changement du titre de la page par le nom du produit
        document.title = value.name

        display(value)
        
    })
    .catch(function(err) {
    // Une erreur est survenue
    });     

// Event listener pour la quantité de canapé choisis
document.getElementsByName("itemQuantity")[0].addEventListener('change', checkQuantity);
document.getElementById("addToCart").addEventListener('click', addToCart);
// Récupération de la quantité

// Fonction permettant de controler la quantité
function checkQuantity(){
    var Max_Quantity = document.getElementsByName("itemQuantity")[0].max;

    // Controlleur de quantité
    if(parseInt(this.value) <= parseInt(Max_Quantity)){
        console.log("Quantité comprise entre 1 et 100")
    }
    else if(parseInt(this.value) === 0){
        alert(this.value + " est inférieur à la quantité minimal")
    }
    else {
        alert(this.value + " est supérieur à la quantité max :" + Max_Quantity)
    }
}

// Fonction permettant d'afficher le produit
async function display(value){
    // Localisation de l'élement stockant l'image du canapé
    var target_image_Element = document.getElementsByClassName('item__img')[0];

    // Création de la balise <img>
    var image_Element = document.createElement("img");
    // Ajout du chemin de l'image
    image_Element.src = value.imageUrl;
    // Ajout de son texte alternatif
    image_Element.alt = value.altTxt;
    // Placement de l'image dans le HTML
    target_image_Element.appendChild(image_Element);

    // Localisation de l'élement stockant le titre du canapé
    var title_Element = document.getElementById("title");

    // Création du titre du canapé
    var title = document.createTextNode(value.name)
    title_Element.appendChild(title)

    // Localisation de l'élement stockant le prix du canapé
    var price_Element = document.getElementById("price");

    // Création du prix du canapé
    var price = document.createTextNode(value.price)
    price_Element.appendChild(price)

    // Localisation de l'élement stockant la description du canapé
    var description_Element = document.getElementById("description");
    // Création de la description du canapé
    var description = document.createTextNode(value.description)
    description_Element.appendChild(description)

    // Localisation de l'élement stockant les couleurs du canapé
    var colors_selection_Element = document.getElementById("colors");

    // Pour chaque couleur
    for (i = 0; i < value.colors.length; i++){
        // Création d'un balise <option>
        var color_option = document.createElement("option");
        // Remplisage de la liste des couleurs
        color_option.value = value.colors[i];
        color_option.text = value.colors[i];
        colors_selection_Element.add(color_option, null);
    }
}
// Fonction d'ajout de l'article au panier
function addToCart(){
    

    // Récupération de la quantité
    var quantity = document.getElementsByName("itemQuantity")[0].value
    if(parseInt(quantity) === 0){
        alert("La quantité doit être comprise entre 1 et 100")
    }

    // Récupération de la couleur
    var color_element = document.getElementById("colors");
    var color_value = color_element.value;

    
    // Vérification qu'une couleur est selectionnée
    if(!color_value){
        alert("selectionnez une couleur")
    }
    else{
        // Préparation du stackage des produits commandés
        var storageId = product_id +"//" + color_value
        

        // On vérifie si le produit est déja dans le localStorage
        if (localStorage.getItem(storageId) !== null) {
            var monobjet_json = localStorage.getItem(storageId);
            var monobjet = JSON.parse(monobjet_json);

            // Si il est déjà présent on modifie sa quantité
            var new_quantity = parseInt(monobjet.quantity) + parseInt(quantity)
                var canape  = {
                    id : product_id,
                    quantity : new_quantity,
                    colors : color_value
                };
                var canape_json = JSON.stringify(canape);
                localStorage.setItem(storageId,canape_json);
            
        // sinon on l'import dans le storage
        } else {
            var canape  = {
                id : product_id,
                quantity : quantity,
                colors : color_value
            };
            var canape_json = JSON.stringify(canape);
            localStorage.setItem(storageId,canape_json);
            alert("Le produit a été ajouté au panier")
        }
        
    }

    
}

