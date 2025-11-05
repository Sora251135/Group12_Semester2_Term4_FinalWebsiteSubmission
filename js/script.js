document.addEventListener('DOMContentLoaded', () => {
  const displayEl = document.getElementById('displayName');
  if (displayEl) {
    const saved = localStorage.getItem('userName');
    displayEl.textContent = saved || 'User';
  }
});



class Movie{
  constructor(image, year, title, description, rating, link, backdrop, id, language){
    this.image = image;
    this.year = year;
    this.title = title;
    this.description = description;
    this.rating = rating;
    this.link = link;
    this.backdrop = backdrop;
    this.id = id;
    this,language = language;
  }
}

// === Watchlist Items to load before the async ===
const WATCHLIST_KEY = 'watchlist';

function getWatchlist() {
  try {
    return JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

function saveWatchlist(list) {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
}

function removeFromWatchlist(id) {
  const target = String(id);
  const next = getWatchlist().map(String).filter(x => x !== target);
  saveWatchlist(next);
  return next;
}


//Fetch data from API twice to get 40 movies total

!async function() {

  const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmVhMjI0YjE0NjU1Y2MyYWJjM2U3MjFhZTQzMzU4NSIsIm5iZiI6MTc1ODExODk0NC41NzIsInN1YiI6IjY4Y2FjNDIwOThmZmQ1NDU1MGUzNjQ5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EB1Jw38BBXuv-nT5v9wJYKatVdvxHNY8LMWUar0LAGY'
  }
};

  let data = await fetch(url, options)
      .then ((response)=> response.json())
      .then ((results)=> {return results})
      .catch ((error)=> console.log(error));


  const url2 = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc';
  const options2 = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmVhMjI0YjE0NjU1Y2MyYWJjM2U3MjFhZTQzMzU4NSIsIm5iZiI6MTc1ODExODk0NC41NzIsInN1YiI6IjY4Y2FjNDIwOThmZmQ1NDU1MGUzNjQ5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EB1Jw38BBXuv-nT5v9wJYKatVdvxHNY8LMWUar0LAGY'
  }
};

  let data2 = await fetch(url2, options2)
      .then ((response)=> response.json())
      .then ((results)=> {return results})
      .catch ((error)=> console.log(error));

console.log(data);

//end of both api calls

//Take data from API and create 40 movie objects

  let movieList = [];

  for (i = 0; i < data2.results.length; i++) {

    let image = `https://image.tmdb.org/t/p/w500${data2.results[i].poster_path}`;
    let title = data2.results[i].title;
    let year = data2.results[i].release_date;
    let description = data2.results[i].overview;
    let rating = data2.results[i].vote_average;
    let link = `https://www.themoviedb.org/movie/${data2.results[i].id}`;
    let backdrop = `https://image.tmdb.org/t/p/w1280${data2.results[i].backdrop_path}`;
    let id = data2.results[i].id;
    let language = data2.results[i].original_language;

    movieList.push(window["movie_" + i] = new Movie(image, year, title, description, rating, link, backdrop, id, language));

  }  

  for (i = 0; i < data.results.length; i++) {

    let image = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
    let title = data.results[i].title;
    let year = data.results[i].release_date;
    let description = data.results[i].overview;
    let rating = data.results[i].vote_average;
    let link = `https://www.themoviedb.org/movie/${data.results[i].id}`;
    let backdrop = `https://image.tmdb.org/t/p/w1280${data.results[i].backdrop_path}`;
    let id = data.results[i].id;
    let language = data.results[i].original_language;

    movieList.push(window["movie_" + i] = new Movie(image, year, title, description, rating, link, backdrop, id, language));

  }

console.log(movieList);

//===================================================================================

//splice to get 3 movies for carousel

    let carouselMovies1 = movieList.splice(0,1);
  
  console.log(carouselMovies1);

    let carouselMovies2 = movieList.splice(0,1);
  
  console.log(carouselMovies2);

    let carouselMovies3 = movieList.splice(0,1);

  console.log(carouselMovies3);

//===================================================================================

//Splice to make 3 popular movie objects

  let popularMovies = movieList.splice(0,3);

console.log(popularMovies);

//===================================================================================

//Splice to make 3 recommended movie objects

  let recommendedMovies = movieList.splice(0,3);
      
console.log(recommendedMovies);

//===================================================================================

//Make the numbers from the watchlist the same data type as the id from the API so you can actually filter them 
const raw = localStorage.getItem('watchlist');
const savedIds = raw ? JSON.parse(raw) : [];
const idSet = new Set(savedIds.map(String));

//filter the movies based off of the movie ID from the watchlist
const watchlistMovies = movieList.filter(m => idSet.has(String(m.id)));

