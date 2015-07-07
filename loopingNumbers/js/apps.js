var btn = document.getElementById("btn");
btn.addEventListener("click", numberLoop);

function numberLoop() {
	var start = prompt("Please enter a number to start the loop.");
	var end = prompt("Please enter a number to end the loop.");

	start = parseInt(start);
	end = parseInt(end);

	if(isNaN(start) || isNaN(end)) {
		alert("You must enter numbers only!");
	}
	else {
		if(start > end) {
			alert("The starting number must be less than the ending number.")
		}
		else {
			for(start; start <= end; start++) {
				if(start % 2 === 0) {
					console.log(start + " is even");
				}
				else {
					console.log(start + " is odd");
				}
			}
		}
	}
}