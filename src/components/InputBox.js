import React from 'react';
import ReactDOM from 'react-dom';

export default class InputBox extends React.Component{
  constructor(props){
    super();
    this.state ={
      previouslySelected: [],
      hitSpaces: [],
      cpuSelectedCoordinate: undefined,
      playerSuccess: "",
      cpuSuccess: "",
      cpuHits: [],
      cpuSelected: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

// need to check if in previously selected, can't click those
  // can't select depending on state
// either display button to submit all coordinates based state
// or input box to select cordinate on cpu
// or text that says wait for cpu selection
// need to move cpu board to be rendered in playboard to pass props to
// need to send cpuSelected here, that way cpu can't pick same one
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
  r.classList.remove('selectedCoordinate')
  if(index > -1){
    r.classList.add('successfulHit')
    previouslySelected.push(selectedCoordinate)
    this.setState({
      previouslySelected: previouslySelected,
      hitSpaces: hitArray
    })
    if(this.state.hitSpaces.length === 10){
        // call end game
        // call pop up to display win?
    }
  }else{
    r.classList.add('miss')
    previouslySelected.push(selectedCoordinate)
    this.setState({
      previouslySelected: previouslySelected
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
    this.setState({
      cpuSelected: cpuSelected,
      cpuHits: hitArray
    })
    if(this.state.hitSpaces.length === 10){
        // call end game
        // call pop up to display win?
    }
  }else{
    r.classList.add('miss')
    cpuSelected.push(cpuSelectedCoordinate)
    this.setState({
      cpuSelected: cpuSelected
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
  </div>

    )

  }

}
