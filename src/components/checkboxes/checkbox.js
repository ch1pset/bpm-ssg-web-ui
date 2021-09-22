import React from "react";
import Styles from './checkbox.css';

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {checked:false};
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.setState({
            checked:!this.state.checked
        }, () => this.props.onChange(this));
    }
    render() {
        return (
            <div className="checkbox-container" style={Styles}>
                <div className={`checkbox${this.state.checked ? '-active' : ''}`} 
                    onClick={this.handleClick} 
                    checked={this.state.checked}/>
                <div className="label"
                    onClick={this.handleClick}>
                        {this.props.label}
                </div>
            </div>
          )
    }
}

export default Checkbox;