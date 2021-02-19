// Adds clickable events to each square 
const cells = document.querySelectorAll('.cell');

// Randomly generates 

function generateRandomSequence(sequenceLength){
    let sequenceArray = []
    for (let i = 0; i < sequenceLength; i++) {
        sequenceArray.push(Math.floor(Math.random() * 4) + 1);
        
    }
    return sequenceArray
}

cells.forEach((cell) => {
    cell.addEventListener('click', (event) => {
        event.preventDefault;
        console.log(cell.getAttribute("data-number"));


       







        // if(cell.innerText == ''){
        //     cell.innerText = 'Flash';
        // }else{
        //     cell.innerText = ''
        // }
        
        
    });
});
let difficulty = 5
let sequence = generateRandomSequence(5)
// create a function that takes in the random sequence and flashes the correct boxes

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
    // console.log("boxnum")
}


// flash("three",1000)


// create a function that flashes a box for a certain timeframe parameters = the box to flash and the timeout 

function flashSequence(sequence, time){
for (let i = 0; i < sequence.length; i++) {
	task(i, sequence[i], 1000);
}

function task(i, sequence, time) {
	setTimeout(function () {
		flash(sequence,time)
	}, 2000 * i);
} 
}

flashSequence(sequence, 1000)


// function sequenceFlash(sequence, time){
// for (let i = 0; i < sequence.length; i++) {
//     setTimeout(function () {
// 			flash(sequence[i], time);
// 		}, 1000);


// }

// }
// setTimeout(function () {
// 	flash(sequence[i], time);
// }, 1000);
