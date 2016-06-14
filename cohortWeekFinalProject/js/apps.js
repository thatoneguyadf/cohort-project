(function () {
/*============================================= imports =============================================================*/
  var e = window.e;
  var movieConstruct = window.movie;
/*============================================ variables ============================================================*/
  var list = document.getElementById('movies');
  var search = document.getElementById('search');
  var newMovieBtn = document.querySelector('.newMovie');
  var newMovieForm = document.getElementById('movieFormContainer');
  var movieForm = document.getElementById('movieForm');
  var movies = localStorage.movies ? JSON.parse(localStorage.movies) : [
    ['star wars', 121, 1977, 'drama', 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the universe from the Empire\'s world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.'],
    ['empire strikes back', 124, 1980, 'drama', 'After the rebels have been brutally overpowered by the Empire on their newly established base, Luke Skywalker takes advanced Jedi training with Master Yoda, while his friends are pursued by Darth Vader as part of his plan to capture Luke.'],
    ['return of the jedi', 134, 1983, 'drama', 'After rescuing Han Solo from the palace of Jabba the Hutt, the rebels attempt to destroy the second Death Star, while Luke struggles to make Vader return from the dark side of the Force.'],
    ['spaceballs', 96, 1987, 'comedy', 'Planet Spaceball\'s President Skroob sends Lord Dark Helmet to steal Planet Druidia\'s abundant supply of air to replenish their own, and only Lone Starr can stop them.'],
    ['monty python and the holy grail', 91, 1975, 'comedy', 'King Arthur and his knights embark on a low-budget search for the Grail, encountering many very silly obstacles.'],
    ['time bandits', 110, 1981, 'action', 'A young boy accidentally joins a band of dwarves as they jump from era to era looking for treasure to steal.'],
    ['robin hood men in tights', 104, 1993, 'comedy', 'A spoof of Robin Hood in general and Robin Hood: Prince of Thieves (1991) in particular.'],
    ['the princess bride', 98, 1987, 'comedy', 'While home sick in bed, a young boy\'s grandfather reads him a story called The Princess Bride.'],
    ['serenity', 119, 2005, 'drama', 'The crew of the ship Serenity tries to evade an assassin sent to recapture one of their number who is telepathic.'],
    ['the hitchhiker\'s guide to the galaxy', 109, 2005, 'comedy', 'Mere seconds before the Earth is to be demolished by an alien construction crew, journeyman Arthur Dent is swept off the planet by his friend Ford Prefect, a researcher penning a new edition of "The Hitchhiker\'s Guide to the Galaxy."']
  ];
  var movieObjs = [];
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
    newMovieForm.classList.remove('hidden');
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
    movies.push(movie);
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
      var titleWords = movies[i][0].split(' ');
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