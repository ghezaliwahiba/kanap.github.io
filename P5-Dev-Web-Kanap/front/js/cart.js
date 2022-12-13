const url = "http://localhost:3000/api/products/";
// Initialisation de l'URL Parameters

const urlSearchCart = window.location.search;
const urlParamsCart = new URLSearchParams(urlSearchCart);
const idP = urlParamsCart.get("id");
let productStorage = JSON.parse(localStorage.getItem("productStorage"));

// variables pour stocker les articles


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
         // console.log(url + productStorage[i].idP);
         // console.log(url + productStorage[i].color);
          // On déclare les caractéristiques produits
          let name = product.name;
          let price = product.price;
          let ImgP = product.imageUrl;
          let altImg = product.altTxt;
          let color = product.color;
           //console.log(product)
          console.log(product.colors);

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
          productItemContentTitlePrice.className = "cart__item__content__titlePrice";

          // Insertion du titre h3
          let productTitle = document.createElement("h2");
          productItemContentTitlePrice.appendChild(productTitle);
          productTitle.innerHTML = name;

          // Insertion de la couleur
          let productColor = document.createElement("p");
          productColor.innerHTML =color;
          productItemContentTitlePrice.appendChild(productColor);
          //console.log(productColor);

          // Insertion du prix
          let productPrice = document.createElement("p");
          productItemContentTitlePrice.appendChild(productPrice);
          productPrice.innerHTML = price + "  " + " €";
          //console.log(productPrice);

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
  

  let totalQuantity = 0; 
  for(let product of productStorage){  // met à jour localstorage
    // on incrémente la qt
    totalQuantity+= parseInt(product.quantity);
    console.log(totalQuantity);
 }
 GetTotalQuantity.innerHTML=totalQuantity;

// Récupération du prix total
let productTotalPrice = document.getElementById("totalPrice");
let totalPrice=0;

for (let i = 0; i < productStorage.length; i++){
  fetch("http://localhost:3000/api/products/" + productStorage[i].idP) 
        .then((response) => response.json())
        .then(function (product) {  
          //console.log(product);
          //console.log("http://localhost:3000/api/products/");
          totalPrice += parseInt(productStorage[i].quantity * product.price); 
            
          productTotalPrice.innerHTML = totalPrice;
         // console.log(totalPrice);

})


}



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
    let emailRegExp = new RegExp("^[A-z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-zA-Z]{2,10}$"); // Expression associée à la saisie de l'adresse mail: ^ Début de ligne ou de chaîne, [A-z0-9._-]+ : le nom utilisateur ; au moins un caractère alphanumérique, [@]{1} : un symbole @ obligatoirement, [A-z0-9._-]+ : le fournisseur; au moins un caractère alphanumérique, [.]{1} : impérativement un point, [A-z]{2,10} : le domaine ; entre 2 et 10 caractères alphabétiques, $ Fin de ligne ou de chaîne.
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$"); //les lettres minuscules (de a à z) sont autorisées, le point et le tiret sont autorisés
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"); // les chiffres sont autorisés,  saisir entre 1 et 3 caractères autorisés, ? : caractère précédent de 0 à 1 fois,les lettres minuscules y compris les e accentués sont autorisés, + : caractère précédent de 1 à plusieurs fois, 
    
    const inputFirstName = document.getElementById('firstName')
    inputFirstName.addEventListener('change', function() {
    var firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
      //si le champs respecte les conditions de la regex, il est valide
		if (inputFirstName.value.match(charRegExp)) {
			firstNameErrorMsg.innerHTML = ' ';
			return true;
	
		} else {//sinon un message d'erreur s'affiche 
			firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
			return false;
		}
    });
    
    const inputLastName = document.getElementById('lastName')
    inputLastName.addEventListener('change', function() {
    var lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
      //si le champs respecte les conditions de la regex, il est valide
		if (inputLastName.value.match(charRegExp)) {
			lastNameErrorMsg.innerHTML = ' ';
			return true;
			
		} else {//sinon un message d'erreur s'affiche 
			lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
		  return false;
		}
    });
   
    const inputAddress = document.getElementById('address')
    inputAddress.addEventListener('change', function() {
        var addressErrorMsg = document.querySelector("#addressErrorMsg");
       //si le champs respecte les conditions de la regex, il est valide
		if (inputAddress.value.match(addressRegExp)) {
			addressErrorMsg.innerHTML = ' ';
			return true;
			
		} else {//sinon un message d'erreur s'affiche 
			addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
		  return false;
		}
    });
    
    const inputCity = document.getElementById('city')
    inputCity.addEventListener('change', function() {
    var cityErrorMsg = document.querySelector("#cityErrorMsg");
      //si le champs respecte les conditions de la regex, il est valide
		if (inputCity.value.match(charRegExp)) {
			cityErrorMsg.innerHTML = ' ';
			return true;
			
		} else {//sinon un message d'erreur s'affiche 
			cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
			return false;
		}
    });
    
    const inputEmail = document.getElementById('email')
    inputEmail.addEventListener('change', function() {
        var emailErrorMsg = document.querySelector("#emailErrorMsg");
         //si le champs respecte les conditions de la regex, il est valide
		if (inputEmail.value.match(emailRegExp)) {
			emailErrorMsg.innerHTML = ' ';
			return true;
			
		} else {//sinon un message d'erreur s'affiche 
			emailErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
			return false;
		}
    });
 
  
  // Passer la commande: 
    //Ecoute du bouton commander et actions si oui ou non le formulaire est bien rempli

	const boutonCommaner = document.getElementById('order')

	boutonCommaner.addEventListener('click', (e) => {
		e.preventDefault()
		//si le panier est vide on affiche ce message
		if (productStorage === null || productStorage.length === 0) {
			alert('Votre panier est vide')
		}
		 else {
			//si un des champs ne contient rien on affiche ce message
			if (
				!inputFirstName.value ||
				!inputLastName.value ||
				!inputAddress.value ||
				!inputCity.value ||
				!inputEmail.value
			) {
				alert('Veuillez renseigner tous les champs du formulaire')
        
			} 
			
			else {
				//si tous les champs sont remplis on crée un objet contenant les infos client et produits du panier
				let ProductPanier = []
				for (let i = 0; i < productStorage.length; i++) {
					ProductPanier.push(productStorage[i].idP)
					
				}

				let orderData = {
					contact: {
						firstName: inputFirstName.value,
						lastName: inputLastName.value,
						address: inputAddress.value,
						city: inputCity.value,
						email: inputEmail.value,
					},
					ProductPanier,
				}
				//console.log(orderData)

				//Métode d'envoi des données
        fetch('http://localhost:3000/api/products/order', {
					method: 'POST',
					headers: {
					"Accept": "application/json",
        "Content-Type": "application/json"
					},
					body: JSON.stringify(orderData),
				})
				//console.log(orderPost)
     
				//Envoi des données à l'API
            .then((res) => res.json())
            .then (data => {
								console.log(data)
								//on redirige vers la page de confirmation de commande avec l'order Id dans l'url
                localStorage.setItem("orderId", data.orderId)
                window.location = "confirmation.html";
                console.log(orderId);
							})
							.catch((err) => {
								console.log('erreur fetch requête poste', err)
							})
              
        }
      }
    });
  



