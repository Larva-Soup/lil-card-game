const cardObjectDefinitions = [
  { id: 1, imagePath: "./images/card-KingHearts.png" },
  { id: 2, imagePath: "./images/card-JackClubs.png" },
  { id: 3, imagePath: "./images/card-QueenDiamonds.png" },
  { id: 4, imagePath: "./images/card-AceSpades.png" },
];

const cardBackImgPath = "./images/card-back-Blue.png";

let cards = [];

const playGameButtonElem = document.getElementById("playGame");

const collapsedGridAreaTemplate = '"a a" "a a"';
const cardCollectionCellClass = ".card-pos-a";

const cardContainerElem = document.querySelector(".card-container");

const numCards = cardObjectDefinitions.length;

const cardPositions = [];

const addCardToGridCell = (card) => {
  const cardPositionClassName = mapCardIdToGridCell(card);

  const cardPosElem = document.querySelector(cardPositionClassName);

  addChildElement(cardPosElem, card);
};

const createCard = (cardItem) => {
  //create div elements
  const cardElem = createElement("div");
  const cardInnerElem = createElement("div");
  const cardFrontElem = createElement("div");
  const cardBackElem = createElement("div");

  //create front and back image elements
  const cardFrontImg = createElement("img");
  const cardBackImg = createElement("img");

  //add class and id to card element
  addClassToElement(cardElem, "card");
  addIdToElement(cardElem, cardItem.id);

  //add class to inner elem
  addClassToElement(cardInnerElem, "card-inner");

  //class to front and back elems
  addClassToElement(cardFrontElem, "card-front");
  addClassToElement(cardBackElem, "card-back");

  //back of card

  addSrcToImageElem(cardBackImg, cardBackImgPath);

  //add src to img tag
  addSrcToImageElem(cardFrontImg, cardItem.imagePath);

  //assing class to back image element
  addClassToElement(cardBackImg, "card-img");
  //and front
  addClassToElement(cardFrontImg, "card-img");

  //add backImg img tag to backElem div tag
  addChildElement(cardBackElem, cardBackImg);
  //front too
  addChildElement(cardFrontElem, cardFrontImg);

  //adding children to inner-card
  addChildElement(cardInnerElem, cardBackElem);
  addChildElement(cardInnerElem, cardFrontElem);

  //adding inner-card to card
  addChildElement(cardElem, cardInnerElem);

  //add card element as child element to appropiate grid cell
  addCardToGridCell(cardElem);

  initializeCardPositions(cardElem);
};

const createElement = (elemType) => {
  return document.createElement(elemType);
};

const addClassToElement = (elem, className) => {
  elem.classList.add(className);
};

const addIdToElement = (elem, id) => {
  elem.id = id;
};

const addSrcToImageElem = (imgElem, src) => {
  imgElem.src = src;
};

const addChildElement = (parentElem, childElem) => {
  parentElem.appendChild(childElem);
};

const mapCardIdToGridCell = (card) => {
  if (card.id == 1) {
    return ".card-pos-a";
  }
  if (card.id == 2) {
    return ".card-pos-b";
  }
  if (card.id == 3) {
    return ".card-pos-c";
  }
  if (card.id == 4) {
    return ".card-pos-d";
  }
};

const createCards = () => {
  cardObjectDefinitions.forEach((cardItem) => {
    createCard(cardItem);
  });
};

const loadGame = () => {
  createCards();

  cards = document.querySelectorAll(".card");

  playGameButtonElem.addEventListener("click", () => startGame());
};

loadGame();

const startGame = () => {
  initializeNewGame();
  startRound();
};

const initializeNewGame = () => {};

const startRound = () => {
  initializeNewRound();
  collectCards();
  //   flipCards(true);
  shuffleCards();
};

const initializeNewRound = () => {};

const collectCards = () => {
  transformGridArea(collapsedGridAreaTemplate);
  addCardsToGridAreaCell(cardCollectionCellClass);
};

function transformGridArea(areas) {
  cardContainerElem.style.gridTemplateAreas = areas;
}

function addCardsToGridAreaCell(cellPositionClassName) {
  const cellPositionElem = document.querySelector(cellPositionClassName);

  cards.forEach((card, index) => {
    addChildElement(cellPositionElem, card);
  });
}

function flipCard(card, flipToBack) {
  const innerCardElem = card.firstChild;

  if (flipToBack && !innerCardElem.classList.contains("flip-it")) {
    innerCardElem.classList.add("flip-it");
  } else if (innerCardElem.classList.contains("flip-it")) {
    innerCardElem.classList.remove("flip-it");
  }
}

function flipCards(flipToBack) {
  cards.forEach((card, index) => {
    setTimeout(() => {
      flipCard(card, flipToBack);
    }, index * 100);
  });
}

function randomizeCardPositions() {
  const random1 = Math.floor(Math.random() * numCards) + 1;
  const random2 = Math.floor(Math.random() * numCards) + 1;

  const temp = cardPositions[random1 - 1];

  cardPositions[random1 - 1] = cardPositions[random2 - 1];
  cardPositions[random2 - 1] = temp;
}

function shuffleCards() {
  const id = setInterval(shuffle, 12);
  let shuffleCount = 0;

  function shuffle() {
    if (shuffleCount < 500) {
      randomizeCardPositions();

      shuffleCount++;
    } else {
      clearInterval(id);
      dealCards();
    }
  }
}

function initializeCardPositions(card) {
  cardPositions.push(card.id);
}

function dealCards() {
  addCardsToAppropriateCell();
  const areasTemplate = returnGridAreasMappedToCardPos();

  transformGridArea(areasTemplate);
}

function addCardsToAppropriateCell() {
  cards.forEach((card) => {
    addCardToGridCell(card);
  });
}

function returnGridAreasMappedToCardPos() {
  let firstPart = "";
  let secondPart = "";
  let areas = "";

  cards.forEach((card, index) => {
    if (cardPositions[index] == 1) {
      areas = areas + "a ";
    } else if (cardPositions[index] == 2) {
      areas = areas + "b ";
    } else if (cardPositions[index] == 3) {
      areas = areas + "c ";
    } else if (cardPositions[index] == 4) {
      areas = areas + "d ";
    }

    if (index == 1) {
      firstPart = areas.substring(0, areas.length - 1);
      areas = "";
    } else if (index == 3) {
      secondPart = areas.substring(0, areas.length - 1);
    }
    return `"${firstPart}" "${secondPart}"`;
  });
}
