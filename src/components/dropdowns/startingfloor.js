import React from 'react';
import StateContext from '../context.js';
import styles from './dropdowns.css';

class StartingFloor extends React.Component {
    static contextType = StateContext;
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
      console.log(`Selected ${e.target.value}`);
      this.context.opts.FLOORINDEX = e.target.value;
  }
  render() {
    return (
      <div className="Dropdown" style={styles}>
          <select name="StartingFloor" id="Difficulty-Select" onChange={this.handleChange}>
              <option value="">--Choose a Starting Floor--</option>
              <option value="0">Asgard I</option>
              <option value="1">Asgard II</option>
              <option value="Crypts">Asgard Crypts</option>
              <option value="2">Vanaheim I</option>
              <option value="3">Vanaheim II</option>
              <option value="4">Svartalfheim I</option>
              <option value="5">Svartalfheim II</option>
              <option value="6">Helheim I</option>
              <option value="7">Helheim II</option>
          </select>
      </div>
    );
  }
}

export default StartingFloor;