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
    cooperative: 'Командая'
};

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

const renderGameCards = (gamesData) => {
  gameCardsBlock.querySelectorAll('.game-card').forEach((element) => element.remove());

  const gameCardsBlockFragment = document.createDocumentFragment();

  gamesData.forEach(({id, name, tags, players, rating}) => {
    const gameCardElement = gameCardTemplate.content.cloneNode(true);
    gameCardElement.querySelector('.game-card__title').textContent = name;
    gameCardElement.querySelector('.game-card__players').textContent = players;
    gameCardElement.querySelector('.game-card__rating').textContent = rating;
    gameCardElement.querySelector('.game-card').dataset.gameId = id;

    tags.forEach(tag => {
        const tagElement = document.createElement('li');
        tagElement.classList.add('tag');
        tagElement.textContent = TAGS[tag];
        gameCardElement.querySelector('.game-card__tags').append(tagElement);
    })

    gameCardsBlockFragment.appendChild(gameCardElement);
  });

  gameCardsBlock.appendChild(gameCardsBlockFragment);
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

newGameForm.addEventListener('submit', function(evt) {
    evt.preventDefault();

    const formData = new FormData(newGameForm);

    const gameData = {
        name: formData.get('game-name'),
        tags: formData.getAll('tags'),
        players: formData.get('game-players'),
        time: formData.get('game-time'),
        description: formData.get('game-description')
    };

    console.log(gameData);
});

renderGameCards(GAMES);