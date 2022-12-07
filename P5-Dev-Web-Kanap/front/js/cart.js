const url = "http://localhost:3000/api/products/";
// Initialisation de l'URL Parameters

const urlSearchCart = window.location.search;
const urlParamsCart = new URLSearchParams(urlSearchCart);
const idP = urlParamsCart.get("id");

// variables pour stocker les articles
let productStorage;

// Affichage d du panier
function GetProductLocalStorage() {
  // Si le localstorage est vide
  if (localStorage.getItem("productStorage") === null) {
    productStorage = [];
    console.log("votre panier est vide");
    //positionEmptyCart.textContent = "Votre panier est vide";
  } else {
    productStorage = JSON.parse(localStorage.getItem("productStorage"));

    // Si le localstorage contient des produits
    for (let i = 0; i < productStorage.length; i++) {
      fetch("http://localhost:3000/api/products/" + productStorage[i].idP) // on veut reccuperer dans l'APi le produit qui correspond à l'idP stoqué dans le local storage.
        .then((response) => response.json())
        .then(function (product) {
          console.log(url + productStorage[i].idP);
          console.log(url + productStorage[i].color);
          // On déclare les caractéristiques produits
          let name = product.name;
          let price = product.price;
          let ImgP = product.imageUrl;
          let altImg = product.altTxt;
          let color = product.color;

          let productArticle = document.createElement("article");
          document.querySelector("#cart__items").appendChild(productArticle);
          productArticle.className = "cart__item";
          productArticle.setAttribute("data-id", productStorage[i].idP);

          // Insertion de l'élément "div"
          let productDivImg = document.createElement("div");
          productDivImg.className = "cart__item__img";
          productArticle.appendChild(productDivImg);

          // Insertion de l'image
          let productImg = document.createElement("img");
          productImg.src = ImgP;
          productImg.alt = altImg;
          productDivImg.appendChild(productImg);

          // Insertion de l'élément "div"
          let productItemContent = document.createElement("div");
          productArticle.appendChild(productItemContent);
          productItemContent.className = "cart__item__content";

          // Insertion de l'élément "div"
          let productItemContentTitlePrice = document.createElement("div");
          productItemContent.appendChild(productItemContentTitlePrice);
          productItemContentTitlePrice.className =
            "cart__item__content__titlePrice";

          // Insertion du titre h3
          let productTitle = document.createElement("h2");
          productItemContentTitlePrice.appendChild(productTitle);
          productTitle.innerHTML = name;

          // Insertion de la couleur
          let productColor = document.createElement("p");
          productTitle.appendChild(productColor);
          productColor.innerHTML = color;
          productColor.style.fontSize = "20px";

          // Insertion du prix
          let productPrice = document.createElement("p");
          productItemContentTitlePrice.appendChild(productPrice);
          productPrice.innerHTML = price + "  " + " €";

          // Insertion de l'élément "div"
          let productItemContentSettings = document.createElement("div");
          productItemContent.appendChild(productItemContentSettings);
          productItemContentSettings.className =
            "cart__item__content__settings";

          // Insertion de l'élément "div"
          let productItemContentSettingsQuantity =
            document.createElement("div");
          productItemContentSettings.appendChild(
            productItemContentSettingsQuantity
          );
          productItemContentSettingsQuantity.className =
            "cart__item__content__settings__quantity";

          // Insertion de "Qté : "
          let productQte = document.createElement("p");
          productItemContentSettingsQuantity.appendChild(productQte);
          productQte.innerHTML = "Qté : ";

          // Insertion de la quantité
          let productQuantity = document.createElement("input");
          productItemContentSettingsQuantity.appendChild(productQuantity);
          productQuantity.value = productStorage[i].quantity;
          productQuantity.className = "itemQuantity";
          productQuantity.setAttribute("type", "number");
          productQuantity.setAttribute("min", "1");
          productQuantity.setAttribute("max", "100");
          productQuantity.setAttribute("name", "itemQuantity");

          // Insertion de l'élément "div"
          let productItemContentSettingsDelete = document.createElement("div");
          productItemContentSettings.appendChild(
            productItemContentSettingsDelete
          );
          productItemContentSettingsDelete.className =
            "cart__item__content__settings__delete";

          // Insertion de "p" supprimer
          let productSupprimer = document.createElement("p");
          productItemContentSettingsDelete.appendChild(productSupprimer);
          productSupprimer.className = "deleteItem";
          productSupprimer.innerHTML = "Supprimer";
        });
    }
  }

}
GetProductLocalStorage();


 // FUNCTION TOTAL PRICE

 function TotalPrice() {
  
 // Récupération la quantité totale
  let GetTotalQuantity=document.getElementById("totalQuantity");
  let productStorage = JSON.parse(localStorage.getItem("productStorage"));
  let CalculatTotalQuantityIncart=[];
 
  let totalQuantity = 0; 
  for(let product of productStorage) {  // met à jour localstorage
       // on incrémente la qt
    totalQuantity+=product.quantity;
 }

 console.log(totalQuantity);

 CalculatTotalQuantityIncart.push(totalQuantity);
 GetTotalQuantity.innerHTML=totalQuantity;

// Récupération du prix total
let productTotalPrice = document.getElementById('totalPrice');
let totalPrice=0;

for( let products of productStorage) {
     totalPrice += totalQuantity * products.price;
 }
 CalculatTotalQuantityIncart.push(totalPrice);
 productTotalPrice.innerHTML = totalPrice;
 console.log(totalPrice);
}
TotalPrice();

