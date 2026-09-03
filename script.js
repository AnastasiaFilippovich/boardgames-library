const GAMES = [
    {
        id: 1,
        name: 'Каркассон',
        tags: ['calm', 'strategic'],
        players: '2-5',
        playTime: '35-45 минут',
        rating: 4.7,
        description: 'Стратегия про строительство',
        reviews: [
            {
                id: 1,
                author: 'Кот',
                rating: 5,
                text: 'Очень интересно!',
                createdAt: '2026-09-03'
            }
        ],
        notes: [
            {
                id: 1,
                author: 'Марко',
                text: 'Лучше играть втроём',
                createdAt: '2026-09-03'
            }
        ]
    },
    {
        id: 2,
        name: 'Зомби в доме: Заражение',
        tags: ['fun', 'cooperative'],
        players: '2-5',
        playTime: 'от 30 минут',
        rating: 4.8,
        description: 'Компания друзей пытается выбраться из дома, полного зомби',
        reviews: [
            {
                id: 1,
                author: 'Краб',
                rating: 4,
                text: 'Слишком просто, но прикольно',
                createdAt: '2026-09-06'
            }
        ],
        notes: [
            {
                id: 1,
                author: 'Грог',
                text: 'С дополнениями играть веселее',
                createdAt: '2026-09-08'
            }
        ]
    },
];

const TAGS = {
    calm: 'Спокойная',
    fun: 'Весёлая',
    magic: 'Магическая',
    adventure: 'Приключенческая',
    strategic: 'Стратегическая',
    cooperative: 'Командная',
    chaotic: 'Хаотичная',
    competitive: 'Соревновательная'
};

let nextId = GAMES.length + 1;

const newGameModal = document.querySelector('.modal-new');
const newModalCloseButton = newGameModal.querySelector('.modal-new__close-button');
const newGameButton = document.querySelector('.games-add-new');
const gameCardModal = document.querySelector('.modal-game-card');
const cardModalCloseButton = gameCardModal.querySelector('.modal-game-card__close-button');
const moreInfoButtons = document.querySelectorAll('.game-card__more');
const tabs = gameCardModal.querySelectorAll('.modal-game-card__tab');
const tabButtons = gameCardModal.querySelectorAll('.modal-game-card__tab-button');
const newGameForm = document.querySelector('.modal-form');
const gameCardsBlock = document.querySelector('.games-list');
const gameCardTemplate = document.querySelector('#game-card-template');

const gameName = gameCardModal.querySelector('.modal-game-card__title');
const gamePlayers = gameCardModal.querySelector('.modal-game-card__players');
const gameTime = gameCardModal.querySelector('.modal-game-card__time');
const gameRating = gameCardModal.querySelector('.modal-game-card__rating');
const gameDescription = gameCardModal.querySelector('.modal-game-card__description');
const gameTags = gameCardModal.querySelector('.modal-game-card__tags');
const modalCloseButton = gameCardModal.querySelector('.modal-game-card__close-button');
const ratingElementTemplate = document.querySelector('#rating-element-template');
const notesElementTemplate = document.querySelector('#notes-element-template');
const ratingContainer = gameCardModal.querySelector('.tab__rating-list');
const notesContainer = gameCardModal.querySelector('.tab__notes-list');

const createGameCard = (cardData) => {
    const gameCardsBlockFragment = document.createDocumentFragment();

    const gameCardElement = gameCardTemplate.content.cloneNode(true);
    gameCardElement.querySelector('.game-card__title').textContent = cardData.name;
    gameCardElement.querySelector('.game-card__players').textContent = cardData.players;
    gameCardElement.querySelector('.game-card__rating').textContent = cardData.rating;
    gameCardElement.querySelector('.game-card').dataset.gameId = cardData.id;

    cardData.tags.forEach(tag => {
        const tagElement = document.createElement('li');
        tagElement.classList.add('tag');
        tagElement.textContent = TAGS[tag];
        gameCardElement.querySelector('.game-card__tags').append(tagElement);
    });

    const moreInfoButton = gameCardElement.querySelector('.game-card__more');
    moreInfoButton.addEventListener('click', (evt) => {
        const targetGameId = Number(evt.target.closest('.game-card').dataset.gameId);

        if (Number.isNaN(targetGameId)) {
            return;
        }

        const targetGameData = GAMES.find((game) => game.id === targetGameId);

        if (targetGameData) {
            openCardModal(targetGameData);
        }
    })

    gameCardsBlockFragment.appendChild(gameCardElement);

    gameCardsBlock.appendChild(gameCardsBlockFragment);
};

