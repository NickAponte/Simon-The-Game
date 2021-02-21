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
playButton.addEventListener('click', gameStart)
let computerSequence = [1,2,3];
let playerSequence = [];
let turn = 0


function turnController(){
turn += 1;

removeClick()

const newComputerSequence = [...computerSequence]
newComputerSequence.push(generateNumber)
// call round with this new array

}


function gameStart() {
	console.log("gamestart")
	playButton.classList.add('removeClick');

}



cells.forEach((cell) => {
	cell.addEventListener('click', (event) => {
		event.preventDefault;
		console.log(cell.getAttribute('data-number'));
		playerSequence.push(cell.getAttribute('data-number'));
		console.log(playerSequence);
	});
});

function generateNumber() {
	let sequenceArray = [];
	return((Math.floor(Math.random() * 4) + 1)) 	
}


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

// console.log(playButton);
