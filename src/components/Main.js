import React from 'react';
import ReactDOM from 'react-dom';
import BattleShip from './BattleShipPage';

export default class Main extends React.Component{
  constructor(){
    super();
    this.state ={}
  }

  // @TODO make score board component
  // make timer component on bottom
  // make button component, start game, end game
  // count down
  // header component?


  endGame(){
    fetch('/api/end',{
        method: 'DELETE',
    }).then(response => response.json()).then(result => {
      console.log(result)
    })
  }

  render(){
    return(
      <div className="game-board">
      <BattleShip/>
      <button type="submit" onClick={this.endGame.bind(this)} className="endGame btn">End Game</button>
      </div>
    )

  }

}
