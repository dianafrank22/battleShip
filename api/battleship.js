"use strict"
class BattleShip{
  constructor(){
    this.board = [];
  }
}
BattleShip.prototype.createBoard = function(){
    var alphabet = ['A', 'B', 'C', 'D', 'E']
    var board = []
    for(var i = 0; i<5; i++){
      for(var j =0; j<5; j++){
        var letter = alphabet[i]
        var coordinate = letter+j
        board.push(coordinate)
      }
      this.board = board
    }
  }

BattleShip.prototype.remove = function(index){
  var array = this.board
  var coordinate =  array.splice(index, 1);
  this.board = array
  return coordinate
}

module.exports = BattleShip
