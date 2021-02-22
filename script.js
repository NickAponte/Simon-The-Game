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
playButton.addEventListener('click', gameStart);
let computerSequence = [];
let playerSequence = [];
let turn = 0;



// GAME START
function gameStart() {
	console.log('gamestart');
	playButton.classList.add('removeClick');
	console.log("removed start button click")
	turnController();
}

// HANDLES TURN AND RUNS COMPUTER TURN
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
	}, turn * 1000); // turns on clicking
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
const flashBox = setInterval(()=>{
	flash(sequence[index])
index += 1
if(index == sequence.length){
	clearInterval(flashBox)
}

},1000)

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
		
		document.getElementById(`${boxNum}`).innerHTML = 'flash';
		setTimeout(function () {
			document.getElementById(`${boxNum}`).innerHTML = '';
		}, 800); // timer for making flashes dissapear
	
	// console.log('boxnum');
}


// handes data from click
function playerClick(cellNum) {
	console.log('playerclick');
	// const arrayLength = playerSequence.length - 1;
	playerSequence.push(cellNum);

for (let i = 0; i < playerSequence.length; i++) {
	if (playerSequence[i] != computerSequence[i]){
		console.log('game over');
		console.log(`player sequence = ${playerSequence}`)
		console.log(`computer sequence = ${computerSequence}`)}
		
	else {
		console.log("Else")
		playerSequence = [];
		setTimeout(() => {
			turnController();
		}, 1000);
		return;
	}
	
	
}


}
//////// Event listener for clicks
cells.forEach((cell) => {
	cell.addEventListener('click', (event) => {
		console.log('clicked');
		playerClick(cell.getAttribute('data-number'));
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
