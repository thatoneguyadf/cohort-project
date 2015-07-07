var btn = document.getElementById("btn");
btn.addEventListener("click", numberLoop);

function numberLoop() {
	var start = prompt("Please enter a number to start the loop.");
	var end = prompt("Please enter a number to end the loop.");

	start = parseInt(start);
	end = parseInt(end);

	if(isNaN(start) || isNaN(end)) {
		alert("You must enter numbers only!");
		return '';
	}

	if(start > end) {
		alert("The starting number must be less than the ending number.");
		return '';
	}
	
	for(start; start <= end; start++) {
		console.log(start % 2 === 0 ? start + " is even" : start + " is odd");
	}
}