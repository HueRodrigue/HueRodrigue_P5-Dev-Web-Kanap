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
    var target_Elmt = document.getElementById('items');

    // Grandeur du tableau de produit
    var product_count = value.length;

    // Pour chaque produit
    for (i = 0; i < product_count-1; i++){

        // Création de la balise <a>
        var Element_clickable = document.createElement("a");

        // Création de son attribut "href"
        var href_product = "./product.html?id=" + value[i]._id;

        // Assignation de l'attribut "href" à la balise <a>
        Element_clickable.setAttribute('href', href_product);

        // Création de la balise <article>
        var Element_article = document.createElement("article");

        // Création de la balise <img>
        var Element_image = document.createElement("img");

        // Assignation d'une source à la balise <img>
        Element_image.src = value[i].imageUrl;

        // Assignatiion du alt à la balise <img>
        Element_image.alt = value[i].altTxt;

        // Création d'une balise <h3> pour le nom du canapé
        var Element_name = document.createElement("h3");

        // Assignation d'une classe à la balise <h3>
        Element_name.classList.add("productName");
        
        // Assignation du nom du canapé dans la balise <h3>
        var name = document.createTextNode(value[i].name)
        Element_name.appendChild(name)
        
        // Création d'une balise <p> pour la description du canapé
        var Element_description = document.createElement("p");

        // Assignation d'une classe à la balise <p>
        Element_description.classList.add("productDescription");

        // Assignation de la description dans la balise <p>
        var description = document.createTextNode(value[i].description)
        Element_description.appendChild(description)
        
        // La balise <article> resoit en éléments enfants l'image, le nom et la description du canapé
        Element_article.appendChild(Element_image);
        Element_article.appendChild(Element_name);
        Element_article.appendChild(Element_description);

        // La balise <a> reçoit la balise <article> et ces éléments enfants
        Element_clickable.appendChild(Element_article);

        // Placement du produit dans le HTML
        target_Elmt.appendChild(Element_clickable);
        
    }
})
.catch(function(err) {
// Une erreur est survenue
});
