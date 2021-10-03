import React from 'react';
import styles from './download.css';

export class DownloadButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url:null,
      filename:""
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.props.onClick(this);
  }
  activateDownload(e) {
    let file = new File([e.data], e.filename);
    let url = URL.createObjectURL(file);
    this.setState({
      url, 
      filename:e.filename
    }, () => {
      this.dofileDownload.click();
      URL.revokeObjectURL(url);
      this.setState({
        url:null,
        filename:""
      });
    });
  }
  render() {
    return (
      <div className={this.props.className} style={styles}>
          <button className="download" child="button" onClick={this.handleClick}>{this.props.label}</button>
          <a className="download" style={{display: "none"}}
              download={this.state.filename}
              href={this.state.url}
              ref={e=>this.dofileDownload = e}>
          </a>
      </div>
    );
  }
}
