document.addEventListener("DOMContentLoaded", () => {
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
        })
        e.target.reset();
    })
    
    document.addEventListener('click', handleWatch)
})


function handleSearch(movie, queue) {
    let card = document.createElement('div');
    card.className = 'card';
    document.querySelector("#unwatched").appendChild(card);
    let h3 = document.createElement('h3');
    let cover = document.createElement('img');
    let watchButton = document.createElement('button')

    card.appendChild(h3);
    card.appendChild(cover);
    card.appendChild(watchButton);

    h3.innerText = `${movie.Title} (${movie.Year})`;
    cover.src = movie.Poster;
    cover.className = "poster"
    watchButton.className = "button"
    watchButton.id = "watch-button"
    watchButton.innerText = "Watched?"
}

function handleWatch(e) {
    // use .appendTo(#watched) or .prependTo(#watched)
    if (e.target.id === "watch-button") {
        document.getElementById("watched").appendChild(e.target.parentElement)
    }
}
