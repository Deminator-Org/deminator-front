import React from "react";
import RenderDeminator from "./RenderDeminator";
import DeminatorService from "./DeminatorServiceTest";
import DeminatorUtil from "./DeminatorUtil";
import classNames from "classnames"
import Settings from "./Settings";
import "./Deminator.css";

const DEFAULT_DEMSERV = new DeminatorService("http://127.0.0.1:4224/test");


class Deminator extends React.Component {
  constructor() {
    super();
    this.demService = DEFAULT_DEMSERV;
    //this.grid = this.generateGridTest(DEFAULT_WIDTH, DEFAULT_HEIGHT);
    let st = this.demService.getGame();
    this.state = {
      width: st.width,
      height: st.height,
      grid: st.grid,
      firstClick: true
    };
    document.addEventListener("contextmenu", (event) => event.preventDefault());
  }

  handleClick(i) {
    this.grid = this.state.grid;
    const width = this.state.width;
    const height = this.state.height;
    if(this.grid[i].isOpen && !DeminatorUtil.isCompleted(i)){
      return;
    }
    this.openCel(i, width, height);
    this.setState({
      width: width,
      height: height,
      grid: this.grid,
      firstClick: false
    });
  }

  

  openCel(pos){
    this.grid[pos].isOpen = true;
    if(this.grid[pos].value === 0){
      DeminatorUtil.forAroundCel(pos, (posPlus)=>!this.grid[posPlus].isOpen, (posPlus)=>this.openCel(posPlus), this.state.width, this.state.height);
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
