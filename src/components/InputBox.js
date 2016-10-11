import React from 'react';
import ReactDOM from 'react-dom';

export default class InputBox extends React.Component{
  constructor(props){
    super();
    this.state ={
      previouslySelected: [],
      hitSpaces: [],
      cpuSelectedCoordinate: undefined,
      cpuHits: [],
      cpuSelected: [],
      success: false
    }
    this.handleChange = this.handleChange.bind(this);

  }

// @TODO
submitMissile(){
  var status = this.props.status
  var info = {'selectedCoordinate': this.props.selectedCoordinate, 'cpuSelected': this.props.cpuSelected}
  if(status === "waiting_for_player_turn"){
    fetch('/api/missile',{
      method: 'POST',
      body: JSON.stringify(info),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response =>
    response.json()).then(result => {
      console.log('got result back')
      console.log(result)
      this.setState({
        cpuSelectedCoordinate: result.response
      })
      this.checkPlayerSuccess(result)
    })
  }

}

checkPlayerSuccess(result){
  console.log('checkPlayerSuccess')
  var cpuCoordinates = this.props.cpuCoordinates
  console.log(cpuCoordinates)
  var selectedCoordinate = this.props.selectedCoordinate
  console.log(selectedCoordinate)
  var index = cpuCoordinates.indexOf(selectedCoordinate)
  console.log(index)
  var space = this.props.selectedCoordinate
  var previouslySelected = this.state.previouslySelected
  var hitArray = this.state.hitSpaces
  var r = document.getElementById('cpu-space'+space)
  r.classList.remove('playerSelected')
  if(index > -1){
    console.log('hit')
    r.classList.add('successfulHit')
    r.classList.add('clicked')
    previouslySelected.push(selectedCoordinate)
    success = "Congrats!! You hit one of their ships! Time for their move!"
    this.setState({
      previouslySelected: previouslySelected,
      hitSpaces: hitArray,
      success: success
    })
    if(this.state.hitSpaces.length === 10){
      this.endGame();
      success = "CONGRATS!!! You have just defeated your oponent!!!"
      this.setState({
          success: success
      })
    }
  }else{
    console.log('miss')
    r.classList.add('miss')
    r.classList.add("clicked")
    previouslySelected.push(selectedCoordinate)
    success = "OO! Unfortunately you missed! Hopefully next time you'll get a hit!"
    this.setState({
      previouslySelected: previouslySelected,
      success: success
    })
  }
  this.checkCpuSuccess(result)
}

checkCpuSuccess(result){
  console.log('in checkCpuSuccess')
  console.log(this.state.success)
  var playerCoordinates = this.props.playerCoordinates
  var cpuSelectedCoordinate = this.state.cpuSelectedCoordinate
  var index = playerCoordinates.indexOf(cpuSelectedCoordinate)
  var space = this.state.cpuSelectedCoordinate
  var cpuSelected = this.state.cpuSelected
  console.log(cpuSelected)
  var hitArray = this.state.cpuHits
  var r = document.getElementById('player-space'+space)
  r.classList.remove('selectedCoordinate')
  if(index > -1){
    r.classList.add('successfulHit')
    cpuSelected.push(cpuSelectedCoordinate)
    success = "Oh no! You've been hit! Send a missile back!"
    this.setState({
      cpuSelected: cpuSelected,
      cpuHits: hitArray,
      success: success
      })
      console.log(this.state.cpuSelected)

    if(this.state.cpuHits.length === 10){
      this.endGame();
      success = "All of your sinks have been sunk! You have lost your fleet"
      this.setState({
        success: success
      })
    }
  }else{
    r.classList.add('miss')
    cpuSelected.push(cpuSelectedCoordinate)
    success = "That was a close one! Thankfully you weren't hit! Time to send a missile back!"
    this.setState({
      cpuSelected: cpuSelected,
      success: success
    })
  }
}

endGame(){
  fetch('/api/end',{
   method: 'DELETE',
  }).then(response => response.json()).then(result => {
    console.log(result)
    // @TODO display end of game
  })
}

handleChange(e){
}

  render(){
    return(
      <div className="inputBox">
      <input
              type="text"
              value={this.props.selectedCoordinate} placeholder={this.props.selectedCoordinate}
              onChange={this.handleChange}
            />
      <div className="coordinateSubmitButton">
  <button type="submit" onClick={this.submitMissile.bind(this)} className="submit btn">Submit Missile</button>
  {this.state.success ? this.state.success : null}
  </div>
  </div>

    )

  }

}
