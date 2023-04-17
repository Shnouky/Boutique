const url = "http://localhost:8000";

//const btn = document.querySelector('.sneakers.btn')

//btn.addEventListener('click', getSneakers);


const container = document.querySelector('.ctn-sneakers');
const pickers = document.querySelector('.picker');

let sneakers;
let filteredSneakers;




function loadSneakers() {
    fetch(`${url} /sneakers`)
    .then(response => {
        return response.json()
    })
    .then(data =>{
        sneakers =data.sneakers;
        filteredSneakers = data.sneakers;
        getSneakers();
        console.log(sneakers, filteredSneakers);
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
        <img class="sneaker-img" src="${sneaker.img_1} alt="sneaker"/>
        <div"class="sneaker-name">${sneaker.name}</div>
        <div>${sneaker.price} $<div/>
        `,
        container.appendChild(sneakerCtn);
    })
}
pickers.forEach(picker => {
    picker.addEventListner('click', selectItem)
})

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
    filteredSneakers = sneakers.filter(sneaker => sneaker.colors === color);
    getSneakers();
}

loadSneakers();