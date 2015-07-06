function Person(userName, userEmail, userMovie) {
	this.name = userName;
	this.email = userEmail;
	this.favoriteMovie = userMovie;
};


var name = prompt("Please enter your name.");
var email = prompt("Please enter your email address.");
var movie = prompt("Please enter your favorite movie.");

var person = new Person(name, email, movie);

console.log(person);
//console.log(person.name);
//console.log(person.email);
//console.log(person.favoriteMovie);