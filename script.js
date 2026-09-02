newGameModal = document.querySelector('.modal-new');
newModalCloseButton = newGameModal.querySelector('.modal-new__close-button');
newGameButton = document.querySelector('.games-add-new');
gameCardModal = document.querySelector('.modal-game-card');
cardModalCloseButton = gameCardModal.querySelector('.modal-game-card__close-button');
moreInfoButtons = document.querySelectorAll('.game-card__more');
tabs = gameCardModal.querySelectorAll('.modal-game-card__tab');
tabButtons = gameCardModal.querySelectorAll('.modal-game-card__tab-button');

const closeNewGameModal = () => {
    newGameModal.classList.remove('modal-new--active');
    newModalCloseButton.removeEventListener('click', closeNewGameModal);
}

const openNewGameModal = () => {
    newGameModal.classList.add('modal-new--active');
    newModalCloseButton.addEventListener('click', closeNewGameModal);
}

const closeGameCardModal = () => {
    gameCardModal.classList.remove('modal-game-card--active');
    cardModalCloseButton.removeEventListener('click', closeGameCardModal);
}

const openGameCardModal = () => {
    gameCardModal.classList.add('modal-game-card--active');
    cardModalCloseButton.addEventListener('click', closeGameCardModal);
}

newGameButton.addEventListener('click', openNewGameModal);
moreInfoButtons.forEach(element => {
    element.addEventListener('click', openGameCardModal);
});

tabButtons.forEach(tabButton => {
    tabButton.addEventListener('click', () => {
        tabButtons.forEach(tabButton => {
            tabButton.classList.remove('.tab-button--active');
        });
        tabs.forEach(tab => {
            tab.classList.remove('.tab--active');
        });

        tabButton.classList.add('.tab-button--active');
    });
});