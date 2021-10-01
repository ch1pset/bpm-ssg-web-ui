import React from 'react';
import styles from './seedfield.css';
import xorshift from '../../utils/xorshift';
import Tooltip from '../tooltip';

export class SeedField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {seed:"", hover:false}
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }
  handleChange(e) {
    this.setState({
      seed:e.target.value,
      hover:this.state.hover
    }, () => this.props.onChange(this));
  }
  handleClick(e) {
    this.setState({
      seed:this.genSeed(Date.now()),
      hover:this.state.hover
    }, () => {
      this.setState({
        seed:this.state.seed,
        hover:this.state.hover
      });
      this.props.onChange(this);
    });
  }
  handleHover() {
    this.setState({
      seed:this.state.seed,
      hover:!this.state.hover
    })
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
      <div styles={styles}>
          <div onPointerEnter={this.handleHover} 
              onPointerLeave={this.handleHover} 
              className="seedfield">
            <input onChange={this.handleChange} 
                  placeholder="enter a seed here..."
                  value={this.state.seed}
                  className="Field"/>
            <div className="button" 
                style={styles} 
                onClick={this.handleClick}
                >Random</div>
          </div>
          <Tooltip show={this.state.hover} tooltip={this.props.tooltip}/>
      </div>
    );
  }
}
