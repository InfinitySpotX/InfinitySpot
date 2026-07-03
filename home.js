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

  // Add more movies here
];

// ===========================
// HOME PAGE
// ===========================

const movieContainer = document.getElementById("movie-container");

if (movieContainer) {
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
// OPEN MOVIE
// ===========================

function openMovie(title) {
  localStorage.setItem("movie", title);
  window.location.href = "watch.html";
}

// ===========================
// SEARCH MOVIE
// ===========================

function searchMovie() {
  let input = document.getElementById("searchBox").value.trim().toLowerCase();

  if (input === "") {
    alert("Please enter a movie name!");
    return;
  }

  const movie = movies.find(m => m.title.toLowerCase() === input);

  if (movie) {
    localStorage.setItem("movie", movie.title);
    window.location.href = "watch.html";
  } else {
    alert("Movie not found!");
  }
}

// ===========================
// WATCH PAGE
// ===========================

const player = document.getElementById("player");

if (player) {
  const movieName = localStorage.getItem("movie");

  const movie = movies.find(m => m.title === movieName);

  if (movie) {
    player.src = movie.video;
  } else {
    alert("Movie not found!");
    window.location.href = "index.html"; // Change if your home page name is different
  }
}

// ===========================
// MENU
// ===========================

function toggleMenu() {
  document.querySelector(".menu").classList.toggle("show");
}
