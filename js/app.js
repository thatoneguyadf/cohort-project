function Person(name, email, movie) {
	name: name,
	email: email,
	favoriteMovie: movie
}


var name = prompt("Please enter your name.");
var email = prompt("Please enter your email address.");
var movie = prompt("Please enter your favorite movie.");

var person = new Person(name, email, movie);

console.log(person);
//console.log(person.name);
//console.log(person.email);
//console.log(person.favoriteMovie);