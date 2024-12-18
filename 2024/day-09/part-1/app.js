const fs = require('node:fs');


// load input into a character array
let input = fs.readFileSync('./2024/day-09/part-1/input.txt', 'utf-8');
input = input.replace(/(\r\n|\n|\r)/gm, "");
let diskMap = input.split('');


// build file blocks array
let diskBlocks = [];
let fileId = 0;
for ( let i = 0; i < diskMap.length; i++) {
	if ( i % 2 == 0 ) { // even = file
		fillBlocks(diskBlocks, diskMap[i], fileId);
		fileId++;
	}
	else { // odd = space
		fillBlocks(diskBlocks, diskMap[i], '.');
	}
}


// move file blocks from right to space on left
for ( let i = 0; i < diskBlocks.length; i++ ) {
	let j = diskBlocks.length -1;
	if ( diskBlocks[i] == '.' && i < j) {
		while ( diskBlocks[j] == '.') {
			j--;
		}

		if ( i < j ) {
			diskBlocks[i] = diskBlocks[j];
			diskBlocks[j] = '.';
		}
	}
}


// calculate checksum
let checksum = 0;
for ( let i = 0; i < diskBlocks.length; i++ ) {
	if ( diskBlocks[i] !== '.' ) {
		checksum += i * diskBlocks[i];
	}
}
console.log(`Filesystem Checksum: ${checksum}`);



function fillBlocks(diskBlocks, blockCount, value) {
	for ( let i = 0; i < blockCount; i++ ) {
		diskBlocks.push( value );
	}
}