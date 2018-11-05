import uuidv4 from 'uuid/v4';
import moment from 'moment';

// create empty notes array
let notes = [];

// Read data from localStorage
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes');

    if(notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}
// Expose Notes
const getNotes = () => notes;

// Save notes to localStorage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Create new Note
const createNotes = () => {
    const uniqueID = uuidv4()
    const time = moment().valueOf()
    notes.push({
        id: uniqueID,
        createdAt: time,
        updatedAt: time,
        title: '',
        body: ''
    })
    saveNotes();
    return uniqueID;
}

// change value of notes
notes = loadNotes();

// Sort your notes by one of three ways
const sortNotes = function (sortBy) {
    if (sortBy === 'byEdited') {
        return notes.sort(function (a, b) {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort(function (a, b) {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        return notes.sort(function (a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

// Remove Note
const removeNote = (ID) => {
    const findIndex = notes.findIndex((note) => note.id === ID )

    if(findIndex >= 0) {
        notes.splice(findIndex, 1);
        saveNotes();
    }
}

// Update Note 
const updateNote = (ID, update) => {
    const note = notes.find(note => note.id === ID )

    if(!note) {
        return
    }

    if(typeof update.title === 'string') {
        note.title = update.title;
        note.updatedAt = moment().valueOf();
    }

    if(typeof update.body === 'string') {
        note.body = update.body;
        note.updatedAt = moment().valueOf();
    }

    saveNotes();
}

const initializedNotes = (noteID) => {
    const titleEl = document.querySelector('#name');
    const bodyEl = document.querySelector('#body');
    const dateEl = document.querySelector('#edit-time')
    // Store notes in an Array
    const notes = getNotes();

    // Find the right note by matching ID
    const note = notes.find(note => {
        return note.id === noteID;
    })

    // Find note's Index

    const noteIndex = notes.findIndex(note => {
        return note.id === noteID;
    })

    // if no note is matched , return to home
    if(note === undefined) {
        location.assign('/index.html');
    }

    // Last Edit Info
    dateEl.textContent = updateLastEdited(note.updatedAt)

    // Set input value to note's title
    titleEl.value = note.title;
    // Set textarea's text to note's body
    bodyEl.value = note.body;
}


// Generate the last edited message
const updateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}

export { createNotes, sortNotes, removeNote, updateNote, saveNotes, initializedNotes, updateLastEdited }