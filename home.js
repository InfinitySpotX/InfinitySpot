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
    poster: "Jk.jpg",
    video: "https://www.youtube.com/embed/Bj6YTLGktnY?si=4jK9ERCVw1Zr_SzZ"
  },
  {
    title: "Valayam",
    poster: "Valayam.jpg",
    video: "https://www.youtube.com/embed/2dI2DTsX3Ek"
  },
  {
    title: "Maruvasham",
    poster: "Maruvasham.jpg",
    video: "https://www.youtube.com/embed/OthoLwGgY6o"
  }
];


// ===========================
// OPEN MOVIE (FOR ALL PAGES)
// ===========================
function openMovie(title) {
  window.location.href = "watch.html?movie=" + encodeURIComponent(title);
}


// ===========================
// HOME / MOVIES PAGE RENDER
// ===========================
const movieContainer = document.getElementById("movie-container");

if (movieContainer) {
  movieContainer.innerHTML = "";

  movies.forEach(movie => {
    movieContainer.innerHTML += `
      <div class="movie">
        <img src="${movie.poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <button onclick="openMovie('${movie.title}')">Watch</button>
      </div>
    `;
  });
}


// ===========================
// SEARCH FUNCTION
// ===========================
function searchMovie() {
  let input = document.getElementById("searchBox").value.trim().toLowerCase();

  const movie = movies.find(
    m => m.title.toLowerCase() === input
  );

  if (movie) {
    openMovie(movie.title);
  } else {
    alert("Movie not found!");
  }
}


// ===========================
// WATCH PAGE LOGIC
// ===========================
const player = document.getElementById("player");

if (player) {

  const params = new URLSearchParams(window.location.search);
  let movieName = params.get("movie");

  // fallback (if needed)
  if (!movieName) {
    movieName = localStorage.getItem("movie");
  }

  const movie = movies.find(
    m => m.title.toLowerCase() === (movieName || "").toLowerCase()
  );

  if (movie) {
    player.src = movie.video;
  } else {
    alert("Movie not found!");
    window.location.href = "movies.html";
  }
}

functions toggleMenu() {
 document.getElementById("dropdown").classList.toggle("show");
}
