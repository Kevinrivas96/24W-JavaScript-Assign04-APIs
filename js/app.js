// retrieve the elements from the DOM
const grid = document.querySelector(".grid");
const searchForm = document.querySelector("input[type='search']");
const button = document.querySelector("button");


// API key for the Giphy API
const api_key = "1aulllN3vmxDCR25dfZP8wT49GOADjPv";

// Fetch the results when the page loads
document.addEventListener("DOMContentLoaded", fetchResults);
button.addEventListener("click", fetchResults);

// Create the fetch request to the API service using the URL

function fetchResults(event) {

    event.preventDefault();

    // Get the search term from the input field and set it to a default value if the input field is empty
    let searchTerm = grid.firstChild && searchForm.value.trim() !== "" ? searchForm.value : "neon city";

    let url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchTerm}&limit=15&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

    fetch(url).then(response => {
        return response.json();
    }).then(gif => displayResults(gif.data))
        .catch(error => console.error(error));
}

function displayResults(array) {

    // Delete the previous search results
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    // Loop through the array of objects and display the images and other information
    for (let i = 0; i < array.length; i++) {
        console.log(array[i].images.original.webp);
        const img = document.createElement('img');
        const div = document.createElement('div');
        img.src = array[i].images.original.webp;
        img.setAttribute("class", "card-img-top");
        div.appendChild(img);
        div.setAttribute("class", "card");

        // Check if the title is available and set a default value if it is not
        let title = array[i].title ? array[i].title : "No title";

        // Set the card body with the title and rating
        div.innerHTML += `<div class='card-body text-info py-4'><h5 class='card-title'>${title}</h5><p class='card-text text-warning'>Rating: <b>${array[i].rating}</b></p><a href='${array[i].url}' target='_blank' class='btn btn-danger'>View Source</a></div>`

        grid.appendChild(div);
    }
}


