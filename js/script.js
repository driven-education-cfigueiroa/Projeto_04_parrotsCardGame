const minCards = 4, maxCards = 14, parrots = ['bobross', 'explody', 'fiesta', 'metal', 'revertit', 'triplets', 'unicorn'];
let pairs, startTimer, clicks = 0, timerValue = 0; temp = [], tempcard = [], finished = [], flagged = false;

function main() {
    distributeCards();
    startTimer = setInterval(timer, 1000);
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

function turnArr(card) {
    card[0].children[1].classList.toggle("back-face");
}

function timeout(ele, tempc) {
    const second = 1000;
    flagged = true;
    setTimeout(function () {
        turn(ele);
        turnArr(tempc);
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
        return;
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
        clearInterval(startTimer);
        setTimeout(function () {
            alert(`Você ganhou em ${clicks} jogadas em ${timerValue} segundos!`);
            newGame();
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
        input = prompt("Com quantas cartas quer jogar?\n1. Deve ser número par;\n2. Maior ou igual a 4;\n3. Menor ou igual a 14.");
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
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len) {
        throw new RangeError("getRandom: more elements taken than available");
    }
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function resetGame() {
    pairs = undefined, startTimer = undefined, clicks = 0, timerValue = 0; temp = [], tempcard = [], finished = [], flagged = false;
    const timer = document.querySelector(".timer");
    const cards = document.querySelector(".cards");
    timer.innerText = '';
    cards.innerHTML = '';
}

function timer() {
    const timer = document.querySelector(".timer");
    timerValue++;
    timer.innerText = timerValue;
}

function newGame() {
    let input
    do {
        input = prompt("gostaria de reiniciar a partida?\ndigite 'sim' ou 'não'");
    } while (input !== "sim" && input !== "não");
    if (input === "não") {
        return;
    }
    resetGame();
    setTimeout(main, 1000);
}

setTimeout(main, 500);

