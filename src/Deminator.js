import React from "react";
import classNames from "classnames";
import bomb from "./image/bomb.svg"

class Game extends React.Component {
  constructor(props) {
    super(props);
    const height = this.props.height;
    const width = this.props.width;
    this.demService = this.props.demServ;
    this.state = {
      width: height,
      height: width,
      grid: this.generateGrid(),
    };
  }

  generateGrid() {
    const width = this.props.width;
    const height = this.props.height;
    const bombs = this.demService.getBombsTest(50, 15, 15);
    const dirs = [
      (x) => !((x + 1)%width)?-1:x + 1 - width,
      (x) => !((x + 1)%width)?-1:x + 1,
      (x) => (x + width>=width*height)?-1:x + 1 + width,
      (x) => (x + width>=width*height)?-1:x + width,
      (x) => !((x)%width)?-1:x - 1 + width,
      (x) => !((x)%width)?-1:x-1,
      (x) => ((x - width)<0)?-1:x - 1 - width,
      (x) => ((x - width)<0)?-1:x-width
    ];
    var grid = Array(this.props.height * this.props.width).fill(0);
    bombs.forEach((bomb) => {
      var pos = bomb.x * width + bomb.y;
      grid[pos] = -1;
      for (let i = 0; i < dirs.length; i++) {
        let posPlus = dirs[i](pos);
        if(posPlus === -1){
          i+=2;
          continue;
        }
        if(grid[posPlus] !== -1)
          grid[posPlus] += 1;
      }
    });
    return grid;
  }

  handleClick(i) {}

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            width={this.state.width}
            height={this.state.height}
            grid={this.state.grid}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }
}

class Board extends React.Component {
  render() {
    let width = this.props.width;
    let height = this.props.height;
    var rows = [];

    for (var l = 0; l < width; l++) {
      rows[l] = { cels: [] };
      for (var c = 0; c < height; c++) {
        rows[l].cels[c] = l * width + c;
      }
    }

    const res = rows.map((row, id) => {
      const cels = row.cels.map((cel, id) => {
        return (
          <Square
            key={id}
            value={this.props.grid[cel]}
            onClick={() => this.props.onClick(cel)}
          />
        );
      });
      return (
        <div className="board-row" key={id}>
          {cels}
        </div>
      );
    });

    return <div>{res}</div>;
  }
}

function Square(props) {
  const btnClass = classNames("square");
  let display = props.value > 0 ? props.value : "";
  if(props.value === -1){
    display = <img src={bomb}  alt="Bomb"></img>
  }
  return (
    <button className={btnClass} onClick={props.onClick}>
      {display}
    </button>
  );
}

export default Game;
