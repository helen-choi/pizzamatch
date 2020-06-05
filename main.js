var gameCards = document.getElementById('gameCards');
var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses;
var secondCardClasses;
var matches = 0;
var maxMatches = 9;
var attempts = 0;
var gamesPlayed = 0;
var resetButton = document.getElementById("reset");
var modal = document.querySelector(".modal-overlay");
var sound = document.getElementById("sound");
var win = document.getElementById("win");
var newCards = [
  'garlic',
  'mushroom',
  'cheese',
  'bacon',
  'spinach',
  'olive',
  'tomato',
  'onion',
  'peppers',
  'garlic',
  'mushroom',
  'cheese',
  'bacon',
  'spinach',
  'olive',
  'tomato',
  'onion',
  'peppers'
];
var toppingClasses = [
  'topping-garlic',
  'topping-mushroom',
  'topping-cheese',
  'topping-bacon',
  'topping-spinach',
  'topping-olive',
  'topping-tomato',
  'topping-onion',
  'topping-peppers'
]
var accuracyBar = document.querySelector(".score .meter > span");
accuracyBar.textContent = "0%";
var pizza = document.querySelector(".build-pizza");
var cards = document.querySelector('.cards');

createCards();

window.addEventListener('DOMContentLoaded', resetCards);
gameCards.addEventListener('click', handleClick);

function handleClick(event) {
  if(event.target.className.indexOf("card-back") === -1) {
    return;
  }
  event.target.parentElement.classList.add("card-flipped");

  if(!firstCardClicked) {
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.className;

  }else {
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.className;

    gameCards.removeEventListener('click', handleClick);

    if(firstCardClasses === secondCardClasses) {
      gameCards.addEventListener('click', handleClick);

      var soundFlag = true;
      if(soundFlag) {
        sound.pause();
        sound.currentTime = 0;
        sound.play();
        soundFlag = false;
      }

      firstCardClicked.previousElementSibling.style.opacity = "0.7";
      secondCardClicked.previousElementSibling.style.opacity = "0.7";

      pizza.classList.add("pizza-shake");

      var topping = secondCardClasses.substr(11);
      setTimeout(function(){
        switch (topping) {
          case 'mushroom':
            var mushroom = document.querySelector(".topping-mushroom");
            mushroom.classList.remove("hidden");
            break;
          case 'peppers':
            var peppers = document.querySelector(".topping-peppers");
            peppers.classList.remove("hidden");
            break;
          case 'onion':
            var onion = document.querySelector(".topping-onion");
            onion.classList.remove("hidden");
            break;
          case 'tomato':
            var tomato = document.querySelector(".topping-tomato");
            tomato.classList.remove("hidden");
            break;
          case 'spinach':
            var spinach = document.querySelector(".topping-spinach");
            spinach.classList.remove("hidden");
            break;
          case 'garlic':
            var garlic = document.querySelector(".topping-garlic");
            garlic.classList.remove("hidden");
            break;
          case 'olive':
            var olive = document.querySelector(".topping-olive");
            olive.classList.remove("hidden");
            break;
          case 'cheese':
            var cheese = document.querySelector(".topping-cheese");
            cheese.classList.remove("hidden");
            break;
          case 'bacon':
            var bacon = document.querySelector(".topping-bacon");
            bacon.classList.remove("hidden");
            break;
        }
      },500);

      firstCardClicked = null;
      secondCardClicked = null;
      matches++;
      attempts++;

      if(matches === maxMatches) {
        setTimeout(function(){
          modal.classList.remove("hidden");
          var winFlag = true;
          if (winFlag) {
            win.pause();
            win.currentTime = 0;
            win.play();
            winFlag = false;
          }
        }, 1000)
      }
    }else {
      setTimeout(function(){
        firstCardClicked.parentElement.classList.remove("card-flipped");
        secondCardClicked.parentElement.classList.remove("card-flipped");
        firstCardClicked = null;
        secondCardClicked = null;
        gameCards.addEventListener('click', handleClick);
      },1000);
      attempts++;
    }
    displayStats();
  }
}
function displayStats() {
  var gamesPlayedVar = document.getElementById("games-played");
  gamesPlayedVar.textContent = gamesPlayed;

  var attemptsVar = document.getElementById("attempts");
  attemptsVar.textContent = attempts;

  accuracyBar.textContent = calculateAccuracy(attempts, matches);
  accuracyBar.style.width = calculateAccuracy(attempts, matches);

}
function calculateAccuracy(attempts, matches) {
  if(!attempts) {
    return "0%";
  }
  var accuracyPercentage = Math.trunc((matches / attempts) * 100) + "%";
  return accuracyPercentage;
}
function resetGame() {
  attempts = 0;
  matches = 0;
  gamesPlayed++;
  displayStats();
  resetCards();
  modal.classList.add("hidden");
  resetPizza();

}
function resetCards() {
  cards.innerHTML = '';
  shuffleCards();
  createCards();
}
resetButton.addEventListener("click", resetGame);

function shuffleCards() {
  for(var k = 0; k < newCards.length; k++) {
    var random = Math.floor(Math.random() * newCards.length);
    var placeHolder = newCards[k];
    newCards[k] = newCards[random];
    newCards[random] = placeHolder;
  }
}

function createCards() {
  for (var i = 0; i < newCards.length; i++) {
    var column = document.createElement("div");
    column.classList.add("column", "col-2");

    var card = document.createElement("div");
    card.className = "card";

    var cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.classList.add(newCards[i]);
    card.appendChild(cardFront);

    var cardBack = document.createElement("div");
    cardBack.className = "card-back";

    card.appendChild(cardBack);
    column.appendChild(card);
    cards.appendChild(column);
  }
}
function resetPizza() {
  for(var j = 0; j < toppingClasses.length; j++) {
    document.querySelector("."+ toppingClasses[j]).classList.add("hidden");
  }
}
