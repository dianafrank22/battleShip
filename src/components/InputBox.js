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
      success = false;
    }
    this.handleChange = this.handleChange.bind(this);

  }


submitMissile(){
  var status = this.props.status
  if(status === "waiting_for_player_turn"){
    fetch('/api/missile',{
      method: 'POST',
      body: JSON.stringify(this.props.selectedCoordinate),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response =>
    response.json()).then(result => {
      this.setState({
        cpuSelectedCoordinate: result.response
      })
      this.checkPlayerSuccess(result)
    })
  }

}

checkPlayerSuccess(result){
  var cpuCoordinates = this.props.cpuCoordinates
  var selectedCoordinate = this.props.selectedCoordinate
  var index = cpuCoordinates.indexOf(selectedCoordinate)
  var space = this.props.selectedCoordinate
  var previouslySelected = this.state.previouslySelected
  var hitArray = this.state.hitSpaces
  var r = document.getElementById('cpu-space'+space)
  r.classList.remove('playerSelected')
  if(index > -1){
    r.classList.add('successfulHit clicked')
    previouslySelected.push(selectedCoordinate)
    success = "Congrats!! You hit one of their ships! Time for their move!"
    this.setState({
      previouslySelected: previouslySelected,
      hitSpaces: hitArray,
      success: success
    })
    if(this.state.hitSpaces.length === 10){
      // @TODO
      this.endGame();
      success = "CONGRATS!!! You have just defeated your oponent!!!"
        console.log('player won')
      this.setState({
          success: success
      })
    }
  }else{
    r.classList.add('miss clicked')
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
  var playerCoordinates = this.props.playerCoordinates
  var cpuSelectedCoordinate = this.state.cpuSelectedCoordinate
  var index = playerCoordinates.indexOf(cpuSelectedCoordinate)
  var space = this.state.cpuSelectedCoordinate
  var cpuSelected = this.state.cpuSelected
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
  })
}

handleChange(e){
// do anything here?
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
