const router       = require('express').Router();
const { createGame, endGame, setPlayerShips, createCpuCoordinates, setCpuCoorindates, sendPlayersMove, checkSuccess,returnSuccessStatus, getCPUMove }  = require('../api/game_controls')

// @TODO
// check for game in session first?

// create a game
router.get('/start', createGame, (req, res) => {
  res.status(200).json({response: res.game});
})


// update players coordinates
router.put('/setShips', setPlayerShips, createCpuCoordinates, (req, res) => {
  res.status(200).json({response: res.cpuCoordinates})
})

// end game
router.delete('/end', endGame, (req, res) => {
  console.log(res)
  res.status(200).json({response: res.game})
})

// // Accepts coordinates for the player’s next move.
router.post('/missile', sendPlayersMove, getCPUMove, (req, res) =>{
  res.json({response: res.cpuSelectedCoordinate})
})




module.exports = router;