const renderGameCards = (gamesData) => {
    gameCardsBlock.querySelectorAll('.game-card').forEach((element) => element.remove());
    gamesData.forEach(element => createGameCard(element));
};

const closeNewGameModal = () => {
    newGameModal.classList.remove('modal-new--active');
    newGameForm.reset();
    newModalCloseButton.removeEventListener('click', closeNewGameModal);
}

const openNewGameModal = () => {
    newGameModal.classList.add('modal-new--active');
    newModalCloseButton.addEventListener('click', closeNewGameModal);
}

newGameButton.addEventListener('click', openNewGameModal);
moreInfoButtons.forEach(element => {
    element.addEventListener('click', openGameCardModal);
});

tabButtons.forEach(tabButton => {
    tabButton.addEventListener('click', () => {
        let buttonData = tabButton.dataset.button;
        tabButtons.forEach(tabButton => {
            tabButton.classList.remove('tab-button--active');
        });
        tabs.forEach(tab => {
            tab.classList.remove('tab--active');
        });

        tabButton.classList.add('tab-button--active');
        let activeTab = document.querySelector(`[data-tab="${buttonData}"]`);
        activeTab.classList.add('tab--active');
    });
});

renderGameCards(GAMES);

const renderRating = (ratingData) => {
    ratingContainer.querySelectorAll('.rating-list__element').forEach((element) => element.remove());

    const ratingContainerFragment = document.createDocumentFragment();

    ratingData.forEach(({id, author, rating, text, createdAt}) => {
        const ratingElement = ratingElementTemplate.content.cloneNode(true);
        ratingElement.querySelector('.element__date').textContent = createdAt;
        ratingElement.querySelector('.element__author').textContent = author;
        ratingElement.querySelector('.element__rating').textContent = rating;
        ratingElement.querySelector('.element__comment').textContent = text;
        ratingElement.querySelector('.rating-list__element').dataset.ratingId = id;

        ratingContainerFragment.appendChild(ratingElement);
    });

  ratingContainer.appendChild(ratingContainerFragment);
};

const renderNotes = (notesData) => {
    notesContainer.querySelectorAll('.notes-list__element').forEach((element) => element.remove());

    const notesContainerFragment = document.createDocumentFragment();

    notesData.forEach(({id, author, text, createdAt}) => {
        const notesElement = notesElementTemplate.content.cloneNode(true);
        notesElement.querySelector('.element__date').textContent = createdAt;
        notesElement.querySelector('.element__author').textContent = author;
        notesElement.querySelector('.element__comment').textContent = text;
        notesElement.querySelector('.notes-list__element').dataset.ratingId = id;

        notesContainerFragment.appendChild(notesElement);
    });

  notesContainer.appendChild(notesContainerFragment);
};

const openCardModal = (gameData) => {
    gameCardModal.classList.add('modal-game-card--active');
    gameName.textContent = gameData.name;
    gamePlayers.textContent = gameData.players;
    gameTime.textContent = gameData.playTime;
    gameRating.textContent = gameData.rating;
    gameDescription.textContent = gameData.description;
    gameTags.innerHTML = '';

    gameData.tags.forEach(tag => {
        const tagElement = document.createElement('li');
        tagElement.classList.add('tag');
        tagElement.textContent = TAGS[tag];
        gameTags.append(tagElement);
    });

    if (gameData.reviews) {
        renderRating(gameData.reviews);
    }

    if (gameData.notes) {
        renderNotes(gameData.notes);
    }

    cardModalCloseButton.addEventListener('click', closeCardModal);
};

const closeCardModal = () => {
    gameCardModal.classList.remove('modal-game-card--active');
    cardModalCloseButton.removeEventListener('click', closeCardModal);
    ratingContainer.innerHTML = '';
    notesContainer.innerHTML = '';
};

newGameForm.addEventListener('submit', function(evt) {
    evt.preventDefault();

    const formData = new FormData(newGameForm);

    const gameData = {
        id: nextId,
        name: formData.get('game-name'),
        tags: formData.getAll('tags'),
        players: formData.get('game-players'),
        time: formData.get('game-time'),
        description: formData.get('game-description')
    };

    createGameCard(gameData);

    GAMES.push(gameData);
    nextId++;
});