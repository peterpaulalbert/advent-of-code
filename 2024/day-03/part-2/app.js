const fs = require('fs');
const input = fs.readFileSync('./2024/day-03/part-1/input.txt', 'utf-8');

const matches = [...input.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/gm)];
//console.log(matches);

var squareSum = 0;
var skip = false; // do() by default
for ( var i = 0; i < matches.length; i++){
	if ( matches[i] === 'do()'){
		skip = false;
	}
	else if ( matches[i] === "don't()"){
		skip = true;
	}
	else {
		if ( skip === false){
			numbers = matches[i].match(/\d+/g);
			//console.log(numbers);
			squareSum += numbers[0] * numbers[1];
		}
	}
}

console.log(`Square Sum: ${squareSum}`);
