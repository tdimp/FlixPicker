document.addEventListener("DOMContentLoaded", () => {
   renderMovies(); //this is broken!!!
    
    const movieSubmit = document.querySelector('#search');
    movieSubmit.addEventListener("submit", (e) => {
        e.preventDefault();
        let input = document.querySelector("input#title").value;
        
        fetch(`http://www.omdbapi.com/?t=${input}&apikey=5a6e25f8`,
        {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            handleSearch(data)
            postMovie(data)
        })
        e.target.reset();
    })
    
    document.addEventListener('click', handleWatch)
})


function handleSearch(movie) {
    let card = document.createElement('div');
    card.className = 'card';
    document.querySelector("#queue").appendChild(card);
    let h3 = document.createElement('h3');
    let cover = document.createElement('img');
    let watchButton = document.createElement('button')

    card.appendChild(h3);
    card.appendChild(cover);
    card.appendChild(watchButton);

    h3.innerText = `${movie.Title} (${movie.Year})`;
    cover.src = movie.Poster;
    cover.className = "poster"
    watchButton.className = "watch-button"
    watchButton.innerText = "Watched?"
}

function handleWatch(e) {
    // use .appendTo(#watched) or .prependTo(#watched)
    if (e.target.className === "watch-button") {
        let watchButton = e.target;
        document.getElementById("watched").appendChild(watchButton.parentElement);
        watchButton.className = "watched"
        watchButton.innerText = "Add to Queue"
    } 
}

/* function handleUnwatch(e) {
    if (e.target.className === "watched") {
        let queueButton = e.target;
        document.getElementById("queue").appendChild(queueButton.parentElement);
        queueButton.className = "watch-button"
        queueButton.innerText = "Watched?" 
        console.log(queueButton)
    }
}  */

function renderMovies() {
    fetch('http://localhost:3000/queue', {
        method: "GET",
    })
    .then(res => res.json())
    .then(data => {
        data.forEach(handleSearch)
    })
}

function postMovie(movieObj) {
    fetch('http://localhost:3000/queue', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(movieObj)
    })
    .then(res => res.json())
    .then(movieObj => console.log(movieObj))
}
