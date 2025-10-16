class Movie{
  constructor(image, year, title, description, rating, link){
    this.image = image;
    this.year = year;
    this.title = title;
    this.description = description;
    this.rating = rating;
    this.link = link;
  }
}

//Function to filter movies with rating 7.4 and above

function isHightRated(movie){
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

//For loop to get 3 movies for carousel

  let carouselMovies = [];
  
  for (i = 0; i < 3; i++) {
    let image = `https://image.tmdb.org/t/p/w500${data.results[i].backdrop_path}`;
    let title = data.results[i].title;
    let description = data.results[i].overview;
    let rating = data.results[i].vote_average;

    carouselMovies.push({image, title, description, rating});
  }

  console.log(carouselMovies);

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

//Filter movies with rating 7.4 and above

let bestMovies = movieList.filter(isHightRated);

console.log(bestMovies);

//create cards for each movie object (within the bestMovie Filter) and display it on the homepage

bestMovies.forEach(movie => {

 //if HomeCardBox does not exist then skip over this part of the code (to avoid errors on Movie Library page)  
  const isHomeCardBox = document.getElementById('HomeCardBox'); 
  if (!isHomeCardBox) return;

  document.getElementById('HomeCardBox').innerHTML += ` <div class="col-md-4">

            <div class="card">
              <img src="${movie.image}" class="card-img-top" alt="..." style="height: 400px; object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${movie.description}</p>
                <div class="d-flex gap-2">
                  <button class="btn btn-danger btn-sm">Watch</button>
                  <button class="btn btn-dark btn-sm">Add to list</button>
                </div>
              </div>
            </div>

  </div>
  `
})

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
              <img src="${movie.image}" class="card-img-top" alt="..." style="height: 400px; object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${movie.description}</p>
                <div class="d-flex gap-2">
                  <button class="btn btn-danger btn-sm">Watch</button>
                  <button class="btn btn-dark btn-sm">Add to list</button>
                </div>
              </div>
            </div>

  </div>
  `
  }
})


//===================================================================================

//Js for Homepage carousel

//create cards for each movie object and display on homepage

carouselMovies.forEach(movie => {
  document.getElementById('carousel').innerHTML +=
  `
  <img src="${movie.image}" class="d-block w-100" alt="...">
  `

  document.getElementById('carouselBadge').innerHTML +=
  `
      <div class="col-md-5 bg-dark bg-opacity-75 p-3 rounded">
        <h2>${movie.title}</h2>
        <p>${movie.description}</p>
        <p>Rating:${movie.rating}</p>
          <div class="d-flex gap-2">
            <button class="btn btn-danger">Watch</button>
            <button class="btn btn-dark">+ Add list</button>
          </div>
      </div>
  `
})

}();

//===================================================================================

//Start of Sign Up and Sign in page script.js

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

//end of Sign in and Sign up page script.js

//===================================================================================//