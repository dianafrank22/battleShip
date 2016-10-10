const BattleShip = require('./Battleship');

function createGame(req, res, next){
  if(req.originalUrl === '/api/start'){
    const game = new BattleShip();
    res.game = game
    req.session.game = res.game
  }
  next();
}

// function createBoards(req, res, next){
//
// }

function endGame(req, res, next){
  if(req.originalUrl === '/api/end'){
    res.session.destroy(function(err){
      res.game = 'game is over'
    })
    // delete game from session here
  }
  next();
}

// @TODO
function setPlayerShips(req, res, next){
  if(req.originalUrl=== '/api/setShips'){
      res.playerCoordinates = req.body
  //     // update session object here ?
  }
  next();
}

function createCpuCoordinates(req, res, next){
  var min = Math.ceil(0)
  var max = Math.floor(4)
  var alphabet = ['A', 'B', 'C', 'D', 'E']
  var coordinates =[]
  for(var i=0; i<11; i++){
    var first = Math.floor(Math.random()*(max-min+1))+min;
    var letter = alphabet[first]
    var second =Math.floor(Math.random()*(max-min+1))+min;
    var coordinate = letter+second
    coordinates.push(coordinate)
  }
  req.session.cpuCoordinates = coordinates
  res.cpuCoordinates = coordinates
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
    res.cpuSelectedCoordinate = coordinate
  }
  next();
}

function sendPlayersMove(req, res, next){
  if(req.originalUrl === '/api/missile'){
    //update session object here
    res.playersChoice = req.body
  }
  next();
}



module.exports = {createGame, endGame, setPlayerShips, createCpuCoordinates, getCPUMove, sendPlayersMove}
