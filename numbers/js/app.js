var btn = document.getElementById("btn");

btn.addEventListener('click', math)

function math() {
	var numOne = prompt("Please enter a number.", 10);
	var numTwo = prompt("Please enter a second number.", 10);

	var parseNumOne = parseInt(numOne);
	var parseNumTwo = parseInt(numTwo);

	if(isNaN(parseNumOne) || isNaN(parseNumTwo)) {
		alert("You must enter numbers!");
		var reset = confirm("Woud you like to try again?");
		if(reset) {
			math();
		}
		else {
			alert("Good bye.");
		}
	}
	else {
		var addition = parseNumOne + parseNumTwo;
		console.log(addition);
	}
}