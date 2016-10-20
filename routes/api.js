const router   = require('express').Router();
const game     = require('../api/game_controls')

// @TODO
// check for game in session first?

// create a game
router.get('/start', game.createGame, (req, res) => {
  res.status(200).json({response: res.game});
})


// update players coordinates
router.put('/setShips', game.setPlayerShips, game.createCpuCoordinates, (req, res) => {
  res.status(200).json({response: res.cpuCoordinates})
})

// end game
router.delete('/end', game.endGame, (req, res) => {
  res.json({response: res.game})
})

// // Accepts coordinates for the player’s next move.
router.post('/missile', game.sendPlayersMove, game.getCPUMove, (req, res) =>{
  res.json({response: res.cpuSelectedCoordinate})
})




module.exports = router;
