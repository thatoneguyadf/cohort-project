var list = document.getElementById('list');
var button = document.getElementById('button')
var moviesObj = [];

button.addEventListener('click', find)

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
]

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
		var noCap = ['of', 'the', 'and', 'for', 'in', 'to']
		if(j !== 0 && noCap.indexOf(titleWords[j]) > -1) {
			continue;
		}

		titleWords[j] = capitalize(titleWords[j]);
	}

	titleWords = titleWords.join(' ');
	movies[i][0] = titleWords;
}

console.log(movies);

//function for creating movie objects
function movieObjectCreator(title, runTime, release) {
	return {
		title: title,
		runTime: runTime + ' min',
		release: release
	}
}

//creates movie objects from the array and adds them to a new array
for(var l = 0; l < movies.length; l++) {
	var movie = movies[l];
	var movieObj = movieObjectCreator.apply({}, movie);

	moviesObj.push(movieObj);
}


//creates li containing movie title and info and pushes them onto the html
//also loggs the movies and their info
for(var k = 0; k < moviesObj.length; k++) {
	var li = document.createElement('li');
	var title = document.createElement('h2');
	var info = document.createElement('p');

	var movie = moviesObj[k];

	console.log('\'' + movie.title + '\'' + ' runs for ' + movie.runTime + ' and was released in ' + movie.release);

	title.textContent = movie.title;
	info.textContent = 'Run time: ' + movie.runTime + '  |   Year Released: ' + movie.release;

	li.appendChild(title);
	li.appendChild(info);
	list.appendChild(li);
}

//searches movie array for a specified movie
function find() {
	var search = prompt('What movie are you looking for?');

	search = search.toLowerCase();

	var present = 0;

	for(var i = 0; i < moviesObj.length; i++){
		var movie = moviesObj[i];
		if(search === movie.title.toLowerCase()) {
			alert(movie.title + ' was released in ' + movie.release);
			present = 1;
			break;
		}
	}

	if(present === 0) {
		alert('Sorry, that movie is not on the list.')
	}
}