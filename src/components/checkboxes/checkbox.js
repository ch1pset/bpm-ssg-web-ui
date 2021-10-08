import React from "react";
import Tooltip from '../tooltip'
import Styles from './checkbox.css';

export class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {checked:false};
        this.handleClick = this.handleClick.bind(this);
    }
    change(checked, cb) {
        this.setState({checked}, cb);
    }
    toggleTooltip(cb) {
        this.change(this.state.checked, cb);
    }
    handleClick(e) {
        console.log(`${!this.state.checked ? 'Selected' : 'Unselected'} ${this.props.name}`);
        this.change(!this.state.checked,
            () => this.props.onChange(this));
    }
    render() {
        return (
            <div className={this.props.className} child="parent" style={Styles}>
                <div className="checkbox" child="outer-container">
                    <span className="checkbox" child="inner-container">
                        <span className="checkbox" child="area">
                            <span className="checkbox" child="box-container">
                                <span className="checkbox" child="box" boxStyle={this.props.boxStyle}
                                    onClick={this.handleClick} active={`${this.state.checked}`}/>
                            </span>
                            <label className="checkbox" child="label"
                                onClick={this.handleClick}>
                                {this.props.label}
                            </label>
                        </span>
                    </span>
                    <div className="checkbox" child="tooltip">
                        <Tooltip tooltip={this.props.tooltip}/>
                    </div>
                </div>
            </div>
          )
    }
}
