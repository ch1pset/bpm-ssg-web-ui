import React from 'react';
import styles from './version.css';
import application from '../../../package.json'

class VersionInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {version:application.version}
  }
  render() {
    return (
      <div className="VersionInfo" styles={styles}>
        <label id="version">v{this.state.version}</label>
      </div>
    );
  }
}

export default VersionInfo;