//TODO: Refactoring 
//TODO: replace deck content with score when game finishes
//TODO: Add Slider to adjust waitTime .5s - 2s;
const t0 = performance.now();

// Create a list that holds all of your cards

let cards = [...document.getElementsByClassName("card")];

// Selectors

let deck = document.querySelector(".deck");
let movesDOM = document.querySelector(".moves");
let starsDOM = document.querySelectorAll(".stars li i");
timerDOM = document.querySelector(".timer");
// Declarations

let moves = "";
let completed = 0;
var openCards = [];
let waitTime = 1000;
let second, minute; 
var timerStarted = false;
let step

// Starts App

document.body.onload = reset();

// Resets App

function reset() {
    deck.innerHTML= '';
    completed = 0;
    moves = 0;
    cards = shuffle(cards);
    movesDOM.textContent = moves;
    second = 0;
    minute = 0;
    timerDOM.innerHTML = minute + " : " + second;
    clearInterval(step);
    timerStarted = false;
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
       selected = event.toElement
       if (openCards.length < 2)
       {
         turnCard();
       }
       compare(selected);
     }
 });

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
             counter()
             setTimeout(function () { notMatched(); }, waitTime);
             
    }

 }
 }
 function turnCard (){
     selected.classList.add("open", "show");
   
       startTimer();

 }

 function notMatched() {

     for (openCard of openCards)
     {
          openCard.classList.remove("open", "show");
    }
         openCards= [];
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
     movesDOM.textContent = moves;
 }

 function completion(){
 completed++;
 if (completed == 8)
 {

     deck.innerHTML= '<div>Congratulations</div>';
     
 }
}
 // Change star type
 function stars(){
     let  emptyStar = "fa fa-star-o"
    if (moves > 13)
    {
        starsDOM[2].className = emptyStar;
 
    }
    if (moves > 16)
    {
        starsDOM[1].className = emptyStar;
    }
    if (moves > 19)
    {
        starsDOM[0].className = emptyStar;
    }
 }
 // counts seconds and modifies movesDOM



 function timer(){
   step = setInterval(function(){
          second ++;    
          if (second == 60)
          {
              minute++
          }
        second = second % 60;
        timerDOM.innerHTML = minute + " : " + second;

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

const t1 = performance.now();
console.log("Code took " + (t1 - t0) + " milliseconds.");