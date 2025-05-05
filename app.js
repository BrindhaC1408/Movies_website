let selectedLanguage = 'hi'; // Default: Hindi

const APIKEY = "04c35731a5ee918f014970082a0088b1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
const languageSelect = document.getElementById("language-select");

loadMovies(); // Load default movies

async function loadMovies(query = "") {
    const url = query
        ? `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&region=IN&with_original_language=${selectedLanguage}&query=${query}`
        : `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&region=IN&with_original_language=${selectedLanguage}&api_key=${APIKEY}`;

    const resp = await fetch(url);
    const data = await resp.json();
    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = "";

    if (movies.length === 0) {
        main.innerHTML = "<h2 style='color:white;'>No movies found.</h2>";
        return;
    }

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img src="${IMGPATH + poster_path}" alt="${title}" />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h4>Overview:</h4>
                ${overview ? overview.substring(0, 150) + "..." : "No overview available."}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) return "green";
    else if (vote >= 5) return "orange";
    else return "red";
}

// Search form
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value.trim();
    if (searchTerm) {
        loadMovies(searchTerm);
        search.value = "";
    }
});

// Change language
languageSelect.addEventListener("change", () => {
    selectedLanguage = languageSelect.value;
    loadMovies(); // Reload movies in new language
});
