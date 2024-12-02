const fs = require('fs');
const readline = require('readline');

const rd = readline.createInterface({
	input: fs.createReadStream('./2024/day-02/part-1/input.txt'),
	output: process.stdout,
	console: false
});

var safeReports = 0;
var unsafeReports = 0;
rd.on('line', function(line) {
	var report = '';
	var previousTrend = '';
	var currentTrend = '';
	var difference = 0;
	var report = line.split(' ')

	for ( var i = 1; i < report.length; i++ ){ //start at 2nd element
		difference = parseInt(report[i]) - parseInt(report[i - 1]);

		if ( difference > 3 || difference < -3 || difference == 0){
			unsafeReports++;
			console.log(`UNSAFE: ${line}`);
			return;
		}

		if ( previousTrend == '' ){
			if( difference > 0 ){
				previousTrend = 'ASC';
			}
			else if ( difference < 0){
				previousTrend = 'DESC'
			}
			else{
				unsafeReports++;
				console.log(`UNSAFE: ${line}`);
				return;
			}
		}
		else if ( previousTrend == 'ASC' && difference > 0 ){
			currentTrend = 'ASC';
		}
		else if ( previousTrend == 'DESC' && difference < 0 ){
			currentTrend = 'DESC'
		}
		else {
			unsafeReports++;
			console.log(`UNSAFE: ${line}`);
			return;
		}
	}

	safeReports++;
	console.log(`SAFE: ${line}`);
});

rd.on('close', function() {
	console.log(`UNSAFE reports: ${unsafeReports}`);
	console.log(`SAFE reports: ${safeReports}`);
});