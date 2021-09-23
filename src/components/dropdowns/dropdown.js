import React from 'react';
import Tooltip from '../tooltip/tooltip';
import styles from './dropdowns.css';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selection:"",hover:false}
        this.handleChange = this.handleChange.bind(this);
        this.handleHover = this.handleHover.bind(this);
        }
    valid() {
        return this.state.selection !== "";
    }
    handleChange(e) {
        console.log(`Selected ${e.target.value}`)
        this.setState({
            selection:e.target.value,
            hover:this.state.hover
        }, () => this.props.onChange(this));
    }
    handleHover(e) {
        this.setState({
            selection:this.state.selection,
            hover:!this.state.hover
        })
    }
    createOptions() {
        return this.props.options.map((opt, i) => {
            return <option className="dropdown-option" key={i} value={opt}>{opt}</option>
        });
    }
    render() {
        return (
            <div style={styles}>
                <select className="Dropdown" 
                    onChange={this.handleChange}
                    onPointerEnter={this.handleHover}
                    onPointerLeave={this.handleHover}>
                    <option value="">--Choose a {this.props.name}--</option>
                    {this.createOptions()}
                </select>
                <Tooltip show={this.state.hover} tooltip={this.props.tooltip}/>
            </div>
        );
    }
}

export default Dropdown;