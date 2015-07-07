var fiveHundred = [];

for(var i = 0; i < 500; i++) {
	fiveHundred.push(i + 1);
}

console.log(fiveHundred);

for(var j = 0, loops = fiveHundred.length; j < loops; j++) {
	fiveHundred.pop();
}

console.log(fiveHundred);