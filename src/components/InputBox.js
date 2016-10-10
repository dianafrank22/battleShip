import React from 'react';
import ReactDOM from 'react-dom';

export default class InputBox extends React.Component{
  constructor(props){
    super();
    this.state ={
      previouslySelected: [],
      hitSpaces: []
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
    // send player coordinate here
    // return cpu choice
    // call check status
    console.log(status)
  }
  // else{
  //   // display error depending on state
  // }

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
