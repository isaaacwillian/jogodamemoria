const front = "card_front";
const back = "card_back";
const icon = "icon";

let techs = ['bootstrap', 'css', 'electron', 'firebase', 'html', 'javascript', 'jquery', 'mongo', 'node', 'react'];

let cards = null;

startGame();

function startGame() {
    cards = createCardsFromTechs(techs);
    cards.sort(() => 0.5 - Math.random())

    initializeCards(cards);
}

function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");

    cards.forEach(card => {

        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add('card');
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);

    })
}

function createCardContent(card, cardElement) {

    createCardFace(front, card, cardElement);
    createCardFace(back, card, cardElement);
}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face == front) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(icon);
        iconElement.src = "./images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}
function createCardsFromTechs(techs) {
    let cards = [];

    for (let tech of techs) {
        cards.push(createPairFromTech(tech));
    }
    return cards.flat();
}
function createPairFromTech(tech) {
    return [{
        id: createIdWithTech(tech),
        icon: tech,
        flipped: false,
    }, {
        id: createIdWithTech(tech),
        icon: tech,
        flipped: false,
    }]
}
function createIdWithTech(tech) {
    return tech + parseInt(Math.random() * 100);
}
function flipCard() {
    this.classList.add("flip");
}