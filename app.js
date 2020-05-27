//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessLeft = 3;

//UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

      
//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;  

//Play again
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
       window.location.reload();
    }
})

//Listen for guess 
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    //Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //Check if won
    if(guess === winningNum){
       gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
        //Wrong number 
        guessLeft -= 1;
        if(guessLeft === 0){
            gameOver(false, `Game over, You lost. The correct number was ${winningNum}`);
        } else {
            //Game continues - answer wrong
            //Change border color 
            guessInput.style.borderColor = 'red';
            //Clear input
            guessInput.value = '';
            //Tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessLeft}  guesses left`, 'red')

        }
    }
});

//Game over
function gameOver(won, msg){
    let color;
    won = true ? color = 'green' : color = 'red';
    //Disable input
    guessInput.disabled = true;
    //Change border color 
    guessInput.style.borderColor = color;
    message.style.color = color;
    //Set message
    setMessage(msg);

    //Play again
    guessBtn.value = 'Play again';
    //Add class
    guessBtn.className += 'play-again';
}

//Get Random Num
function getRandomNum(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
};
