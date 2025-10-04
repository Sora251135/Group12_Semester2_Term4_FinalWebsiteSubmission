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

  console.log(data);



  let movieList = [];

  for (i = 0; i < data.results.length; i++) {

    let image = data.results[i].poster_path;
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
