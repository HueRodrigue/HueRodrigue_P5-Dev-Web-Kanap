/*
*Récupération des produits, puis création des éléments HTML permettant de les afficher
*/

fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(value) {
    // Recherche de l'élément dans lequel seront placés les produits
    var target_Element = document.getElementById('items');
    var product_count = value.length
    // Pour chaque produit
    for (i = 0; i <product_count-1; i++){

        // Création de la balise <img>
        var image_Element = document.createElement("img");

        // Assignation d'une source à la balise <img>
        image_Element.src = value[i].imageUrl;

        // Assignatiion du alt à la balise <img>
        image_Element.alt = value[i].altTxt;

        // Création d'une balise <h3> pour le nom du canapé
        var name_Element = document.createElement("h3");
        

        // Assignation d'une classe à la balise <h3>
        name_Element.classList.add("productName");
        
        // Assignation du nom du canapé dans la balise <h3>
        var name = document.createTextNode(value[i].name);
        name_Element.appendChild(name);
        

        // Création d'une balise <p> pour la description du canapé
        var description_Element = document.createElement("p");

        // Assignation d'une classe à la balise <p>
        description_Element.classList.add("productDescription");
 
        // Assignation de la description dans la balise <p>
        var description = document.createTextNode(value[i].description);
        description_Element.appendChild(description);

        // Création de la balise <article>
        var article_Element = document.createElement("article");

        // Création de la balise <a>
        var clickable_Element = document.createElement("a");

        var href_Product = "./product.html?id=" + value[i]._id;
        // Assignation de l'attribut "href" à la balise <a>
        clickable_Element.setAttribute('href', href_Product);

        // La balise <article> resoit en éléments enfants l'image, le nom et la description du canapé
        article_Element.appendChild(image_Element);
        article_Element.appendChild(name_Element);
        article_Element.appendChild(description_Element);

        // La balise <a> reçoit la balise <article> et ces éléments enfants
        clickable_Element.appendChild(article_Element);

        // Placement du produit dans le HTML
        target_Element.appendChild(clickable_Element);
    }
})
.catch(function(err) {
// Une erreur est survenue
});
