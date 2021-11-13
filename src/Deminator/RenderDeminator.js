import React from "react";
import Board from "./Board/Board"

class RenderDeminator extends React.Component {
    render() {
        return (
        <div className="game">
            <div className="game-board">
            <Board
                width={this.props.width}
                height={this.props.height}
                grid={this.props.grid}
                onClick={(i) => this.props.handleClick(i)}
            />
            </div>
        </div>
        );
    }
}

export default RenderDeminator;