const url = "http://localhost:3000/api/products/";
// Initialisation de l'URL Parameters
let productStorage = JSON.parse(localStorage.getItem("productStorage"));

// Affichage du panier
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
      fetch("http://localhost:3000/api/products/" + productStorage[i].id) // on veut reccuperer dans l'APi le produit qui correspond à l'idP stoqué dans le local storage.
        .then((response) => response.json())
        .then(function (product) {
          // console.log(url + productStorage[i].idP);
          // console.log(url + productStorage[i].color);
          // On déclare les caractéristiques produits
          let name = product.name;
          let price = product.price;
          let ImgP = product.imageUrl;
          let altImg = product.altTxt;
          //let color = product.colors;
          console.log(product);

          // Création de la balise "article" et insertion dans la section
          let productArticle = document.createElement("article");
          document.querySelector("#cart__items").appendChild(productArticle);
          productArticle.className = "cart__item";
          productArticle.setAttribute("data-id", productStorage[i].id);

          // Insertion de l'élément "div" pour l'image produit
          let productDivImg = document.createElement("div");

          productDivImg.className = "cart__item__img";
          productArticle.appendChild(productDivImg);

          // Insertion de l'image
          let productImg = document.createElement("img");
          productImg.src = ImgP;
          productImg.alt = altImg;
          productDivImg.appendChild(productImg);

          // Insertion de l'élément "div" pour la description produit
          let productItemContent = document.createElement("div");
          productItemContent.className = "cart__item__content";
          productArticle.appendChild(productItemContent);

          //Insertion de l'élément "div"
          let productItemContentTitlePrice = document.createElement("div");
          productItemContentTitlePrice.className =
            "cart__item__content__titlePrice";
          productItemContent.appendChild(productItemContentTitlePrice);

          // Insertion du titre h2
          let productTitle = document.createElement("h2");
          productItemContentTitlePrice.appendChild(productTitle);
          productTitle.innerText = name;

          // Insertion de la couleur
          let productColor = document.createElement("p");
          productColor.innerText = productStorage[i].color;
          productColor.style.fontSize = "20px";
          productTitle.appendChild(productColor);

          // Insertion du prix
          let productPrice = document.createElement("p");
          productPrice.innerText = price + "  " + " €";
          productItemContentTitlePrice.appendChild(productPrice);

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
          let productQty = document.createElement("p");
          productItemContentSettingsQuantity.appendChild(productQty);
          productQty.innerText = "Qté : ";

          // Insertion de la quantité
          let productQuantity = document.createElement("input");
          productItemContentSettingsQuantity.appendChild(productQuantity);
          productQuantity.value = productStorage[i].quantity;
          productQuantity.className = "itemQuantity";
          productQuantity.setAttribute("type", "number");
          productQuantity.setAttribute("min", "1");
          productQuantity.setAttribute("max", "100");
          productQuantity.setAttribute("name", "itemQuantity");
          productQuantity.addEventListener("change", QuantityChangeItem);

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
          productSupprimer.addEventListener("click", deleteItemFromCart)
        });
    }
  }
}
GetProductLocalStorage();

// FUNCTION TOTAL PRICE

function TotalPrice() {
 
  let GetTotalQuantity = document.getElementById("totalQuantity");
  let totalQuantity = 0;

   // Récupération la quantité totale
  for (let product of productStorage) {
    // met à jour localstorage
    // on incrémente la qt
    totalQuantity += parseInt(product.quantity); //La fonction parseInt() analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé dans une base donnée.
    console.log(totalQuantity);
  }
  GetTotalQuantity.innerHTML = totalQuantity;

  // Récupération du prix total
  let productTotalPrice = document.getElementById("totalPrice");
  let totalPrice = 0;

  for (let i = 0; i < productStorage.length; i++) {
    fetch("http://localhost:3000/api/products/" + productStorage[i].id) // ne pas stocker le prix des articles en local. Les données stockées en local ne sont pas sécurisées et l’utilisateur pourrait alors modifier le prix lui-même.
      .then((response) => response.json())
      .then(function (product) {
        //console.log(product);
        //console.log("http://localhost:3000/api/products/");
        totalPrice += parseInt(productStorage[i].quantity * product.price);
        productTotalPrice.innerHTML = totalPrice;

        // console.log(totalPrice);
      });
  }
}

TotalPrice();

