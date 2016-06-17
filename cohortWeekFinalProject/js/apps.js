(function () {
/*============================================= imports =============================================================*/
  var e = window.e;
  var movieConstruct = window.movie;
  var randomNum = window.randomNum;
/*============================================ variables ============================================================*/
  var $list = $('#movies');
  var $search = $('#search');
  var $newMovieBtn = $('.newMovie');
  var $newMovieForm = $('#movieFormContainer');
  var $movieForm = $('#movieForm');
  var $movieDetails = $('#movieDetails');
  var $mdHeading = $('#mdHeading');
  var $mdBody = $('#mdBody');
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
  var dailyRate = 3;
/*=========================================== event listeners =======================================================*/
  $search.submit(find);
  $newMovieBtn.click(showNewMovieForm);
  $movieForm.submit(newMovieSubmit);
  $list.click(listClick);
/*============================================= callbacks ===========================================================*/
// searches movie array for a specified movie
  function find(evt) {
    evt.preventDefault();
    var $input = $('input[name=searchItem]');
    var searcher = $input.val();
    $input.val(defaultStatus);
    var present = false;
    var index = 0;
    $.each(movieObjs, function (idx, movie) {
      if (searcher === movie.title.toLowerCase()) {
        index = idx;
        listClick.call($list, index);
        present = true;
      }
    });
    if (index > 1) 
      window.location.hash = 'movie-' + (index - 2);
    else
      window.location.hash = 'top';
    if (!present) {
      $movieDetails.show();
      $mdHeading.html('<h2>Movie Not Found</h2>');
      $mdBody.html('<p>Sorry! We were unable to find ' + searcher +
        ' in our database. Please enter a different search or select a movie from the list.</p>');
      for (var i = 0; i < $list.childNodes.length; i++) {
        $list.childNodes[i].classList.remove('active');
      }
    }
  }
// alerts a movie's short description when it is clicked on
  function listClick(evt) {
    $newMovieForm.classList.add('hidden');
    $mdHeading.innerHTML = '';
    $mdBody.innerHTML = '';
    var index = evt.target ? evt.target.dataset.movieidx : evt;
    for (var i = 0; i < this.childNodes.length; i++) {
      if (i == index)
        this.childNodes[i].classList.add('active');
      else
        this.childNodes[i].classList.remove('active');
    }
    var movieObj = movieObjs[index];
    var available = movieObj.checkedIn ? 'Available' : 'Unavailable';
    e('p', available, {}, {}, $mdBody);
    e('h2', movieObj.title, {}, {}, $mdHeading);
    e('p', movieObj.runningTimeHours(), {}, {}, $mdBody);
    e('p', movieObj.release, {}, {}, $mdBody);
    e('p', movieObj.genre, {}, {}, $mdBody);
    e('p', movieObj.description, {}, {}, $mdBody);
    if (movieObj.checkedIn) {
      var checkOutBtn = e('button', 'Check Out', {'data-movieIdx': index}, {}, $mdBody);
      checkOutBtn.addEventListener('click', checkOut);
    } else {
      var checkInBtn = e('button', 'Check In', {'data-movieIdx': index}, {}, $mdBody);
      checkInBtn.addEventListener('click', checkIn);
    }
    $movieDetails.classList.remove('hidden');
  }
// sows the new movie form
  function showNewMovieForm() {
    $movieDetails.classList.add('hidden');
    for (var i = 0; i < $list.childNodes.length; i++) {
      $list.childNodes[i].classList.remove('active');
    }
    $newMovieForm.classList.toggle('hidden');
  }
// when the movie form is submitted this takes the data and creates a new movie object and clears and reloads the list
  function newMovieSubmit(evt) {
    evt.preventDefault();
    if (!$movieForm.movieTitle.value) {
      $newMovieForm.classList.add('hidden');
      return;
    }
  // clear movie list in the DOM
    $list.innerHTML = '';
    var movie = [
      $movieForm.movieTitle.value,
      $movieForm.runTime.value,
      $movieForm.release.value,
      $movieForm.genre.value,
      $movieForm.description.value
    ];
    movies.push(movie);
    $movieForm.reset();
    $newMovieForm.classList.add('hidden');

    // rebuilds the movie list in the DOM
    capTheArray();
    makeObjAndLi();
  }
  function checkOut() {
    var movie = movieObjs[this.dataset.movieidx];
    var checkOutString = movie.checkOut();
    alert(checkOutString);
    listClick.call($list, this.dataset.movieidx);
  }
  function checkIn() {
    var movie = movieObjs[this.dataset.movieidx];
    var checkInString = movie.checkIn(dailyRate, randomNum(14));
    alert(checkInString);
    listClick.call($list, this.dataset.movieidx);
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
    movies.forEach(function (movie) {
      var movieObj = movieConstruct.apply({}, movie);
      movieObjs.push(movieObj)
    });
    movieObjs.sort(function (a, b) {
      if (a.title > b.title)
        return 1;
      else if (a.title < b.title)
        return -1;
      return 0
    });
    movieObjs.forEach(function (movieObj) {
      var li = e('li', '',
        {id: 'movie-' + movieObjs.indexOf(movieObj), 'data-movieIdx': movieObjs.indexOf(movieObj), 'class': 'list-group-item flex'},
        {},
        $list);
      e('h3', movieObj.title, {'data-movieIdx': movieObjs.indexOf(movieObj)}, {}, li);
      var infoHolder = e('div','', {'data-movieIdx': movieObjs.indexOf(movieObj)}, {}, li);
      e('div', 'genre: ' + movieObj.genre, {'data-movieIdx': movieObjs.indexOf(movieObj)}, {}, infoHolder);
      e('div', 'year released: ' + movieObj.release, {'data-movieIdx': movieObjs.indexOf(movieObj)}, {}, infoHolder);
      e('div', 'running time: ' + movieObj.runningTimeHours(), {'data-movieIdx': movieObjs.indexOf(movieObj)}, {}, infoHolder);
    });
    localStorage.movies = JSON.stringify(movies);
  }
/*========================================== execution ==============================================================*/
  capTheArray();
  makeObjAndLi();
}());