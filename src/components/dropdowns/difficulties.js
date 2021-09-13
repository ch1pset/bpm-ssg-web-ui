import React from 'react';
import StateContext from '../context.js';
import styles from './dropdowns.css';

class Difficulties extends React.Component {
    static contextType = StateContext;
  constructor(props) {
    super(props);
    this.state = {diff:""};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
      console.log(`Selected ${e.target.value}`);
      this.setState({diff:e.target.value});
      this.context.diff = e.target.value;
  }
  render() {
    return (
      <div className="Dropdown" style={styles}>
          <select name="Difficulties" id="Difficulty-Select" onChange={this.handleChange}>
              <option value="">--Choose a Difficulty--</option>
              <option value="EASY">Easy</option>
              <option value="HARD">Hard</option>
              <option value="HELLISH">Hellish</option>
              <option value="PRACTICE">Practice</option>
          </select>
      </div>
    );
  }
}

export default Difficulties;