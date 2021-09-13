import React from 'react';
import StateContext from '../context.js';
import {bpmssg} from 'bpm-ssg'
import styles from './generate.css';

class GenerateButton extends React.Component {
  static contextType = StateContext;
  constructor(props) {
    super(props);
    this.state = {url:""}
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
      if(this.context.seed !== "" && this.context.char !== "" && this.context.diff !== "") {
        const blob = new Blob([bpmssg(this.context)]);
        const url = URL.createObjectURL(blob);
        this.setState({url}, () => {
          this.dofileDownload.click();
          URL.revokeObjectURL(url);
          this.setState({url:""});
        })
      } else {
        window.alert(`All fields must be chosen/filled`);
        console.log(`Error: Value missing from '${JSON.stringify(this.context)}'`);
      }
  }
  render() {
    return (
      <div className="Button" style={styles}>
          <button className="gen" onClick={this.handleClick}>Generate</button>
          <a style={{display: "none"}}
              download="ContinueStateV2.sav"
              href={this.state.url}
              ref={e=>this.dofileDownload = e}
          >download</a>
      </div>
    );
  }
}

export default GenerateButton;