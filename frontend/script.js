const url = "http://localhost:5000";

const container = document.querySelector('.ctn-sneakers');
const pickers = document.querySelectorAll('.picker');

let sneakers;
let filteredSneakers;



function loadSneakers() {

    fetch(`${url}/sneakers`)
    
    .then(response => {
        return response.json()
        
    })
    .then(data =>{
        sneakers = data.sneakers;
        filteredSneakers = data.sneakers;
        getSneakers();
        loadCart();
    })
    .catch (error => {
        console.log(error);
    })
    
}


//display sneakers
function getSneakers(){
    container.innerHTML = "";
    filteredSneakers.forEach(sneaker => {
        let sneakerCtn = document.createElement("div");
        sneakerCtn.classList.add("sneaker-item");
        sneakerCtn.innerHTML= `
        
        <div class="body-carouselle">
        <input type="radio" id="image1" name="image" checked>
        <input type="radio" id="image2" name="image">
        <input type="radio" id="image3" name="image">
        
        <div class="container-carousselle">
          <div class="featured-wrapper">
            <ul class="featured-list">
              <li>
                <figure>
                  <a href="./index.html?id=${sneaker.id}"><input type="radio" id="image1" name="image" checked>
                  <img class="img-carousselle"   src="${sneaker.img_1_1}" alt="">
                  </a>
                </figure>
              </li>
              <li>
                <figure>
                  <img class="img-carousselle"   src="${sneaker.img_1_2}" alt="">
                </figure>
              </li>
              <li>
                <figure>
                  <img class="img-carousselle"   src="${sneaker.img_1_3}" alt="">
                </figure>
              </li>
            </ul>
            <ul class="arrows">
              <li>
                <label class="label-carousselle"   for="image1"></label class="label-carousselle"  >
              </li>
              <li>
                <label class="label-carousselle"   for="image2"></label class="label-carousselle"  >
              </li>
              <li>
                <label class="label-carousselle"   for="image3"></label class="label-carousselle"  >
              </li>
            </ul>
            <ul class="dots">
              <li>
                <label class="label-carousselle"   for="image1"></label class="label-carousselle"  >
              </li>
              <li>
                <label class="label-carousselle"   for="image2"></label class="label-carousselle"  >
              </li>
              <li>
                <label class="label-carousselle"   for="image3"></label class="label-carousselle"  >
              </li>
            </ul>
          </div>
          <ul class="thumb-list">
            <li>
              <label class="label-carousselle"   for="image1">
                <img class="img-carousselle"   src="${sneaker.img_1_1}" alt="">
                <span class="outer">
                  <span class="inner">Caption1</span>
                </span>
              </label class="label-carousselle"  >
            </li>
            <li>
              <label class="label-carousselle"   for="image2">
                <img class="img-carousselle"   src="${sneaker.img_1_2}" alt="">
                <span class="outer">
                  <span class="inner">Caption2</span>
                </span>
              </label class="label-carousselle"  >
            </li>
            <li>
              <label class="label-carousselle"   for="image3">
                <img class="img-carousselle"   src="${sneaker.img_1_3}" alt="">
                <span class="outer">
                  <span class="inner">Caption3</span>
                </span>
              </label class="label-carousselle"  >
            </li>
          </ul>
        </div>
    </div>
    <div class="encadrement">
        <div class="sneaker-prix">
        <div class="sneaker-name">Model : ${sneaker.name}</div>
        <div>Prix : ${sneaker.price}€</div>
        </div>
        <div class="sneakers-description-global">
        <div class="sneakers-description">Description : <br> ${sneaker.description}
        <div id="texte-afficher">${sneaker.sous_description}</div>
        <button id="afficher-suite">Afficher la suite</button>
        </div>
        </div>
        <div class="sneakers-caracteristique">
        <div class="div-caracteristique"><p >Caracteristique : </p></div>
        <div class="sneakers-ecrans">Taille de l'écrans : ${sneaker.Ecran}</div>
        <div class="sneakers-stockage">Capaciter de stockage : ${sneaker.stockage}</div>
        <div class="sneakers-poid">Poids de l'appareil : ${sneaker.Poids}</div>
        </div>
        <button onclick="addSneaker(${sneaker.id})" class="sneaker-btn">Ajouterau panier</button>
        </div>
        <div class="barre"></div>
        `;
        container.appendChild(sneakerCtn);
    })
    pickers.forEach(picker => {
        picker.addEventListener('click', selectItem)
    })

let togg1 = document.getElementById("afficher-suite");
let d1 = document.getElementById("texte-afficher");
togg1.addEventListener("click", () => {
  if(getComputedStyle(d1).display != "none"){
    d1.style.display = "none";
  } else {
    d1.style.display = "block";
  }
})
//const data = require('../backend/data.json')
//console.log(data)

const queryString_url_id = window.location.search;
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get('id');

//const idProduitSelectionner = data.sneakers.find(element => element.id === id);
//console.log(idProduitSelectionner)

}

