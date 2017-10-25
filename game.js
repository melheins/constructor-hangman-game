var Word = require('./word.js');
var wordBank = require('./word-bank.js');
const chalk = require('chalk');


function Game() {
    // Create a new word using words from the word bank file
    var newWord = new Word(wordBank.words[Math.floor(Math.random() * wordBank.words.length)]);
    //Call the word.getLetters function to fill the current word's letters array.
    newWord.getLetters();

    // Create and set new game objects parameters
    this.currentWord = newWord;
    this.guessesRemaining = 10;
    this.pastGuesses = [];
    this.status='start';

    console.log(chalk.yellow.bold('\nCurrent Word'));
    console.log(this.currentWord.wordRender());
    console.log(" Guesses remaining: " + this.guessesRemaining+'\n');
}

// Check if player's guess is correct and update word display
Game.prototype.isGuessCorrect = function (playerGuess) {

    // For Testing, display the current word
    //console.log(this.currentWord);

    //Checks if player's guessed letter is in current word and updates letter's display
    var isGuessCorrect = this.currentWord.checkLetter(playerGuess);

    if (isGuessCorrect === 0) {
    // If guess isn't correct (letter not in current word) then lower number of guesses
        console.log(chalk.redBright("\n WRONG!!!"));
        this.guessesRemaining--;
    } else {
        // If guess is correct (letter is in current word at least once) inform the user they were correct
        console.log(chalk.greenBright("\n CORRECT!!!"));
    }
    // Checks if player has guessed the whole word
    this.currentWord.findWord();
    if ((this.guessesRemaining > 0) && (this.currentWord.found === false)) {
        console.log(this.currentWord.wordRender());
        console.log(" Guesses remaining: " + this.guessesRemaining);
        console.log("-------------------");
        this.status='continue';
    }
    else if (this.guessesRemaining === 0) {
        console.log("Game over. Correct Word ", this.currentWord.wordValue);
        this.status='gameOver';
    } else {
        console.log("Congrats!");
        console.log(this.currentWord.wordRender());
        this.status='win';
    }
};


module.exports = Game;