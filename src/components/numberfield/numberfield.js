import React from "react";
import styles from './numberfield.css'
import Tooltip from "../tooltip";

export class NumberField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:"",
            hover:false
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
            <div className={this.props.className} style={styles}>
                <div className="num" child="container" flex="column">
                    <div flex="row" spacing="between"
                        onPointerEnter={this.handleHover}
                        onPointerLeave={this.handleHover}>
                        <label className="num" child="label" flex="column" spacing="around">
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