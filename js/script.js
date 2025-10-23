document.addEventListener('DOMContentLoaded', () => {
  const displayEl = document.getElementById('displayName');
  if (displayEl) {
    const saved = localStorage.getItem('userName');
    displayEl.textContent = saved || 'User';
  }
});

class Movie{
  constructor(image, year, title, description, rating, link, backdrop){
    this.image = image;
    this.year = year;
    this.title = title;
    this.description = description;
    this.rating = rating;
    this.link = link;
    this.backdrop = backdrop;
  }
}

//Function to filter movies with rating 7.4 and above

function isHighRated(movie){
  return movie.rating >= 7.4;
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

//===================================================================================

//For loop to get 3 movies for carousel

  let carouselMovies1 = [];
  
  for (i = 0; i < 1; i++) {
    let backdrop = `https://image.tmdb.org/t/p/w500${data.results[i].backdrop_path}`;
    let title = data.results[i].title;
    let description = data.results[i].overview;
    let rating = data.results[i].vote_average;
    let image = data.results[i] = `https://image.tmdb.org/t/p/w100${data.results[i].poster_path}`;

    carouselMovies1.push({backdrop, title, description, rating, image});
  }

    let carouselMovies2 = [];
  
  for (i = 1; i < 2; i++) {
    let backdrop = `https://image.tmdb.org/t/p/w500${data.results[i].backdrop_path}`;
    let title = data.results[i].title;
    let description = data.results[i].overview;
    let rating = data.results[i].vote_average;
    let image = data.results[i] = `https://image.tmdb.org/t/p/w100${data.results[i].poster_path}`;

    carouselMovies2.push({backdrop, title, description, rating, image});
  }

    let carouselMovies3 = [];
  
  for (i = 2; i < 3; i++) {
    let backdrop = `https://image.tmdb.org/t/p/w500${data.results[i].backdrop_path}`;
    let title = data.results[i].title;
    let description = data.results[i].overview;
    let rating = data.results[i].vote_average;
    let image = data.results[i] = `https://image.tmdb.org/t/p/w100${data.results[i].poster_path}`;

    carouselMovies3.push({backdrop, title, description, rating, image});
  }

//===================================================================================

//Loop to make 3 popular movie objects

  let popularMovies = [];

    for (i = 3; i < 6; i++) {
      let image = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
      let title = data.results[i].title;
      let description = data.results[i].overview;

      popularMovies.push({image, title, description});
    }

//loop to make 3 recommended movie objects

  let recommendedMovies = [];
      
      for (i = 6; i < 9; i++) {
        let image = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
        let title = data.results[i].title;
        let description = data.results[i].overview;

        recommendedMovies.push({image, title, description});
      }

  console.log(carouselMovies1);
    console.log(carouselMovies2);
      console.log(carouselMovies3);

  console.log(popularMovies);
  console.log(recommendedMovies);

//Take data from API and create 40 movie objects

  let movieList = [];

  for (i = 0; i < data2.results.length; i++) {

    let image = `https://image.tmdb.org/t/p/w500${data2.results[i].poster_path}`;
    let title = data2.results[i].title;
    let year = data2.results[i].release_date;
    let description = data2.results[i].overview;
    let rating = data2.results[i].vote_average;
    let link = `https://www.themoviedb.org/movie/${data2.results[i].id}`;

    movieList.push(window["movie_" + i] = new Movie(image, year, title, description, rating, link));

  }  

  for (i = 0; i < data.results.length; i++) {

    let image = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
    let title = data.results[i].title;
    let year = data.results[i].release_date;
    let description = data.results[i].overview;
    let rating = data.results[i].vote_average;
    let link = `https://www.themoviedb.org/movie/${data.results[i].id}`;

    movieList.push(window["movie_" + i] = new Movie(image, year, title, description, rating, link));

  }

console.log(movieList);

//===================================================================================

//Js for Movie Library page

//Generate 40 cards for each movie object and display it on the Movie Library page

movieList.forEach(movie => {

  //check if CardBox exists if not then skip over this part of the code (to avoid errors on homepage)
  const isCardBox = document.getElementById('CardBox'); 
  if (isCardBox) {

  document.getElementById('CardBox').innerHTML += 
  `
  <div class="col-md-4">

            <div class="card">
              <img src="${movie.image}" class="card-img-top" alt="..." style="height: 600px; object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text scrollable">${movie.description}</p>
                <div class="d-flex gap-2">
                  <button class="btn btn-danger btn-sm"><a class="redButtonText" href="individual Movie.html">Watch</a></button>
                  <button class="btn btn-dark btn-sm">Add to list</button>
                </div>
              </div>
            </div>

  </div>
  `
  }
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
                  <button class="btn btn-danger btn-sm"><a class="redButtonText" href="individual Movie.html">Watch</a></button>
                  <button class="btn btn-dark btn-sm">Add to list</button>
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
                  <button class="btn btn-danger btn-sm"><a class="redButtonText" href="individual Movie.html">Watch</a></button>
                  <button class="btn btn-dark btn-sm">Add to list</button>
                </div>
              </div>
            </div>

  </div>
  `
})

//===================================================================================

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
            <button class="btn btn-danger"><a class="redButtonText" href="individual Movie.html">Watch</a></button>
            <button class="btn btn-dark">+ Add list</button>
          </div>
      </div>
  `
})

  const Carousel2 = document.getElementById('carousel1'); 
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
            <button class="btn btn-danger"><a class="redButtonText" href="individual Movie.html">Watch</a></button>
            <button class="btn btn-dark">+ Add list</button>
          </div>
      </div>
  `
})

  const Carousel3 = document.getElementById('carousel1'); 
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
            <button class="btn btn-danger"><a class="redButtonText" href="individual Movie.html">Watch</a></button>
            <button class="btn btn-dark">+ Add list</button>
          </div>
      </div>
  `
})

//turbo poop script for the carousel

// Grab the three badges (Where the movies details are displayed)
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

// //Js for Movie Watchlist page

// const bestMovies = movieList.filter(isHighRated);
// console.log(bestMovies);

// bestMovies.forEach(movie => {

//   //check if CardBox exists if not then skip over this part of the code (to avoid errors on homepage)
//   const isWatchlist = document.getElementById('Watchlist'); 
//   if (isWatchlist) {

//   document.getElementById('Watchlist').innerHTML += 
//   `
//   <div class="col-md-4">

//             <div class="card">
//               <img src="${movie.image}" class="card-img-top" alt="..." style="height: 600px; object-fit: cover;">
//               <div class="card-body">
//                 <h5 class="card-title">${movie.title}</h5>
//                 <p class="card-text scrollable">${movie.description}</p>
//                 <div class="d-flex gap-2">
//                   <button class="btn btn-danger btn-sm">Watch</button>
//                   <button class="btn btn-dark btn-sm">Add to list</button>
//                 </div>
//               </div>
//             </div>

//   </div>
//   `
//   }
// })

//===================================================================================

//code for the individual movie page



//For API JS keep code within this function scope
}();

//===================================================================================

//Start of Sign Up and Sign in page script.js

// Toggle between Sign In and Sign Up forms using jQuery black magic (also changes the page title)

//Save data to use on the home page

let username;

document.getElementById('sign-in-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  const username = document.getElementById('signInUserName').value;

    localStorage.setItem('userName', username);
    window.location.href = "/pages/Home.html";
});

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