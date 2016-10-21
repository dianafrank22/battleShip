const BattleShip = require('./battleship');
const cpuBoard = new BattleShip();
const playerBoard = new BattleShip();

function createGame(req, res, next){
  if(req.originalUrl === '/api/start'){
    cpuBoard.createBoard();
    playerBoard.createBoard();
    res.game = cpuBoard
  }
  next();
}

function endGame(req, res, next){
  if(req.originalUrl === '/api/end'){
    req.session.destroy(function(err){
      res.game = 'game is over'
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



function createCpuCoordinates(req, res){
  var possiblePieces = cpuBoard.board;
  var coordinates = []
  while (coordinates.length < 11){
    coordinates.push(cpuBoard.remove(Math.floor(Math.random()*(possiblePieces.length+1))))
  }
  res.cpuCoordinates
}

function getCPUMove(req, res, next){
  if(req.originalUrl === '/api/missile'){
    var possiblePieces = playerBoard.board
    res.cpuSelectedCoordinate = playerBoard.remove(Math.floor(Math.random()*(possiblePieces.length+1)))
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
