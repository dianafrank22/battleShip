import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import PlayerBoard from './PlayerBoard'
import CPUBoard from './CPUBoard'

export default class BattleShipPage extends React.Component {
  constructor(props){
    super();
    this.state ={
      playerBoard: props.initialValue || [['00', '01', '02', '03', '04'], ['10', '11', '12', '13', '14'], ['20', '21', '22', '23', '24'], ['30', '31', '32', '33', '34'], ['40', '41', '42', '43', '44']],
      cpuBoard: props.initialValue || [['00', '01', '02', '03', '04'], ['10', '11', '12', '13', '14'], ['20', '21', '22', '23', '24'], ['30', '31', '32', '33', '34'], ['40', '41', '42', '43', '44']],
    }
    this.createGame()
  }

  createGame(){
    fetch('/api/start').then(response => response.json()).then(result => {
      this.setState({
        playerBoard: result.response.playerBoard,
        cpuBoard: result.response.cpuBoard
      })
    })
  }


  render(){
    return(
      <div className="game-container">
      <div className="player board">
      <PlayerBoard playerBoard={this.state.playerBoard} cpuBoard={this.state.cpuBoard}/>
      </div>
      </div>
    )
  }
}
