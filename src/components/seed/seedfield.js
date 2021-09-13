import React from 'react';
import StateContext from '../context.js';
import styles from './seedfield.css';

class SeedField extends React.Component {
  static contextType = StateContext;
  constructor(props) {
    super(props);
    this.state = {text:"Seed"}
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({text:e.target.value});
    this.context.seed = e.target.value;
  }
  render() {
    return (
      <div className="SeedField" styles={styles}>
        <div>
          <input onChange={this.handleChange} value={this.context.seed}/>
        </div>
      </div>
    );
  }
}

export default SeedField;