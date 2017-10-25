var Game = require('./game.js');
var inquirer = require("inquirer");
const chalk = require('chalk');


var currentGame;
var currentPlayer;

function Player() {
    this.name = '';
    this.wins = 0;
    this.numOfGames = 0;
}

var createGame = function () {
    // Create a new game using the current word
    currentGame = new Game();

    // Ask the user to guess letters for the current word
    promptPlayerGuess();
};

var createPlayer = function () {
    currentPlayer = new Player();
    createGame();
};

var promptPlayerGuess = function () {
    inquirer.prompt([
        {
            name: "guess",
            message: "Guess a letter: "
        }
    ]).then(function (answers) {
        //console.log("You guessed: " + answers.guess);
        // Check if player guess is correct and see if they need to keep guessing
        var continueGuessing = currentGame.isGuessCorrect(answers.guess);
        // If player can keep guessing, call prompt for player guess again.
        if (continueGuessing) {
            promptPlayerGuess()
        }
    });
};

console.log("\n Welcome to Hangman!");
console.log("-----------------------------");
createPlayer();