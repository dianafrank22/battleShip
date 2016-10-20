import React, { PropTypes, Component } from 'react';
import InputBox from './InputBox'

export default class CPUBoard extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      selectedCoordinate: undefined,
      message: ""
    }
  }

  selectCoordinate(space, e){
    var id = e.target.id
    var el = document.getElementById(id)
    if(el.classList.contains('clicked')){
      var message = "This space has previously been selected, please choose another one!"
      this.setState({
        message: message
      })
    }else{
      this.setState({
        message: ""
      })
      if(this.state.selectedCoordinate !== undefined){
        var remove = this.state.selectedCoordinate
        var r = document.getElementById('cpu-space'+remove)
        r.classList.remove('selectedCoordinate')
        el.classList.add('selectedCoordinate')
        this.updateSelectedCoordinate(space)
      }else{
        el.classList.add('selectedCoordinate')
        this.updateSelectedCoordinate(space)
      }
    }
  }


  updateSelectedCoordinate(space,e){
      this.setState({
        selectedCoordinate: space
      })
    }



  render(){
    let spaceHtml = "";
    let htmlArray =[];
    const array = this.props.cpuBoard
    for(let i=0; i< array.length; i++){
      const spaces = array[i]
      for(let j=0; j< spaces.length; j++){
        var space = spaces[j]
        let clickHandler = this.selectCoordinate.bind(this, space)
        spaceHtml = <div id={'cpu-space'+space} className="cpu space" key={space} value={space} onClick={clickHandler}> {space} </div>
        htmlArray.push(spaceHtml)
      }
    }
    return(
      <div className="enemy-map">
      <h3 className="enemy-header"> Enemy map </h3>
          {htmlArray}
          <InputBox className="coordinateInput" selectedCoordinate={this.state.selectedCoordinate} status={this.props.status} cpuCoordinates={this.props.cpuCoordinates}
          playerCoordinates={this.props.playerCoordinates}/>
          {this.state.message ? this.state.message : null}
      </div>
    )
  }
}
