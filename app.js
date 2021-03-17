
const cardsArray = [
    {
        name: 1,
        img: 'assets/1.jpg'
    },
    {
        name: 1,
        img: 'assets/1.jpg'
    },
    {
        name: 2,
        img: 'assets/2.jpg'
    },
    {
        name: 2,
        img: 'assets/2.jpg'
    },
    {
        name: 3,
        img: 'assets/3.jpg'
    },
    {
        name: 3,
        img: 'assets/3.jpg'
    },
    {
        name: 4,
        img: 'assets/4.jpg'
    },
    {
        name: 4,
        img: 'assets/4.jpg'
    },
    {
        name: 5,
        img: 'assets/5.jpg'
    },
    {
        name: 5,
        img: 'assets/5.jpg'
    },
    {
        name: 6,
        img: 'assets/6.jpg'
    },
    {
        name: 6,
        img: 'assets/6.jpg'
    },
    {
        name: 7,
        img: 'assets/7.jpg'
    }, 
    {
        name: 7,
        img: 'assets/7.jpg'
    },
    {
        name: 8,
        img: 'assets/8.jpg'
    },
    {
        name: 8,
        img: 'assets/8.jpg'
    }
]

const board = document.querySelector('.board');
const result = document.querySelector('.result');
const messageBox = document.querySelector('.message');

let chosenCards = [];
let chosenCardsId = [];
let winnerCards = [];

cardsArray.sort(() => 0.5 - Math.random());

//Create the board
function createBoard() {
    for(let i = 0; i < cardsArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'assets/cover.jpg');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipTheCard);
        board.appendChild(card);
    }
}


//Flip the card 
function flipTheCard() {
    let cardId = this.getAttribute('data-id');
    chosenCards.push(cardsArray[cardId].name);
    chosenCardsId.push(cardId);
    this.setAttribute('src', cardsArray[cardId].img);
    this.classList.remove('flipBack');
    this.classList.add('flip');
    if (chosenCards.length === 2) {
      setTimeout(checkForMatch, 700);
    }
}


function checkForMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = chosenCardsId[0];
    const optionTwoId = chosenCardsId[1];


    if(optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute('src', 'assets/cover.jpg');
        cards[optionTwoId].setAttribute('src', 'assets/cover.jpg');
        messageBox.textContent = 'You have clicked the same picture!';
      } else if (chosenCards[0] === chosenCards[1]) {
        messageBox.textContent = 'You find a match!';
        cards[optionOneId].removeEventListener('click', flipTheCard);
        cards[optionTwoId].removeEventListener('click', flipTheCard);
        winnerCards.push(chosenCards);
    } else {
        cards[optionOneId].setAttribute('src', 'assets/cover.jpg');
        cards[optionTwoId].setAttribute('src', 'assets/cover.jpg');
        cards[optionOneId].classList.add('flipBack');
        cards[optionTwoId].classList.add('flipBack');
        messageBox.textContent = 'Sorry, try again!';
    }

    cards[optionOneId].classList.remove('flip');
    cards[optionTwoId].classList.remove('flip');
    chosenCards = [];
    chosenCardsId = [];

    result.innerHTML = winnerCards.length;

    
    //Restart if you win
    if  (winnerCards.length === cardsArray.length/2) {
        messageBox.textContent = 'Congratulations! You found them all!';
        setTimeout(restart, 3000);
      }

}




//restart game fucntion
function restart() {
    board.innerHTML = "";
    result.innerHTML = '0';
    winnerCards = [];
    messageBox.textContent = '';
    createBoard();
}



createBoard();

//restart if you click the button
document.querySelector('.restart').onclick = restart();