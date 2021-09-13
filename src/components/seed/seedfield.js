import React from 'react';
import StateContext from '../context.js';
import styles from './seedfield.css';

class SeedField extends React.Component {
  static contextType = StateContext;
  constructor(props) {
    super(props);
    this.state = {seed:"enter a seed here..."}
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({seed:e.target.value});
    this.context.seed = e.target.value;
  }
  render() {
    return (
      <div className="SeedField" styles={styles}>
        <div>
          <input onChange={this.handleChange} placeholder={this.state.seed}/>
        </div>
      </div>
    );
  }
}

export default SeedField;