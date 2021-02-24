const cells = document.querySelectorAll('.cell');
const playButton = document.getElementById('play');
const message = document.getElementById('message');
const score = document.getElementById('score');
let computerSequence = [];
let playerSequence = [];
let turn = 0;
localStorage.setItem('Nick', '9999999'); // totally fair
let leaderBoard = {};

populateLeaderboard();
// Populates the leaderboard div with the names and scores in localmemory

function populateLeaderboard() {
	document.getElementById('leaderBoardDiv').innerHTML = '';
	Object.keys(localStorage)
		.sort((a, b) => {
			return localStorage.getItem(b) - localStorage.getItem(a); 
		})
		.forEach((key, index) => {
			console.log(key, localStorage.getItem(key)); // 
			document.getElementById('leaderBoardDiv').innerHTML +=
				'<li>' + key + ': ' + localStorage.getItem(key) + '</li>';
		});
} 
/////////////////
// GAME START //
///////////////

playButton.addEventListener('click', gameStart);

function gameStart() {
	turn = 0;
	document.getElementById('simon').style.display = 'none';
	console.log('gamestart');
	playButton.classList.add('removeClick');
	console.log('removed start button click');
	message.classList.remove('red');
	message.style.color = 'white';
	turnController();
}

// HANDLES TURN AND RUNS COMPUTER TURN
function turnController() {
	message.innerText = 'Watch carefully!';
	removeClick();
	turn += 1;
	score.innerText = `Score:  ${turn - 1}`;

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

	let index = 0;
	const flashBox = setInterval(() => {
		flash(sequence[index]);
		index += 1;
		if (index == sequence.length) {
			clearInterval(flashBox);
		}
	}, 1000);
}
function flash(boxNum) {
	console.log('flash');
	let boxId = 'circle_' + boxNum;
	const beep = document.querySelector(`[data-sound='${boxId}']`);
	beep.play();

	document.getElementById(boxId).classList.add('glow');
	setTimeout(function () {
		document.getElementById(boxId).classList.remove('glow');
	}, 800);
}

function gameOver() {
	// reset the variables for new game
	// show leaderboard
	computerSequence = [];
	playerSequence = [];
	console.log('Game over, play again');
	message.innerText = 'Sorry, Game over!';
	//console.log("Before: " + message.classList);
	message.classList.add('red');
	message.style.color = 'red';
	//console.log("After: " + message.classList);
	if (turn < 3 ) {
		document.getElementById('simon').style.display = 'block';
	}
	playButton.classList.remove('removeClick');

	setTimeout(() => {
		let name = window.prompt('Enter your name: ');
		addToLocalStorage(name, turn - 1);
		populateLeaderboard();
	}, 300);

	// call leaderboard add
}
function addToLocalStorage(key, newValue) {
	//console.log("Adding to local storage: " + key + ":" + newValue);

	if (!key || key.trim() == '') key = 'Anonymous';

	let value = localStorage[key];
	if (!value || (value && newValue > value)) {
		localStorage.setItem(key, newValue);
	}
}


function toggleLeaderBoard() {
	let btn = document.getElementById('toggleLeaderBoardButton');
	if (btn.innerHTML == 'Show Leaderboard') {
		btn.innerHTML = 'Hide Leaderboard';
		document.getElementById('leaderBoardDiv').style.display = 'block';
	} else {
		btn.innerHTML = 'Show Leaderboard';
		document.getElementById('leaderBoardDiv').style.display = 'none';
	}
}

// handes data from click
function playerClick(cellNum) {

	console.log('playerclick');
	// const arrayLength = playerSequence.length - 1;
	playerSequence.push(cellNum);
	if (
		playerSequence[playerSequence.length - 1] !=
		computerSequence[playerSequence.length - 1]
	) {
		gameOver();
		playButton.innerText = 'Play again?';
		return;
	}
	if (playerSequence.length == computerSequence.length) {
		// reset player sequence for next round
		playerSequence = [];
		console.log('win round');
		message.innerText = 'Winner, Next round!';

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
		theID = cell.getAttribute('id');
		document.getElementById(theID).classList.add('glow');
		const beep = document.querySelector(`[data-sound='${theID}']`);
		beep.play()
		setTimeout(() => {
			document.getElementById(theID).classList.remove('glow');
		}, 400);
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

	let allCells = document.getElementsByClassName('cell');
	//console.log("allCells.length=" + allCells.length);
	for (let i = 0; i < allCells.length; i++) {
		cells[i].classList.add('removeClick');
	}

	// console.log(cell4.classList);
}
// allows clicking of boxes
function addClick() {
	console.log('addclick');
	let allCells = document.getElementsByClassName('cell');
	//console.log("allCells.length=" + allCells.length);
	for (let i = 0; i < allCells.length; i++) {
		cells[i].classList.remove('removeClick');
	}
}

// console.log(playButton);
