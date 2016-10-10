import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';

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
      // update calue of selected coordinate for attack
      // tell them to select coordinate on enemy map

    }else{

    }


  }

  submitCoordinates(){
 // can move this into another component where you submit coordinates
 // checks state
 // if one, creates coordinates, (allows you to click your map)
 // else update directions?
 // have to send coordinates
 // @TODO get this to work
 // if()
    fetch('/api/setShips',{
      method: 'post',
      body: JSON.stringify(this.state.playerCoordinates),
      headers: {
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

    fetch('/api/createCpuCoordinates').then(response => response.json()).then(result => {
      console.log(result)
      this.setState({
        cpuCoordinates: result.response.cpuCoordinates,
        status: 'waiting_for_player_turn'
      })
    })
  }


// pass status as prop, into another component and render heading and directions there !


  render(){
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
    )
  }
}
