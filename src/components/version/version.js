import React from 'react';
import styles from './version.css';
import ReactMarkdown from 'react-markdown';

const devMode = process.env.NODE_ENV === 'development';

class VersionInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value:null, active:false}
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    fetch(devMode ? 'raw/4FKhJjW7' : 'https://pastebin.com/raw/4FKhJjW7')
        .then(r => r.text())
        .then(text => {
          this.update(text, false);
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