// Récupération du numéro de commande dans l'url et affichage dans le HTML
let params = (new URL(document.location)).searchParams;
let id = params.get('id');

var commendID = document.getElementById("orderId")
commendID.innerHTML = id;

localStorage.clear()