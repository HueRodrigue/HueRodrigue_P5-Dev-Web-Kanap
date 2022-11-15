window.onload = function() {
    fetch("http://localhost:3000/api/products")
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            displayOneProduct(value);
        })
        .catch(function(err) {
        // Une erreur est survenue
        });     
}

function displayOneProduct(product){
    var url = window.location.href
    console.log(url)
    var product_id = url.match(/id=(.*$)/)[1];
    console.log(product_id);
    let foundProduct = null;
    for (let key in product) {
    if (product[key]._id === product_id) {
        foundProduct = product[key];
        FillPage(foundProduct)
        console.log(foundProduct)
        console.log(foundProduct.name)
        break;
        
    }
   
}

}

function FillPage(foundProduct) {
    document.title = foundProduct.name
    var target_img_Elmt = document.getElementsByClassName('item__img')[0];
    console.log(target_img_Elmt)
    var Element_image = document.createElement("img");
    Element_image.src = foundProduct.imageUrl;
    Element_image.alt = foundProduct.altTxt;
    console.log(Element_image);
    target_img_Elmt.appendChild(Element_image);

    var Element_title = document.getElementById("title");
    var title = document.createTextNode(foundProduct.name)
    Element_title.appendChild(title)

    var Element_price = document.getElementById("price");
    var price = document.createTextNode(foundProduct.price)
    Element_price.appendChild(price)

    var Element_description = document.getElementById("description");
    var description = document.createTextNode(foundProduct.description)
    Element_description.appendChild(description)

    var sel = document.getElementById("colors");
    var colors_count = foundProduct.colors.length
    for (i = 0; i < colors_count; i++){
        const opt = document.createElement("option");
        opt.value = i;
        opt.text = foundProduct.colors[i];
        sel.add(opt, null);
    }



}