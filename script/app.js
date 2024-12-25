const WrapperEl = document.querySelector(".wrapper");
const formEl = document.querySelector(".form");
const formNameEL = document.querySelector(".name");
const BASE_URL = "http://localhost:3000";

let data = null
let editPost = null
async function fetchPosts() {
    const response = await fetch(`${BASE_URL}/users`);
    response
        .json()
        .then(res => {
            createPosts(res);
            data = res
        })
}
window.onload = () => {
    fetchPosts();
}
function createPosts(data) {
    data.forEach(user => {
        const divEl = document.createElement("div");
        divEl.className = "card";
        let time = new Date(user.createdAt)
        divEl.innerHTML = `
            <h2>${user.name}</h2>
            <div class="card__button">
            <button class="cardd__btn" data-id=${user.id} name="delete-btn">delete</button>
            <button class="card__btn" name="edit-btn" data-id=${user.id}>edit</button>
            </div>
            <div class="card__wrapper">
            <h5>${time.getHours()}:${time.getMinutes()}</h5>
            <p>${user.createdAt  !== user.updetedAt ? "tahrirlandi" : "" }</p>
            </div>
            `
        WrapperEl.appendChild(divEl);        
    })
}
formEl.addEventListener("submit", e => {
    e.preventDefault();  
    let newPost = {
        name: formNameEL.value 
    }
    if(editPost){
        let date = new Date()
        newPost.createdAt = editPost.createdAt,
        newPost.updetedAt = date.getTime(),
        fetch(`${BASE_URL}/users/${editPost.id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
        })
        .then(() =>{
            editPost = null
        })
    }else{
        let date = new Date()
        newPost.createdAt = date.getTime(),
        newPost.updetedAt = date.getTime(),
        fetch(`${BASE_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }
});
WrapperEl.addEventListener("click", e => {
    if (e.target.name === "delete-btn") {
        if(confirm("Are you sure ?")){
            let id = e.target.dataset.id;
            fetch(`${BASE_URL}/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(res => {
                console.log(res);
            })
        }
    }else if(e.target.name === "edit-btn"){
        let id = e.target.dataset.id
        editPost = data?.find(item => item.id === id)
        formNameEL.value  = editPost.name
    }
});