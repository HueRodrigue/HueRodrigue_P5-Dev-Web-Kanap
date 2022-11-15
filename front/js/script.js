window.onload = function() {
    fetch("http://localhost:3000/api/products")
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            display(value);
        })
        .catch(function(err) {
        // Une erreur est survenue
        });

        
}

function display(product){
    console.log(product);
    console.log("test")
    var target_Elmt = document.getElementById('items');
    var product_count = product.length;
    console.log(product_count)
    
    for (i = 0; i < product_count-1; i++){
        console.log(product[i])
        var Element_clickable = document.createElement("a");
        var href_product = "./product.html?id=" + product[i]._id;
        console.log(href_product)
        Element_clickable.setAttribute('href', href_product);
        console.log(Element_clickable)

        var Element_article = document.createElement("article");

        var Element_image = document.createElement("img");
        Element_image.src = product[i].imageUrl;
        Element_image.alt = product[i].altTxt;
        console.log(Element_image)

        var Element_name = document.createElement("h3");
        Element_name.classList.add("productName");
        console.log(Element_name)
        var name = document.createTextNode(product[i].name)
        Element_name.appendChild(name)
        console.log(Element_name)

        var Element_description = document.createElement("p");
        Element_description.classList.add("productDescription");
        var description = document.createTextNode(product[i].description)
        Element_description.appendChild(description)
        console.log(Element_description)
        
        Element_article.appendChild(Element_image);
        Element_article.appendChild(Element_name);
        Element_article.appendChild(Element_description);
        Element_clickable.appendChild(Element_article);
        console.log(Element_clickable);

        target_Elmt.appendChild(Element_clickable);
        
    }
}