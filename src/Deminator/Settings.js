import React from "react";
/*import classNames from "classnames";
import DeminatorService from "./DeminatorService";*/

class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state = {test : "yodnfgoidngfoi"};

        this.handleChange = this.handleChange.bind(this);
        this.applySettings = this.applySettings.bind(this);
    }

    handleChange(event){
        this.setState({test: event.target.value});
    }
    
    applySettings(event){
        event.preventDefault();
        this.props.applySettings(this.state.test);
    }


    render(){
        return(
            <form className="settings" onSubmit={this.applySettings}>
                <label>
                    URL:
                    <input type="text" value={this.state.test} onChange={this.handleChange}></input>
                </label>
                <label>
                    Room:
                    <input type="text"></input>
                </label>
                <button type="submit" value="Submit">Apply</button>
            </form>
        )
    }
}

export default Settings;