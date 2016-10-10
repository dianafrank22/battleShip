import React from 'react';
import ReactDOM from 'react-dom';

export default class InputBox extends React.Component{
  constructor(props){
    super();
    this.state ={
      previouslySelected: [],
      hitSpaces: [],
      cpuSelectedCoordinate: undefined
    }
    this.handleChange = this.handleChange.bind(this);
  }

  // can't select depending on state
// either display button to submit all coordinates based state
// or input box to select cordinate on cpu
// or text that says wait for cpu selection
// need to move cpu board to be rendered in playboard to pass props to
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
      this.checkSuccess(result)
      // get cpu coordinate
      // call function to check success
      // cpuSelectedCoordinate
      console.log(result)
    })
  }
  // else{
  //   // display error depending on state
  // }

}

checkSuccess(result){
  this.setState({
    cpuSelectedCoordinate: result.response.cpuSelectedCoordinate
  })
  console.log('in check success')
  console.log(this.state.cpuSelectedCoordinate)
  console.log(this.props.selectedCoordinate)
  console.log(this.props.cpuCoordinates)
  console.log(this.props.playerCoordinates)
  // compare selected ones with the array of coordinates
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
