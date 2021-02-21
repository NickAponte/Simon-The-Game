/////////////////////////////////////////////////////
/////////////// Difficulty level ///////////////////
////////////////////////////////////////////////////

let difficulty = 10;
let sequence = generateRandomSequence(difficulty);

////////////////////////////////////////////////////
/////// Adds clickable events to each square ///////
////////////////////////////////////////////////////

const cells = document.querySelectorAll('.cell');

// Add the clicked squares to an array
let playerSequence = [];

// create an overall controlling loop that does two basic things
// Show a sequence, and allow the user to copy it
// then, if the user is sucessfull, continue the loop and add extra difficulty
// else, the game is over and display the score
// use a turn based loop to allow or dissallow clicking

/////////////////////////////////////////////////////////////////
///////////////////// Main Game Loop ///////////////////////////
///////////////////////////////////////////////////////////////
// use a while or dowhile loop maybe
// let win = false;
// let turn = 1;

function runTurns(turn, win) {
	if (turn % 2 != 0) {
		flashSequence(sequence, 100);
		turn++;
	} else {
		cells.forEach((cell) => {
			cell.addEventListener('click', (event) => {
				event.preventDefault;
				console.log(cell.getAttribute('data-number'));
				playerSequence.push(cell.getAttribute('data-number'));
				console.log(playerSequence);
			});
		});
	}
}

runTurns(1, true);

//////////////////////////////////////////////////////
///// Randomly generates  an array of numbers 1-4 ////
/////////////////////////////////////////////////////

function generateRandomSequence(sequenceLength) {
	let sequenceArray = [];
	for (let i = 0; i < sequenceLength; i++) {
		sequenceArray.push(Math.floor(Math.random() * 4) + 1);
	}
	return sequenceArray;
}

/////////////////////////////////////////////////////////////
/////// Takes a number and time and flashes that number /////
////////////////////////////////////////////////////////////

function flash(boxNum, timeToFade) {
	if (boxNum == 1) {
		boxNum = 'one';
	} else if (boxNum == 2) {
		boxNum = 'two';
	} else if (boxNum == 3) {
		boxNum = 'three';
	} else if (boxNum == 4) {
		boxNum = 'four';
	}
	document.getElementById(`${boxNum}`).innerHTML = 'flash';
	setTimeout(function () {
		document.getElementById(`${boxNum}`).innerHTML = '';
	}, timeToFade);
	console.log('boxnum');
}

////////////////////////////////////////////////////////////////////////////////////////
//////// Iterates over the sequence and flashes the correct squares, with timeout //////
///////////////////////////////////////////////////////////////////////////////////////

function flashSequence(sequence, time) {
	for (let i = 0; i < sequence.length; i++) {
		task(i, sequence[i], 1000);
	}

	function task(i, sequence, time) {
		setTimeout(function () {
			flash(sequence, time);
		}, 1500 * i);
	}
}

// flashSequence(sequence, 100)
function removeClick() {
	cell1.classList.add('removeClick');
	cell2.classList.add('removeClick');
	cell3.classList.add('removeClick');
	cell4.classList.add('removeClick');
}
function addClick() {
	cell1.classList.remove('removeClick');
	cell2.classList.remove('removeClick');
	cell3.classList.remove('removeClick');
	cell4.classList.remove('removeClick');
}


const cells = document.querySelectorAll('.cell');
const cell1 = document.querySelector('#one');
const cell2 = document.querySelector('#two');
const cell3 = document.querySelector('#three');
const cell4 = document.querySelector('#four');