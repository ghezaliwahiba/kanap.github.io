let urlSearch = window.location.search; //permet de récupérer l’URL du page courante.
let urlParams = new URLSearchParams(urlSearch);
const idP = urlParams.get("id");

const url = "http://localhost:3000/api/products/";

//On récupère l'article et affiche ses données grâce a l'id
async function InfoProduct() {
  await fetch("http://localhost:3000/api/products/" + idP) //Fetch JavaScript peut envoyer des requêtes réseau au serveur et charger de nouvelles informations chaque fois que nécessaire. Par exemple, nous pouvons utiliser une requête réseau pour :
  //Soumettre une commande, Charger des informations utilisateur, Recevoir les dernières mises à jour du serveur, …etc. … Et tout cela sans recharger la page !//
    .then((response) => response.json())
    .then((product) => {
      let imageUrl = product.imageUrl;
      let altTxt = product.altTxt;
      let description = product.description;
      let name = product.name;
      let price = product.price;

      const image = document.createElement("img");
      image.src = imageUrl;
      image.alt = altTxt;
      const itemme = document.querySelector(".item__img");
      itemme.appendChild(image);

      const para = document.querySelector("#title");
      para.textContent = name;

      const text = document.querySelector("#price");
      text.innerHTML = price;

      const descpt = document.querySelector("#description");
      descpt.innerHTML = description;

      let ColorsProduct = product.colors;
      ColorsProduct.forEach(function (color) {
        console.log(color);
        let productColor = document.createElement("option");
        const item = document.querySelector("#colors");
        productColor.innerText = color;
        item.appendChild(productColor);
      });
    });
}
InfoProduct();
//Ajout d'un canapé au panier avec le bouton addButton
let button = document.getElementById("addToCart"); // On récupère l'élément sur lequel on veut détecter le clic
// click bouton ajout panier
button.addEventListener("click", AddKanap);

 // vérifie si l'article est pas déjà dans le panier
function AddKanap() {
  //Etablissement du local storage lors du click 'Ajout au panier'
  let productStorage = [];
  if (localStorage.getItem("productStorage") != null) {
    productStorage = JSON.parse(localStorage.getItem("productStorage"));
  } else {
    productStorage = [];
  }

  fetch(url + idP)
    .then((resp) => resp.json())
    .then(function (data) {
      let colors = document.querySelector("#colors");
      let quantityP = document.querySelector("#quantity");
       // si l'article est déjà présent, on incrémente la quantité
      if (quantityP.value > 0 && quantityP.value <= 100 && colors.value != "") {
        //on initialise notre variable permettant de savoir si l’article est nouveau où s’il est déjà dans le panier.
        let ExistingProduct = false; // Si l’id du produit est déjà présent dans l’array, c’est que l’article n’est pas nouveau, on passe donc la variable à false
        let quantity = parseInt(quantityP.value); //Nous utilisons la fonction parseInt pour nous en assurer – cette fonction de transtypage force la conversion des chaines de caractères en nombre et nous permet ainsi d’effectuer des opérations sur les variables.
        // s'il est nouveau, on l'ajoute.
        let index;
        let product = {
          idP: idP,
          color: colors.value,
          quantity: quantity,
        };
        for (let i = 0; i < productStorage.length; i++) {
          if (
            productStorage[i].id == product.idP &&
            productStorage[i].colors == product.color
          ) {
            ExistingProduct = true; // Sinon, si l'article n'est pas dans le panier, la variable ExistingProduct reste vrai, on ajoute l'article au localstorage, et on fait un push pour ajouter le nouvel article à AddKanap.
            index = i;
          }
        }
        if (ExistingProduct) {
          productStorage[index].quantityP += product.quantity;
        } else {
          productStorage.push(product); //push pour ajouter le nouvel article à AddKanap.
        }

        localStorage.setItem("productStorage", JSON.stringify(productStorage)); // enregistrement du canapé dans le local storage

        // AU "CLICK", ENVOI SUR LA PAGE PANIER
        window.location.href = "./cart.html";
      }
    });
}

