document.addEventListener("DOMContentLoaded", () => {
    const movieSubmit = document.querySelector('#search')

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
    })
})


function handleSearch(movie) {
    let card = document.createElement('div');
    card.className = 'card';
    document.querySelector("#unwatched").appendChild(card);
    let h3 = document.createElement('h3');
    let cover = document.createElement('img');

    card.appendChild(h3);
    card.appendChild(cover);

    h3.innerText = `${movie.Title} (${movie.Year})`;
    cover.src = movie.Poster;
    cover.className = "poster"
}