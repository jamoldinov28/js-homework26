const WrapperEl = document.querySelector(".wrapper");
const formEl = document.querySelector(".form");
const formNameEL = document.querySelector(".name");
const formUsernameEl = document.querySelector(".username");
const formPasswordEl = document.querySelector(".password");
const BASE_URL = "http://localhost:3000";

async function fetchPosts() {
    const response = await fetch(`${BASE_URL}/users`);
    response
        .json()
        .then(res => {
            createPosts(res);
        })
        .catch(err => console.log(err));
}

window.onload = () => {
    fetchPosts();
}

function createPosts(data) {
    data.forEach(user => {
        const divEl = document.createElement("div");
        divEl.className = "card";
        divEl.innerHTML = `
            <h2>${user.name}</h2>
            <p>${user.username}</p>
            <p>${user.password}</p>
            <p>${user.gender}</p>
            <button data-id=${user.id} name="delete-btn">delete</button>`;
        WrapperEl.appendChild(divEl);        
    });
}

formEl.addEventListener("submit", e => {
    e.preventDefault();

    const genderInput = document.querySelector('input[name="gender"]:checked');

    let newPost = {
        name: formNameEL.value,
        username: formUsernameEl.value,
        password: formPasswordEl.value,
        gender: genderInput.value, 
    };
    console.log(newPost);
    
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
});


WrapperEl.addEventListener("click", e => {
    if (e.target.name === "delete-btn") {
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
});