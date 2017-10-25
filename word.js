var letter = require('./letter.js');

function Word(newWord) {
    this.wordValue = newWord;
    this.letters = [];
    this.found = false;

    // Creates an array of all the letters in the word and puts them in the word objects letters array
    this.getLetters = function() {
        for (var i=0; i < this.wordValue.length; i++) {
            this.letters.push( new letter(this.wordValue[i]));
        }
    };

    // Checks if the player has guessed the whole word and updates the word objects found parameter
    this.findWord = function() {
        this.found = this.letters.every(function(currLetter) {
            return currLetter.display;
        });
        return this.found;
    };
    // Checks how many times the guessed letter is in the current word
    this.checkLetter = function(guessedLetter) {
        var numTimes = 0;

        for (var i = 0; i < this.letters.length; i++) {
            if (this.letters[i].character === guessedLetter){
                this.letters[i].display = true;
                numTimes++;
            }
        }
        return numTimes;
    };
    // Creates a string of the current word based on each letters display parameter. Putting _ if the letter hasn't been guessed.
    this.wordRender = function() {
        var string = '\n';
        for (var i=0; i < this.letters.length; i++){
            string+=' ';
            string += this.letters[i].letterRender();
        }
        string+='\n';
        return string;
    };

}

module.exports = Word;