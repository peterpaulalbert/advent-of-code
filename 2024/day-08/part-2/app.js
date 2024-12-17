const fs = require('fs');


// load input into 2D array
const input = fs.readFileSync('./2024/day-08/part-2/input.txt', 'utf-8');
let lines = input.split('\n');
let antennaMap = [];
for ( line of lines ) {
	if ( line !== '' ) {
		line = line.replace(/(\r\n|\n|\r)/gm, "");
		antennaMap.push(line.split(''));
	}
}
// for (row of antennaMap){
// 	console.log(row.join(''));
// }


// get frequencies & locations
// also build antinode 2D array
let frequencies = new Map();
let antinodeMap = [];
for ( let i = 0; i < antennaMap.length; i++ ){
	antinodeMap.push( [] );

	for ( let j = 0; j < antennaMap[i].length; j++ ) {
		antinodeMap[i].push( '.' );

		if ( antennaMap[i][j] !== '.' ) {
			if ( !(frequencies.get( antennaMap[i][j] ) ) ) {
				frequencies.set( antennaMap[i][j], [] );
			}
			frequencies.get( antennaMap[i][j] ).push( { row: i , col: j } );
		}
	}
}
// for  ( key of frequencies.keys() ){
// 	for ( xy of frequencies.get( key ) ) {
// 		console.log(`Key: ${key}, Row: ${xy.row}, Col: ${xy.col}`);
// 	}
// }


// calculate antinodes
for ( let key of frequencies.keys() ){
	let freq = frequencies.get( key );
	for ( let i = 0; i < freq.length; i++ ){
		for ( let j = 0; j < freq.length; j++ ){
			if ( i != j){
				let rowDiff = freq[i].row - freq[j].row;
				let colDiff = freq[i].col - freq[j].col;

				let k = 0;
				let antinodeRow = freq[i].row + ( rowDiff * k )
				let antinodeCol = freq[i].col + ( colDiff * k )
				while (
					antinodeRow >= 0 && 
					antinodeRow < antinodeMap[0].length && 
					antinodeCol >= 0 && 
					antinodeCol < antinodeMap[0].length
				) {
					antinodeMap[antinodeRow][antinodeCol] = '#';
					k++;
					antinodeRow = freq[i].row + ( rowDiff * k )
					antinodeCol = freq[i].col + ( colDiff * k )
				}
			}
		}
	}
}


// count unique antinode coordinates
let antinodes = 0;
for ( let row of antinodeMap ){
	console.log ( row.join( '' ) );
	for ( let col of row ) {
		if ( col == '#' ) {
			antinodes++;
		}
	}
}
console.log(`Antinode locations: ${antinodes}`);