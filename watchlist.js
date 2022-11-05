document.addEventListener('DOMContentLoaded', function() {
    const watchlistJSON = localStorage.getItem('watchlist');
    const watchlist = JSON.parse(watchlistJSON);
    document.getElementsByClassName("movie-container")[0].innerHTML = renderMovie(watchlist);
});


const renderMovie = (movieArray) => {
    const movieHtmlArray = movieArray.map(function(currentMovie) {
        return `<div class="movie card">
        <img class="card-img-top" src="${currentMovie.Poster}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${currentMovie.Title}</h5>
          <p class="card-text">${currentMovie.Year}</p>
        </div>
      </div>`
    })
    return movieHtmlArray.join('');
}