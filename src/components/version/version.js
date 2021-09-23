import React from 'react';
import styles from './version.css';
import ReactMarkdown from 'react-markdown';
import API from '../../api';

const gistId = 'af22f4d07c0720cd7cceb3d41d8fdd73'

class VersionInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value:null, active:false}
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    fetch(`${API.gist}/${gistId}`)
        .then(r => r.text())
        .then(text => {
          this.update(JSON.parse(text).files['changelog.md'].content, false);
        })
  }
  handleClick(e) {
    this.update(this.state.value, !this.state.active);
  }
  update(value, active) {
    this.setState({value, active});
  }
  render() {
    return (
      <div styles={styles}>
        <label className="version" 
          onClick={this.handleClick} >v{this.props.value}</label>
        <ReactMarkdown 
            className={`info${this.state.active ? '-active':''}`}
            children={this.state.value}/>
      </div>
    );
  }
}

export default VersionInfo;