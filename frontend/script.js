const url = "http://localhost:8000";

//const btn = document.querySelector('.sneakers.btn')

//btn.addEventListener('click', getSneakers);


const container = document.querySelector('.ctn-sneakers');
const pickers = document.querySelectorAll('.picker');

let sneakers;
let filteredSneakers;
console.log(`${url}/sneakers`)


function loadSneakers() {

    fetch(`${url}/sneakers`)
    
    .then(response => {
        return response.json()
        
    })
    .then(data =>{
        sneakers =data.sneakers;
        filteredSneakers = data.sneakers;
        getSneakers();
        console.log(sneakers, filteredSneakers);
        loadCart();
    })
    .catch (error => {
        console.log('error : '+ error);
    })
}

//display sneakers
function getSneakers(){
    container.innerHTML = "";
    filteredSneakers.forEach(sneaker => {
        let sneakerCtn = document.createElement("div");
        sneakerCtn.classList.add("sneaker-item");
        sneakerCtn.innerHTML= `
        <img class="sneaker-img" src="${sneaker.img_1}" alt="sneaker"/>
        <div class="sneaker-name">${sneaker.name}</div>
        <div>${sneaker.price}$<div/>
        <button onclick="addSneaker(${sneaker.id})">Ajouterau panier</button>
        `;
        container.appendChild(sneakerCtn);
    })
    pickers.forEach(picker => {
        picker.addEventListener('click', selectItem)
    })
}


function selectItem(e){
//console.log("test")
let picker = e.target;
let color = e.target.classList[2]
picker.forEach((e) => {
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
        container.innerHTML= "Aucune sneaker trouvée..."
    }
    getSneakers();
    }
}

// tri par tri

const  priceBtn = document.querySelector('.price-btn')
priceBtn.addEventListener('click', sortByPrice)

function comparedByPrice(a,b){
    return a.price - b.price;
}

function sortByPrice(){
    filteredSneakers.sort(comparedByPrice);
    return sortByPrice(),
    getSneakers();
}


const cartIcon = document.querySelector('.cart-icon');
const cartCtn = document.querySelector('.cart-ctn');
//Toggles cart
function toggleCart(){
    cartCtn.classList.toggle('open-cart');
    if(cartCtn.classList.contains('open-cart')){
        cartCtn.src = 'close.png';
    } else {
        cartCtn.src ='cart.png';
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
        <img src="${sneaker.img_1}" class="cart-sneaker-img" alt="sneaker"/>
        <div>${sneaker.name}</div>
        <div>${sneaker.price}$</div>
        <button onclick="removeFromCart(${sneaker.id})">Remove</button>
        `;
        cartCtn.appendChild(sneakerCart);
    })
}

function removeFromCart(id) {
    let indexToRemove = cartList.findIndex(sneaker => sneaker.id === id);
    cartList.splice(indexToRemove, 1);
    localStorage.setItem('cart', JSON.stringify(cartList))
    loadCart();
}

loadSneakers();