function selectItem(e){
//console.log("test")
let picker = e.target;
let color = e.target.classList[2]
pickers.forEach((e) => {
    e.classList.remove('selected');
})
picker.classList.add('selected');
//console.log(color);
filterByColor(color);
}

function filterByColor (color) {
    if (color === 'all') {
        filteredSneakers = sneakers;
        getSneakers();
    } else {
    filteredSneakers = sneakers.filter(sneaker => sneaker.colors === color);
    if(filteredSneakers.length <= 0){
        container.innerHTML = `<p>Aucune sneaker trouvée...</p>`
    }
    getSneakers();
    }
}

// tri par tri

const  priceBtn = document.querySelector('.price-btn')
priceBtn.addEventListener('click', sortByPrice)

function comparedByPrice(a, b){
    return a.price - b.price;
}

function sortByPrice(){
    filteredSneakers.sort(comparedByPrice);
    getSneakers();
}


const cartIcon = document.querySelector('.cart-icon');
const cartCtn = document.querySelector('.cart-ctn');
//Toggles cart
function toggleCart(){
    cartCtn.classList.toggle('open-cart');
    if(cartCtn.classList.contains('open-cart')){
        cartIcon.src = 'close.png';

    } else {
        cartIcon.src ='cart.png';
    }
}
cartIcon.addEventListener('click', toggleCart);

//Local storage

let cartList = JSON.parse(localStorage.getItem('cart') || '[]');

function addSneaker (id){
    let sneaker = sneakers.find(sneaker => sneaker.id === id);
    cartList.push(sneaker);
    localStorage.setItem('cart', JSON.stringify(cartList));
    loadCart();
}

function loadCart(){
    cartCtn.innerHTML = "";
    cartList.forEach(sneaker => {
        let sneakerCart = document.createElement("div");
        sneakerCart.classList.add("cart-item");
        sneakerCart.innerHTML = `
        <img src="${sneaker.img_1_1}" class="cart-sneaker-img" alt="sneaker"/>
        <div>${sneaker.name}</div>
        <div>${sneaker.price}€</div>
        <button onclick="removeFromCart(${sneaker.id})"><img src="./poubelle.png" class="cart-sneaker-img" alt="sneaker"/></button>
        <label for="quantity">Quantité</label>
        <select name="quantity_produit" id="quantity_produit">
        </select>
      
        `;
        cartCtn.appendChild(sneakerCart);
        const StructureQuantity = `
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        `;

        const positionQuantity = document.querySelector("#quantity_produit");
        positionQuantity.innerHTML = StructureQuantity;
        const choixQuantiter = positionQuantity.value;
    
    
    })
    prixTotalCartList();
   
}


function removeFromCart(id) {
    let indexToRemove = cartList.findIndex(sneaker => sneaker.id === id);
    cartList.splice(indexToRemove, 1);
    localStorage.setItem('cart', JSON.stringify(cartList))
    loadCart();
}

function removeFromCartAll(id) {
    let indexToRemove = cartList.findIndex(sneaker => sneaker.id === id);
    cartList.splice(indexToRemove, 1000);
    localStorage.setItem('cart', JSON.stringify(cartList))
     const toutSupprimer = `
     
     <button onclick="removeFromCart(${sneaker.id})"><img src="./poubelle.png" class="cart-sneaker-img" alt="sneaker"/></button>
     
     `
    cartCtn.insertAdjacentHTML("beforeend", toutSupprimer)
}

function prixTotalCartList(){
let prixTotal = []; 

for (let i = 0; i < cartList.length; i++){
    let prixProduit = cartList[i].price;
    prixTotal.push(prixProduit);
    
console.log(prixTotal);
}
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const total = prixTotal.reduce(reducer);
    const afficherTotal = `
    <div class="afficher-total">Le total de votre panier est ${total} €</div>
    <button class="sneaker-btn">Commander</button>
    `
    cartCtn.insertAdjacentHTML("beforeend", afficherTotal)
}

loadSneakers();

