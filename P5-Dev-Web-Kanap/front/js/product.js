const url = "http://localhost:3000/api/products/";

// Initialisation de l'URL
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString); 
 
const id = urlParams.get("id"); 

//Récupération des sélecteurs pour les futurs modifications
let title = document.getElementById("title"); //c'est la méthode la plus utilisée pour retrouver un élément, 
let price = document.getElementById("price");
let description = document.getElementById("description");
let colorsP = document.getElementById("colors");
let imgP = document.querySelector(".item__img"); // Il s'agit en fait d'un sélecteur qui permet de cibler certains éléments.
let img = document.createElement("img");
imgP.appendChild(img);

//On récupère l'article et affiche ses données grâce a l'id
async function InfoProduct() {
  await fetch("http://localhost:3000/api/products/" + id) //Fetch JavaScript peut envoyer des requêtes réseau au serveur et charger de nouvelles informations chaque fois que nécessaire. Par exemple, nous pouvons utiliser une requête réseau pour :
    //Soumettre une commande, Charger des informations utilisateur, Recevoir les dernières mises à jour du serveur, …etc. … Et tout cela sans recharger la page !//
    .then((response) => response.json())
    .then((product) => { 
      let title = document.getElementById("title");
      let price = document.getElementById("price");
      let description = document.getElementById("description");
      let color = document.getElementById("colors");

      //On définit la source et alt de l'img
      img.setAttribute("src", product.imageUrl);
      img.setAttribute("alt", product.altTxt);
      //On insère les infos produit
      title.textContent = product.name;
      price.textContent = product.price;
      description.textContent = product.description;
      document.title = product.name;

      //On créé la boucle pour le choix de la couleur
      for (let i = 0; i < product.colors.length; i++) {
        //Création de l'élément "option"
        let colors = document.createElement("option");
        //On attribue un paramètre "value"
        colors.setAttribute("value", product.colors[i]); //setAttribute Ajoute un nouvel attribut ou change la valeur d'un attribut existant pour l'élément spécifié.
        //On insère la couleur dans le html
        colors.textContent = product.colors[i];
        color.appendChild(colors);
      }
    });
}

InfoProduct();

//Ajout d'un canapé au panier avec le bouton addButton
let button = document.getElementById("addToCart"); // On récupère l'élément sur lequel on veut détecter le clic
// click bouton ajout panier
button.addEventListener("click", AddKanap); ////On écoute l'événement click
//On change le contenu de notre élément pour afficher la nouvelle modification
function AddKanap() {
  //Etablissement du local storage lors du click 'Ajout au panier'
  let productStorage; // on crée le localostorage
  if (localStorage.getItem("productStorage") != null) {
    productStorage = JSON.parse(localStorage.getItem("productStorage")); // getItem permet de recuperer une donnée 
  } else {
    productStorage = []; //sinon on initialise
  }
  // On récupère l'url avec l'ID et on les convertis
  fetch(url + id)
    .then((resp) => resp.json())
    .then(function (data) {
      //constante du choix de couleurs
      const colorP = document.querySelector("#colors");
      //constante du choix de la quantité
      const quantityP = document.querySelector("#quantity");

      console.log(colorP.value === "");
      //Mise en place de la condition où les valeurs color + quantity doivent être établies
      // Si la valeur quantity est renseignée et entre 1 et 100 :
      if (quantityP.value > 0 && quantityP.value <= 100 && colorP.value != "") {
        // On affiche la quantité
        let quantityChoiceP = parseInt(quantityP.value);
        console.log(quantityChoiceP);

        // On déclare le kanap via l'ID, la couleur et la quantité choisis
        let product = {
          id: id,
          color: colorP.value,
          quantity: quantityChoiceP,
        };
        // On déclare 2 variables pour vérifier plus tard que le produit est présent ou non dans le panier
        let presenceProduit = false;
        let index = null;

        // On créé une boucle pour récupérer le nombre de produits (en utilisant la quantité la couleur et l'index)
        for (let i = 0; i < productStorage.length; i++) { // on boucle pour faire la comapraison produit par produit.
          if (
            productStorage[i].id === product.id &&
            productStorage[i].colorChoiceKanap === product.colorChoiceKanap
          ) {
            presenceProduit = true;
            index = i;
          }
        }
        // Si le produit est présent on incrémente de la quantité choisie
        if (presenceProduit) {
          productStorage[index].quantity += parseInt(
            product.quantity
          );
          // Sinon on affiche le produit et on l'ajoute à la fin du tableau
        } 
        
        else { 
          productStorage.push(product);
          alert("Produit ajouté au panier!");
        }
        // On met à jour le localStorage
        // On enregistre le canapé dans le local storage
        localStorage.setItem("productStorage", JSON.stringify(productStorage)); // localStorage.setItem permet de stocké une donnée 

        // Au clic on redirige l'utilisateur vers la page panier
        window.location.href = "./cart.html";
      }
    });
}
