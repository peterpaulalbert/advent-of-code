const fs = require('fs');
const input = fs.readFileSync('./2024/day-04/part-1/input.txt', 'utf-8');

var matrix = [];
var i = 0;
var line = new Array();
while ( i < input.length){
	if (input.charAt( i ) == '\n'){ // (input.charAt( i + 1 ) == '\r' && input.charAt( i + 1 ) == '\n')
		//console.log(line);
		var row = Array.from(line);
		matrix.push( row );
		var line = new Array();
		i++;
	}
	else {
		line.push( input.charAt( i ) );
		i++;
	}
}

var count = 0;
for (var x = 0; x < matrix.length; x++){
	//console.log(matrix.length);
	for(var y = 0; y < matrix[x].length; y++){
		//console.log(matrix[x].length);
		if ( y <= matrix[x].length -4 && matrix[x][y] == 'X' && matrix[x][y+1] == 'M' && matrix[x][y+2] == 'A' && matrix[x][y+3] == 'S' ) {
			count++;
			// XMAS
		}
		if (  x <= matrix.length -4 && y <= matrix[x].length -4 && matrix[x][y] == 'X' && matrix[x+1][y+1] == 'M' && matrix[x+2][y+2] == 'A' && matrix[x+3][y+3] == 'S' ) {
			count++;
			//X...
			//.M..
			//..A.
			//...S
		}
		if ( x <= matrix.length -4 && matrix[x][y] == 'X' && matrix[x+1][y] == 'M' && matrix[x+2][y] == 'A' && matrix[x+3][y] == 'S' ) {
			count++;
			//X...
			//M...
			//A...
			//S...

		}
		if ( x <= matrix.length -4 && y >= 3 && matrix[x][y] == 'X' && matrix[x+1][y-1] == 'M' && matrix[x+2][y-2] == 'A' && matrix[x+3][y-3] == 'S' ) {
			count++;
			//...X
			//..M.
			//.A..
			//S...
		}
		if ( y >= 3 && matrix[x][y] == 'X' && matrix[x][y-1] == 'M' && matrix[x][y-2] == 'A' && matrix[x][y-3] == 'S' ) {
			count++;
			//SAMX
		}
		if ( x >= 3 && y >= 3 && matrix[x][y] == 'X' && matrix[x-1][y-1] == 'M' && matrix[x-2][y-2] == 'A' && matrix[x-3][y-3] == 'S' ) {
			count++;
			//S...
			//.A..
			//..M.
			//...X
		}
		if ( x >= 3 && matrix[x][y] == 'X' && matrix[x-1][y] == 'M' && matrix[x-2][y] == 'A' && matrix[x-3][y] == 'S' ) {
			count++;
			//S...
			//A...
			//M...
			//X...

		}
		if ( x >= 3 && y <= matrix.length -4 && matrix[x][y] == 'X' && matrix[x-1][y+1] == 'M' && matrix[x-2][y+2] == 'A' && matrix[x-3][y+3] == 'S' ) {
			count++;
			//...S
			//..A.
			//.M..
			//X...
		}
	}
}

console.log(`XMAS instances: ${count}`);