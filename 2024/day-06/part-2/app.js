const fs = require('fs');
const { join } = require('path');


// load input into 2-dimensional array
const input = fs.readFileSync('./2024/day-06/part-2/input.txt', 'utf-8');
let lines = input.split('\n');
let map = [];
for ( line of lines ) {
	if ( line !== '' ){
		line = line.replace(/(\r\n|\n|\r)/gm, "");
		map.push( line.split( '' ) );
	}
}
const map0 = structuredClone(map); // backup original map


// find starting position
let row = 0;
let col = 0;
let direction = '';
for ( let i = 0; i < map.length; i++ ) {
	for ( let j = 0; j < map[i].length; j++ ) {
		if ( map[i][j] === '^' ) {
			direction = 'up';
			row = i;
			col = j;
		}
	}
}
let p0 = {row, col};
console.log( `Starting position: ${row},${col}` );



// trace path
do {
	map[row][col] = 'X';

	let nextPosition = getNextPosition(map, row, col, direction);
	//console.log(`Current: ${row},${col},${direction} | Next: ${nextPosition.row},${nextPosition.col},${direction}`);
	row = nextPosition.row;
	col = nextPosition.col;
	direction = nextPosition.direction;

}
while ( row >= 0 && row < map[0].length && col >= 0 && col < map.length)


// count distinct posistions
let positions = [];
let distinctPositions = 0
for ( row = 0; row < map.length; row++ ){
	for ( col = 0; col < map[0].length;  col++) {
		if ( map[row][col] == 'X' ) {
			distinctPositions++;
			positions.push({row, col});
		}
	}
	//console.log( line.join('') );
}
console.log(`Distinct Positions: ${distinctPositions}`);


// block individual positions
var loops = [];
for ( i = 1; i < positions.length; i++){ // requirement: skip 1st position
	let p = positions[i];

	// build map
	map = structuredClone(map0);
	map[p.row][p.col] = '#';
	direction = 'up';
	row = p0.row;
	col = p0.col;

	let steps = 0;
	do {

		map[row][col] = 'X';
		let nextPosition = getNextPosition(map, row, col, direction);
		//console.log(`Current: ${row},${col},${direction} | Next: ${nextPosition.row},${nextPosition.col},${direction}`);
		row = nextPosition.row;
		col = nextPosition.col;
		direction = nextPosition.direction;

		steps++;
	}
	while ( row >= 0 && row < map[0].length && col >= 0 && col < map.length && steps < 20000)
	//console.log(steps);

	if ( steps == 20000){ // didn't exit after 10k steps == loop
		loops.push(p);
		//console.log(p);
	}
}
console.log(`Loops: ${loops.length}`);


function getNextPosition(map, row, col, direction){
	if ( direction == 'up' ){
		if ( row == 0 ){
			direction = 'up'; // exit up
			row--;
		}
		else if ( map[row-1][col] !== '#' ){
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
		if ( col == map[0].length -1 ){
			direction = 'right'; // exit right
			col++;
		}
		else if ( map[row][col+1] !== '#' ) {
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
		if ( row == map.length -1 ){
			direction = 'down'; // exit down
			row++;
		}
		else if ( map[row+1][col] !== '#' ) {
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
		if ( col == 0 ){
			direction = 'left'; // exit left
			col--;
		}
		else if ( map[row][col-1] !== '#' ) {
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

	return { row: row, col:col , direction:direction };
}

