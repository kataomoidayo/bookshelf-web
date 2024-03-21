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
    const deleteButton = document.createElement(`button`);
    deleteButton.id = `button-delete`;
    deleteButton.classList.add(`p-2`, `rounded-lg`, `w-24`, `text-white`, `font-normal`, `bg-violet-500`, `hover:bg-violet-600`);
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
    changeStatusButton.classList.add(`p-2`, `rounded-lg`, `w-24`, `text-white`, `font-normal`, `bg-violet-500`, `hover:bg-violet-600`);
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

