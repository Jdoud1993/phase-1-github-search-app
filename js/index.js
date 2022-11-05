document.addEventListener("DOMContentLoaded", () => {

document.querySelector("#github-form").addEventListener("submit", handleSubmit)


})

// Handle Event Functions
function handleSubmit(event) {
    event.preventDefault()
    let githubUserName = event.target.search.value
    fetchUser(githubUserName)
}

function handleBtn(event) {
    let btnClass = event.target.classList.value
    fetchRepos(btnClass)
}

// API fetch functions

function fetchUser(userName) {
    fetch(`https://api.github.com/users/${userName}`, {
        method: "GET",
        header: {
            "Content-Type": "Application/json",
            Accept: "application/vnd.github.v3+json"
        }
    })
    .then(resp => resp.json())
    .then(data => addUser(data)) 
}

function fetchRepos(userName) {
    fetch(`https://api.github.com/users/${userName}/repos`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        addRepos(data)
    })
}

// Dom Manipulation Functions

function addUser (userObj) {
    let userCard = document.createElement("li")
    let userContainer = document.querySelector("#user-list")
    userCard.id = userObj.login
    userCard.innerHTML = `
        <img src="${userObj.avatar_url}">
        <h4>UserName : ${userObj.login}</h4>
        <h5>Profile Link: ${userObj.html_url}</h5>
        <button class="${userObj.login}">Obtain Repos</button>
    `
    userContainer.appendChild(userCard)
    let userBtn = document.querySelector(`.${userObj.login}`)
    userBtn.addEventListener("click", handleBtn)
}

function addRepos(repoObj) {
    let repoArr=[...repoObj]
    repoArr.forEach((repo) => {
        let repoList = document.querySelector("#repos-list")
        let repoName = document.createElement("li")
        repoName.innerHTML = `${repo.name}`
        repoList.appendChild(repoName)
    })
}