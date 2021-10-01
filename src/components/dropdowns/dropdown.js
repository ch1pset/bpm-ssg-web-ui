import React from 'react';
import Tooltip from '../tooltip';
import styles from './dropdowns.css';

export class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selection:[],hover:false}
        this.handleChange = this.handleChange.bind(this);
        this.handleHover = this.handleHover.bind(this);
    }
    handleChange(e) {
        let selected = e.target.selectedOptions;
        this.setState({
            selection:this.props.multiple ? 
                Object.keys(selected).filter(s => selected[s].value !== "").map(k => selected[k].value)
                : e.target.value,
            hover:this.state.hover
        }, () => {
            console.log(`Selected ${this.state.selection.toString()}`)
            this.props.onChange(this)
        });
    }
    handleHover(e) {
        this.setState({
            selection:this.state.selection,
            hover:!this.state.hover
        })
    }
    render() {
        return (
            <div className={this.props.className} style={styles}>
                <select className="Dropdown"
                    multiple={this.props.multiple}
                    onChange={this.handleChange}
                    onPointerEnter={this.handleHover}
                    onPointerLeave={this.handleHover}>
                    <option value="">--Choose {this.props.multiple ? '':'a'} {this.props.name}--</option>
                    {this.props.options
                        .map((opt, i) => <option className="dropdown-option"
                                            key={i} value={opt}>{opt}</option>)}
                </select>
                <Tooltip show={this.state.hover}
                    tooltip={this.props.tooltip + (this.props.multiple ? "*`CTRL + Click` to select multiple*\n\n":'')}/>
            </div>
        );
    }
}
