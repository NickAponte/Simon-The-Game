/////////////////////////////////////////////////////
/////////////// Difficulty level ///////////////////
////////////////////////////////////////////////////

let difficulty = 5
let sequence = generateRandomSequence(difficulty)

////////////////////////////////////////////////////
/////// Adds clickable events to each square ///////
////////////////////////////////////////////////////

const cells = document.querySelectorAll('.cell');

cells.forEach((cell) => {
    cell.addEventListener('click', (event) => {
        event.preventDefault;
        console.log(cell.getAttribute("data-number"));
    });
});

//////////////////////////////////////////////////////
///// Randomly generates  an array of numbers 1-4 ////
/////////////////////////////////////////////////////

function generateRandomSequence(sequenceLength){
    let sequenceArray = []
    for (let i = 0; i < sequenceLength; i++) {
        sequenceArray.push(Math.floor(Math.random() * 4) + 1);
        
    }
    return sequenceArray
}

/////////////////////////////////////////////////////////////
/////// Takes a number and time and flashes that number /////
////////////////////////////////////////////////////////////

function flash(boxNum, timeToFade){
    if(boxNum == 1){
        boxNum = "one"
    }else if (boxNum == 2){
        boxNum = "two"
    }else if (boxNum == 3){
        boxNum = "three"
    }else if (boxNum == 4){boxNum = "four"}
    document.getElementById(`${boxNum}`).innerHTML = 'flash';
    setTimeout(function () {
	    document.getElementById(`${boxNum}`).innerHTML = '';
    }, timeToFade);
    console.log("boxnum")
}

////////////////////////////////////////////////////////////////////////////////////////
//////// Iterates over the sequence and flashes the correct squares, with timeout //////
///////////////////////////////////////////////////////////////////////////////////////

function flashSequence(sequence, time){
for (let i = 0; i < sequence.length; i++) {
	task(i, sequence[i], 1000);
}

function task(i, sequence, time) {
	setTimeout(function () {
		flash(sequence,time)
	}, 1500 * i);
} 
}

flashSequence(sequence, 500)

