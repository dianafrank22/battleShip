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

  // selected space will be updated in selection component,
  // can't select depending on state
// this.props.selectedCoordinate as input value
// either display button to submit all coordinates based state
// or input box to select cordinate on cpu
// or text that says wait for cpu selection
handleChange(e){
// do anything here?
}

  render(){
    return(
      <input
              type="text"
              value={this.props.selectedCoordinate} placeholder={this.props.selectedCoordinate}
              onChange={this.handleChange}
            />
    )

  }

}
