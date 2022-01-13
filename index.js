document.addEventListener("DOMContentLoaded", () => {
    const movieSubmit = document.querySelector('#search')

    movieSubmit.addEventListener("submit", (e) => {
        e.preventDefault();
        let input = document.querySelector("input#title").value;
        console.log(input)
    })
})