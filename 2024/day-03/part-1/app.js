const fs = require('fs');
const input = fs.readFileSync('./2024/day-03/part-1/input.txt', 'utf-8');

const matches = [...input.match(/mul\(\d+,\d+\)/gm)];

var squareSum = 0
for ( var i = 0; i < matches.length; i++){
	numbers = [...matches[i].match(/\d+/g)];
	squareSum += numbers[0] * numbers[1];
}

console.log(`Square Sum: ${squareSum}`);