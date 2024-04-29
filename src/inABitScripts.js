// Utility function to generate random color
function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
 }

 // Array to keep track of selected sticky notes
 let selectedNotes = [];

 // Function to toggle sticky note selection
 function toggleStickyNoteSelection(stickyNote) {
	if (selectedNotes.includes(stickyNote)) {
	  // Deselect if already selected
	  stickyNote.classList.remove('selected');
	  selectedNotes = selectedNotes.filter(note => note !== stickyNote);
	} else {
	  // Select if not already selected
	  stickyNote.classList.add('selected');
	  selectedNotes.push(stickyNote);
	}
 }

 // Function to create a sticky note
 function createStickyNote() {
	const board = document.getElementById('board');
	const stickyNote = document.createElement('div');
	stickyNote.className = 'sticky-note';

	// Generate random position
	const x = Math.random() * (window.innerWidth - 200); // 200 is the width of the sticky note
	const y = Math.random() * (window.innerHeight - 200); // 200 is the height of the sticky note

	// Set random color
	stickyNote.style.backgroundColor = getRandomColor();

	stickyNote.style.left = `${x}px`;
	stickyNote.style.top = `${y}px`;

	const textArea = document.createElement('textarea');
	stickyNote.appendChild(textArea);
	board.appendChild(stickyNote);

	textArea.focus();

	// Add right-click event listener to show custom context menu
	stickyNote.addEventListener('contextmenu', function(event) {
	  event.preventDefault(); // Prevent the default context menu
	  const customContextMenu = document.getElementById('customContextMenu');
	  customContextMenu.style.top = `${event.clientY}px`;
	  customContextMenu.style.left = `${event.clientX}px`;
	  customContextMenu.style.display = 'block';

	  // Set the current sticky note for deletion
	  customContextMenu.currentStickyNote = stickyNote;
	});

	// Add drag and drop functionality
	addDragAndDrop(stickyNote);
 }

 // Function to add drag and drop functionality to a sticky note
 function addDragAndDrop(draggableArea) {
	let offsetX, offsetY;

	draggableArea.addEventListener('mousedown', function(event) {
	  // Check if the mousedown event is on the border
	  if (event.target === draggableArea) {
		 offsetX = event.clientX - draggableArea.getBoundingClientRect().left;
		 offsetY = event.clientY - draggableArea.getBoundingClientRect().top;
		 document.addEventListener('mousemove', onMouseMove);
		 document.addEventListener('mouseup', onMouseUp);
	  }
	});

	function onMouseMove(event) {
	  // Calculate the new position
	  draggableArea.style.left = `${event.clientX - offsetX}px`;
	  draggableArea.style.top = `${event.clientY - offsetY}px`;
	}

	function onMouseUp() {
	  // Remove the event listeners when the mouse is released
	  document.removeEventListener('mousemove', onMouseMove);
	  document.removeEventListener('mouseup', onMouseUp);
	}
 }

 // Event listener for the custom context menu delete option
 document.getElementById('deleteNote').addEventListener('click', function() {
	const customContextMenu = document.getElementById('customContextMenu');
	if (customContextMenu.currentStickyNote) {
	  customContextMenu.currentStickyNote.remove();
	  customContextMenu.currentStickyNote = null;
	}
	customContextMenu.style.display = 'none';
 });

 // Event listener for the custom context menu delete multiple option
 document.getElementById('deleteMultiple').addEventListener('click', function() {
	const customContextMenu = document.getElementById('customContextMenu');
	// Hide the context menu
	customContextMenu.style.display = 'none';

	// Add click event listeners to all sticky notes for selection
	document.querySelectorAll('.sticky-note').forEach(stickyNote => {
	  stickyNote.addEventListener('click', function(event) {
		 toggleStickyNoteSelection(stickyNote);
	  });
	});
 });

 // Event listener for the custom context menu delete selected notes option
 document.getElementById('deleteSelected').addEventListener('click', function() {
	deleteSelectedNotes();
	// Hide the context menu
	const customContextMenu = document.getElementById('customContextMenu');
	customContextMenu.style.display = 'none';
 });

 // Function to delete selected sticky notes
 function deleteSelectedNotes() {
	selectedNotes.forEach(note => note.remove());
	selectedNotes = []; // Clear the selection array
 }

 // Event listener to delete selected sticky notes when pressing the delete key
 document.addEventListener('keydown', function(event) {
	if (event.key === 'Delete') {
	  deleteSelectedNotes();
	}
 });

 // Event listener to hide the custom context menu when clicking elsewhere
 document.addEventListener('click', function() {
	const customContextMenu = document.getElementById('customContextMenu');
	customContextMenu.style.display = 'none';
 });

 // Event listener for keydown to create sticky notes
 document.addEventListener('keydown', function(event) {
	if (event.key === 's' || event.key === 'S') {
	  if (document.activeElement.tagName !== 'TEXTAREA') {
		 createStickyNote();
	  }
	}
 });

 // Event listener for click to blur textareas
 document.addEventListener('click', function(event) {
	if (event.target.className !== 'sticky-note' && event.target.parentNode.className !== 'sticky-note') {
	  if (document.activeElement.tagName === 'TEXTAREA') {
		 document.activeElement.blur();
	  }
	}
 });
