import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import InputBox from './InputBox'
import CPUBoard from './CPUBoard'


export default class PlayerBoard extends React.Component {
  constructor(props){
    super();
    this.state ={
      playerCoordinates: [],
      cpuCoordinates: [],
      status: 'waiting_for_coordinates'
    }
  }


  chooseCoordinates(space, e){
    // if length is 10, but want to unclick
    // refactor so it adds function add class,
    // else if (players.length === 10, update state addClass and update state)
    if(this.state.status === "waiting_for_coordinates"){
      var playerCoordinates = this.state.playerCoordinates
      var index = playerCoordinates.indexOf(space)
      var id = e.target.id
      if(index > -1){
        playerCoordinates.splice(index, 1)
        var el = document.getElementById(id)
        el.classList.remove('playerSelected')
      }else {
        if(playerCoordinates.length < 10){
          playerCoordinates.push(space)
          var el =  document.getElementById(id)
          el.classList.add('playerSelected')
          this.setState({
            playerCoordinates: playerCoordinates
          })
        }else{
          this.setState({
            status: 'waiting_for_send_coordinates'
          })
          console.log('limit reached')
        }
      }
    }else if(this.state.status ==="waiting_for_player_turn"){
      // error handle here, tell them to select coordinate on cpu map

    }
  }

  submitCoordinates(){
 // @TODO get this to work
 // if()
 const coordinates={ 'coordinates': this.state.playerCoordinates}
    fetch('/api/setShips',{
      method: 'PUT',
      body: coordinates,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response =>
    response.json()).then(result => {
      this.setState({
        cpuCoordinates: result.response.cpuCoordinates,
        status: 'waiting_for_player_turn'
      })
      console.log(result)
    })
  }


// pass status as prop, into another component and render heading and directions there !
//@TODO move submit coordinates into component, have input box for sending missiles there as well, display one depending on state?

  render(){
    console.log(this.props.cpuBoard)
    let directions = ""
    if(this.state.status === "waiting_for_coordinates"){
      directions = "Select 10 Coordinates for your BattleShips!"
    }else if(this.state.status === "waiting_for_player_turn"){
      directions = "Select the Coordinate to Attack on Enemy Map"
    }else{
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
      <CPUBoard cpuBoard={this.props.cpuBoard} status={this.state.status}/>
      </div>
      <div className="playerContainer">
      <h3> Your map </h3>
      <div className="player-map">
          {htmlArray}
      </div>
      <div className="direction">
      {directions}
      </div>
          <button type="submit" onClick={this.submitCoordinates.bind(this)} className="submit btn">Submit Coordinates</button>
      </div>
      </div>
    )
  }
}
