/*
*Récupération d'un produit particulié par le bias de l'url, puis création des éléments HTML permettant de l'afficher
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
        // Récupération de l'url
        var url = window.location.href

        // Récupération de l'id du produit dans l'url
        var product_id = url.match(/id=(.*$)/)[1];

        // Recherche du produit ayant l'id demandé
        let foundProduct = null;
        for (let key in value) {

            // Si l'id est égal à l'id demandé
            if (value[key]._id === product_id) {
                foundProduct = value[key];

                // Changement du titre de la page par le nom du produit
                document.title = foundProduct.name

                // Localisation de l'élement stockant l'image du canapé
                var target_img_Elmt = document.getElementsByClassName('item__img')[0];

                // Création de la balise <img>
                var Element_image = document.createElement("img");
                // Ajout du chemin de l'image
                Element_image.src = foundProduct.imageUrl;
                // Ajout de son texte alternatif
                Element_image.alt = foundProduct.altTxt;
                // Placement de l'image dans le HTML
                target_img_Elmt.appendChild(Element_image);

                // Localisation de l'élement stockant le titre du canapé
                var Element_title = document.getElementById("title");

                // Création du titre du canapé
                var title = document.createTextNode(foundProduct.name)
                Element_title.appendChild(title)

                // Localisation de l'élement stockant le prix du canapé
                var Element_price = document.getElementById("price");

                // Création du prix du canapé
                var price = document.createTextNode(foundProduct.price)
                Element_price.appendChild(price)

                // Localisation de l'élement stockant la description du canapé
                var Element_description = document.getElementById("description");
                // Création de la description du canapé
                var description = document.createTextNode(foundProduct.description)
                Element_description.appendChild(description)

                // Localisation de l'élement stockant les couleurs du canapé
                var sel = document.getElementById("colors");

                // Compteur de couleur
                var colors_count = foundProduct.colors.length

                // Pour chaque couleur
                for (i = 0; i < colors_count; i++){
                    // Création d'un balise <option>
                    const opt = document.createElement("option");
                    // Remplisage de la liste des couleurs
                    opt.value = foundProduct.colors[i];
                    opt.text = foundProduct.colors[i];
                    sel.add(opt, null);
                }
                
            }
            
            
        }
        
    })
    .catch(function(err) {
    // Une erreur est survenue
    });     

// Event listener pour la quantité de canapé choisis
document.getElementsByName("itemQuantity")[0].addEventListener('change', checkQuantity);
document.getElementById("addToCart").addEventListener('click', addToCart);
// Récupération de la quantité
function checkQuantity(){
    var Max_Quantity = document.getElementsByName("itemQuantity")[0].max;

    // Controlleur de quantité
    if(parseInt(this.value) <= parseInt(Max_Quantity)){
        console.log("Quantité comprise entre 1 et 100")
    }
    else{
        alert(this.value + " est supérieur à la quantité max :" + Max_Quantity)
    }
}

function addToCart(){
    
    console.log("test")
    // Récupération de l'url
    var url = window.location.href

    // Récupération de l'id du produit dans l'url
    var product_id = url.match(/id=(.*$)/)[1];  

    // Récupération de la quantité
    var quantity = document.getElementsByName("itemQuantity")[0].value

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

        // On véridifie si le produit est déja dans le localStorage
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
        }
        
    }

    
}

