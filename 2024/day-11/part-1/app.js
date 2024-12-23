const fs = require('node:fs');


// load input into a character array
let input = fs.readFileSync('./2024/day-11/part-1/input.txt', 'utf-8').replace(/(\r\n|\n|\r)/gm, "");
let stones = input.split(' ');


// blink 25 times
let blinks = [];
blinks.push( stones );
for ( let i = 1; i <= 25; i++) {
	let previous = blinks[ i - 1 ];
	let blink = [];
	for ( let j = 0; j < previous.length; j++ ) {
		if ( previous[j] == 0 ) {
			blink.push(1);
		}
		else if ( (previous[j].toString()).length % 2 == 0 ) {
			let stringValue = previous[j].toString();
			blink.push( parseInt( stringValue.substring(0, (stringValue.length / 2) ) ) );
			blink.push( parseInt( stringValue.substring(stringValue.length / 2) ) );
		}
		else {
			blink.push( parseInt(previous[j]) * 2024 );
		}
	}
	blinks.push( blink );
}
console.log( `Stones after 25 blinks: ${blinks[25].length}` );