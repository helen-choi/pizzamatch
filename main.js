var gameCards = document.getElementById('gameCards');
var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses;
var secondCardClasses;
var matches = 0;
var maxMatches = 9;
var attempts = 0;
var gamesPlayed = 0;

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
        var modal = document.querySelector(".modal-overlay");
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
  // var gamesPlayedVar = document.getElementById("games-played");
  // gamesPlayedVar.textContent = gamesPlayed;

  var attemptsVar = document.getElementById("attempts");
  attemptsVar.textContent = attempts;

  var accuracyVar = document.getElementById("accuracy");
  accuracyVar.textContent = calculateAccuracy(attempts, matches);
}
function calculateAccuracy(attempts, matches) {
  return Math.trunc((matches / attempts) * 100) + "%";
}
