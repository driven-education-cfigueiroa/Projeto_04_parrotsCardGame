const minCards = 4, maxCards = 14, finished = [], parrots = ['bobross', 'explody', 'fiesta', 'metal', 'revertit', 'triplets', 'unicorn'];
let pairs, clicks = 0, temp = [], tempcard = [];
let flagged = false;

function main() {
    distributeCards();
    clickWatcher();
}

function clickWatcher() {
    const card = document.querySelectorAll(".card");
    for (const element of card) {
        element.addEventListener('click', function () {
            onClick(element);
        });
    }
}

function turn(card) {
    card.children[1].classList.toggle("back-face");
}

function turn2(card) {
    card[0].children[1].classList.toggle("back-face");
}

function timeout(ele, tempc) {
    const second = 1000;
    flagged = true;
    setTimeout(function () {
        turn(ele);
        turn2(tempc);
        flagged = false;
    }, second);
}

function onClick(el) {
    if (flagged) {
        return;
    }
    const currentCardType = el.children[0].children[0].alt;
    if (finished.includes(currentCardType)) {
        return;
    } else if (temp.length === 0) {
        temp.push(currentCardType);
        turn(el);
        tempcard.push(el);
        clicks++;
    } else if (currentCardType !== temp[0]) {
        turn(el);
        timeout(el, tempcard);
        tempcard = [];
        temp = [];
        clicks++;
    } else if (currentCardType === temp[0] && (el !== tempcard[0])) {
        turn(el);
        finished.push(currentCardType);
        tempcard = [];
        temp = [];
        clicks++;
    }
    const transitionLength = 500;
    if (pairs === finished.length) {
        setTimeout(function () {
            alert(`Você ganhou em ${clicks} jogadas!`);
        }, transitionLength);
    }
}

function distributeCards() {
    const pair = 2;
    const input = getValidInput(minCards, maxCards);
    pairs = input / pair;
    const cards = document.querySelector(".cards");
    const randomizeCards = getRandom(parrots, pairs);
    const makePairs = randomizeCards.flatMap(i => [i, i]);
    const randomizePairs = getRandom(makePairs, input);
    for (const element of randomizePairs) {
        cards.innerHTML += `<div class="card">
            <div class="front-face face">
              <img src="./img/${element}parrot.gif" alt="${element}" />
            </div>
            <div class="face">
              <img src="./img/back.png" alt="back" />
            </div>
          </div>`;
    }
}

function getValidInput(min, max) {
    let isNum, input, inputNum;
    do {
        input = prompt("Com quantas cartas quer jogar, caro usuário?");
        isNum = /^\d+$/.test(input);
        inputNum = Number(input);
    } while (!isNum || !isEven(inputNum) || inputNum < min || inputNum > max);
    return inputNum;
}

function isEven(num) {
    const even = 2;
    return num % even === 0;
}

function getRandom(arr, n) {
    let len = arr.length;
    const result = new Array(n), taken = new Array(len);
    if (n > len) {
        throw new RangeError("getRandom: more elements taken than available");
    }
    while (n > 0) {
        n--;
        const x = Math.floor(Math.random() * len);
        let y;
        if (x in taken) {
            y = taken[x];
        } else {
            y = x;
        }
        result[n] = arr[y];
        let z;
        len--;
        if (taken.includes(len)) {
            z = taken[len];
        } else {
            z = len;
        }
        taken[x] = z;
    }
    return result;
}

main();
