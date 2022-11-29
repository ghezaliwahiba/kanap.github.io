let urlSearch = window.location.search; //permet de récupérer l’URL du page courante.
let urlParams= new URLSearchParams (urlSearch);
const id = urlParams.get("id");
let ProductLocalStorage = JSON.parse(localStorage.getItem("id"));
console.log(ProductLocalStorage);

fetch(`http://localhost:3000/api/products/${id}`) 
      .then((response) => response.json())
       
      .then((res) => AddKanap(res)) 

function AddKanap (product) { 
console.log(product)
    let imageUrl = product.imageUrl;
    let altTxt = product.altTxt;
    let description = product.description;
    let name = product.name;
    let price=product.price;
  
    const image=document.createElement("img");
    image.src= imageUrl;
    image.alt=altTxt; 
    const itemme =document.querySelector(".item__img");
    itemme.appendChild(image);
   
    const para =document.querySelector("#title"); 
    para.textContent=name;

    const text = document.querySelector("#price");
    text.innerHTML=price;

    const descpt = document.querySelector ("#description");
    descpt.innerHTML=description;

    let ColorsProduct= product.colors;
    ColorsProduct.forEach (function (color) {
        console.log(color);
        let productColor = document.createElement("option");
        const item =document.querySelector("#colors");
        productColor.innerText = color;
        item.appendChild(productColor);
    });


//Fonction pour enregistrer les propriété du produit (couleur et quantité) et ajouter au panier (stockage local)

function addToCart() {

 //Faire l'évènement sur le bouton "ajouter au panier"
const button = document.querySelector('#addToCart') // On récupère l'élément sur lequel on veut détecter le clic
button.addEventListener('click', function () {  // On écoute l'événement click
let colors = document.querySelector("#colors").value;
let quantity = document.querySelector("#quantity").value;

if (colors == '' || quantity == 0) {
alert ('Please select a color or quantity!') 
return

}

//1. Vérifiez d'abord si la quantité entrée négative ou superieure à 100 si c'est le cas, affichez l'alerte puis actualisez (ne pas ajouter au panier)
else if (colors == '' || quantity <0){
    alert ('Please select a quantity between 0 and 100!')
    return
}

else if (colors == '' || quantity >100){
    alert ('Please select a quantity between 0 and 100!') 
    return
}

// //2. Si tout va bien, ajoutez les produits au panier avec les sélections de l'utilisateur pour la couleur et la quantité
else  {  // création d'un objet pour identfier les donner à stocker dans le localStorage

    let ProductStorage = {
        id: id,
        colors: colors,
        quantity: Number(quantity),
        price: price,
        imageUrl:imageUrl,
        altTxt:altTxt,
        name:name
    }

    localStorage.setItem(id ,JSON.stringify (ProductStorage)) 
    window.location.href= "cart.html"
}

})

}
addToCart();

  //s'il y a déjà produit dans le stockage local, ajouter un objet au tableau existant
  if (ProductLocalStorage) {
    // vérifiez d'abord si l'article avec le même ID et la même couleur a déjà été sélectionné - si c'est le cas, augmentez la quantité, pourque qu'il n'y ait pas de doublons
    const ExistProduct = ProductLocalStorage.find(
      (products) => 
       products.id == product.id &&
       products.colors == product.colors
    );
    
    if (ExistProduct) {
        ExistProduct.quantity = ExistProduct.quantity + product.quantity;
        localStorage.setItem("id" ,JSON.stringify (ProductLocalStorage))
      return;
    }
  }
 
//Pour aller au panier 
function redirectionCart(){
    window.location.href= "cart.html"
}
// Function pour ajouter un produit au local storage

function addToLocalStorage() {   
  localStorage.setItem("id", JSON.stringify(ProductLocalStorage));
}
}
