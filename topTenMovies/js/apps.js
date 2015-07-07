var list = document.getElementById("list");

var movies = [
	'star wars',
	'empire strikes back',
	'return of the jedi',
	'space balls',
	'monthpython and the search for the holy grail',
	'time bandits',
	'robinhood men in tights',
	'princess bride',
	'serenity',
	'hitchhikers guide to the galaxy'
]

function capitalize(str) {
    if (!str || typeof str !== "string") {
        return str;
    }

    return str[0].toUpperCase() + str.slice(1);
}

for(var i = 0; i < movies.length; i++) {
	var titleWords = movies[i].split(' ');
	for(var j = 0; j < titleWords.length; j++) {
		var noCap = ['of', 'the', 'and', 'for', 'in', 'to']
		if(j != 0 && noCap.indexOf(titleWords[j]) > -1) {
			continue;
		}
		else {
			titleWords[j] = capitalize(titleWords[j]);
		}
	}

	titleWords = titleWords.join(' ');
	movies[i] = titleWords;
}

console.log(movies);