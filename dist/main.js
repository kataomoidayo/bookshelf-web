const books = [];
const RENDER_EVENT = 'render_books';
const SAVED_EVENT = 'saved_book';
const STORAGE_KEY = 'bookshelf';

function generateId() {
    return + new Date();
}


function addBook(bookData) {
    const { id, title, author, year, isCompleted } = bookData;

    const textTitle = document.createElement('h3');
    textTitle.innerText = title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = 'Author :' + author;

    const textYear = document.createElement('p');
    textYear.innerText = 'Year :' + year;

}