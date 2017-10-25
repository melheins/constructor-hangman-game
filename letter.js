var letter = function(letterValue){
    this.character = letterValue;
    this.display = false;
    this.letterRender = function(){
        return !(this.display) ? "_" : this.character;
    };
};

//export the constructor
module.exports = letter;