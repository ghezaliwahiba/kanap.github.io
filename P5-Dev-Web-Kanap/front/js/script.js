
    function AddProducts() {

    fetch("http://localhost:3000/api/products") //Ce code nous permet d'envoyer une requête HTTP de type GET au service web se trouvant à l'adresse . (Fetch est un ensemble d'objets et de fonctions qui permet d'exécuter des requêtes HTTP).
//Pour cela Fetch va nous renvoyer une Promise. : la Promise est un objet qui fournit une fonction then qui sera exécutée quand le résultat aura été obtenu,
      .then(function(res) { //Ensuite nous appelons la fonction then() pour récupérer le résultat de la requête au format json .
        if (res.ok) {
          return res.json();  //les resultats sont recupéré et exécuté sous forme json; c'est le format le plus simple
        }
      })// en ayant vérifié au préalable que la requête s’était bien passée avec res.ok. Ce résultat json étant lui aussi une Promise, nous le retournons et récupérons sa vraie valeur dans la fonction then() suivante.
    .then(function(données) { 
    données.forEach(function (product) { //Executer une fonction donnée sur chaque élément du tableau.
      console.log(product)
    var product = document.createElement('a');
    product.href=données[0]._id;
    var items = document.querySelector("#items");
    items.appendChild(product);

    var article = document.createElement('article');
    product.appendChild(article);

    var image = document.createElement("img");
    image.src= données[0].imageUrl;
    image.alt=données[0].altTxt;
    article.appendChild(image);

    var ProductName= document.createElement ("h3");
    ProductName.innerText=données[0].name; 
    article.appendChild(ProductName);

    var ProductDescription= document.createElement ("P");
    ProductDescription.innerText = données[0].description;
    article.appendChild(ProductDescription);
        
        }) 
        
})
      
.catch(function(err) { //et une fonction catch qui sera appelée s’il y a une erreur qui est survenue lors de la requête.
    // Une erreur est survenue
  });
}

AddProducts();

    