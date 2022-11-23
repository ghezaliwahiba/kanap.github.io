/*
// pour obtenir le nombre de paires clé/valeur:
localStorage.length()
// pour obtenir le nom de la clé: 
localStorage.key(0)
//pour obtenir toutes les clés:
for (let i=o; i<localStorage.length; i++){
  localStorage.key(i);
}
*/

let ProductLocalStorage =localStorage.getItem(ProductStorage);
let ProductStorageCart = JSON.parse(ProductLocalStorage);

ProductStorageCart.forEach(function (product) {

  console.log(product);

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
      ProductQuantityCart.innerText = "quantity";
      cartItemContentSettingsQuantity.appendChild(ProductQuantityCart);

      const cartItemContentSettingsDelete = document.createElement('div')
      cartItemContentSettings.appendChild(cartItemContentSettingsDelete);


      const ProductDeleteCart= document.createElement ("P");
      ProductDeleteCart.innerText = "Supprimer";
      cartItemContentSettingsDelete.appendChild(ProductDeleteCart);
      
})
