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

function isHightRated(movie){
  return movie.rating >= 7.4;
}

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

let bestMovies = movieList.filter(isHightRated);

console.log(bestMovies);

bestMovies.forEach(movie => {
  document.getElementById('CardBox').innerHTML += ` <div class="col-md-4">

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

}();

//===================================================================================//

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