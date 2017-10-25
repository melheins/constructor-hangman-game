var letter = function(lets){
    this.charac = lets;
    this.appear = false;
    this.letterRender = function(){
        return !(this.appear) ? "_" : this.charac;
    };
};

//export the constructor
module.exports = letter;