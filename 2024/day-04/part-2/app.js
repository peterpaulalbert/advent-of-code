const fs = require('fs');
const input = fs.readFileSync('./2024/day-04/part-2/input.txt', 'utf-8');

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
		if (  
			x <= matrix.length -3 && 
			y <= matrix[x].length -3 && 
			matrix[x  ][y  ] == 'M' && 
			matrix[x  ][y+2] == 'M' && 
			matrix[x+1][y+1] == 'A' && 
			matrix[x+2][y  ] == 'S' && 
			matrix[x+2][y+2] == 'S' 
		) {
			count++;
			//M.M
			//.A.
			//S.S
		}
		if (  
			x <= matrix.length -3 && 
			y <= matrix[x].length -3 && 
			matrix[x  ][y  ] == 'M' && 
			matrix[x  ][y+2] == 'S' && 
			matrix[x+1][y+1] == 'A' && 
			matrix[x+2][y  ] == 'M' && 
			matrix[x+2][y+2] == 'S' 
		) {
			count++;
			//M.S
			//.A.
			//M.S
		}
		if (  
			x <= matrix.length -3 && 
			y <= matrix[x].length -3 && 
			matrix[x  ][y  ] == 'S' && 
			matrix[x  ][y+2] == 'S' && 
			matrix[x+1][y+1] == 'A' && 
			matrix[x+2][y  ] == 'M' && 
			matrix[x+2][y+2] == 'M' 
		) {
			count++;
			//S.S
			//.A.
			//M.M
		}
		if (  
			x <= matrix.length -3 && 
			y <= matrix[x].length -3 && 
			matrix[x  ][y  ] == 'S' && 
			matrix[x  ][y+2] == 'M' && 
			matrix[x+1][y+1] == 'A' && 
			matrix[x+2][y  ] == 'S' && 
			matrix[x+2][y+2] == 'M' 
		) {
			count++;
			//S.M
			//.A.
			//S.M
		}
	}
}

console.log(`XMAS instances: ${count}`);