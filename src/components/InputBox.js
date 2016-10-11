import React from 'react';
import ReactDOM from 'react-dom';

export default class InputBox extends React.Component{
  constructor(props){
    super();
    this.state ={
      previouslySelected: [],
      hitSpaces: [],
      cpuSelectedCoordinate: undefined,
      success: "",
      cpuHits: [],
      cpuSelected: []
    }
    this.handleChange = this.handleChange.bind(this);
  }


  // @TODO

// need to check if in previously selected, can't click those
  // can't select depending on state
// either display button to submit all coordinates based state
// or input box to select cordinate on cpu
// or text that says wait for cpu selection
// need to move cpu board to be rendered in playboard to pass props to
// need to send cpuSelected here, that way cpu can't pick same one
// update session with cpu selection, that way it cant select the same ones
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
  // else{
  //   // display error depending on state
  // }

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
    var playerSuccess = "Congrats!! You hit one of their ships! Time for their move!"
    this.setState({
      previouslySelected: previouslySelected,
      hitSpaces: hitArray,
      success: playerSuccess
    })
    if(this.state.hitSpaces.length === 10){
      // @TODO
        // call end game
        // call pop up to display win?
        console.log('player won')
    }
  }else{
    r.classList.add('miss clicked')
    previouslySelected.push(selectedCoordinate)
    var playerSuccess = "OO! Unfortunately you missed! Hopefully next time you'll get a hit!"
    this.setState({
      previouslySelected: previouslySelected,
      success: playerSuccess
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
    var cpuSuccess = "Oh no! You've been hit! Send a missile back!"
    this.setState({
      cpuSelected: cpuSelected,
      cpuHits: hitArray,
      success: cpuSuccess
    })
    if(this.state.cpuHits.length === 10){
      console.log('cpu won')
        // call end game
        // call pop up to display win?
    }
  }else{
    r.classList.add('miss')
    cpuSelected.push(cpuSelectedCoordinate)
    var cpuSuccess = "That was a close one! Thankfully you weren't hit! Time to send a missile back!"
    this.setState({
      cpuSelected: cpuSelected,
      success: cpuSuccess
    })
  }

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
  </div>
  {this.state.success}
  </div>

    )

  }

}
