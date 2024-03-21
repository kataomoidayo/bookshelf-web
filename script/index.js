import { books, RENDER_EVENT } from "./utils.js";
import { localStorageExist, generateBookObject, saveBook, loadDataFromStorage } from "./utils.js";
import { addDeleteButton, addChangeStatusButton } from "./button.js";

function addBook(bookData) {
    const { id, title, author, year, finished } = bookData;

    const textTitle = document.createElement(`h3`);
    // textTitle.id = "book-title";
    textTitle.innerText = title;

    const textAuthor = document.createElement('p');
    // textAuthor.id = "book-author";
    textAuthor.innerText = `Authors : ${author}`;

    const textYear = document.createElement(`p`);
    // textYear.id = "book-year";
    textYear.innerText = `Years : ${year}`;

    if (finished) {
        const finishedBookContainer = document.getElementById(`completeBookshelfList`);
        const card = document.createElement(`div`);
        card.id = `card`;
        card.classList.add(`flex`, `flex-col`, `items-start`, `p-5`, `border-2`, `border-gray-700`, `rounded-lg`);
        card.appendChild(textTitle);
        card.appendChild(textAuthor);
        card.appendChild(textYear);

        finishedBookContainer.appendChild(card);

        const buttonContainer = document.createElement(`div`);
        buttonContainer.id = `button-container`;
        buttonContainer.classList.add(`flex`, `gap-2`, `mt-5`);
        card.appendChild(buttonContainer);

        const deleteButton = addDeleteButton(id);
        const changeStatusButton = addChangeStatusButton(id, true);

        buttonContainer.appendChild(deleteButton);
        buttonContainer.appendChild(changeStatusButton);

    } else {
        const unfinishedBookContainer = document.getElementById(`incompleteBookshelfList`);
        const card = document.createElement(`div`);
        card.id = `card`;
        card.classList.add(`flex`, `flex-col`, `items-start`, `p-5`, `border-2`, `border-gray-700`, `rounded-lg`);
        card.appendChild(textTitle);
        card.appendChild(textAuthor);
        card.appendChild(textYear);

        unfinishedBookContainer.appendChild(card);

        const buttonContainer = document.createElement(`div`);
        buttonContainer.id = `button-container`;
        buttonContainer.classList.add(`flex`, `gap-2`, `mt-5`);
        card.appendChild(buttonContainer);

        const deleteButton = addDeleteButton(id);
        const changeStatusButton = addChangeStatusButton(id, false);

        buttonContainer.appendChild(deleteButton);
        buttonContainer.appendChild(changeStatusButton);
    }
}

function insertToShelf() {
    const inputTitle = document.getElementById(`inputBookTitle`);
    const inputAuthor = document.getElementById(`inputBookAuthor`);
    const inputYear = document.getElementById(`inputBookYear`);
    const inputFinished = document.getElementById(`inputBookIsComplete`);

    if (inputFinished.checked) {
        const book = generateBookObject(inputTitle.value, inputAuthor.value, Number(inputYear.value), true);
        books.push(book);
    } else {
        const book = generateBookObject(inputTitle.value, inputAuthor.value, Number(inputYear.value), false);
        books.push(book);
    }

    inputTitle.value = "";
    inputAuthor.value = "";
    inputYear.value = "";
    inputFinished.checked = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBook();
}

function searchBook() {

    const inputSearch = document.getElementById(`searchBookTitle`);
    const searchValue = inputSearch.value.toLowerCase();

    const unfinishedBook = document.getElementById(`incompleteBookshelfList`);
    const finishedBook = document.getElementById(`completeBookshelfList`);

    const filteredBook = books.filter((book) => book.title.toLowerCase().includes(searchValue));

    const unfinishedEmptyText = document.createElement(`p`);
    unfinishedEmptyText.innerText = `No book with title ${searchValue} on the uncompleted list`;

    const finishedEmptyText = document.createElement(`p`);
    finishedEmptyText.innerText = `No book with title ${searchValue} on the completed list`;

    const filterUnfinished = filteredBook.filter((book) => !book.finished);
    const filterFinished = filteredBook.filter((book) => book.finished);

    if (filterUnfinished.length === 0) {
        unfinishedBook.innerHTML = "";
        unfinishedBook.appendChild(unfinishedEmptyText);
    }
    if (filterUnfinished.length > 0) {
        unfinishedBook.innerHTML = "";
    }

    if (filterFinished.length === 0) {
        finishedBook.innerHTML = "";
        finishedBook.appendChild(finishedEmptyText);
    }
    if (filterFinished.length > 0) {
        finishedBook.innerHTML = "";
    }
    filteredBook.forEach((book) => {
        addBook(book);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorageExist()) {
        loadDataFromStorage();
    }

    const bookForm = document.getElementById(`inputBook`);
    const inputSearch = document.getElementById(`searchBookTitle`);
    const searchButton = document.getElementById(`searchSubmit`);

    bookForm.addEventListener(`submit`, (ev) => {
        ev.preventDefault();
        insertToShelf();
    });

    searchButton.addEventListener(`submit`, (ev) => {
        ev.preventDefault();
        searchBook();
    });

    inputSearch.addEventListener(`change`, () => {
        searchBook();
    });
});

document.addEventListener(RENDER_EVENT, () => {
    const unfinishedBook = document.getElementById(`incompleteBookshelfList`);
    const finishedBook = document.getElementById(`completeBookshelfList`);

    const unfinishedEmptyText = document.createElement(`p`);
    unfinishedEmptyText.innerText = `No book on the uncompleted list yet`;

    const finishedEmptyText = document.createElement(`p`);
    finishedEmptyText.innerText = `No book on the completed list yet`;

    const filterUnfinished = books.filter((book) => !book.finished);
    const filterFinished = books.filter((book) => book.finished);

    if (filterUnfinished.length === 0) {
        unfinishedBook.innerHTML = "";
        unfinishedBook.appendChild(unfinishedEmptyText);
    }
    if (filterUnfinished.length > 0) {
        unfinishedBook.innerHTML = "";
    }

    if (filterFinished.length === 0) {
        finishedBook.innerHTML = "";
        finishedBook.appendChild(finishedEmptyText);
    }
    if (filterFinished.length > 0) {
        finishedBook.innerHTML = "";
    }
    books.forEach((book) => {
        addBook(book);
    });
});
