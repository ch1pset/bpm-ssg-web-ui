import React from 'react';
import StateContext from '../context.js';
import {bpmssg} from 'bpm-ssg'
import styles from './generate.css';

class GenerateButton extends React.Component {
  static contextType = StateContext;
  constructor(props) {
    super(props);
    this.state = {
      url:null,
      filename:""
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
      if(this.context.seed !== "" && this.context.char !== "" && this.context.diff !== "") {
        console.log(`Generating save for ${JSON.stringify(this.context)}`)
        let savedata = [bpmssg(this.context).serialize()];
        let filename = `ContinueStateV2.sav`;
        let file = new File(savedata, filename);
        let url = URL.createObjectURL(file);
        this.setState({url,filename}, () => {
          this.dofileDownload.click();
          URL.revokeObjectURL(url);
          url = null;
          file = null;
          filename = "";
          this.setState({url,filename}, () => window.location.reload(false))
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
              download={this.state.filename}
              href={this.state.url}
              ref={e=>this.dofileDownload = e}
          >download</a>
      </div>
    );
  }
}

export default GenerateButton;