const fs = require('node:fs');


// load input into a character array
let input = fs.readFileSync('./2024/day-10/part-2/input.txt', 'utf-8');
let lines = input.split('\n');
let topographicMap = [];
for ( line of lines ) {
	if ( line !== '' ) {
		line = line.replace(/(\r\n|\n|\r)/gm, "");
		let chars = line.split('');
		let nums = [];
		for ( let i = 0; i < chars.length; i++ ) {
			nums.push( parseInt( chars[i] ) );
		}
		topographicMap.push( nums );
	}
}


// find trailheads
let trailheads = [];
for ( let i = 0; i < topographicMap.length; i++ ) {
	for ( let j = 0; j < topographicMap[i].length ; j++ ) {
		if ( topographicMap[i][j] == 0 ) {
			trailheads.push( {row: i, col: j , peaks: [], trails: []} );
		}
	}
}
console.log( `Trailheads: ${trailheads.length} ` );


// walk each trail
for ( let i = 0; i < trailheads.length; i++ ){
	followTrail(
		i, 
		0, 
		trailheads[i].row, 
		trailheads[i].col, 
		[ 
			{ 
				row: trailheads[i].row, 
				col: trailheads[i].col 
			} 
		]
	);
}


// calculate score
let score = 0;
for ( let i = 0; i < trailheads.length; i++ ){
	// score += trailheads[i].peaks.length; // exclude score from part 1
	score += trailheads[i].trails.length;
}
console.log( `Score: ${score}` );



function followTrail(trailId, height, row, col, trail){
	if ( height == 9 ) {
		// check if already in peaks
		let alreadyFound = false;
		for ( let i = 0; i < trailheads[trailId].peaks.length; i++ ){
			if ( trailheads[trailId].peaks[i].row == row && trailheads[trailId].peaks[i].col == col ){
				alreadyFound = true;
			}
		}
		if ( !alreadyFound ){ // new
			trailheads[trailId].peaks.push({ row: row, col: col });
		}
		trailheads[trailId].trails.push(trail);
	}
	else {
		// up
		if ( 
			row > 0 &&
			topographicMap[row-1][col] == height + 1 
		){ 
			let newTrail = [...trail, {row: row-1, col: col}];
			followTrail(trailId, height + 1, row-1, col, newTrail);
		}

		// right
		if ( 
			col < topographicMap[0].length -1 &&
			topographicMap[row][col+1] == height + 1 
		){ 
			let newTrail = [...trail, {row: row, col: col+1}];
			followTrail(trailId, height + 1, row, col+1, newTrail );
		}

		// down
		if ( 
			row < topographicMap.length -1 &&
			topographicMap[row+1][col] == height + 1 
		){ 
			let newTrail = [...trail, {row: row+1, col: col}];
			followTrail(trailId, height + 1, row+1, col, newTrail );
		}

		// left
		if ( 
			col > 0 &&
			topographicMap[row][col-1] == height + 1 
		){ 
			let newTrail = [...trail, {row: row, col: col-1 }];
			followTrail(trailId, height + 1, row, col-1, newTrail);
		}
	}
}
