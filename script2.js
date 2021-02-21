// a computer array and a player array
// step 1, computer generates 1 random number, push to computer array
// step 2, allow clicking,
// step 3 push users clicked # onto user array
//step compare the current indexes ()
// if matches, next step, else game over
// css set pointer events to none, add the remove click class to the boxes
const cells = document.querySelectorAll('.cell');
const playButton = document.getElementById('play');
const cell1 = document.querySelector('#one');
const cell2 = document.querySelector('#two');
const cell3 = document.querySelector('#three');
const cell4 = document.querySelector('#four');
playButton.addEventListener('click', gameStart);
let computerSequence = [1, 2, 3];
let playerSequence = [];
let turn = 0;

function turnController() {
	turn += 1;

	removeClick();

	const newComputerSequence = [...computerSequence];
	newComputerSequence.push(generateNumber());
	// call round with this new array
	flashSequence(newComputerSequence);
	computerSequence = [...newComputerSequence];

	setTimeout(() => {
		addClick();
	}, turn * 600 + 5000);
}

function gameStart() {
	console.log('gamestart');
	playButton.classList.add('removeClick');
	turnController();
}

function playerClick(cellNum) {
	console.log('playerclick');
	const arrayLength = playerSequence.length - 1;
	playerSequence.push(cellNum);

	if (playerSequence[arrayLength] !== computerSequence.length)
		console.log('game over');
	else {
		playerSequence = [];
		setTimeout(() => {
			turnController();
		}, 1000);
		return;
	}
	return;
}
////////
cells.forEach((cell) => {
	cell.addEventListener('click', (event) => {
		console.log('clicked');
		playerClick(cell.getAttribute('data-number'));
	});
});
/////
function generateNumber() {
	console.log('generatenum');
	let sequenceArray = [];
	return Math.floor(Math.random() * 4) + 1;
}

function removeClick() {
	console.log('removeclick');
	cell1.classList.add('removeClick');
	cell2.classList.add('removeClick');
	cell3.classList.add('removeClick');
	cell4.classList.add('removeClick');
	console.log(cell4.classList);
}
function addClick() {
	console.log('addclick');
	cell1.classList.remove('removeClick');
	cell2.classList.remove('removeClick');
	cell3.classList.remove('removeClick');
	cell4.classList.remove('removeClick');
	console.log(cell4.classList);
}
function flash(boxNum) {
	console.log('flash');
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
	}, 1000);
	// console.log('boxnum');
}
function flashSequence(sequence) {
	console.log('flashsequence');
	sequence.forEach((num) => {
		setTimeout(() => {
			flash(num);
		}, ( 1) * 600);
	});
	}


// console.log(playButton);
