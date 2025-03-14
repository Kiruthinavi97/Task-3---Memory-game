const CARDS = [
    {
        id: 1,
        name: 'Plus four card',
        img: 'Asset/four.png'
    },
    {
        id: 2,
        name:"Shuffle card",
        img:"Asset/shuffle.png"
    },
    {
        id: 3,
        name:"wild card",
        img:"Asset/wild.png"
    },
    {
        id: 4,
        name:"Skip card",
        img:"Asset/skip.png"
    },
    {
        id: 5,
        name:"Reverse card",
        img:"Asset/reverse.png"
    },
    {
        id: 6,
        name:"Plus two card",
        img:"Asset/two.png"
    },
    {
        id: 7,
        name: 'one number',
        img: 'Asset/one.png'
    },
    {
        id: 8,
        name:"two number",
        img:"Asset/two num.png"
    },
    {
        id: 9,
        name:"Three number",
        img:"Asset/three.png"
    },
    {
        id: 10,
        name:"Four number",
        img:"Asset/four num.png"
    },
    {
        id: 11,
        name:"Five number",
        img:"Asset/five.png"
    },
    {
        id: 12,
        name:"Six number",
        img:"Asset/six.png"
    },
    ];
const cardContainer = document.querySelector('.card-container');
const available = document.querySelector('#available');
const modalTitle = document.querySelector('#modal-title');
const modal = document.querySelector('#modal');
let currentCards = [...CARDS, ...CARDS];
let isPaused = false;
let counter = CARDS.length + 12;
let isLose = false;

// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    let counter = array.length,
        temp,
        index;
    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

function win() {
    isPaused = true;
    modalTitle.innerHTML = 'You win! 🙌🥳';
    console.log("Congratulations! You've won the game!");
    modal.classList.add('modal--open');
}

function lose() {
    isLose = true;
    modalTitle.innerHTML = 'You lose 😢😩';
    modal.classList.add('modal--open');
}

function handleClick(e) {
    const { target } = e;
    if (
        !isPaused &&
        !isLose &&
        !target.classList.contains('card--guessed') &&
        !target.classList.contains('card--picked')
    ) {
        isPaused = true;
        const picked = cardContainer.querySelector('.card--picked');
        if (picked) {
            if (picked.dataset.id === target.dataset.id) {
                target.classList.remove('card--picked');
                picked.classList.remove('card--picked');
                target.classList.add('card--guessed');
                picked.classList.add('card--guessed');
                isPaused = false;
            } else {
                target.classList.add('card--picked');
                setTimeout(() => {
                    target.classList.remove('card--picked');
                    picked.classList.remove('card--picked');
                    isPaused = false;
                }, 1500);
            }
            console.log('counter', counter);
            counter -= 1;
            available.innerHTML = counter;
            if (counter === 0) {
                lose();
            }
        } else {
            target.classList.add('card--picked');
            isPaused = false;
        }

        // Validate is already win
        const isWin = cardContainer.querySelectorAll('card--guessed').length === currentCards.length;
        if (isWin) {
            win();
        }
    }
}

function drawCards() {
    cardContainer.innerHTML = '';
    available.innerHTML = counter;

    shuffle(currentCards).forEach((el) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-id', el.id);
        card.innerHTML = `
          <div class="card__front">
            <img
              class="front__img"
              src="${el.img}"
              alt="${el.name}"
            />
            <h6 class="card__name">${el.name}</h6>
          </div>
          <div class="card__back">
            <img
              class="back__img"
              src="/Asset/uno_backside.png"
              alt="Thought"
            />
          </div>
        `;
        card.addEventListener('click', handleClick);
        cardContainer.appendChild(card);
    });
}

document.querySelector('#Restart').addEventListener('click', function () {
    modal.classList.remove('modal--open');
    isPaused = false;
    isLose = false;
    counter = CARDS.length + 10;
    drawCards();
});

drawCards();