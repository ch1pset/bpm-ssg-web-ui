import React from "react";
import Styles from './checkbox.css';

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {checked:false};
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.setState({checked:!this.state.checked}, () => {
            this.props.onChange(this);
        })
    }
    render() {
        return (
            <div style={Styles}>
                <button className={`checkbox${this.state.checked ? '-active' : ''}`} 
                        onClick={this.handleClick} 
                        checked={this.state.checked}/>
                <label className="label">{this.props.label}</label>
            </div>
          )
    }
}

export default Checkbox;