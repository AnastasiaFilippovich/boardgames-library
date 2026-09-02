newGameModal = document.querySelector('.modal-new');
modalCloseButton = newGameModal.querySelector('.modal-new__close-button');
newGameButton = document.querySelector('.games-add-new');

const closeNewGameModal = () => {
    newGameModal.classList.add('hidden');
    modalCloseButton.removeEventListener('click', closeNewGameModal);
}

const openNewGameModal = () => {
    newGameModal.classList.remove('hidden');
    modalCloseButton.addEventListener('click', closeNewGameModal);
}

newGameButton.addEventListener('click', openNewGameModal);