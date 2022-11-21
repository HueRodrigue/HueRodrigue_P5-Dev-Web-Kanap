let params = (new URL(document.location)).searchParams;
let id = params.get('id');

var commendID = document.getElementById("orderId")
commendID.innerHTML = id;

localStorage.clear()