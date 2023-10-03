"use strict";

// GLOBAL VARIABLES //

let booksLibrary = [];

// DOM ELEMENTS //

const modalElement = document.querySelector(".modal");
const overlayElement = document.querySelector(".overlay");
const buttonOpenModalElement = document.querySelector(".button--open-modal");
const buttonCloseModalElement = document.querySelector(".button--close-modal");

const booksElement = document.querySelector(".books");
const bookFormElement = document.querySelector(".modal__form");
const bookTitleElement = document.querySelector("#title");
const bookAuthorElement = document.querySelector("#author");
const bookPagesElement = document.querySelector("#pages");
const bookStatusElement = document.querySelector("#status");

// HELPER FUNCTIONS //

const renderLibrary = function () {
    booksElement.innerHTML = "";

    for (const book of booksLibrary) {
        const html = `
        <div class="book ${book.status === "read" ? "book--read" : ""}">
            <button class="button button--remove">
                <img src="./images/remove.svg" alt="" class="remove-icon" />
            </button>
            <h3 class="book__title">${book.title}</h3>
            <p class="book__author">${book.author}</p>
            <span class="book__pages">${book.pages}</span>
        </div>
        `;

        booksElement.insertAdjacentHTML("beforeend", html);
    }
};

const setLocalStorage = function () {
    localStorage.setItem("library", JSON.stringify(booksLibrary));
};

const getLocalStorage = function () {
    const data = JSON.parse(localStorage.getItem("library"));
    if (!data) return;

    booksLibrary = data;
    renderLibrary();
};
getLocalStorage();

// CALLBACK FUNCTIONS //

const openModal = function (event) {
    event.preventDefault();
    modalElement.classList.remove("hidden");
    overlayElement.classList.remove("hidden");
    bookTitleElement.focus();
};

const closeModal = function () {
    modalElement.classList.add("hidden");
    overlayElement.classList.add("hidden");
};

const addBook = function (event) {
    event.preventDefault();

    const bookTitle = bookTitleElement.value;
    const bookAuthor = bookAuthorElement.value;
    const bookPages = bookPagesElement.value;
    const bookStatus = bookStatusElement.value;

    const book = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
    book.addBookToLibrary();
    closeModal();
    bookTitleElement.value = bookAuthorElement.value = bookPagesElement.value = "";
    bookStatusElement.value = "want";
    setLocalStorage();
    renderLibrary();
};

// CONSTRUCTION FUNCTIONS //

const Book = function (title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
};

Book.prototype.addBookToLibrary = function () {
    booksLibrary.push(this);
};

// EVENT LISTENERS //

buttonOpenModalElement.addEventListener("click", openModal);
buttonCloseModalElement.addEventListener("click", closeModal);
overlayElement.addEventListener("click", closeModal);
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modalElement.classList.contains("hidden")) {
        closeModal();
    }
});

bookFormElement.addEventListener("submit", addBook);
