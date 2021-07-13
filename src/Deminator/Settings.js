import React from "react";
import classNames from "classnames";
import DeminatorService from "./DeminatorService";

class Settings extends React.Component {
    constructor(props){
        super(props);
        this.test = "yodnfgoidngfoi";
    }
    
    applySettings(){
        this.props.applySettings("dkgngfok");
    }


    render(){
        
        return(
            <form className="settings" onSubmit={()=>this.applySettings()}>
                <label>
                    URL:
                    <input type="url"></input>
                </label>
                <label>
                    Room:
                    <input type="text"></input>
                </label>
                <button type="submit" >Apply</button>
            </form>
        )
    }
}

export default Settings;