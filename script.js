const cells = document.querySelectorAll('.cell');
const playButton = document.getElementById('play');
const message = document.getElementById('message');
const score = document.getElementById('score');
let computerSequence = [];
let playerSequence = [];
let turn = 0;
localStorage.setItem('Nick', '9999999'); // totally fair
let leaderBoard = {};
const leaderBoardDiv = document.getElementById('leaderBoardDiv');
let btn = document.getElementById('toggleLeaderBoardButton');
populateLeaderboard();
btn.addEventListener("click",toggleLeaderBoard)

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

/////////////////////////////////////////////////////////////////////////////
// Handles gameover message, grabs player name/ resets values for new game //
////////////////////////////////////////////////////////////////////////////

function gameOver() {
	
	computerSequence = [];
	playerSequence = [];
	console.log('Game over, play again');
	theID = "lost"
	
	const sound = document.querySelector(`[data-sound='${theID}']`);
	
	message.innerText = 'Sorry, Game over!';
	
	message.classList.add('red');
	message.style.color = 'red';
	
	if (turn < 3 ) {
		document.getElementById('simon').style.display = 'block';
	}
	playButton.classList.remove('removeClick');
	sound.play();
	setTimeout(() => {
		sound.play();
		let name = window.prompt('Enter your name: ');
		addToLocalStorage(name, turn - 1);
		populateLeaderboard();
	}, 300);


//////////////////////////////////////////
// Saves key to local sorage in browser //
/////////////////////////////////////////
}
function addToLocalStorage(key, newValue) {
	if (!key || key.trim() == '') key = 'Anonymous';
	let value = localStorage[key];
	if (!value || (value && newValue > value)) {
		localStorage.setItem(key, newValue);
	}
}
/////////////////////////////
// Shows/Hides leaderboard //
/////////////////////////////

function toggleLeaderBoard() {
	
	if (leaderBoardDiv.classList.contains('hide')) {
		btn.innerHTML = 'Hide Leaderboard';
	} else {
		btn.innerHTML = 'Show Leaderboard';
	}
	leaderBoardDiv.classList.toggle('hide');
}

// handes data from click
function playerClick(cellNum) {
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
		message.innerText = 'Winner, Next round!';
		setTimeout(() => {
			message.innerText = 'Watch the sequence!';
			turnController();
		}, 1300);
		return;
	}
}
///////////////////////////////
// Event listener for clicks //
///////////////////////////////

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

///////////////////////////
// creates a new number ///
///////////////////////////

function generateNumber() {
	console.log('generatenum');

	return Math.floor(Math.random() * 4) + 1;
}


///////////////////////////////
// removes clicking of boxes //
///////////////////////////////

function removeClick() {
	console.log('removeclick');

	let allCells = document.getElementsByClassName('cell');
	for (let i = 0; i < allCells.length; i++) {
		cells[i].classList.add('removeClick');
	}

	
}
//////////////////////////////
// allows clicking of boxes //
//////////////////////////////

function addClick() {
	console.log('addclick');
	let allCells = document.getElementsByClassName('cell');
	for (let i = 0; i < allCells.length; i++) {
		cells[i].classList.remove('removeClick');
	}
}
