import React from 'react';
import styles from './dropdowns.css';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selection:""}
        this.handleChange = this.handleChange.bind(this);
    }
    valid() {
        return this.state.selection !== "";
    }
    handleChange(e) {
        console.log(`Selected ${e.target.value}`)
        this.setState({
            selection:e.target.value
        }, () => this.props.onChange(this));
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
                    onChange={this.handleChange}>
                    <option value="">--Choose a {this.props.name}--</option>
                    {this.createOptions()}
                </select>
            </div>
        );
    }
}

export default Dropdown;