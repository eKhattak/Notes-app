let filters = {
    searchText: '',
    sortBy: 'byEdited'
}

const getFilters = () => filters;

const setFilters = (update) => {
    if(typeof update.searchText === 'string') {
        filters.searchText = update.searchText;
    }

    if(typeof update.sortBy === 'string') {
        filters.sortBy = update.sortBy;
    }
}

export { getFilters, setFilters };