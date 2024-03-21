import { books, RENDER_EVENT, UPDATE_EVENT } from "./utils.js";
import { findBookId, findBookIndex, saveBook } from "./utils.js";

function deleteBook(id) {
    const bookPosition = findBookIndex(id);
    books.splice(bookPosition, 1);
    saveBook(false);
}

function changeBookStatus(id) {
    const book = findBookId(id);
    if (!book)
        return;
    book.finished = !book.finished;
    saveBook();
    document.dispatchEvent(new Event(UPDATE_EVENT));
}

function addDeleteButton(id) {
    const changeStatusBtn = document.createElement(`button`);
    changeStatusBtn.id = `button-change-status`;
    changeStatusBtn.classList.add(`bg-green-500`, `text-black`, `p-2`, `rounded-lg`, `hover:bg-green-900`);
    changeStatusBtn.innerText = `Unfinished`;
    changeStatusBtn.addEventListener(`click`, () => {
        changeBookStatus(id);
        document.dispatchEvent(new Event(RENDER_EVENT));
    });

    const deleteButton = document.createElement(`button`);
    deleteButton.id = `button-delete`;
    deleteButton.classList.add(`bg-red-500`, `text-black`, `p-2`, `rounded-lg`, `hover:bg-red-900`);
    deleteButton.innerText = `Delete`;
    deleteButton.addEventListener(`click`, () => {
        deleteBook(id);
        document.dispatchEvent(new Event(RENDER_EVENT));
    });
    return deleteButton;
}

function addChangeStatusButton(id, finished) {
    const changeStatusButton = document.createElement(`button`);
    changeStatusButton.id = `button-change-status`;
    changeStatusButton.classList.add(`bg-green-500`, `ext-black`, `p-2`, `rounded-lg`, `hover:bg-green-900`);
    changeStatusButton.innerText = finished
        ? `Unfinished`
        : `Finished`;
    changeStatusButton.addEventListener(`click`, () => {
        changeBookStatus(id);
        document.dispatchEvent(new Event(RENDER_EVENT));
    });

    return changeStatusButton;
}


export { addDeleteButton, addChangeStatusButton };

