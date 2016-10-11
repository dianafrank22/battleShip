"use strict"
const BattleShip = require('./battleship');

function createGame(req, res, next){
  if(req.originalUrl === '/api/start'){
    const game = new BattleShip();
    res.game = game
    var sess = req.session
    sess.game = res.game
  }
  next();
}

function endGame(req, res, next){
  if(req.originalUrl === '/api/end'){
    console.log(req.session)
    req.session.destroy(function(err){
      res.game = 'game is over'
      console.log(req.session)
    })
  }
  next();
}


function setPlayerShips(req, res, next){
  if(req.originalUrl=== '/api/setShips'){
    res.playerCoordinates = req.body
  }
  next();
}

function createCpuCoordinates(req, res, next){
  var min = Math.ceil(0)
  var max = Math.floor(4)
  var alphabet = ['A', 'B', 'C', 'D', 'E']
  var coordinates =[]
  for(var i=0; i<11; i){
    var first = Math.floor(Math.random()*(max-min+1))+min;
    var letter = alphabet[first]
    var second =Math.floor(Math.random()*(max-min+1))+min;
    var coordinate = letter+second
    if(coordinates.includes(coordinate)){
      i = i
    }else{
      coordinates.push(coordinate)
      i++
    }
    res.cpuCoordinates = coordinates
  }
  next();
}



function getCPUMove(req, res, next){
  if(req.originalUrl === '/api/missile'){
      var min = Math.ceil(0)
      var max = Math.floor(4)
      var alphabet = ['A', 'B', 'C', 'D', 'E']
      var first = Math.floor(Math.random()*(4-min+1))+min;
      var letter = alphabet[first]
      var second =Math.floor(Math.random()*(max-min+1))+min;
      var coordinate = letter+second
      var previouslySelected = req.body.cpuSelected
    if(previouslySelected.includes(coordinate)){
      getCPUMove(req, res, next);
    }else{
      res.cpuSelectedCoordinate = coordinate

    }
  }
  next();
}



function sendPlayersMove(req, res, next){
  if(req.originalUrl === '/api/missile'){
    res.playersChoice = req.body.selectedCoordinate
  }
  next();
}



module.exports = {createGame, endGame, setPlayerShips, createCpuCoordinates, getCPUMove, sendPlayersMove}
