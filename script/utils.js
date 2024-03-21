export const
    books = [],
    RENDER_EVENT = `render_books`,
    SAVED_EVENT = `saved_book`,
    UPDATE_EVENT = `update_books`,
    DELETE_EVENT = `delete_books`,
    STORAGE_KEY = `bookshelf`;

function localStorageExist() {
    if (typeof Storage == `undefined`) {
        alert(`Looks like your browser don't support local storage, please try on different browser`)
        return false;
    }
    return true;
}

function generateId() {
    return `book-${new Date().getTime()}`;
}

function generateBookObject(title, author, year, finished) {
    return {
        id: generateId(),
        title,
        author,
        year,
        finished
    };
}

function findBookId(id) {
    return books.find((book) => book.id === id);
}

function findBookIndex(id) {
    return books.findIndex((book) => book.id === id);
}

function saveBook(saved = true) {
    if (!localStorageExist())
        return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    if (saved) {
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
    else {
        document.dispatchEvent(new Event(DELETE_EVENT));
    }
}

function loadDataFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        const parsedData = JSON.parse(data);
        books.push(...parsedData);
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
}

// function refreshPage() {
//     document.location.reload()
// }refreshPage

export { localStorageExist, generateId, generateBookObject, findBookId, findBookIndex, saveBook, loadDataFromStorage, };