import React from 'react';
import Tooltip from '../tooltip';
import styles from './dropdowns.css';

export class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selection:[]}
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        let selected = e.target.selectedOptions;
        this.setState({
            selection:this.props.multiple ? 
                Object.keys(selected).filter(s => selected[s].value !== "").map(k => selected[k].value)
                : e.target.value
        }, () => {
            console.log(`Selected ${this.state.selection.toString()}`)
            this.props.onChange(this)
        });
    }
    static create({name, className, options, multiple, size, tooltip, onChange}) {
        if(name !== "OTHER") return (
            <Dropdown className={className} name={name} multiple={multiple} size={size}
                options={options}
                tooltip={tooltip}
                onChange={onChange}/>
        )
    }
    static optgroups(groups) {
        return Object.keys(groups).map(n => this.options(n, groups[n]));
    }
    static options(name, options) {
        return (
            <optgroup class="dropdown" child="optgroup" label={name}>
                {options.map((o, i) =>
                    <option class="dropdown" child="option" key={i} value={o}>{o}</option>)}
            </optgroup>
        );
    }
    render() {
        const isMultiple = this.props.multiple;
        return (
            <div className={this.props.className} child="parent" style={styles}>
                <div className="dropdown" child="container">
                    <select className="dropdown" child="select"
                        multiple={this.props.multiple}
                        size={this.props.size}
                        onChange={this.handleChange}>
                        <option class="dropdown" child="option" hidden={isMultiple?true:false} value="">
                            {`Choose ${this.props.name}`}
                        </option>
                        {this.props.options}
                    </select>
                </div>
                <div className="dropdown" child="tooltip">
                    <Tooltip tooltip={
                        this.props.tooltip 
                        + (this.props.multiple ? "*`CTRL + Click` to select multiple*\n\n":''
                    )}/>
                </div>
            </div>
        );
    }
}
