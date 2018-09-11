import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import styles from './TicTacToev3.module.scss';
import { ITicTacToev3Props } from './ITicTacToev3Props';
import { escape } from '@microsoft/sp-lodash-subset';


export class Square extends React.Component<any, any> {
  render() {
    return (
      <div className={css("ms-Grid-col ms-u-sm4 ms-u-md4", styles.squareCont)} 
      onClick={() => this.props.onSquareClick()}>
      <h2>{this.props.value}</h2>
      </div>
    );
  }
}

export class Board extends React.Component<any, any> {
  constructor() {
    super();

    var p1 = {name:"Player1", value:"X"};
    var p2 = {name:"Player2", value:"O"};

    this.state = {
      values: Array(9),
      player1:p1,
      player2:p2,
      currentPlayer:p1

    }
  }

  handleSquareClick(id:number){
    let vals = this.state.values.slice();

    vals[id] = this.state.currentPlayer.value;
    this.setState({values:vals});
    if(this.state.currentPlayer == this.state.player1){
      this.setState({currentPlayer: this.state.player2});
    }
    else {
      this.setState({ currentPlayer: this.state.player1});
    }
    console.log("hey, id = " + id);
  }
  
  private renderRow(startIndex:number, colCount:number) {
    var col=[];

    for(var i=0; i < colCount; i++){
      let index = startIndex;

      col.push(<Square key={index}
        onSquareClick={() => this.handleSquareClick(index)} 
        value={this.state.values[index]}/>);
      startIndex++;
    }

    return (
      <div className="ms-Grid-row"  >
        {col}
      </div>
    );
  }
  
  render() {
    return (
      <div className={css("ms-Grid", styles.gridCont)}>
        <h2>Hello from Board</h2>
        <h3>It is {this.state.currentPlayer.name}'s turn</h3>
        {this.renderRow(0, 3)}
        {this.renderRow(3, 3)}
        {this.renderRow(6, 3)}
      </div>
     
    );
  }
}

export class Game extends React.Component<any, any>{
  render() {
    return (
      <div>
        <h2>Hello from {this.props.name}</h2>
        <Board />
      </div>
    );
  }
}


export default class TicTacToev3 extends React.Component<ITicTacToev3Props, {}> {
  public render(): React.ReactElement<ITicTacToev3Props> {
    return (
      <div className={styles.ticTacToev3}>
        <div className={styles.container}>

          <Game name="Game 1" />
          <Game name="Game 2" />
          <Game name="Game 3" />

          {/*
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>*/}
        </div>
      </div>
    );
  }
}
