
const cells = document.querySelectorAll('.cell');
cells.forEach((cell) => {
	// console.log(cell)
	cell.addEventListener('click', (event) => {
		event.preventDefault;
		console.log(cell.getAttribute("data-number"));
		cell.innerText = 'flash';
	});
});
