import React from "react";
import styles from './numberfield.css'
import Tooltip from "../tooltip";

export class NumberField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    change(value, hover, cb) {
        this.setState({value, hover}, cb);
    }
    handleChange(e) {
        this.change(e.target.value, this.state.hover, 
            () => this.props.onChange(this));
    }
    render() {
        return (  
            <div className={this.props.className} child="parent" style={styles}>
                <div className="num" child="container">
                    <div className="num" child="area">
                        <label className="num" child="label">
                                {`${this.props.label} :`}
                        </label>
                        <input className="num" child="field"
                            style={{caretColor:`${this.props.hideCursor ? 'transparent' : 'inherit'}`}}
                            placeholder={'-'}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key))
                                event.preventDefault();
                            }}
                            onChange={this.handleChange}/>
                    </div>
                    <div child="tooltip">
                        <Tooltip show={this.state.hover} tooltip={this.props.tooltip}/>
                    </div>
                </div>
            </div>
        )
    }
}