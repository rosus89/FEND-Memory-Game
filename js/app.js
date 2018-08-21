//TODO: Refactoring 
//TODO: Refactor Star system and add to Modal
// Create a list that holds all of your cards

let cards = [...document.getElementsByClassName("card")];

// Selectors

let deck = document.querySelector(".deck");
let movesDOM = document.querySelector(".moves");
let starsDOM = document.querySelectorAll("#stars li i");
let starsParentDOM = document.querySelector("#stars");
let starsModalDOM = document.querySelector(".modal-stars")
let timerDOM = document.querySelector(".timer");
let modalDOM = document.querySelector(".modal");
let finalTimeDOM = document.querySelector(".final-time")
// Declarations

let moves = "";
let completed = 0;
var openCards = [];
let second, minute; 
var timerStarted = false;
let timerCycle;
// Starts App

document.body.onload = reset();

// Resets App

function reset() {
    completed = moves =  second = minute = 0;
    openCards = [];

    cards = shuffle(cards);
    clearInterval(timerCycle);
    timerStarted = false;

    movesDOM.textContent = "Match pairs";
    timerDOM.innerHTML = minute + " : " + second;
    modalDOM.style.display = "none";

    for (card of cards) {
        card.classList.remove("match", "open", "show");
        card.style.opacity = "1";
        deck.appendChild(card);
    };

    for (star of starsDOM)
    {
        star.className = "fa fa-star";
    }
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// Listen to Events and filter 

 deck.addEventListener('click', function () {
     // excludes events that are not (clicking on deck or icon) and excludes cards that have been already matched
     if (event.toElement.nodeName == "LI" && event.toElement.classList[3] != "match")
      {
          // stops the cards showing after 2 cards have been put into array
       selected = event.toElement;
       if (openCards.length < 2)
       {
         turnCard();
       }
       compare(selected);
     }
 });

function turnCard() {
    selected.classList.add("open", "show");
    startTimer();
}

// Pushes cards into array and checks if cards are the same.

 function compare (selected) {
     openCards.push(selected);
     if (openCards.length == 2)
     {
       //Avoid double click on same card
        if (openCards[0] === openCards[1]) {
            openCards.splice(1, 1);
        }

        else if (openCards[0].innerHTML === openCards[1].innerHTML)
         {
             
            matched();
            counter();
            completion();
        }
         else 
         {
            counter();
            notMatched();
             
    }

 }
 }

function notMatched() {
    setTimeout(function () {
        hideCards()}, 1000); 
}

 function hideCards() {
     for (openCard of openCards) {
         openCard.classList.remove("open", "show");
     }
     openCards = [];
 }

 function matched(){
     for (openCard of openCards)
     {
        openCard.style.opacity = 0;
        openCard.style.transition = "opacity 1s";
        openCard.classList.add("match");
     }
     openCards=[];  
 }

 function counter(){
     moves++;
     stars();
     let stringMoves = "moves";
     if (moves === 1)
     {
         stringMoves = "move";
     }
     movesDOM.textContent = moves + " " + stringMoves;
 }

 function completion(){
 completed++;
 if (completed == 8)
 {

     endGame();
     
 }
}

 // Change star type
 function stars(){
    let  emptyStar = "fa fa-star-o"
    if (moves > 15)
    {
        starsDOM[2].className = emptyStar;
    }
    if (moves > 17)
    {
        starsDOM[1].className = emptyStar;
    }
    if (moves > 20)
    {
        starsDOM[0].className = emptyStar;
    }
 }
 // counts seconds and modifies movesDOM



 function timer(){
   timerCycle = setInterval(function(){
          second ++;    
          if (second == 60)
          {
              minute++
          }
        second = second % 60;
        if (minute < 1){
            timerDOM.innerHTML = second + "s";
        }
        else {
            timerDOM.innerHTML = minute + " : " + second;
        }
         },1000)
 }

// Starts Timer and stops it from starting again
var startTimer = (function () {
    return function () {
        if (timerStarted == false) {
            timerStarted = true;
            timer();
        }
    };
})();

function endGame(){

    clearInterval(timerCycle);

    // Propper Grammar
    // minute / minutes
    let stringMinute = "minutes";
    if (minute === 1){
        stringMinute = "minute";
    }

    // second / seconds
    let stringSecond = "seconds";
    if (second === 1){
        stringSecond = "second"
    }

    // no zero values displayed 
    if (minute > 0 && second != 0)
    {
        finalTimeDOM.innerHTML = `${minute} ${stringMinute} ${second} ${stringSecond} and ${moves} moves`;
    }
    else if (minute > 0){
        finalTimeDOM.innerHTML = `${minute} ${stringMinute} and ${moves} moves`;
    }
    else {
        finalTimeDOM.innerHTML = `${second} ${stringSecond} and ${moves} moves`;
    }
    modalDOM.style.display = "block";

starsModalDOM.innerHTML = starsParentDOM.innerHTML;
}
