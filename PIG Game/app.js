/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores,roundScores,activePlayer,gameIsEnded;
init();




function btnRoll() {
    if (!gameIsEnded) {
        var dice = Math.floor(Math.random()*6 +1);
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display= 'block';
        diceDOM.src = 'dice-' + dice + '.png';  
        if (dice !== 1) {
            document.querySelector('#current-'+activePlayer).textContent = +document.querySelector('#current-'+activePlayer).textContent +  dice; 
        } else {
            nextPlayer();
        }
    }
}

document.querySelector('.btn-roll').addEventListener('click', btnRoll );

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (!gameIsEnded) {
        document.querySelector('#score-' + activePlayer).textContent = +document.querySelector('#score-' + activePlayer).textContent + +document.querySelector('#current-' + activePlayer).textContent;
        document.querySelector('#current-' + activePlayer).textContent = 0;
        if ( +document.querySelector('#score-' + activePlayer).textContent >= 20) {
            document.querySelector('#name-'+ activePlayer).textContent = 'WINNER';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gameIsEnded = true;
        } else {
            nextPlayer();
        }
    }
} )


document.querySelector('.btn-new').addEventListener('click',init);


function init() {
    activePlayer = 0;
    gameIsEnded = false;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
}

function nextPlayer() {
    document.querySelector('#current-'+activePlayer).textContent = 0; 
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer +=1;
    activePlayer %=2;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none';
}


