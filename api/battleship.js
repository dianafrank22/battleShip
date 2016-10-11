"use strict"
class BattleShip{
  constructor(){
    this.cpuBoard = [];
    this.playerBoard = [];
    this.cpuCoordinates = [];
    this.playerCoordinates = [];
    this.playerSelections=[];
    this.cpuSelections =[];
    this.createBoards();
  }

  createBoards(){
    var alphabet = ['A', 'B', 'C', 'D', 'E']
    for(var i = 0; i<5; i++){
      this.cpuBoard.push([]);
      this.playerBoard.push([]);
      for(var j =0; j<5; j++){
        var letter = alphabet[i]
        var coordinate = letter+j
        this.cpuBoard[i].push(coordinate);
        this.playerBoard[i].push(coordinate)
      }
    }
  }

}

module.exports = BattleShip
