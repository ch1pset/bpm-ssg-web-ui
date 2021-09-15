import React from 'react';
import StateContext from '../context.js';
import styles from './seedfield.css';

class SeedField extends React.Component {
  static contextType = StateContext;
  constructor(props) {
    super(props);
    this.state = {seed:"enter a seed here..."}
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(e) {
    this.setState({seed:e.target.value}, () => {
      if(this.state.seed === "")
        this.setState({seed:"enter a seed here..."})
    });
    this.context.seed = e.target.value;
  }
  handleClick(e) {
    this.setState({seed:this.genSeed(Date.now())}, () => {
      this.context.seed = this.state.seed;
      this.setState({seed:this.context.seed})
    })
  }
  xorShift(seed)
  {
      let x = seed;
      x ^= x << 13;
      x ^= x >>> 7; //bitshift right without preserving sign because JS is dumb
      x ^= x << 17;
      return x;
  }
  genSeed(seed)
  {
    let output = "";
    let cseed = this.xorShift(seed);
    let i = 0;
    do {
      let chars = "0123456789abcdefghijklmnopqrstuvwxyz"
      cseed = this.xorShift(cseed);
      output += chars.at(this.xorShift(cseed) % 36)
      i++
    } while(i < 20)
    return output;
  }
  render() {
    return (
      <div className="SeedField" styles={styles}>
        <div>
          <input onChange={this.handleChange} 
                placeholder={this.state.seed} 
                value={this.context.seed}
                className="Field"/>
          <button className="Field button" 
              style={styles} 
              onClick={this.handleClick}
              >Random</button>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default SeedField;