watchlistMovies.forEach(movie => {

  const iswatchlist = document.getElementById('Watchlist');
  if (!iswatchlist) return;

    document.getElementById('Watchlist').innerHTML +=
    ` 
      <div data-card class="col-12 col-md-6 py-3">
        <div class="card h-100">
          <div class="row g-0 align-items-stretch">
              <div class="col-5">
              <img src="${movie.image}" srcset="${movie.image} 342w, ${movie.image} 500w" class="card-img-top" sizes="(max-width: 576px) 100vw, 342px">
              </div>

              <div class="col-7">
                <div class="card-body h-100 d-flex flex-column">
                  <h5 class="watchcard-title">${movie.title}</h5>
                  <p class="watchcard-text scrollable flex-grow-1">${movie.description}</p>
                  <div class="d-flex gap-2 mt-auto align-items-center">
                    <button class="btn btn-danger btn-sm" data-id="${movie.id}"><a class="btn btn-danger btn-sm watchlink"data-id="${movie.id}"href="individual%20Movie.html">Watch</a></button>
                    <button class="btn btn-dark btn-sm removeBtn" data-id="${movie.id}">Remove Movie</button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
  `
})

//===================================================================================

//Get the Id from the selected Movie
const chosenId = localStorage.getItem('chosenMovieID');
if (chosenId) {

  //make the movie the selected movie from the movie list using the ID to find the correct one
  const movie = movieList.find(m => String(m.id) === String(chosenId));

  //check if individual movie page has the individual movie id for the DOM manipulation
  const isIndividual = document.getElementById('IndividualMovie');
  if (movie && isIndividual) {

    isIndividual.innerHTML = 
`

<div>
  <div class="indivBox">
    <div class="row">

      <div class="col ">
        <img src="${movie.image}" srcset="${movie.image} 342w, ${movie.image} 500w" class="indivImage card-img-top" sizes="(max-width: 576px) 100vw, 342px">
      </div>
      
      <div class="col indivDeets">
        <h1 class="indivTitle mt-3">${movie.title}</h1>
        <p class="indivDesc">${movie.description}</p>
        <h5 class="indivRating">Movie Rating: ${movie.rating}</h5>
        <h5 class="indivYear">Release Date: ${movie.year}</h5>
        <h5 class="Indiv">TMDB Code: <a href="${movie.link}">${movie.id}</a></h5>
      </div>

    </div>
  </div>
</div>

`

  document.getElementById('NavTitle').innerHTML += 
`

${movie.title}

`
    ;
  }
}


//===================================================================================

//Js for Movie Library page

//Generate 40 cards for each movie object and display it on the Movie Library page
console.log(movieList);

movieList.forEach(movie => {

  //check if CardBox exists if not then skip over this part of the code (to avoid errors on homepage)
  const isCardBox = document.getElementById('CardBox'); 
  if (!isCardBox) return;

  document.getElementById('CardBox').innerHTML += 
  `
  <div class="col-md-4" data-year="${movie.year.split('-')[0]}" data-rating="${movie.rating}">
            <div class="card">
              <img src="${movie.image}" srcset="${movie.image} 342w, ${movie.image} 500w" class="card-img-top" sizes="(max-width: 576px) 100vw, 342px">
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text scrollable">${movie.description}</p>
                <div class="d-flex gap-2">
                  <button class="btn btn-danger btn-sm" data-id="${movie.id}"><a class="btn btn-danger btn-sm watchlink"data-id="${movie.id}"href="individual%20Movie.html">Watch</a></button>
                  <button class="btn btn-dark btn-sm watchlistBtn" data-id="${movie.id}">+ Add to list</button>
                </div>
              </div>
            </div>
  </div>
  `
})

//===================================================================================

// //Js for Movie Watchlist page

// Filter bar

movieList.forEach(movie => {
  const isCardBox = document.getElementById('CardBox'); 
  if (!isCardBox) return;

  document.getElementById('CardBox').innerHTML += 
  `
  <div class="col-md-4" data-year="${movie.year.split('-')[0]}" data-rating="${movie.rating}">
    <div class="card">
      <img src="${movie.image}" srcset="${movie.image} 342w, ${movie.image} 500w" class="card-img-top" sizes="(max-width: 576px) 100vw, 342px">
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text scrollable">${movie.description}</p>
        <div class="d-flex gap-2">
          <button class="btn btn-danger btn-sm" data-id="${movie.id}"><a class="btn btn-danger btn-sm watchlink"data-id="${movie.id}"href="individual%20Movie.html">Watch</a></button>
          <button class="btn btn-dark btn-sm watchlistBtn" data-id="${movie.id}">+ Add to list</button>
        </div>
      </div>
    </div>
  </div>
  `
})


