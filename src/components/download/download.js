import React from 'react';
import styles from './download.css';

class DownloadButton extends React.Component {
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
      <div className="Button" style={styles}>
          <button className="gen" onClick={this.handleClick}>{this.props.label}</button>
          <a style={{display: "none"}}
              download={this.state.filename}
              href={this.state.url}
              ref={e=>this.dofileDownload = e}>
          </a>
      </div>
    );
  }
}

export default DownloadButton;