let urlSearch = window.location.search; //permet de récupérer l’URL du page courante.
let urlParams= new URLSearchParams (urlSearch)
let idProduct = urlParams.get ("id")
console.log(idProduct);


fetch(`http://localhost:3000/api/products/${idProduct}`) //string interpolation
      .then((response) => response.json())
       
      .then((res) => AddKanap (res)) 

function AddKanap (product) {
       
    const imageUrl = product.imageUrl;
    const altTxt = product.altTxt;
    const colors = product.colors;
    const description = product.description;
    const name = product.name;
    const _id = product._id;
    const price = product.price;

    const image=document.createElement("img")
    image.src= imageUrl;
    image.alt=altTxt;
    const itemme =document.querySelector(".item__img");
    itemme.appendChild(image);

    const para =document.querySelector("#title"); 
    para.textContent=name;

    const text = document.querySelector("#price")
    text.innerHTML=price;

    const descpt = document.querySelector ("#description")
    descpt.innerHTML=description;

   let ColorsProduct= product.colors;
    ColorsProduct.forEach (function (color) {
        console.log(color);
        let productColor = document.createElement("option");
        const item =document.querySelector("#colors");
        productColor.innerText = color;
        item.appendChild(productColor);
    });
}
