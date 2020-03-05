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
var accuracyVar = document.getElementById("accuracy");
accuracyVar.textContent = "0%";
var newCards = ['js-logo', 'css-logo', 'docker-logo', 'gitHub-logo', 'html-logo', 'mysql-logo', 'node-logo', 'php-logo', 'react-logo', 'js-logo', 'css-logo', 'docker-logo', 'gitHub-logo', 'html-logo', 'mysql-logo', 'node-logo', 'php-logo', 'react-logo'];
var oldCards = document.querySelectorAll(".card-front")

window.addEventListener('load', shuffleCards);
gameCards.addEventListener('click', handleClick);

function handleClick(event) {
  if(event.target.className.indexOf("card-back") === -1) {
    return;
  }
  event.target.classList.add("hidden");

  if(!firstCardClicked) {
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  }else {
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.className;

    gameCards.removeEventListener('click', handleClick);

    if(firstCardClasses === secondCardClasses) {
      gameCards.addEventListener('click', handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      matches++;
      attempts++;
      if(matches === maxMatches) {
        modal.classList.remove("hidden");
      }
    }else {
      setTimeout(function(){
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        firstCardClicked = null;
        secondCardClicked = null;
        gameCards.addEventListener('click', handleClick);
      },1500);
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

  var accuracyVar = document.getElementById("accuracy");
  accuracyVar.textContent = calculateAccuracy(attempts, matches);
}
function calculateAccuracy(attempts, matches) {
  if(!attempts) {
    return "0%";
  }
  return Math.trunc((matches / attempts) * 100) + "%";
}
function resetGame() {
  attempts = 0;
  matches = 0;
  gamesPlayed++;
  displayStats();
  resetCards();
  modal.classList.add("hidden");
  shuffleCards();
}
function resetCards() {
  var hiddenCards = document.querySelectorAll(".card-back");
  for(var i = 0; i < hiddenCards.length; i++) {
    hiddenCards[i].classList.remove("hidden");
  }
}
resetButton.addEventListener("click", resetGame);


function shuffleCards() {
  for(var i = 0; i < newCards.length; i++) {
    var random = Math.floor(Math.random()* newCards.length);
    var placeHolder = newCards[i];
    newCards[i] = newCards[random];
    newCards[random] = placeHolder;
  }

  for (var j = 0; j < oldCards.length; j++) {
    oldCards[j].className = newCards[j];
    oldCards[j].className += " card-front";
  }
  return oldCards;
}
