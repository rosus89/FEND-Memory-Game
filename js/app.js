//TODO: Refactoring 
//TODO: replace deck content with score when game finishes
//TODO: Add Slider to adjust waitTime .5s - 2s;

// Create a list that holds all of your cards

let cards = [...document.getElementsByClassName("card")];

// Selectors

let deck = document.querySelector(".deck");
let movesDOM = document.querySelector(".moves");

// Declarations

let moves = "";
let completed = 0;
var openCards = [];
let waitTime = 1000;

// Starts App

document.body.onload = reset();

// Resets App

function reset() {
    deck.innerHTML= '';
    completed = 0;
    moves = 0;
    cards = shuffle(cards);
    movesDOM.textContent = moves;
    for (card of cards) {
        card.classList.remove("match", "open", "show");
        card.style.opacity = "1";
        deck.appendChild(card);
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
     if (event.toElement.nodeName == "LI" && event.toElement.classList[3] != "match")
      {
       selected = event.toElement
       if (openCards.length < 2)
       {
         turnCard();
       }
       compare(selected);
     }
 });

//

 function compare (selected) {


     openCards.push(selected);
     if (openCards.length == 2)
    {
        
       
        if (openCards[0] == openCards[1]) {
            openCards.splice(1, 1);
            
        }
        else if (openCards[0].children[0].className === openCards[1].children[0].className ) 
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
        openCard.classList.add("match");
     }
     openCards=[];  
 }

 function counter(){
     moves++;
     movesDOM.textContent = moves;
 }

 function completion(){
 completed++;
 if (completed == 8)
 {
     console.log("game finished");
     deck.innerHTML= '<div>Congratulations</div>';
     
 }
// TODO: Stars

 }
