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
  console.log('in set ships')
  console.log(req.body)
  // // parse coordinates here, push into array
  if(req.originalUrl=== '/api/setShips'){
      res.playerCoordinates = req.body
  //     // update object ?
  }
  next();
}

function createCpuCoordinates(req, res, next){
  console.log(req.body)
  console.log(req.originalUrl)
  var min = Math.ceil(0)
  var max = Math.floor(5)
  var alphabet = ['A', 'B', 'C', 'D', 'E']
  var coordinates =[]
  for(var i=0; i<11; i++){
    var first = Math.floor(Math.random()*(4-min+1))+min;
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
  if(req.originalUrl === '/api/getCpuMove'){
    var min = Math.ceil(0)
    var max = Math.floor(5)
    var alphabet = ['A', 'B', 'C', 'D', 'E']
    var first = Math.floor(Math.random()*(4-min+1))+min;
    var letter = alphabet[first]
    var second =Math.floor(Math.random()*(max-min+1))+min;
    var coordinate = letter+second
    res.cpuSelection = coordinate
  }
  next();
}


// function setCpuCoorindates(req, res, next){
//   if(req.query.setCpuShips === 'true'){
//     res.cpuCoordinates = req.query.coordinates
//     // update object, make sure this stays hidden
//   }
//   next();
// }

module.exports = {createGame, endGame, setPlayerShips, createCpuCoordinates, getCPUMove}
