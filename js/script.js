class Movie {
  constructor(poster){
    this.poster = poster;
  }
}

!async function(){

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
            .then ((result)=> {return result})
            .catch((error)=> console.error(error));

    console.log(data);

    console.log(data.results[0].poster_path);

    let poster = data.results[0].poster_path;

    let newMovie = new Movie (poster);

    console.log(newMovie);

    document.getElementById('MoviePoster').innerHTML = newMovie.poster;

}();