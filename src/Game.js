import React from 'react';

class Game extends React.Component {
    constructor(props) {
      super(props);
      const size = this.props.size;
      this.state = {
        history: [{
          squares: Array(size*size).fill(null),
          move:null,
        }],
        stepNumber: 0,
        won: null,
        xIsNext: true,
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
  
      if(!squares[i] && !this.state.won) {
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        const winner = calculateWinner(squares, this.props.size, this.props.lineSize, i);
        this.setState({
          history: history.concat([{
            squares: squares,
            move:i,
          }]),
          stepNumber: history.length,
          won: winner,
          xIsNext: !this.state.xIsNext,
        });
      }
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
        won:calculateWinner(this.state.history[step].squares, this.props.size, this.props.lineSize, this.state.history[step].move),
      });
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
  
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      moves.reverse();
  
      let status;
      if (this.state.won) {
        status = 'Winner: ' + this.state.won;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              size={this.props.size}
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
}

class Board extends React.Component {
    render() {
      var size = this.props.size;
      var rows = [];
  
      for(var l = 0; l < size; l++){
        rows[l] = {cels:[]}
        for(var c = 0; c < size; c++){
          rows[l].cels[c] = (l*size) + c;
        }
      }
      
      const res = rows.map((row, id) => {
        const cels = row.cels.map((cel, id) => {
          return(
            <Square
              key={id}
              value={this.props.squares[cel]}
              onClick={() => this.props.onClick(cel)}
            />
            );
        });
        return(
          <div className="board-row" key={id}>
            {cels}
          </div>
        );
      })
  
      return (
        <div>
          {res}
        </div>
      );
    }
}

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

function calculateWinner(squares, size, lineSize, move) {
    const lines = [x=>x+1, x=>x+1+size, x=>x+size, x=>x-1+size, x=>x-1, x=>x-1-size, x=>x-size, x=>x+1-size];
    //Check only the current move
    const a = squares[move];
    cases:
    for(let j = 0; j < lines.length/2; j++){
      var moveCurrent = move;
      var mul = 0;
      for(let k = 0; k < lineSize-1; k++){
        var movePlus = lines[j+(mul*4)](moveCurrent);
        if(mul){
          let temp = moveCurrent;
          moveCurrent = movePlus;
          movePlus = temp;
        }
        if( !squares[movePlus]
        ||  (Math.floor(movePlus/size - Math.floor(moveCurrent/size))>1)
        || ((movePlus - moveCurrent) === 1 && (Math.floor(movePlus/size) - Math.floor(moveCurrent/size))===1)
        || movePlus >= squares.length
        || (((movePlus - moveCurrent) === size-1) && ((Math.floor(movePlus/size) - Math.floor(moveCurrent/size))===0))
        ){
          if(!mul){
            mul = 1;
            moveCurrent = move;
            k--;
            continue;
          }
          continue cases;
        }
        if(mul){
          let temp = moveCurrent;
          moveCurrent = movePlus;
          movePlus = temp;
        }
        if(squares[movePlus] !== a){
          if(!mul){
            mul = 1;
            moveCurrent = move;
            k--;
            continue;
          }
          continue cases;
        }
        moveCurrent = movePlus;
      }
      return a;
    }
    
  
  
    /*Check Everythink at every move
    for(let i = 0; i < squares.length-(lineSize-1); i++){
      const a = squares[i];
      if(!a){
        continue;
      }
      cases:
      for(let j = 0; j < lines.length; j++){
        var iCurrent = i;
        for(let k = 0; k < lineSize-1; k++){
          const iPlusPlus = lines[j](iCurrent);
          if( !squares[iPlusPlus]
          ||  (Math.floor(iPlusPlus/size - Math.floor(iCurrent/size))>1)
          || ((iPlusPlus - iCurrent) === 1 && (Math.floor(iPlusPlus/size) - Math.floor(iCurrent/size))===1)
          || iPlusPlus >= squares.length
          || (((iPlusPlus - iCurrent) === size-1) && ((Math.floor(iPlusPlus/size) - Math.floor(iCurrent/size))===0))
          ){
            continue cases;
          }
          if(squares[iPlusPlus] !== a){
            continue cases;
          }
          console.log("i: " + i + " --- j: " + j + " --- k: " + k);
          console.log("iCurrent: " + iCurrent + " --- iPlus: " + iPlusPlus);
          iCurrent = iPlusPlus;
        }
        return a;
      }
    }*/
  
  
    return null;
  
  }

export default Game;