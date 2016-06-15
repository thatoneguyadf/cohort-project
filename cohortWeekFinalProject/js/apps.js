(function () {
/*============================================= imports =============================================================*/
  var e = window.e;
  var movieConstruct = window.movie;
  var getMovies = window.getMovies;
  var newMovie = window.newMovie;
  var getMovie = window.getMovie;
  var updateMovie = window.updatMovie;
  var deleteMovie = window.deleteMovie;
/*============================================ variables ============================================================*/
  var list = document.getElementById('movies');
  var search = document.getElementById('search');
  var newMovieBtn = document.querySelector('.newMovie');
  var newMovieForm = document.getElementById('movieFormContainer');
  var movieForm = document.getElementById('movieForm');
  var movies = getMovies() || [];
  console.log(movies);
  /*=========================================== event listeners =======================================================*/
  search.addEventListener('submit', find);
  newMovieBtn.addEventListener('click', showNewMovieForm);
  movieForm.addEventListener('submit', newMovieSubmit);
/*============================================= callbacks ===========================================================*/
// searches movie array for a specified movie
  function find(evt) {
    evt.preventDefault();
    var searcher = search.searchItem.value.toLowerCase();
    search.searchItem.value = defaultStatus;
    var present = false;
    for (var i = 0; i < movieObjs.length; i++) {
      var movie = movieObjs[i];
      if (searcher === movie.title.toLowerCase()) {
        alert(movie.title + ' was released in ' + movie.release);
        present = true;
        break;
      }
    }
    if (!present)
      alert('Sorry, that movie is not on the list.');
  }
// alerts a movie's short description when it is clicked on
  function listClick() {
    this.lastChild.classList.toggle('hidden');
  }
// sows the new movie form
  function showNewMovieForm() {
    newMovieForm.classList.toggle('hidden');
  }
// when the movie form is submitted this takes the data and creates a new movie object and clears and reloads the list
  function newMovieSubmit(evt) {
    evt.preventDefault();
    if (!movieForm.movieTitle.value) {
      newMovieForm.classList.add('hidden');
      return;
    }
  // clear movie list in the DOM
    list.innerHTML = '';
    var movie = [
      movieForm.movieTitle.value,
      movieForm.runTime.value,
      movieForm.release.value,
      movieForm.genre.value,
      movieForm.description.value
    ];
    movieObj = movieConstruct.apply({}, movie);
    newMovie(movieObj);
    movies.push(movieObj);
    movieForm.reset();
    newMovieForm.classList.add('hidden');

    // rebuilds the movie list in the DOM
    capTheArray();
    makeObjAndLi();
  }
/*============================================= functions ===========================================================*/
// capitalizes first letter of a string
  function capitalize(str) {
    if (!str || typeof str !== "string")
      return str;
    return str[0].toUpperCase() + str.slice(1);
  }
// cycles through movies array and calls capitalize for each word in the titles
  function capTheArray() {
    for (var i = 0; i < movies.length; i++) {
      var titleWords = movies[i].title.split(' ');
      for (var j = 0; j < titleWords.length; j++) {
        var noCap = ["a", "an", "the", "at", "by", "for", "in", "of", "on", "to", "up", "and", "as", "but", "it", "or", "nor"];
        if (j !== 0 && noCap.indexOf(titleWords[j]) > -1) {
          if (!titleWords[(j - 1)].match(/:/g))
            continue;
        }
        titleWords[j] = capitalize(titleWords[j]);
      }
      titleWords = titleWords.join(' ');
      movies[i][0] = titleWords;
    }
  }
// creates movie objects from the array and adds them to a new array and created list items for each movie object
  function makeObjAndLi() {
    for (var l = 0; l < movies.length; l++) {
      var movie = movies[l];
      var movieObj = movieConstruct.apply({}, movie);
      var li = e('li', '', {'rel': movieObj.preview(), 'class': 'panel panel-default'}, {}, list);
      var panelHeading = e('div', '', {'class': 'panel-heading flex'}, {}, li);
      var panelBody = e('div', movieObj.preview(), {'class': 'panel-body hidden'}, {}, li);
      var title = e('h3', movieObj.title, {}, {}, panelHeading);
      var infoHolder = e('div','', {}, {}, panelHeading);
      var genre = e('div', 'genre: ' + movieObj.genre, {}, {}, infoHolder);
      var year = e('div', 'year released: ' + movieObj.release, {}, {}, infoHolder);
      var time = e('div', 'running time: ' + movieObj.runningTimeHours(), {}, {}, infoHolder);
      li.addEventListener('click', listClick);
      movieObjs.push(movieObj);
    }
    localStorage.movies = JSON.stringify(movies);
  }
/*========================================== execution ==============================================================*/
  capTheArray();
  makeObjAndLi();
}());