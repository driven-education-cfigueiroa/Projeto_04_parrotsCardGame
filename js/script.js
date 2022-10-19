const minCards = 4;
const maxCards = 14;
const parrots = ['bobross', 'explody', 'fiesta', 'metal', 'revertit', 'triplets', 'unicorn'];

function main() {
    const input = getValidInput(minCards, maxCards);
    const pair = 2;
    const cards = document.querySelector(".cards");
    let sorteio = getRandom(parrots, input / pair);
    for (let i = 0; i < pair; i++) {
        for (const element of sorteio) {
            cards.innerHTML += `<div class="card">
            <div class="front-face face">
              <img src="./img/back.png" alt="back - ou seria front?" />
            </div>
            <div class="back-face face">
              <img src="./img/${element}parrot.gif" alt="${element}" />
            </div>
          </div>`;
        }
        if (i === 0) {
            sorteio = getRandom(sorteio, sorteio.length);
        }
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
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

main();

