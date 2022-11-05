document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
        if(event.target.classList.contains("add-button")) {
            const movieID = event.target.dataset.imdbid;
            saveToWatchlist(movieID);
        }
        })
});

const myForm = document.getElementById('search-form');
myForm.addEventListener('submit', async function(e){
    e.preventDefault();

    const searchString = document.getElementsByClassName("search-bar")[0].value;
    const urlEncodedSearchString = encodeURIComponent(searchString);
    await fetch("https://www.omdbapi.com/?apikey=59354c85&s=" + urlEncodedSearchString)
        .then(async function(response) {
            return await response.json();
        })
        .then(function(data) {
            document.getElementsByClassName("movie-container")[0].innerHTML = renderMovie(data.Search);
            movieData = data.Search;
        });
})

const renderMovie = (movieArray) => {
    const movieHtmlArray = movieArray.map(function(currentMovie) {
        return `<div class="movie card">
        <img class="card-img-top" src="${currentMovie.Poster}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${currentMovie.Title}</h5>
          <p class="card-text">${currentMovie.Year}</p>
          <button href="#" class="btn btn-primary add-button" data-imdbid=${currentMovie.imdbID}>Add movie</button>
        </div>
      </div>`
    })
    return movieHtmlArray.join('');
}

const saveToWatchlist = (movieID) => {
    const movie = movieData.find((currentMovie) => {
        return currentMovie.imdbID == movieID;
    })
    let watchlistJSON = localStorage.getItem("watchlist");
    let watchlist = JSON.parse(watchlistJSON);

    if(watchlist == null) {
        watchlist = [];
    }

    watchlist.push(movie);
    watchlistJSON = JSON.stringify(watchlist);
    localStorage.setItem("watchlist", watchlistJSON);
}