document.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  const filter = btn.dataset.filter;
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('#CardBox .col-md-4');

  // Button active styling (makes sure it changes)
  buttons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  cards.forEach(card => {
    const year = parseInt(card.dataset.year);
    const rating = parseFloat(card.dataset.rating);

    let display = true;

    // This is how it will filter - change if you feel the need to change it
    if (filter === 'year') {
      display = year >= 2025; // 
    } else if (filter === 'rating') {
      display = rating >= 7.6; 
    }

    card.style.display = display ? 'block' : 'none';
  });
});

const Watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');

function PassID(id) {
  localStorage.setItem('selectedMovieID', id);
}

let watchlistButtons = document.querySelectorAll('.watchlistBtn');

watchlistButtons.forEach(button => {
  button.addEventListener('click', () => {
    const movieID = button.getAttribute('data-id');
    PassID(movieID);
    if (!Watchlist.includes(movieID)) Watchlist.push(movieID);
    localStorage.setItem("watchlist",JSON.stringify(Watchlist));
    console.log(`Movie ID ${movieID} added to Watchlist `,Watchlist);
  });
});

//Remove Button
document.addEventListener('click', (Remove) => {
  const btn = Remove.target.closest('.removeBtn');
  if (!btn) return;

  const id = btn.dataset.id;
  removeFromWatchlist(id);

  const card = btn.closest('[data-card]');
  if (card) card.remove();
});

//===================================================================================

//js for individual page

document.addEventListener('click', (e) => {
  const a = e.target.closest('.watchlink');
  if (!a) return;
  e.preventDefault(); // ensure we store before navigating
  localStorage.setItem('chosenMovieID', a.dataset.id);
  window.location.href = a.href;
});

//===================================================================

//Js for Homepage carousel

//create cards for each movie object and display on homepage

  const Carousel1 = document.getElementById('carousel1'); 
  if (!Carousel1) return;
  
carouselMovies1.forEach(movie => {
  document.getElementById('carousel1').innerHTML +=
  `
  <img src="${movie.backdrop}" class="d-block" style="width: 100%; object-fit: cover;" alt="...">
  `

  document.getElementById('carouselBadge1').innerHTML +=
  `
      <div class="col-md-5 bg-dark bg-opacity-75 p-3 rounded">
        <h2>${movie.title}</h2>
        <p>${movie.description}</p>
        <p>Rating: ${movie.rating}</p>
          <div class="d-flex gap-2">
          </div>
      </div>
  `
})

  const Carousel2 = document.getElementById('carousel2'); 
  if (!Carousel2) return;

carouselMovies2.forEach(movie => {
  document.getElementById('carousel2').innerHTML +=
  `
  <img src="${movie.backdrop}" class="d-block w-100" alt="...">
  `

  document.getElementById('carouselBadge2').innerHTML +=
  `
      <div class="col-md-5 bg-dark bg-opacity-75 p-3 rounded">
        <h2>${movie.title}</h2>
        <p>${movie.description}</p>
        <p>Rating: ${movie.rating}</p>
          <div class="d-flex gap-2">
          </div>
      </div>
  `
})

  const Carousel3 = document.getElementById('carousel3'); 
  if (!Carousel3) return;

carouselMovies3.forEach(movie => {
  document.getElementById('carousel3').innerHTML +=
  `
  <img src="${movie.backdrop}" class="d-block w-100" alt="...">
  `

  document.getElementById('carouselBadge3').innerHTML +=
  `
      <div class="col-md-5 bg-dark bg-opacity-75 p-3 rounded">
        <h2>${movie.title}</h2>
        <p>${movie.description}</p>
        <p>Rating: ${movie.rating}</p>
          <div class="d-flex gap-2">
          </div>
      </div>
  `
})

//===================================================================================

popularMovies.forEach(movie => {

  const POPULAR = document.getElementById('POPULAR'); 
  if (!POPULAR) return;

  document.getElementById('POPULAR').innerHTML += ` <div class="col-md-4">

            <div class="card">
              <img src="${movie.image}" class="card-img-top" alt="..." style="height: 600px; object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text scrollable">${movie.description}</p>
                <div class="d-flex gap-2">
                </div>
              </div>
            </div>

  </div>
  `
})

//===================================================================================

recommendedMovies.forEach(movie => {

  const Recommended = document.getElementById('Recommended'); 
  if (!Recommended) return;

  document.getElementById('Recommended').innerHTML += ` <div class="col-md-4">

            <div class="card">
              <img src="${movie.image}" class="card-img-top" alt="..." style="height: 600px; object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text scrollable">${movie.description}</p>
                <div class="d-flex gap-2">
                </div>
              </div>
            </div>

  </div>
  `
})

//===================================================================================

// //turbo poop script for the carousel

// // Grab the three badges (Where the movies details are displayed)
const badges = [
  document.getElementById('carouselBadge1'),
  document.getElementById('carouselBadge2'),
  document.getElementById('carouselBadge3'),
];

