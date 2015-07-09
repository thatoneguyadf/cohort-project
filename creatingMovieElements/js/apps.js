/**
 * Created by Adam on 7/9/2015.
 */

var list = e('ul', '', {id: 'movies'}, {}, 'body');
var button = document.getElementById('button');
var moviesObj = [];

button.addEventListener('click', find);

var movies = [
    ['star wars', 121, 1977],
    ['empire strikes back', 124, 1980],
    ['return of the jedi', 134, 1983],
    ['spaceballs', 96, 1987],
    ['monty python and the holy grail', 91, 1975],
    ['time bandits', 110, 1981],
    ['robin hood men in tights', 104, 1993],
    ['the princess bride', 98, 1987],
    ['serenity', 119, 2005],
    ['the hitchhiker\'s guide to the galaxy', 109, 2005]
];

//capitalizes first letter of a string
function capitalize(str) {
    if (!str || typeof str !== "string") {
        return str;
    }

    return str[0].toUpperCase() + str.slice(1);
}

//cyles through movies array and calls capitalize for each word in the titles
for(var i = 0; i < movies.length; i++) {
    var titleWords = movies[i][0].split(' ');
    for(var j = 0; j < titleWords.length; j++) {
        var noCap = ['of', 'the', 'and', 'for', 'in', 'to'];
        if(j !== 0 && noCap.indexOf(titleWords[j]) > -1) {
            continue;
        }

        titleWords[j] = capitalize(titleWords[j]);
    }

    titleWords = titleWords.join(' ');
    movies[i][0] = titleWords;
}

//function for creating movie objects
function Movie(title, runTime, release) {
    this.title = title;
    this.runTime = runTime + ' min';
    this.release = release;
    this.checkedIn = true;
}

Movie.prototype = {
    checkIn: function checkIn() {
        this.checkedIn = true;
    },
    checkOut: function checkOut() {
        this.checkedIn = false;
    },
    status: function status() {
        if(this.checkedIn) {
            return 'Available';
        }

        return 'Out';
    }
};

Movie.create = function create(title, runTime, release) {
    return new Movie(title, runTime, release);
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

    var container = document.querySelector(selector);
    if(container) {
        container.appendChild(element);
    }

    return element;
}

//searches movie array for a specified movie
function find() {
    var search = prompt('What movie are you looking for?');

    search = search.toLowerCase();

    var present = false;

    for(var i = 0; i < moviesObj.length; i++){
        var movie = moviesObj[i];
        if(search === movie.title.toLowerCase()) {
            alert(movie.title + ' was released in ' + movie.release);
            present = true;

            if(movie.checkedIn) {
                confirm('This movie is available. Would you like to check it out?') ?
                    movie.checkOut() : alert('Thank you.');
            }

            break;
        }
    }

    if(!present) {
        alert('Sorry, that movie is not on the list.');
    }
}

/*
creates movie objects from the array and adds them to a
new array and created list items for each movie object
 */
for(var l = 0; l < movies.length; l++) {
    var movie = movies[l];
    var movieObj = Movie.create.apply({}, movie);
    var li = e('li', movieObj.title, {}, {}, '#movies');

    moviesObj.push(movieObj);
}