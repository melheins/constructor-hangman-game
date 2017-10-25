var Game = require('./game.js');
var inquirer = require("inquirer");
const chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');


var currentGame;
var currentPlayer;

function Player() {
    this.name = '';
    this.wins = 0;
    this.losses = 0;
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
    promptPlayerGame();
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
        currentGame.isGuessCorrect(answers.guess);
        // If player can keep guessing, call prompt for player guess again.
        if (currentGame.status === 'continue') {
            promptPlayerGuess()
        }
        else if (currentGame.status === 'win') {
            currentPlayer.wins++;
            currentPlayer.numOfGames++;
            promptPlayerGame();
        }
        else if (currentGame.status === 'gameOver') {
            currentPlayer.numOfGames++;
            currentPlayer.losses++;
            promptPlayerGame();
        }
    });
};

var promptPlayerGame = function () {
    inquirer.prompt([
        {
            type: 'confirm',
            name: "play",
            message: " Do you want to play a game?"
        }
    ]).then(function (answers) {

       // console.log(answers);
        if (answers.play === true) {
            createGame();
        }
        else {
            console.log(chalk.yellow.bold("\nOh Boo, another time then."))
        }
    });
};

clear();
console.log(chalk.red.bold("\n Welcome to Halloween\n"));
console.log(chalk.grey(figlet.textSync('Hangman!', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default'
})));
console.log('\n');
//console.log("-----------------------------");
createPlayer();