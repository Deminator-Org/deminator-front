import React from "react";
import classNames from "classnames";
import mine from "../image/mine.svg"
import flag from "../image/flag.svg"

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
                        key     = {id}
                        value   = {this.props.grid[cel].value}
                        isOpen  = {this.props.grid[cel].isOpen}
                        display = {this.props.grid[cel].display}
                        player  = {this.props.grid[cel].player}
                        onClick={() => this.props.onClick(cel)}
                        onRightClick={() => this.props.onRightClick(cel)}
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

class Square extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            yolo:""
        }
    }

    setFlag(){
        if(!this.state.display){
            this.setState({display:<img src={flag} alt="Flag"></img>});
        }
        else{
            this.setState({display:""});
        }
        this.props.onRightClick();
    }

    render(){
        let btnClass = classNames("square", {'square-closed': !this.props.isOpen && !this.state.display}, {'square-blue':this.props.player===0}, {'square-red':this.props.player===1});
        var display;
        if(this.props.isOpen){
            display = this.props.value > 0? this.props.value : "";
            if (this.props.value === -1) {
                display = <img src={mine} alt="mine"></img>
            }
        }
        else if(this.state.display){
            display = this.state.display;
        }
        return (
            <button className={btnClass} onClick={this.props.onClick} onContextMenu={() =>this.setFlag()}>
                {display}
            </button>
        );
    }
}

export default Board;