//Get the carousel itself
const CarouselMain = document.getElementById('carouselExample');

//When the carousel finishes sliding, update which badge is visible depending on which slide the carousel is on
CarouselMain.addEventListener('slid.bs.carousel', function(whichSlide) {
  const newIndex = whichSlide.to; 
  badges.forEach((badgeEl, index) => {
    badgeEl.style.display = index === newIndex ? 'block' : 'none';
  });
});

//On the initial load of the page make sure only the first slide is visible
badges.forEach((badge, i) => badge.style.display = i === 0 ? 'block' : 'none');

//===================================================================================

//For API JS keep code within this function scope

}();

//===================================================================================

//Watchlist Js

function loadList() {

  const list = localStorage.getItem('watchlist');
  console.log("Loaded Watchlist", list);
  return list;
};

//===================================================================================

//Individual Js

function loadMovie() {

  const individualMovie = localStorage.getItem('chosenMovieID');
  console.log("Loaded Movie", individualMovie);
  return individualMovie;
};

//===================================================================================



//signin/signup JS

let username;

document.getElementById('sign-in-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  const username = document.getElementById('signInUserName').value;

    localStorage.setItem('userName', username);
    window.location.href = "/pages/Home.html";
});

  // Toggle between Sign In and Sign Up forms using jQuery black magic (also changes the page title)

$(function(){

  var $signIn  = $('#sign-in-form'),
      $signUp  = $('#sign-up-form'),

      $toggleText = $('#toggle-text');
      $toggleName = $('#webTitle');

  $toggleText.on('click', '#toggle-link', function(stopPageReset){
    stopPageReset.preventDefault();
    $signIn.toggle();
    $signUp.toggle();

    //does the text toggle 
    if ($signIn.is(':visible')) {
      $toggleName.html('Sign In - Page');
      $toggleText.html(
        'Don’t have an account? ' +
        '<a href="#" id="toggle-link">Sign up</a>'
      );
    } else {
      $toggleName.html('Sign Up - Page');
      $toggleText.html(
        'Already have an account? ' +
        '<a href="#" id="toggle-link">Sign in</a>'
      );
    }
  });
});

//End of Sign in and Sign up page script.js

//===================================================================================//

// // === LOGIN SUCCESS POPUP ===
// document.addEventListener("DOMContentLoaded", () => {
//   const signInForm = document.getElementById("sign-in-form");

//   if (signInForm) {
//     signInForm.addEventListener("submit", (event) => {
//       event.preventDefault();

//       const name = document.getElementById("signInUserName").value.trim();
//       const email = document.getElementById("signInEmail").value.trim();
//       const password = document.getElementById("singInPassword").value.trim();

//       // Simple validation (you can customize this)
//       if (name && email && password) {
//         // Store the name for display on the homepage
//         localStorage.setItem("userName", name);

//         // Show popup message
//         showLoginPopup();
//       } else {
//         alert("Please fill in all fields before signing in.");
//       }
//     });
//   }
// });

// // Function to show the success popup
// function showLoginPopup() {
//   // Create the popup overlay
//   const popup = document.createElement("div");
//   popup.innerHTML = `
//     <div class="login-popup-overlay">
//       <div class="login-popup-box">
//         <h2>✅ You have successfully logged in!</h2>
//         <p>Welcome back to <strong>Red Curtain</strong>.</p>
//         <button id="continueBtn">Continue</button>
//       </div>
//     </div>
//   `;
//   document.body.appendChild(popup);

//   // Style it
//   const style = document.createElement("style");
//   style.textContent = `
//     .login-popup-overlay {
//       position: fixed;
//       top: 0; left: 0;
//       width: 100%; height: 100%;
//       background-color: rgba(0,0,0,0.8);
//       display: flex; justify-content: center; align-items: center;
//       z-index: 9999;
//     }
//     .login-popup-box {
//       background-color: #fff;
//       color: #000;
//       text-align: center;
//       padding: 40px;
//       border-radius: 10px;
//       box-shadow: 0 0 15px rgba(0,0,0,0.4);
//       width: 90%;
//       max-width: 400px;
//     }
//     .login-popup-box h2 {
//       color: #6d1010;
//       margin-bottom: 10px;
//     }
//     #continueBtn {
//       background-color: #6d1010;
//       color: white;
//       border: none;
//       padding: 10px 20px;
//       margin-top: 20px;
//       border-radius: 5px;
//       cursor: pointer;
//       font-weight: bold;
//     }
//     #continueBtn:hover {
//       background-color: #9e0e0e;
//     }
//   `;
//   document.head.appendChild(style);

//   // Add button event
//   document.getElementById("continueBtn").addEventListener("click", () => {
//     // Redirect to home page
//     window.location.href = "pages/Home.html";
//   });
// }

