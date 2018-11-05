import { getFilters } from './filter';
import { sortNotes, updateLastEdited } from './notes';


// Generate new Note
const generateNewNote = (note) => {
    const noteEl = document.createElement('a');
    const textEl = document.createElement('p');
    const statusEl = document.createElement('p');

    // button.textContent = 'X';
    // noteEl.appendChild(button);
    // textEl.setAttribute('href', `/edit.html#${note.id}`);

    // button.addEventListener('click', (e) => {
    //     removeNote(note.id)
    //     renderNotes();
    // })


    if(note.title.length > 0) {
        textEl.textContent = note.title;
    } else {
        textEl.textContent = 'Untitled Note';
    }
    // Append Text to Main Element
    textEl.classList.add('list-item__title');
    noteEl.appendChild(textEl);

    // Setup Link to Main Element
    noteEl.setAttribute('href', `/edit.html#${note.id}`);
    
    // Add Last Edit Text
    statusEl.textContent = updateLastEdited(note.updatedAt);
    noteEl.appendChild(statusEl);

    noteEl.classList.add('list-item')
    return noteEl;
}

// Render Notes 
const renderNotes = function () {
    const noteEl = document.querySelector('#notes');
    const notes = sortNotes(getFilters().sortBy)
    const filteredNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(getFilters().searchText.toLowerCase())
    })

    noteEl.innerHTML = ''
    if(filteredNotes.length > 0) {
        filteredNotes.forEach(function (note) {
            const newNote = generateNewNote(note);
            noteEl.appendChild(newNote);
        })
    } else {
        const textEl = document.createElement('p');
        textEl.textContent = 'No Notes to Show';
        textEl.classList.add('empty-message');
        noteEl.appendChild(textEl);

    }
    

    
}


export { renderNotes };