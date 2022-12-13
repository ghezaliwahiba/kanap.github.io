
let OrderIdSearch = window.location.search; //récupère l'url de la page où je suis actuellement

console.log(window.location);

let urlParams = new URLSearchParams(OrderIdSearch); // créer un nouvel objet url à partir de l'url actuelle

let orderId = urlParams.get("id"); //à travers le searchParams récupère l'id

console.log(orderId);

const displayOrderId  = document.getElementById("orderId");

displayOrderId.innerText = orderId;

localStorage.clear();
