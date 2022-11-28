const urlSearchCart = window.location.search;
const urlParamsCart = new URLSearchParams(urlSearchCart);
const id = urlParamsCart.get("id");
let ProductLocalStorage;
const url="http://localhost:3000/api/products/";


// Initialisation du localstorage
ProductLocalStorage = JSON.parse(localStorage.getItem("ProductStorage"));

// Affichage d du panier
  function GetProductLocalStorage() {

  // Si le localstorage est vide
  if ( ProductLocalStorage === null ||  ProductLocalStorage == 0) {
      const positionEmptyCart = document.getElementById("cart__items");
    positionEmptyCart.textContent = "Votre panier est vide";
  } 
  
  else {
    
    // Si le localstorage contient des produits
    for (i = 0; i <  ProductLocalStorage.length; i++) {
     
      fetch(url+ ProductLocalStorage[i].id) // on veut reccuperer dans l'APi le produit qui correspond à l'id stoqué dans le local storage.
      .then((response) => response.json())
      .then((res) => data(res)) 

    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id', ProductLocalStorage[i].id);

    // Insertion de l'élément "div"
    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    // Insertion de l'image
    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = ProductLocalStorage[i].imageUrl;
    productImg.alt = ProductLocalStorage[i].altTxt;
    
    // Insertion de l'élément "div"
    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    // Insertion de l'élément "div"
    let productItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.className = "cart__item__content__titlePrice";
    
    // Insertion du titre h3
    let productTitle = document.createElement("h2");
    productItemContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = ProductLocalStorage[i].name;

    // Insertion de la couleur
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = ProductLocalStorage[i].colors;
    productColor.style.fontSize = "20px";

    // Insertion du prix
    let productPrice = document.createElement("p");
    productItemContentTitlePrice.appendChild(productPrice);
    productPrice.innerHTML = ProductLocalStorage[i].price + " €";

    // Insertion de l'élément "div"
    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    // Insertion de l'élément "div"
    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
    
    // Insertion de "Qté : "
    let productQte = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQte);
    productQte.innerHTML = "Qté : ";

    // Insertion de la quantité
    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = ProductLocalStorage[i].quantity;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    // Insertion de l'élément "div"
    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

    // Insertion de "p" supprimer
    let productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.innerHTML = "Supprimer";
}
}
}
