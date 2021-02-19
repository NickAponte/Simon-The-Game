// Adds clickable events to each square 
const cells = document.querySelectorAll('.cell');




// create a function to randomly generate numbers in an array between 1 and 4, that also takes a .length parameter to determine how long the array should be 

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
document.getElementById(`${boxNum}`).innerHTML = "flash";
    setTimeout(function () {
	    document.getElementById(`${boxNum}`).innerHTML = '';
    }, timeToFade);
}


// flash("three",1000)


// create a function that flashes a box for a certain timeframe parameters = the box to flash and the timeout 
for (let i = 0; i < sequence.length; i++) {
    
}