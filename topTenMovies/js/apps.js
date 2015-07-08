var list = document.getElementById("list");
var moviesObj = [];

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

function capitalize(str) {
    if (!str || typeof str !== "string") {
        return str;
    }

    return str[0].toUpperCase() + str.slice(1);
}

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

function Movie(title, runTime, release) {
	this.title = title;
	this.runTime = runTime + ' min';
	this.release = release
}

for(var l = 0; l < movies.length; l++) {
	var movie = movies[l];
	var movieObj = new Movie(movie[0], movie[1], movie[2]);

	moviesObj.push(movieObj);
}

for(var k = 0; k < moviesObj.length; k++) {
	var li = document.createElement('li');
	var title = document.createElement('h2');
	var info = document.createElement('p');

	var movie = moviesObj[k];

	console.log(movie.title + ' runs for ' + movie.runTime + ' and was released in ' + movie.release);

	title.textContent = movie.title;
	info.textContent = 'Run time: ' + movie.runTime + '  |   Year Released: ' + movie.release;

	li.appendChild(title);
	li.appendChild(info);
	list.appendChild(li);
}