const fs = require('node:fs');


// load input into a character array
let input = fs.readFileSync('./2024/day-09/part-2/input.txt', 'utf-8');
input = input.replace(/(\r\n|\n|\r)/gm, "");
let diskMap = input.split('');


// build file blocks array
let diskBlocks = [];
let fileId = 0;
let fileBlocks = [];
let spaceBlocks = [];
for ( let i = 0; i < diskMap.length; i++) {
	if ( i % 2 == 0 ) { // even = file
		fileBlocks.push( {
				fileId: fileId, 
				size: parseInt(diskMap[i]), 
				address: diskBlocks.length // address = diskBlocks highest existing index + 1
			} ); 
		fillBlocks(diskBlocks, parseInt(diskMap[i]), fileId);

		fileId++;
	}
	else { // odd = space
		spaceBlocks.push( {
			size: parseInt(diskMap[i]), 
			address: diskBlocks.length // address = diskBlocks highest existing index + 1
		} ); 
		fillBlocks(diskBlocks, parseInt(diskMap[i]), '.');
	}
}


// move whole files from right to space on left
for ( let i = fileBlocks.length - 1; i >= 0; i-- ) {
	let j = 0;
	while( j < spaceBlocks.length && fileBlocks[i].size > spaceBlocks[j].size ) {
		j++;
	}
	if ( j < spaceBlocks.length && fileBlocks[i].address > spaceBlocks[j].address) // found fitting span to the left
	{
		for ( let k = 0; k < fileBlocks[i].size; k++ ) {
			diskBlocks[ spaceBlocks[j].address + k ] = fileBlocks[i].fileId; // copy file block
			diskBlocks[ fileBlocks[i].address + k ] = '.'; // free up previous file block address
		}
		fileBlocks[i].address = spaceBlocks[j].address;
		spaceBlocks[j].size = spaceBlocks[j].size - fileBlocks[i].size; 
		spaceBlocks[j].address = spaceBlocks[j].address + fileBlocks[i].size;
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