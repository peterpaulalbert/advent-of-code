const fs = require('fs');
const { join } = require('path');

// load input into 2-dimensional array
const input = fs.readFileSync('./2024/day-06/part-1/input.txt', 'utf-8');
var lines = input.split('\n');
var map = [];
for ( line of lines ) {
	if ( line !== '' ){
		map.push( line.split( '' ) );
	}
}

// find starting position
var row = 0;
var col = 0;
var direction = '';
for ( var i = 0; i < map.length; i++ ) {
	for ( var j = 0; j < map[i].length; j++ ) {
		if ( map[i][j] === '^' ) {
			direction = 'up';
			row = i;
			col = j;
		}
	}
}
console.log( `Starting position: ${row},${col}` );

// trace path
do {
	map[row][col] = 'X';

	var nextPosition = getNextPosition(map, row, col, direction);
	//console.log(`Current: ${row},${col},${direction} | Next: ${nextPosition.row},${nextPosition.col},${direction}`);
	row = nextPosition.row;
	col = nextPosition.col;
	direction = nextPosition.direction;

}
while ( row >= 0 && row < map[0].length && col >= 0 && col < map.length)

// count distinct posistions
var distinctPositions = 0
for ( line of map ){
	for ( element of line) {
		if ( element == 'X' ) {
			distinctPositions++;
		}
	}
	console.log( line.join('') );
}
console.log(`Distinct Positions: ${distinctPositions}`);



function getNextPosition(map, row, col, direction){
	if ( direction == 'up' ){
		if ( map[row-1][col] !== '#' ){
			direction = 'up'; // continue going up
			row--;
		}
		else if ( map[row][col+1] !== '#' ) {
			direction = 'right'; // turn 90° and go right
			col++;
		}
		else {
			direction = 'down'; // turn 180° and go down 
			row++;
		}
	}
	else if ( direction == 'right' ){
		if ( map[row][col+1] !== '#' ) {
			direction = 'right'; // continue going right
			col++;
		}
		else if ( map[row+1][col] !== '#' ){ 
			direction = 'down'; // turn 90° and go down
			row++;
		}
		else {
			direction = 'left';  // turn 180° and go down 
			col--;
		}
	}
	else if ( direction == 'down' ){
		if ( map[row+1][col] !== '#' ) {
			direction = 'down'; // continue going down
			row++;
		}
		else if ( map[row][col-1] !== '#' ){ 
			direction = 'left'; // turn 90° and go left
			col--;
		}
		else {
			direction = 'up';  // turn 180° and go down 
			row--;
		}
	}
	else if ( direction == 'left' ){
		if ( map[row][col-1] !== '#' ) {
			direction = 'left'; // continue going left
			col--;
		}
		else if ( map[row-1][col] !== '#' ){ 
			direction = 'up'; // turn 90° and go up
			row--;
		}
		else {
			direction = 'right';  // turn 180° and go right 
			col++;
		}
	}

	return { row, col , direction };
}

