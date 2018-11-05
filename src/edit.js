import { initializedNotes, updateNote, updateLastEdited, removeNote } from './notes'

const deleteEl = document.querySelector('#delete');


// Get note ID
const noteID = location.hash.substring(1);

initializedNotes(noteID);

// Update Last Edit
updateLastEdited(noteID);

// Change note's title on any changes to input
document.querySelector('#name').addEventListener('input', (e) => {
    updateNote(noteID, {
        title: e.target.value
    })
    // Update Last Edit
    updateLastEdited(noteID);
})

// Change note's body on any changes to textarea
document.querySelector('#body').addEventListener('input', (e) => {
    updateNote(noteID, {
        body: e.target.value
    })
    // Update Last Edit
    updateLastEdited(noteID);
})

// Delete Note
deleteEl.addEventListener('click', (e) => {
    removeNote(noteID)
    location.assign('/index.html');
})

window.addEventListener('storage', (e) => {
    if(e.key === 'notes') {
        initializedNotes();
    }
})
