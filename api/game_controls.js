const BattleShip = require('./Battleship');

function createGame(req, res, next){
  if(req.originalUrl === '/api/start'){
    const game = new BattleShip();
    console.log(game)
    res.game = game
    req.session['game'] = res.game
    req.session.save(function(err){
      console.log('session saved');
      console.log("Session Before Redirect: ", req.session);
    })
  }
  next();
}

function endGame(req, res, next){
  if(req.originalUrl === '/api/end'){
    req.session.destroy(function(err){
      res.game = 'game is over'
      console.log(req.session)
    })
  }
  next();
}


function setPlayerShips(req, res, next){
  console.log(req)
  console.log(req.session)
  console.log(req.session.game)
  if(req.originalUrl=== '/api/setShips'){
      res.playerCoordinates = req.body
      req.session.game.BattleShip.playerCoordinates = res.playerCoordinates
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
  res.cpuCoordinates = coordinates
  req.session.game.cpuCoordinates = res.cpuCoordinates
  next();
}

function getCPUMove(req, res, next){
  // @TODO make sure its not in req.session.game.cpuSelections
  if(req.originalUrl === '/api/missile'){
    var min = Math.ceil(0)
    var max = Math.floor(4)
    var alphabet = ['A', 'B', 'C', 'D', 'E']
    var first = Math.floor(Math.random()*(4-min+1))+min;
    var letter = alphabet[first]
    var second =Math.floor(Math.random()*(max-min+1))+min;
    var coordinate = letter+second
    res.cpuSelectedCoordinate = coordinate
    var cpuSelections = req.session.game.cpuSelections
    cpuSelections.push(res.cpuSelectedCoordinate)
    console.log(cpuSelections)
    req.session.game.cpuSelections = cpuSelections
  }

  next();
}

function sendPlayersMove(req, res, next){
  if(req.originalUrl === '/api/missile'){
    res.playersChoice = req.body
    var playerSelections = req.session.game.playerSelections
    playerSelections.push(res.playersChoice)
    console.log(playerSelections)
    req.session.game.playerSelections = playerSelections
  }
  next();
}



module.exports = {createGame, endGame, setPlayerShips, createCpuCoordinates, getCPUMove, sendPlayersMove}
