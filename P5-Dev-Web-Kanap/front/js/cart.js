let urlSearchCart=window.location.search; 
let urlParamsCart=new URLSearchParams (urlSearchCart);
let id=urlParams.get ("id");
let ProductLocalStorage;
const url="http://localhost:3000/api/products/";

  // Si le localstorage est vide

if ( localStorage.getItem(ProductStorage) !=null ){
  ProductLocalStorage = JSON.parse(ProductLocalStorage);
} 
else {
  ProductLocalStorage = []; // initialiser un tableau (tableau vide)
}

function GetProductLocalStorage(){

// Si le localstorage contient des produits
  for(let i=0; i< ProductLocalStorage.length; i++) {
    
    fetch(url+ ProductLocalStorage[i].id) // on veut reccuperer dans l'APi le produit qui correspond à l'id stoqué dans le local storage.
      .then((response) => response.json())
      .then((res) => data(res)) 
    
      function data (product) { 

      const NewArticle = document.createElement('article')
      const CartItems = document.querySelector ('#cart__items')
      CartItems.appendChild(NewArticle)
    
      const DIV = document.createElement('div')
      NewArticle.appendChild(DIV)
    
      const CartItemImg = document.createElement("img");
      CartItemImg.src=product.imageUrl;
      CartItemImg.alt=product.altTxt;
      DIV.appendChild(CartItemImg);

      const CartItemContent = document.createElement('div')
      NewArticle.appendChild(CartItemContent)
     
      const CartItemContentDescription = document.createElement('div')
      CartItemContent.appendChild(CartItemContentDescription)
    
      const ProductNameCart= document.createElement ("h2");
      ProductNameCart.innerText=product.name;
      CartItemContentDescription.appendChild(ProductNameCart);

      const ProductColorCart= document.createElement ("P");
      ProductColorCart.innerText = product.colors;
      CartItemContentDescription.appendChild(ProductColorCart);

      const ProductPriceCart= document.createElement ("P");
      ProductPriceCart.innerText =product.price;
      CartItemContentDescription.appendChild(ProductPriceCart);
     
      const cartItemContentSettings = document.createElement('div')
      CartItemContent.appendChild(cartItemContentSettings)

      const cartItemContentSettingsQuantity = document.createElement('div')
      cartItemContentSettings.appendChild(cartItemContentSettingsQuantity)
     
      const ProductQuantityCart= document.createElement ("P");
      ProductQuantityCart.innerText = product.quantity;
      cartItemContentSettingsQuantity.appendChild(ProductQuantityCart);

      const input = document.createElement ("input");
      ProductQuantityCart.appendChild(ProductQuantityCart);
    
      const cartItemContentSettingsDelete = document.createElement('div')
      cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

      const ProductDeleteCart= document.createElement ("P");
      ProductDeleteCart.innerText = "Supprimer";
      cartItemContentSettingsDelete.appendChild(ProductDeleteCart);
     
    }
    } 
}
