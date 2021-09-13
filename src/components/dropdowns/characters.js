import React from 'react';
import StateContext from '../context.js';
import styles from './dropdowns.css';

class Characters extends React.Component {
  static contextType = StateContext;
  constructor(props) {
    super(props);
    this.state = {char:""}
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    console.log(`Selected ${e.target.value}`)
    this.setState({char:e.target.value})
    this.context.char = e.target.value;
  }
  render() {
    return (
      <div className="Dropdown" style={styles}>
          <select name="Characters" id="Character-Select" onChange={this.handleChange}>
              <option value="">--Choose a Character--</option>
              <option value="goll">Goll</option>
              <option value="freyr">Freyr</option>
              <option value="hildr">Hildr</option>
              <option value="njord">Njord</option>
              <option value="odr">Odr</option>
              <option value="skuld">Skuld</option>
              <option value="geri">Geri</option>
              <option value="herfjoter">Herfjoter</option>
              <option value="run">Run</option>
              <option value="sanngridr">Sanngridr</option>
          </select>
      </div>
    );
  }
}

export default Characters;