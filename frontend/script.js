const apiKey = 'b3b1d03983f568c9360abc6962677586'; 
const imageUrl = 'https://image.tmdb.org/t/p/w500'; // Base URL for images, using a width of 500 pixels


// Function to search for movies based on user input



async function searchMovies() {
    const searchQuery = document.getElementById('searchInput').value;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Function to display search results
function displayMovies(movies) {
    const moviesList = document.getElementById('moviesList');
    moviesList.innerHTML = movies.map(movie => 
        `<div onclick="fetchMovieDetails(${movie.id})">
            <img src="${imageUrl + movie.poster_path}" alt="${movie.title}" style="width:100%; max-width:180px;">
            <p>${movie.title}</p>
        </div>`
    ).join('');
}

// Function to fetch similar movies based on movie ID
async function fetchSimilarMovies(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displaySimilarMovies(data.results);
    } catch (error) {
        console.error('Error fetching similar movies:', error);
    }
}

// Function to display similar movies
function displaySimilarMovies(movies) {
    const similarMoviesSlider = document.getElementById('similarMoviesSlider');
    similarMoviesSlider.innerHTML = movies.map(movie =>
        `<div class="similar-movie">
            <img src="${imageUrl + movie.poster_path}" alt="${movie.title}" style="width:100%; max-width:120px;">
            <p>${movie.title}</p>
        </div>`
    ).join('');
}


// Function to fetch and display movie details in a modal
async function fetchMovieDetails(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=genres`;

    try {
        const response = await fetch(url);
        const movie = await response.json();
        displayMovieDetails(movie);
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

function displayMovieDetails(movie) {
    document.getElementById('modalPoster').src = imageUrl + movie.poster_path;
    document.getElementById('modalTitle').textContent = movie.title;
    document.getElementById('modalGenres').textContent = `Genres: ${movie.genres.map(genre => genre.name).join(', ')}`;
    document.getElementById('modalDescription').textContent = `Description: ${movie.overview}`;
    document.getElementById('modalRating').textContent = `Rating: ${movie.vote_average}/10`;

    fetchSimilarMovies(movie.id); // Fetch similar movies when displaying details

    var modal = document.getElementById('movieModal');
    modal.style.display = "block";

    // Close modal when the close button is clicked
    var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  var modal = document.getElementById('movieModal');
  modal.style.display = "none";
}


    // Also close the modal when anywhere outside of the modal content is clicked
    window.onclick = function(event) {
        var modal = document.getElementById('movieModal');
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
}
