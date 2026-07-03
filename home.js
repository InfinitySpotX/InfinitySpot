// ===========================
// MOVIES DATA
// ===========================
const movies = [
  {
    title: "Aaro",
    poster: "Aaro.jpg",
    video: "https://www.youtube.com/embed/v9jqDP7U8b8?si=GXxLEIJYgOorr8u5"
  },
  {
    title: "Mareechika",
    poster: "jk.jpg",
    video: "https://www.youtube.com/embed/Bj6YTLGktnY?si=4jK9ERCVw1Zr_SzZ"
  },
  {
    title: "Valayam",
    poster: "Valayam.jpg",
    video: "https://www.youtube.com/embed/2dI2DTsX3Ek?si=lJsssgtjDt8RShhI"
  },
  {
    title: "Maruvasham",
    poster: "Maruvasham.jpg",
    video: "https://www.youtube.com/embed/OthoLwGgY6o?si=wQPP7Muvs6PMs9JG"
  }
];


// ===========================
// OPEN MOVIE (SAFE)
// ===========================
function openMovie(title) {
  window.location.href =
    "watch.html?movie=" + encodeURIComponent(title);
}


// ===========================
// HOME PAGE RENDER (SAFE)
// ===========================
const movieContainer = document.getElementById("movie-container");

if (movieContainer) {
  movieContainer.innerHTML = "";

  movies.forEach(movie => {
    movieContainer.innerHTML += `
      <div class="movie">
        <img src="${movie.poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <button onclick="openMovie('${movie.title}')">
          Watch Now
        </button>
      </div>
    `;
  });
}


// ===========================
// SEARCH MOVIE (SAFE)
// ===========================
function searchMovie() {
  const input = document.getElementById("searchBox");

  if (!input) return;

  let value = input.value.trim().toLowerCase();

  if (value === "") {
    alert("Please enter a movie name!");
    return;
  }

  const movie = movies.find(
    m => m.title.toLowerCase() === value
  );

  if (movie) {
    window.location.href =
      "watch.html?movie=" + encodeURIComponent(movie.title);
  } else {
    alert("Movie not found!");
  }
}


// ===========================
// WATCH PAGE (SAFE + NO CRASH)
// ===========================
const player = document.getElementById("player");

if (player) {

  const params = new URLSearchParams(window.location.search);
  let movieName = params.get("movie");

  if (!movieName) {
    movieName = localStorage.getItem("movie");
  }

  const movie = movies.find(
    m => m.title.toLowerCase() === (movieName || "").toLowerCase()
  );

  if (movie) {
    player.src = movie.video;
  } else {
    console.warn("Movie not found!");
    window.location.href = "movies.html";
  }
}


// ===========================
// MENU TOGGLE (CRASH SAFE)
// ===========================
function toggleMenu() {
    document.getElementById("dropdown").classList.toggle("show");
                          }