// suppression d'un article
function deleteItem(){ 
    const btnDelete = document.querySelectorAll(".deleteItem");
      for (const i in productStorage){
          btnDelete[i].addEventListener("click", ()=>{
            productStorage.splice(i,1) //La méthode splice() modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant de nouveaux éléments. On peut ainsi vider ou remplacer une partie d'un tableau.
            localStorage.setItem("productStorage", JSON.stringify(productStorage));
            location.reload(); //La méthode Location.reload() recharge la ressource depuis l'URL actuelle. (Recharge la page en cours de consultation.)
          })
      } 
}
setTimeout(deleteItem, 500); //suprimé le produit après 5 ms

function QuantityChangeItem(){ 
    const btnChangeQuantity = document.querySelectorAll(".itemQuantity");
    for (let i in productStorage){
        btnChangeQuantity[i].addEventListener('change', ()=>{
            productStorage[i].quantity=btnChangeQuantity [i].value;
            localStorage.setItem("productStorage", JSON.stringify(productStorage));
            TotalPrice();
            
        })
    } 
  }
setTimeout(QuantityChangeItem, 500); //changé la quantité après 5 ms.

// les regle du formulaire

function getForm() {
    const form = document.querySelector(".cart__order__form");
    let emailRegExp = new RegExp("^[A-z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-zA-Z]{2,10}$"); // Expression associée à la saisie de l'adresse mail: ^ Début de ligne ou de chaîne, [A-z0-9._-]+ : le nom utilisateur ; au moins un caractère alphanumérique, [@]{1} : un symbole @ obligatoirement, [A-z0-9._-]+ : le fournisseur; au moins un caractère alphanumérique, [.]{1} : impérativement un point, [A-z]{2,10} : le domaine ; entre 2 et 10 caractères alphabétiques, $ Fin de ligne ou de chaîne.
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$"); //les lettres minuscules (de a à z) sont autorisées, le point et le tiret sont autorisés
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"); // les chiffres sont autorisés,  saisir entre 1 et 3 caractères autorisés, ? : caractère précédent de 0 à 1 fois,les lettres minuscules y compris les e accentués sont autorisés, + : caractère précédent de 1 à plusieurs fois, 
    
 
    form.firstName.addEventListener('change', function() {
    var firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
      firstNameErrorMsg.innerHTML = charRegExp.test(this.value) ? '' : 'Verifiez votre renseignement.';
    });
    
    form.lastName.addEventListener('change', function() {
        var lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
      lastNameErrorMsg.innerHTML = charRegExp.test(this.value) ? '' : 'Verifiez votre renseignement.';
    });
    
    form.address.addEventListener('change', function() {
        var addressErrorMsg = document.querySelector("#addressErrorMsg");
      addressErrorMsg.innerHTML = addressRegExp.test(this.value) ? '' : 'Verifiez votre adresse.';
    });
    
    form.city.addEventListener('change', function() {
        var cityErrorMsg = document.querySelector("#cityErrorMsg");
        cityErrorMsg.innerHTML = charRegExp.test(this.value) ? '' : 'Verifiez votre ville.';
    });
    
    form.email.addEventListener('change', function() {
        var emailErrorMsg = document.querySelector("#emailErrorMsg");
        emailErrorMsg.innerHTML = emailRegExp.test(this.value) ? '' : 'Verifiez votre email.';
    });
    }
  getForm();
  
  // Passer la commande: 

  function postForm(){
    const btn_commander = document.getElementById("order");
  
    // // click bouton commander 
    btn_commander.addEventListener("click", ()=>{
        let productPanier = [];
        for (const i in productStorage) {
            productPanier.push(productStorage[i]); // //push pour ajouter le panier dans le nouvel tableau productPanier.
        }
        // les données à envoyer à l'API
        const order = {
          
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                email: document.getElementById('email').value, 
        } 
        
        // options pour poster l'objet sur l'API, et soumettre l’objet order en JSON :
        const options = { //Requêtes POST: Pour faire une requête POST, ou une requête avec une autre méthode, nous devons utiliser les options fetch :
            method: 'POST', //La méthode. Il s’agit de l’action que l’on souhaite faire : récupérer une ressource, la supprimer, etc… la méthode POST: permet de créer ou modifier une ressource, comme;
            body: JSON.stringify(order),
            headers: { //Pour définir un en-tête de requête dans fetch, nous pouvons utiliser l’option headers. Il a un objet avec des en-têtes sortants, comme ceci :
              'Content-Type': 'application/json;charset=utf-8' // si nous envoyons du JSON, nous utiliserons à la place l’option headers pour envoyer application/json, le bon Content-Type pour les données encodées en JSON.
            },
        };
        
        // Envoie à l'API 
        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
          // Au clic sur le bouton “Commander”, le JavaScript masque le tableau, remplace localStorage actuel par le numéro de commande et renvoi vers la page de confirmation.
          localStorage.clear();
          document.location.href = "./confirmation.html";
        })
        .catch ((error) => {
          return error;
        });
        })
       
  }
  postForm();
  
