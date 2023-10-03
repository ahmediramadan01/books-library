"use strict";

// DOM ELEMENTS //

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const buttonOpenModal = document.querySelector(".button--open-modal");
const buttonCloseModal = document.querySelector(".button--close-modal");

const openModal = function (event) {
    event.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

// EVENT LISTENERS //

buttonOpenModal.addEventListener("click", openModal);
buttonCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});
