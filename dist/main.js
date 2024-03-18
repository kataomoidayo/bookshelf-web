const books = [];
const RENDER_EVENT = 'render_books';
const SAVED_EVENT = 'saved_book';
const STORAGE_KEY = 'bookshelf';

function generateId() {
    return + new Date();
};

function generateBookObject(id, title, author, year, isCompleted) {
    return { id, title, author, year, isCompleted }

};

function findBook(bookId) {
    for (const bookData of books) {
        if (bookData.id === bookId) {
            return bookData;
        }
    }
    return null
}

function findBookIndex(bookId) {
    for (const index of books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert('Oops, your browser not support local storage. Please change your browser');
        return false;
    }
    return true;
}

function saveBook() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

function loadFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const bookList of data) {
            books.push(bookList);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function addBook(bookData) {
    const { id, title, author, year, isCompleted } = bookData;

    const textTitle = document.createElement('h3');
    textTitle.innerText = title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = 'Author :' + author;

    const textYear = document.createElement('p');
    textYear.innerText = 'Year :' + year;

    const newLine = document.createElement('div');
    newLine.classList.add('action');

    const container = document.createElement('article');
    container.classList.add('book-item');
    container.append(textTitle, textAuthor, textYear);
    container.setAttribute('id', `book-${id}`);


    if (isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('move');
        undoButton.innerText = 'Uncompleted';
        undoButton.addEventListener('click', function () {
            undoTaskFromCompleted(id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function () {
            removeTaskFromCompleted(id);
        });
        container.append(undoButton, deleteButton);
    } else {
        const doneButton = document.createElement('button');
        doneButton.classList.add('move');
        doneButton.innerText = 'Completed';
        doneButton.addEventListener('click', function () {
            addTaskToCompleted(id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function () {
            removeTaskFromCompleted(id);
        });
        container.append(doneButton, deleteButton);
    }
    return container;
}

function addToShelf() {
    const textTitle = document.getElementById('BookTitle').value;
    const textAuthor = document.getElementById('BookAuthor').value;
    const textYear = document.getElementById('BookYear').value;
    const isCompleted = document.getElementById('BookIsComplete');

    const generatedID = generateId();
    if (isCompleted.checked == true) {
        const bookObject = generateBookObject(generatedID, textTitle, textAuthor, textYear, true);
        books.push(bookObject);
        console.log('Marked as Completed');
        alert('Marked as Completed');
    } else {
        const bookObject = generateBookObject(generatedID, textTitle, textAuthor, textYear, false);
        books.push(bookObject);
        console.log('Book added');
        alert('Book added');
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}