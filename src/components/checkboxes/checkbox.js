import React from "react";
import Tooltip from '../tooltip'
import Styles from './checkbox.css';

export class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {checked:false, hover:false};
        this.handleClick = this.handleClick.bind(this);
        this.handleHover = this.handleHover.bind(this);
    }
    change(checked, hover, cb) {
        this.setState({checked, hover}, cb);
    }
    toggleTooltip(cb) {
        this.change(this.state.checked, !this.state.hover, cb);
    }
    handleClick(e) {
        console.log(`${!this.state.checked ? 'Selected' : 'Unselected'} ${this.props.name}`)
        this.change(!this.state.checked, this.state.hover,
            () => this.props.onChange(this));
    }
    handleHover(e) {
        this.toggleTooltip();
    }
    render() {
        return (
            <div className={this.props.className}>
                <div className="checkbox-container" 
                    onPointerEnter={this.handleHover} 
                    onPointerLeave={this.handleHover} 
                    style={Styles}>
                    <div className={`checkbox${this.state.checked ? '-active' : ''}`} 
                        onClick={this.handleClick} 
                        checked={this.state.checked}/>
                    <div className="label"
                        onClick={this.handleClick}>
                            {this.props.label}
                    </div>
                </div>
                <Tooltip show={this.state.hover} tooltip={this.props.tooltip}/>
            </div>
          )
    }
}
