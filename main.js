var Word = require('./word.js');
var wordBank = require('./word-bank.js');
var inquirer = require("inquirer");


var currentGame;
var currentPlayer;

function Player() {
    this.name = '';
    this.wins = 0;
    this.numOfGames = 0;
}

function Game(newWord) {
    this.guessesRemaining = 10;
    this.currentWord = newWord;
    this.pastGuesses = [];
}

Game.prototype.promptUser = function (newGame) {

    inquirer.prompt([
        {
            name: "guess",
            message: "Guess a letter: "
        }
    ]).then(function (answers) {

        var playerGuess = answers.guess;

        console.log("You guessed: " + playerGuess);

        // For Testing, display the current word
        // console.log(currentGame.currentWord.target);

        var isGuessCorrect = currentGame.currentWord.checkLetter(playerGuess);

        if (isGuessCorrect === 0) {
            console.log("WRONG");
            currentGame.guessesRemaining--;

        } else {
            console.log("CORRECT");
            if (currentGame.currentWord.findWord()) {
                console.log("You won!");
                console.log("-------------------");
            }
        }

        console.log("Guesses remaining: " + currentGame.guessesRemaining);
        console.log("-------------------");
        if ((currentGame.guessesRemaining > 0) && (currentGame.currentWord.found === false)) {
            console.log(currentGame.currentWord.wordRender());
            currentGame.promptUser();
        }
        else if (this.guessesRemaining === 0) {
            console.log("Game over. Correct Word ", currentGame.currentWord.target);
        } else {
            console.log("Congrats!");
            console.log(currentGame.currentWord.wordRender());
            currentPlayer.wins++;
            console.log("Your Wins:" + currentPlayer.wins)
        }

    });

};


var createGame = function () {

    // Create a new word using words from the word bank file
    var newWord = new Word(wordBank.words[Math.floor(Math.random() * wordBank.words.length)]);

    //Call the word.getLetters function to fill the current word's letters array.
    newWord.getLetters();

    // Create a new game using the current word
    currentGame = new Game(newWord);

    // Ask the user to guess letters for the current word
    currentGame.promptUser();

};

var createPlayer = function () {

    currentPlayer = new Player();
    createGame();
};

console.log("Welcome to Hangman!");
console.log("-----------------------------");
createPlayer();