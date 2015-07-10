/*============================== variable space ========================================*/

var list = document.getElementById('movies');
var search = document.getElementById('search');
var newMovieBtn = document.querySelector('.newMovie');
var newMovieForm = document.getElementById('movieFormContainer');
var movieForm = document.getElementById('movieForm');
var movies = [
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
var moviesObj = [];


/*============================== event space ========================================*/

list.addEventListener('click', function (evt) {
    var rel = evt.target.getAttribute('rel');
    if(rel) {
        alert(rel);
    }
});

search.addEventListener('submit', find);

newMovieBtn.addEventListener('click', function () {
    newMovieForm.classList.remove('hidden');
});

movieForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if(!movieForm.movieTitle.value) {
        newMovieForm.classList.add('hidden');
        return '';
    }
    var genreInputs = document.getElementsByName('genre');
    var genre;
    list.innerHTML = '';

    for(var i = 0; i < genreInputs.length; i++) {
        var genreInput = genreInputs[i];
        if(genreInput.checked) {
            genre = genreInput.value;
            break;
        }
    }

    var movie = [movieForm.movieTitle.value, movieForm.runTime.value, movieForm.release.value, genre, movieForm.description.value];
    debugger;
    movies.push(movie);
    movieForm.reset();
    newMovieForm.classList.add('hidden');
    capTheArray();
    makeObjAndLi();
});


/*============================== function space ========================================*/

//capitalizes first letter of a string
function capitalize(str) {
    if (!str || typeof str !== "string") {
        return str;
    }

    return str[0].toUpperCase() + str.slice(1);
}

//function for creating movie objects
function Movie(title, runTime, release, genre, desc) {
    this.title = title;
    this.runTime = runTime;
    this.release = release;
    this.genre = genre;
    this.description = desc;
}

Movie.prototype = {
    runningTimeHours: function runningTimeHours() {
        return Math.floor(this.runTime / 60) + ' hrs ' + (this.runTime % 60) + ' min';
    },
    preview: function preview() {
        return this.description.slice(0, 50) + '...';
    }
};

Movie.create = function create(title, runTime, release, genre, desc) {
    return new Movie(title, runTime, release, genre, desc);
};

//creates new elements
function e(elementType, text, atributes, styles, selector) {
    var element = document.createElement(elementType);
    element.textContent = text || '';

    for(var attr in atributes) {
        if(atributes.hasOwnProperty(attr)) {
            element.setAttribute(attr, atributes[attr]);
        }
    }

    for(var style in styles) {
        if(styles.hasOwnProperty(style)) {
            element.style[style] = styles[style];
        }
    }

    var container = typeof(selector) === 'string' ? document.querySelector(selector) : selector;

    if(container) {
        container.appendChild(element);
    }

    return element;
}

//searches movie array for a specified movie
function find(evt) {
    evt.preventDefault();

    var searcher = search.searchItem.value.toLowerCase();
    search.searchItem.value = defaultStatus;

    var present = false;

    for(var i = 0; i < moviesObj.length; i++){
        var movie = moviesObj[i];
        if(searcher === movie.title.toLowerCase()) {
            alert(movie.title + ' was released in ' + movie.release);
            present = true;
            break;
        }
    }

    if(!present) {
        alert('Sorry, that movie is not on the list.');
    }
}

//cyles through movies array and calls capitalize for each word in the titles
function capTheArray() {
    for (var i = 0; i < movies.length; i++) {
        var titleWords = movies[i][0].split(' ');
        for (var j = 0; j < titleWords.length; j++) {
            var noCap = ['of', 'the', 'and', 'for', 'in', 'to'];
            if (j !== 0 && noCap.indexOf(titleWords[j]) > -1) {
                continue;
            }

            titleWords[j] = capitalize(titleWords[j]);
        }

        titleWords = titleWords.join(' ');
        movies[i][0] = titleWords;
    }
}

/*
 creates movie objects from the array and adds them to a
 new array and created list items for each movie object
 */
function makeObjAndLi() {
    for (var l = 0; l < movies.length; l++) {
        var movie = movies[l];
        var movieObj = Movie.create.apply({}, movie);
        var li = e('li', '', {'rel': movieObj.preview()}, {}, list);
        var title = e('h3', movieObj.title, {'rel': movieObj.preview()}, {}, li);
        var info = e('p', 'genre: ' + movieObj.genre + '  |  year released: ' + movieObj.release + '  |  running time: ' + movieObj.runningTimeHours(), {'rel': movieObj.preview()}, {}, li);

        /*li.addEventListener('click', function () {
         alert(this.getAttribute('rel'));
         });*/

        moviesObj.push(movieObj);
    }
}


/*============================== execution space ========================================*/

capTheArray();
makeObjAndLi();