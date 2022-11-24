let urlSearch = window.location.search; //permet de récupérer l’URL du page courante.
let urlParams= new URLSearchParams (urlSearch);
let id=urlParams.get ("id");


fetch(`http://localhost:3000/api/products/${id}`) 
      .then((response) => response.json())
       
      .then((res) => AddKanap(res)) 

function AddKanap (product) { 

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

const button = document.querySelector('#addToCart') // On récupère l'élément sur lequel on veut détecter le clic
button.addEventListener('click', function () {  // On écoute l'événement click
let colors = document.querySelector("#colors").value;
let quantity = document.querySelector("#quantity").value;

let productLocalStorageString = localStorage.getItem("product");
console.log(productLocalStorageString); 

let productLocalStorage = JSON.parse(productLocalStorageString);
console.log(productLocalStorage);

if (colors == '' || quantity == 0) {
alert ('Please select a color or quantity!') 
return

}
else if (colors == '' || quantity <0){
    alert ('Please select a quantity between 0 and 100!')
    return
}

else if (colors == '' || quantity >100){
    alert ('Please select a quantity between 0 and 100!') 
    return
}

       const ExistingProductLocalStorage = localStorage.getItem("product")
    if (ExistingProductLocalStorage){
        quantity = Number(quantity);
        location.assign("cart.html");
    }

    else if (ExistingProductLocalStorage == null || ExistingProductLocalStorage == 0) {
        ExistingProductLocalStorage = [];
        localStorage.setItem("product", JSON.stringify(ExistingProductLocalStorage));
        messageAlert();
        location.assign("cart.html");
    }
     
  
let ProductStorage = {
    id: id,
    colors: colors,
    quantity: Number(quantity),
    price: price,
    imageUrl:imageUrl,
    altTxt:altTxt,
    name:name

}

// le local storage ne stocke pas des objets, ne stocke que des valeurs sous forme de chaines de caractères
//on utilisera le format JSON et on sérialise l'objet avec la synthaxe JSON.stringify(). cette operation transforme l'objet en une chaine de caractère.
localStorage.setItem(id, JSON.stringify(ProductStorage));
window.location.href="cart.html";
});
