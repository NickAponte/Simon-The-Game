// a computer array and a player array
// step 1, computer generates 1 random number, push to computer array
// step 2, allow clicking,
// step 3 push users clicked # onto user array
//step compare the current indexes ()
// if matches, next step, else game over
// css set pointer events to none, add the remove click class to the boxes

// two major problems, flashes happen at once, and the game auto gameovers

const cells = document.querySelectorAll('.cell');
const playButton = document.getElementById('play');
const cell1 = document.querySelector('#one');
const cell2 = document.querySelector('#two');
const cell3 = document.querySelector('#three');
const cell4 = document.querySelector('#four');
const message = document.getElementById('message');
const score = document.getElementById('score')
playButton.addEventListener('click', gameStart);
let computerSequence = [];
let playerSequence = [];
let turn = 0;

// GAME START
function gameStart() {
	console.log('gamestart');
	playButton.classList.add('removeClick');
	console.log('removed start button click');
	message.classList.remove('red');
	turnController();
}

// HANDLES TURN AND RUNS COMPUTER TURN
function turnController() {
	message.innerText = 'Watch carefully!';
	removeClick();
	turn += 1;
	score.innerText = turn -1

	const newComputerSequence = [...computerSequence];
	newComputerSequence.push(generateNumber());
	// call round with this new array
	flashSequence(newComputerSequence);
	computerSequence = [...newComputerSequence];

	setTimeout(() => {
		message.innerText = 'Your turn!';
		addClick();
	}, turn * 1400); // turns on clicking
}
// takes sequence and flashes
function flashSequence(sequence) {
	console.log('starting flashsequence');
	// 	sequence.forEach((num) => {
	// 		 setInterval(() => {
	// 			flash(num);
	// 		 }, 6000);
	// 	});
	let index = 0;
	const flashBox = setInterval(() => {
		flash(sequence[index]);
		index += 1;
		if (index == sequence.length) {
			clearInterval(flashBox);
		}
	}, 1000);
}
// Flashes a single box

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

	// document.getElementById(`${boxNum}`).innerHTML = 'flash';
	 document.getElementById(`${boxNum}`).classList.add("glow")
	setTimeout(function () {
		document.getElementById(`${boxNum}`).classList.remove('glow');
	}, 800); // timer for making flashes dissapear

	// console.log('boxnum');
}


function gameOver(){
	// reset the variables for new game
	// show leaderboard
	computerSequence = []
	playerSequence = []
	console.log("Game over, play again")
	message.innerText = 'Sorry, Game over!';
	message.classList.add("red")
	playButton.classList.remove('removeClick')
	turn = 0;
}
// handes data from click
function playerClick(cellNum) {
	console.log('playerclick');
	// const arrayLength = playerSequence.length - 1;
	playerSequence.push(cellNum);
if (
	playerSequence[playerSequence.length - 1] !=
	computerSequence[playerSequence.length - 1]
){

	gameOver()
	playButton.innerText = "Play again?"
	return;
}
	if (playerSequence.length == computerSequence.length) {
		// reset player sequence for next round
		playerSequence = [];
		console.log('win round');
		message.innerText = "Winner, Next round!"
		
		setTimeout(() => {
			message.innerText = 'Watch the sequence!';
			turnController();
		}, 1300);
		return;
	}
	
}
//////// Event listener for clicks
cells.forEach((cell) => {
	cell.addEventListener('click', (event) => {
		console.log('clicked');
		playerClick(cell.getAttribute('data-number'));
		theID = cell.getAttribute('id')
		document.getElementById(theID).classList.add('glow')
		setTimeout(() => {
		document.getElementById(theID).classList.remove('glow');
	},  400); 

	});
});
///// creates a new number
function generateNumber() {
	console.log('generatenum');

	return Math.floor(Math.random() * 4) + 1;
}
// removes clicking of boxes
function removeClick() {
	console.log('removeclick');
	cell1.classList.add('removeClick');
	cell2.classList.add('removeClick');
	cell3.classList.add('removeClick');
	cell4.classList.add('removeClick');
	// console.log(cell4.classList);
}
// allows clicking of boxes
function addClick() {
	console.log('addclick');
	cell1.classList.remove('removeClick');
	cell2.classList.remove('removeClick');
	cell3.classList.remove('removeClick');
	cell4.classList.remove('removeClick');
	// console.log(cell4.classList);
}

// console.log(playButton);
