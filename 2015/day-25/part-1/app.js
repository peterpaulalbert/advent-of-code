const targetRow = 2978;
const targetColumn = 3083;

var row = 1;
var column = 1;
var value = 20151125;
//console.log(`(${row}, ${column}) = ${value}`)

do {

	if ( row -1 === 0)
	{
		row = column + 1
		column = 1;
	} 
	else {
		column++;
		row--;
	}

	value = ( value * 252533 ) % 33554393;
	//console.log(`(${row}, ${column}) = ${value}`)
} 
while ( row !== targetRow || column !== targetColumn ) 

console.log(`(${row}, ${column}) = ${value}`)