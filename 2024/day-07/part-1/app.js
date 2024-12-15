const fs = require('fs');


// load input into array of objects
const input = fs.readFileSync('./2024/day-07/part-1/input.txt', 'utf-8');
let lines = input.split('\n');
let equations = [];
let maxOperations = 0;
for ( line of lines ) {
	if ( line !== '' ){
		line = line.replace(/(\r\n|\n|\r)/gm, "");
		let sides = line.split( ': ' );
		let operands = sides[1].split( ' ' );
		equations.push( {
			truth: false, // default to false, will set to true later
			total: sides[0],
			operands: operands
		});
		if ( maxOperations < operands.length -1) {
			maxOperations = operands.length -1; // operations between 2 operands = operands -1 
		}
	}
}
console.log(`Equations: ${equations.length}`);
console.log(`Max Operations: ${maxOperations}`);


// build operation combination matrix
let matrix = new Map(); // dictionary object
matrix.set( 1, ['*', '+'] ); // initialize with combination for only 1 operation
for ( let n = 2; n <= maxOperations; n++ ){ // start build with 2 operations
	matrix.set( n, getCombinations(n, matrix) );
}


// check each equation
let totalTrue = 0;
for ( let equation of equations ){
	let operations = matrix.get( equation.operands.length -1 )
	for (let combination of operations){
		let calculatedTotal = calculateEquation(equation.operands, combination);
		if ( equation.total == calculatedTotal) {
			equation.truth = true;
		}
		//console.log(`Truth: ${equation.total == calculatedTotal}, Total: ${equation.total}, Calculated Total: ${calculatedTotal}, Operands: ${equation.operands.join(',')}, Operations: ${combination}`);
	}
	if ( equation.truth ) {
		totalTrue += parseInt(equation.total, 10);
	}
}
console.log( `Total of True Equations: ${totalTrue}`);




function getCombinations(n, matrix){
	let previous = matrix.get(n-1);
	let operators = ['*', '+'];

	let combinations = [];
	for ( let operator of operators ) {  //use previous then replicate 2x for each operator
		for ( let i = 0; i < previous.length; i++){
			combinations.push( [...previous[i], operator ] );
		}
	}
	return(combinations);
}


function calculateEquation(operands, combination) {
	let total = parseInt(operands[0], 10);
	for (let i = 1; i < operands.length ; i++ ) {
		if ( combination[i-1] == '*' ){
			total *= parseInt(operands[i], 10);
		}
		else {
			total += parseInt(operands[i], 10);
		}

	}
	//console.log(`Total: ${total}, Operands: ${operands}, Operations: ${combination.length}` );
	return total;
}