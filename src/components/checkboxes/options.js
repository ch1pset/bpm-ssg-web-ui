import React from "react";
import StateContext from "../context";
import Styles from './options.css';

class Options extends React.Component {
    static contextType = StateContext;
    constructor() {
        super();
        this.handleEnhanceChange = this.handleEnhanceChange.bind(this);
    }
    handleEnhanceChange(e) {
        this.context.opts.ENHANCE = e.target.checked
        console.log(`Enhance Pools: ${e.target.checked}`);
    }
    render() {
        return (
            <div className="Options" style={Styles}>
                <div>
                    <input onChange={this.handleEnhanceChange}
                        type="checkbox" 
                        id="enhance"
                        checked={this.context.value}/>
                    <label>Enhanced Item Pools</label>
                </div>
            </div>
          )
    }
}

export default Options;