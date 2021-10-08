import React from 'react';
import styles from './seedfield.css';
import xorshift from '../../utils/xorshift';
import Tooltip from '../tooltip';

export class SeedField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {seed:""}
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(e) {
    this.setState({
      seed:e.target.value
    }, () => this.props.onChange(this));
  }
  handleClick(e) {
    this.setState({
      seed:this.genSeed(Date.now())
    }, () => {
      this.setState({
        seed:this.state.seed
      });
      this.props.onChange(this);
    });
  }
  genSeed(seed)
  {
    let output = "";
    let chars = "0123456789abcdefghijklmnopqrstuvwxyz"
    for(let i = 0; i < 20; i++)
      output += chars.at((seed = xorshift(seed)) % 36);
    return output;
  }
  render() {
    return (
      <div className={this.props.className} child="parent" styles={styles}>
        <div className="seedfield" child="outer-container">
            <div className="seedfield" child="inner-container">
              <input className="seedfield" child="field"
                  onChange={this.handleChange} 
                  placeholder="enter a seed here..."
                  value={this.state.seed}/>
              <div className="seedfield" child="button"
                  style={styles} 
                  onClick={this.handleClick}
                  >Random</div>
            </div>
            <div child="tooltip">
              <Tooltip show={this.state.hover} tooltip={this.props.tooltip}/>
            </div>
        </div>
      </div>
    );
  }
}
