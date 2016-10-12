import React, { PropTypes, Component } from 'react';
import InputBox from './InputBox'
import CPUBoard from './CPUBoard'
import {removeClass, addClass, submitPlayerCoordinate} from '../GameActions'

export default class PlayerBoard extends React.Component {
  constructor(props){
    super();
    this.state ={
      playerCoordinates: [],
      cpuCoordinates: [],
      status: 'waiting_for_coordinates',
      shipsLeft: 10,
      message: ""
    }
  }

  chooseCoordinates(space, e){
    var playerCoordinates = this.state.playerCoordinates
    var index = playerCoordinates.indexOf(space)
    var id = e.target.id
    var className = 'playerSelected'
    if(this.state.status === "waiting_for_coordinates"){
      if(index > -1){
        dispatch(removeClass(id, className))
        playerCoordinates.splice(index, 1)
        this.updateShipsLeft(1)
      }else {
        if(playerCoordinates.length < 10){
          playerCoordinates.push(space)
          this.setState({
            playerCoordinates: playerCoordinates
          })
          dispatch(addClass(id, className))
          this.updateShipsLeft(-1)
        }else{
          this.setState({
            status: 'waiting_for_send_coordinates'
          })
        }
      }
    }else if(this.state.status ==="waiting_for_send_coordinates"){
      if(index > -1){
        playerCoordinates.splice(index, 1)
        dispatch(removeClass(id, className))
        this.updateShipsLeft(1)
        this.setState({
          status: 'waiting_for_coordinates'
        })
      }
    }
  }

updateShipsLeft(num){
  var shipsLeft = this.state.shipsLeft
  var newShips = shipsLeft + num
  this.setState({
    shipsLeft: newShips
  })
}

  submitCoordinates(){
 if(this.state.playerCoordinates.length === 10){
   const coordinates={ 'coordinates': this.state.playerCoordinates}
      dispatch(submitPlayerCoordinate(coordinates)).then((data) => {
        this.setState({
          cpuCoordinates: data.response,
          status: 'waiting_for_player_turn'
        })
      })
}else{
  this.setState({
    message: "Please place your whole fleet before you submit your coordinates"
  })
}

}


  render(){
    let directions = ""
    let ships = this.state.shipsLeft
    if(this.state.status === "waiting_for_coordinates"){
      var show = false
      directions = "Select Coordinates for your BattleShips!  " + ships+" ships left!"
    }else if(this.state.status === "waiting_for_player_turn"){
      var show = true
      directions = "Select the Coordinate to Attack on Enemy Map"
    }else{
      var show = true
      directions ="Submit your positions!"
    }
    let spaceHtml = "";
    let htmlArray =[];
    const array = this.props.playerBoard
      for(let i=0; i< array.length; i++){
        const spaces = array[i]
        for(let j=0; j< spaces.length; j++){
          var space = spaces[j]
          let clickHandler = this.chooseCoordinates.bind(this, space)
          spaceHtml = <div className="player space" id={'player-space'+space} key={space} value={space} onClick={clickHandler}> {space} </div>
          htmlArray.push(spaceHtml)
        }
    }
    return(
      <div className="game-container">
        <div className="enemy board">
          <CPUBoard cpuBoard={this.props.cpuBoard} status={this.state.status} cpuCoordinates={this.state.cpuCoordinates} playerCoordinates={this.state.playerCoordinates}/>
        </div>
        <div className="playerContainer">
          <h3> Your map </h3>
          <div className="player-map">
            {htmlArray}
          </div>
          <div className="direction">
            {directions}
          </div>
          {this.state.message ? this.state.message : null} <br/>
          {show ? null :  <button type="submit" onClick={this.submitCoordinates.bind(this)} className="submit btn">Submit Coordinates</button> }
          </div>
      </div>
    )
  }
}
