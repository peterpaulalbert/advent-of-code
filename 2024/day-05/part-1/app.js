const fs = require('fs');
const input = fs.readFileSync('./2024/day-05/part-1/input.txt', 'utf-8');

var [rulesRaw, pagesRaw] = input.split('\n\n');

var rulesLines = rulesRaw.split('\n');
var rules = [];
for ( line of rulesLines ) {
	rules.push( line.split( '|' ) );
}
//console.log(`Rules: ${rules}`);

var pagesLines = pagesRaw.split('\n');
var pageSets = [];
for ( line of pagesLines ) {
	if ( line !== '' ){
		pageSets.push( line.split( ',' ) );
	}
	
}
//console.log(`Pages: ${pages}`)

var middlesSum = 0;
for ( pageSet of pageSets ) {
	var pageSetPassed = true; // assume pass, check for fails
	for ( var before = 0; before < pageSet.length -1; before++ ) { // max before is 2nd to last element
		for ( var after = before + 1; after < pageSet.length; after++ ) { // min after is element after before
			for ( rule of rules ) {
				if ( pageSet[before] == rule[1] && pageSet[after] == rule[0]) { // check fails
					//console.log( `Before: ${pageSet[before]}, After: ${pageSet[after]}` );
					pageSetPassed = false;
				}
			}
		}
	}

	//console.log(`Passed? ${pageSetPassed} : ${pageSet}`)
	if ( pageSetPassed ) {
		middlesSum += parseInt( pageSet[ Math.floor( pageSet.length / 2.0 ) ] );
	}
}
console.log(`Sum of middle element of passed sets: ${middlesSum}`);