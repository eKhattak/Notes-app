import { createNotes, saveNotes } from './notes';
import { setFilters } from './filter';
import { renderNotes } from './view';


renderNotes();

document.querySelector('#create-note').addEventListener('click', function (e) {
    const uniqueID = createNotes();
    saveNotes();
    location.assign(`/edit.html#${uniqueID}`);
})

document.querySelector('#search-text').addEventListener('input', function (e) {
    // change filter's searchText to selected Option
    setFilters({
        searchText: e.target.value
    })
    renderNotes()
})

document.querySelector('#filter-by').addEventListener('change', function (e) {
    // change filter's sortBy to selected Option
    setFilters({
        sortBy: e.target.value
    })
    renderNotes()
})

window.addEventListener('storage', (e) => {
    if(e.key === 'notes') {
        renderNotes(notes, filters)
        
    }
})

