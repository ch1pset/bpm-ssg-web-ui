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
                <div className="dropdown" child="container">
                    <select className="dropdown" child="select"
                        multiple={this.props.multiple}
                        onChange={this.handleChange}
                        onPointerEnter={this.handleHover}
                        onPointerLeave={this.handleHover}>
                        <optgroup class="dropdown" child="optgroup"
                            label={!this.props.multiple?this.props.name:''}>
                            <option class="dropdown" child="option" hidden={true} value="">
                                {`Choose a ${this.props.name}`}
                            </option>
                            {this.props.options.map((opt, i) => (
                                <option class="dropdown" child="option" key={i} value={opt}>{opt}</option>
                            ))}
                        </optgroup>
                    </select>
                </div>
                <div className="dropdown" child="tooltip">
                    <Tooltip show={this.state.hover} tooltip={
                        this.props.tooltip 
                        + (this.props.multiple ? "*`CTRL + Click` to select multiple*\n\n":''
                    )}/>
                </div>
            </div>
        );
    }
}
