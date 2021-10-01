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
        this.handleHover = this.handleHover.bind(this);
    }
    change(value, hover, cb) {
        this.setState({value, hover}, cb);
    }
    handleChange(e) {
        this.change(e.target.value, this.state.hover, 
            () => this.props.onChange(this));
    }
    handleHover(e) {
        this.change(this.state.value, !this.state.hover);
    }
    render() {
        return (  
            <div onPointerEnter={this.handleHover}
                onPointerLeave={this.handleHover}
                style={styles}>
                <div className={this.props.className}>
                    <label className="num-label">{`${this.props.label} :`}</label>
                    <input className="num-field"
                        style={{caretColor:`${this.props.hideCursor ? 'transparent' : 'inherit'}`}}
                        placeholder={'-'}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key))
                            event.preventDefault();
                        }}
                        onChange={this.handleChange}/>
                </div>
                <Tooltip show={this.state.hover} tooltip={this.props.tooltip}/>
            </div>
        )
    }
}