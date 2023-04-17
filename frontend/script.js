const url = "http://localhost:8000";

const btn = document.querySelector('.sneakers.btn')

btn.addEventListener('click', getSneakers);

function getSneakers() {
    fetch(`${url} /sneakers`)
    .then(response => {
        return response.json()
    })
    .then(data =>{
        console.log(data)
    })
    .catch (error => {
        console.log('error : '+ error);
    })
}