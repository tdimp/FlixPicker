document.addEventListener("DOMContentLoaded", () => {
   renderMovies();
    let queue = document.getElementById('queue');
    let watched = document.getElementById('watched');
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
            addToQueue(data)
            postMovie(data)
        })
        e.target.reset();
    })
    
    addRandomButton();
    queue.addEventListener('click', handleWatch)
    watched.addEventListener('click', handleUnwatch)
    document.addEventListener('click', pickRandomMovie);
    
})


function addToQueue(movie) {
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
    movie.Watched = "False";
}

function addRandomButton() {
    if (queue.childNodes.length <= 3) {
        let randomButton = document.createElement('button');
        queue.appendChild(randomButton);
        randomButton.className = "random-button"
        randomButton.innerText = "Pick a Flick!"
    }
}

function pickRandomMovie() {
    let movieArr = queue.getElementsByTagName('div');
    console.log(movieArr)
}

function handleWatch(e) {
    // use .appendTo(#watched) or .prependTo(#watched)
    if (e.target.innerText === "Watched?") {
        let watchButton = e.target;
        document.getElementById("watched").appendChild(watchButton.parentElement);
        watchButton.className = "watched"
        watchButton.innerText = "Add to Queue"
    } 
}

function handleUnwatch(e) {
    if (e.target.className === "watched") {
        let queueButton = e.target;
        document.getElementById("queue").appendChild(queueButton.parentElement);
        queueButton.className = "watch-button"
        queueButton.innerText = "Watched?" 
        console.log(queueButton)
    }
}

function renderMovies() {
    fetch('http://localhost:3000/movies', {
        method: "GET",
    })
    .then(res => res.json())
    .then(data => {
        data.forEach(addToQueue)
    })
}

function postMovie(movieObj) {
    fetch('http://localhost:3000/movies', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(movieObj)
    })
    .then(res => res.json())
}