import React from "react";
import RenderDeminator from "./RenderDeminator";
import DeminatorService from "./DeminatorService";
import classNames from "classnames"
import Settings from "./Settings";
import "./Deminator.css";

const DEFAULT_WIDTH = 10;
const DEFAULT_HEIGHT = 10;
const DEFAULT_MINE_NB = 10;
const DEFAULT_DEMSERV = new DeminatorService("http://127.0.0.1:4224/test");
const DIRS = [
  (x, width, height) => !((x + 1)%width)?-1:x + 1,
  (x, width, height) => (x + width>=width*height)?-2:x + 1 + width,
  (x, width, height) => (x + width>=width*height)?-1:x + width,
  (x, width, height) => !((x)%width)?-2:x - 1 + width,
  (x, width, height) => !((x)%width)?-1:x-1,
  (x, width, height) => ((x - width)<0)?-2:x - 1 - width,
  (x, width, height) => ((x - width)<0)?-1:x-width,
  (x, width, height) => (!((x + 1)%width) || (x - width)<0)?-1:x + 1 - width,
];

class Deminator extends React.Component {
  constructor() {
    super();
    this.demService = DEFAULT_DEMSERV;
    //this.grid = this.generateGridTest(DEFAULT_WIDTH, DEFAULT_HEIGHT);
    let st = this.getGameTest();
    this.state = {
      width: st.width,
      height: st.height,
      grid: st.grid,
      firstClick: true
    };
    document.addEventListener("contextmenu", (event) => event.preventDefault());
  }

  getGame(){
    const game = this.demService.getmines();
    const grid = this.generateGrid(game.width, game.height, game.mines)
    return 
  }

  getGameTest(pos = -1){
    const width = DEFAULT_WIDTH;
    const height = DEFAULT_HEIGHT;
    const mines = this.demService.getminesTest(DEFAULT_MINE_NB, DEFAULT_WIDTH, DEFAULT_HEIGHT, pos);
    const grid = this.generateGrid(DEFAULT_WIDTH, DEFAULT_HEIGHT, mines);
    return {width, height, grid};
  }

  generateEmptyGrid(width, height){
    return Array(height * width).fill(null).map(()=>({value:0, isOpen:false}));
  }

  generateGrid(width, height, mines) {
    var grid = this.generateEmptyGrid(width, height);
   
    mines.forEach((mine) => {
      var pos = mine.x * width + mine.y;
      grid[pos].value = -1;
      for (let i = 0; i < DIRS.length; i++) {
        let posPlus = DIRS[i](pos, width, height);
        if(posPlus < 0){
          i += -posPlus;
          continue;
        }
        if(grid[posPlus].value !== -1)
          grid[posPlus].value += 1;
      }
    });
    return grid;
  }

  handleClick(i) {
    this.grid = this.state.grid;
    const width = this.state.width;
    const height = this.state.height;
    this.openCel(i, width, height);
    this.setState({
      width: width,
      height: height,
      grid: this.grid,
      firstClick: false
    });
  }

  openCel(pos, width, height){
    if(this.grid[pos].isOpen){
      return;
    }
    this.grid[pos].isOpen = true;
    if(this.grid[pos].value === 0){
      for (let i = 0; i < DIRS.length; i++) {
        let posPlus = DIRS[i](pos, width, height);
        if(posPlus < 0){
          i += -posPlus;
          continue;
        }
        //console.log("i : " +i + " ----- pos:" + pos + " --- posPlus:" + posPlus );
        if(!this.grid[posPlus].isOpen){
          this.openCel(posPlus, width, height);
        }
      }
    }
    if(this.grid[pos].value === -1){
      alert("Loser");
    }
  }

  applySettings(obj){
    console.log(obj);
  }

  render(){
    return(
      
      <div>
        <Settings applySettings={this.applySettings}></Settings>
        <RenderDeminator width={this.state.width} height={this.state.height} grid={this.state.grid} handleClick={(i)=>this.handleClick(i)}></RenderDeminator>
      </div>
    )
  }
}

export default Deminator;
