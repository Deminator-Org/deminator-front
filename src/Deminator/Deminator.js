import React from "react";
import RenderDeminator from "./RenderDeminator";
import DeminatorService from "./Services/DeminatorService2PlayerLocal";
import classNames from "classnames"
import Settings from "./Settings";
import Score from "./Score";
import "./Deminator.css";

const DEFAULT_DEMSERV = new DeminatorService();


class Deminator extends React.Component {
  constructor() {
    super();
    this.demService = DEFAULT_DEMSERV;
    this.state = this.demService.getGameSetup();
    document.addEventListener("contextmenu", (event) => event.preventDefault());
  }

  onClick(i) {
    if(this.state.firstClick){
      this.demService.initGame(i);
    }
    this.setState(this.demService.onClick(i));
  }

  onRightClick(i){
    this.setState(this.demService.onRightClick(i));
  }

  applySettings(obj){
    console.log(obj);
  }

  render(){
    var score = "";
    if(this.state.score){
      score = <Score player={this.state.player+1} score={this.state.score}></Score>
    }
    return(
      <div>
        <Settings applySettings={this.applySettings}></Settings>
        <RenderDeminator 
            width={this.state.width} 
            height={this.state.height} 
            grid={this.state.grid} 
            onClick={(pos)=>this.onClick(pos)} 
            onRightClick={(pos)=>this.onRightClick(pos)}>
        </RenderDeminator>
        {score}
      </div>
    )
  }
}

export default Deminator;
