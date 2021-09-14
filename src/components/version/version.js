import React from 'react';
import StateContext from '../context.js';
import styles from './version.css';
import application from '../../../package.json'

class VersionInfo extends React.Component {
  static contextType = StateContext;
  constructor(props) {
    super(props);
    this.state = {version:application.version}
  }
  render() {
    return (
      <div className="VersionInfo" styles={styles}>
        <label>v{this.state.version}</label>
      </div>
    );
  }
}

export default VersionInfo;