const fs = require('fs');
const input = fs.readFileSync('./2024/day-05/part-2/input.txt', 'utf-8');

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

var fixedErrors = [];
for ( pageSet of pageSets ) {
	var pageSetFixed = false;
	var pageSetHasError = false;
	do {
		var result = checkPageSet( pageSet );
		pageSetHasError = result.hasError;
		var ruleWithError = result.ruleWithError;

		if ( pageSetHasError ){
			console.log( `Before fix: ${pageSet}` );
			pageSet = fixPageSet( pageSet, ruleWithError );
			pageSetFixed = true;
			console.log( `After fix: ${pageSet}` );
		}
	}
	while ( pageSetHasError );

	if ( pageSetFixed ){
		fixedErrors.push ( pageSet );
	}
}

var middlesSum = 0;
for ( fixedPageSet of fixedErrors ){
	middlesSum += parseInt( fixedPageSet[ Math.floor( fixedPageSet.length / 2.0 ) ] ); // floor(length) = ceil(index)
}
console.log(`Sum of middle element of passed sets: ${middlesSum}`);


function checkPageSet(pageSet){
	var pageSetPassed = true; // assume pass, check for fails
	for ( var after = pageSet.length -1; after > 0; after-- ) { // start from end going backwards; last item is 2nd element 
		for ( var before = after -1; before >= 0; before-- ) { // start from 2nd last item
			for ( rule of rules ) {
				if ( pageSet[before] == rule[1] && pageSet[after] == rule[0]) { // check fails
					//console.log( `Before: ${pageSet[before]}, After: ${pageSet[after]}` );
					return { hasError: true, ruleWithError: rule }; //fail
				}
			}
		}
	}

	return { hasError: false, ruleWithError: null }; //pass
}

function fixPageSet(pageSet, ruleWithError){
	var before = ruleWithError[0];
	var after = ruleWithError[1];

	pageSet.splice( pageSet.indexOf(after), 1 );
	pageSet.splice( pageSet.indexOf(before) +1 , 0, after)

	return pageSet;
}