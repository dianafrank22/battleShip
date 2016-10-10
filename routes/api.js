const router       = require('express').Router();
const {createGame,
      endGame,
      setPlayerShips,
      createCpuCoordinates,
      setCpuCoorindates,
      sendPlayersMove,
      checkSuccess,
      returnSuccessStatus,
      getCPUMove}  = require('../api/game_controls')

// check for game in session first?

// create a game
router.get('/start', createGame, (req, res) => {
  res.json({response: res.game});
})


// update players coordinates
router.put('/setShips', setPlayerShips, createCpuCoordinates, (req, res) => {
  res.json({response: res.cpuCoordinates})
  // set up coordinates, players div should be updated with divs
})
//
//
//
//
// // end game
router.delete('/', endGame, (req, res) => {
  res.json({response: res.game})
})
//
//
// // Accepts coordinates for the player’s next move.
//
// router.post('/', sendPlayersMove, checkSuccess, (req, res) =>{
//   res.json({response: res.success})
// })
//
//
// // // Returns the coordinates for the CPU’s next move.//
  router.get('/getCpuMove', getCPUMove,(req, res) =>{
    res.json({response: res.cpuSelection})
  })

  // router.get('/createCpuCoordinates', createCpuCoordinates, (req, res) => {
  //   res.json({response: res.cpuCoordinates});
  // })



module.exports = router;