// suppression d'un article
function deleteItemFromCart() {
  let i;
  let idProduitDelete = productStorage[i].id;
  let colorProduitDelete = productStorage[i].color;
  //On filtre les données liées à l'élément à supprimer
  productStorage = productStorage.filter(
    (a) =>
      a.id !== idProduitDelete &&
      a.color !== colorProduitDelete
  );
  // On mets à jour le localStorage
  localStorage.setItem(
    "productStorage",
    JSON.stringify(productStorage)
  );
  // Si la quantité du kanap = 0, on vide le localStorage et on refresh rapide
  if (productStorage.length === 0) {
    localStorage.clear();
  }
  window.location.reload();
  TotalPrice()
}

setTimeout(deleteItemFromCart, 500); //suprimé le produit après 5 ms


function QuantityChangeItem() {
  let newQuantity=e.path[0].value; // on declare la valeur entré à partir du clavier  
  if (newQuantity != productStorage[i].quantity && newQuantity<= 100 && newQuantity>0)
  {
      productStorage[i].quantity =newQuantity; //On change le contenu de notre élément pour afficher la nouvelle quantité
      localStorage.setItem("productStorage", JSON.stringify(productStorage));
      TotalPrice();   
     
}
else {
alert ("vous pouvez commandé quand le nombre d'articles entre 1 et 100");
}

}
setTimeout(QuantityChangeItem, 500); //changé la quantité après 5 ms.

// Passer la commande:
//Ecoute du bouton commander et actions si oui ou non le formulaire est bien rempli

const boutonCommaner = document.getElementById("order"); // On récupère l'élément sur lequel on veut détecter le clic

// Formulaire d'information pour le commande
let form = document.getElementsByClassName("cart__order__form")[0];

// Bouton COMMANDER
const order = document.getElementById("order");

async function submitOrder() {
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );
  let p = document.createElement("p");

  let inputFirstName = document.getElementById("firstName");
  let firstNameErrorMsg = inputFirstName.nextElementSibling;
  let hasError = false;

  if (charRegExp.test(inputFirstName.value)) {
    firstNameErrorMsg.textContent = "";
  } else {
    firstNameErrorMsg.textContent = "Prenom Invalide";
    hasError = true;
  }

  let inputLastName = document.getElementById("lastName");
  let lastNameErrorMsg = inputLastName.nextElementSibling;
  if (charRegExp.test(inputLastName.value)) {
    lastNameErrorMsg.textContent = "";
  } else {
    lastNameErrorMsg.textContent = "Nom Invalide.";
    hasError = true;
  }

  let inputAddress = document.getElementById("address");
  let addressErrorMsg = inputAddress.nextElementSibling;
  if (addressRegExp.test(inputAddress.value)) {
    addressErrorMsg.textContent = "";
  } else {
    addressErrorMsg.textContent = "Adresse Invalide";
    hasError = true;
  }

  let inputCity = document.getElementById("city");
  let cityErrorMsg = inputCity.nextElementSibling;
  if (charRegExp.test(inputCity.value)) {
    cityErrorMsg.textContent = "";
  } else {
    cityErrorMsg.textContent = "Ville Invalide.";
    hasError = true;
  }

  let inputEmail = document.getElementById("email");
  let emailErrorMsg = inputEmail.nextElementSibling;
  if (emailRegExp.test(inputEmail.value)) {
    emailErrorMsg.textContent = "";
  } else {
    emailErrorMsg.textContent = "Email Invalide.";
    hasError = true;
  }

  if (hasError) return;
  //Mise en place d'un objet pour les infos du formulaire
  const infoContact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  //Création d'un array pour les éléments du local storage
  let Product = [];
  for (let i = 0; i < productStorage.length; i++) {
    Product.push(productStorage[i].id);
  }

  //Mise en place d'un objet pour les avoir les infos contact + les produits
  const infoRecap = {
    products: Product,
    contact: infoContact,
  };

  let response = await fetch(url + "order", {
    // Ajout de la méthode
    method: "POST",

    // Ajout du body à envoyer
    body: JSON.stringify(infoRecap),

    // Ajout de titre à la requête
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  let data = await response.json();
  orderId = data.orderId;
  //AU CLICK ENVOI SUR LA PAGE CONFIRMATION AVEC L'ORDERID
  window.location.href = "./confirmation.html?orderId=" + orderId;
}

boutonCommaner.addEventListener("click", function (event) {
  event.preventDefault(); //La méthode preventDefault(), rattachée à l'interface Event, indique à l'agent utilisateur que si l'évènement n'est pas explicitement géré, l'action par défaut ne devrait pas être exécutée comme elle l'est normalement.
  submitOrder();
});
