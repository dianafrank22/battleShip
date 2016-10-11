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
      cpuSuccess: "",
      playerSuccess: ""
    }
    this.handleChange = this.handleChange.bind(this);

  }

// @TODO
submitMissile(){
  var status = this.props.status
  var info = {'selectedCoordinate': this.props.selectedCoordinate, 'cpuSelected': this.state.cpuSelected}
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
    r.classList.add('successfulHit')
    r.classList.add('clicked')
    previouslySelected.push(selectedCoordinate)
    hitArray.push(selectedCoordinate)
    if(hitArray.length === 10){
      this.endGame();
      var success = "CONGRATS!!! You have just defeated your oponent!!!"
      this.setState({
          success: success
      })
    }else{
      var success = "Congrats!! You hit one of their ships!"
      this.setState({
        previouslySelected: previouslySelected,
        hitSpaces: hitArray,
        playerSuccess: success
      })
    }
  }else{
    r.classList.add('miss')
    r.classList.add("clicked")
    previouslySelected.push(selectedCoordinate)
    var success = "OO! Unfortunately you missed! Hopefully next time you'll get a hit!"
    this.setState({
      previouslySelected: previouslySelected,
      playerSuccess: success
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
    if(cpuSelected.length === 10){
      this.endGame();
      var success = "All of your sinks have been sunk! You have lost your fleet"
      this.setState({
        cpuSuccess: success
      })
    }else{
      var success = "Oh no! You've been hit! Send a missile back!"
      this.setState({
        cpuSelected: cpuSelected,
        cpuHits: hitArray,
        cpuSuccess: success
        })
    }
  }else{
    r.classList.add('miss')
    cpuSelected.push(cpuSelectedCoordinate)
    var success = "That was a close one! Thankfully you weren't hit! Time to send a missile back!"
    this.setState({
      cpuSelected: cpuSelected,
      cpuSuccess: success
    })
  }
}

endGame(){
  fetch('/api/end',{
   method: 'DELETE',
  }).then(response => response.json()).then(result => {
    console.log(result)
    var success = "GAME OVER"
    this.setState({
      playerSuccess: "",
      cpuSuccess: success
    })
  })
}

handleChange(e){
}

  render(){
    return(
      <div className="inputBox">
        <input type="text" value={this.props.selectedCoordinate} placeholder={this.props.selectedCoordinate} onChange={this.handleChange} />
        <div className="coordinateSubmitButton">
          <button type="submit" onClick={this.submitMissile.bind(this)} className="shootBtn"><p className="btnName">Shoot</p></button> <br/>
        </div>
        <div className="successMessages">
          {this.state.playerSuccess ? this.state.playerSuccess : null} <br/>
          {this.state.cpuSuccess ? this.state.cpuSuccess : null}
        </div>
      </div>

    )

  }

}
