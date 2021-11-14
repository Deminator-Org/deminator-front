import React from "react";
/*import classNames from "classnames";
import DeminatorService from "./DeminatorService";*/

class Score extends React.Component {
    render(){
        return(
            <div>
                <p>{this.props.score[0]}   -   {this.props.score[1]}</p>
                <p>Player {this.props.player} turn ! </p>
            </div>
        )
    }
}

export default Score;