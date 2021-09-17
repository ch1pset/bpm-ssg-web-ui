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
    let data = [e.data];
    let filename = e.filename;
    let file = new File(data, filename);
    let url = URL.createObjectURL(file);
    this.setState({url, filename}, () => 
    {
      this.dofileDownload.click();
      URL.revokeObjectURL(url);
      this.setState({url:null,filename:""})
    })
  }
  render() {
    return (
      <div className="Button" style={styles}>
          <button className="gen" onClick={this.handleClick}>Generate Save</button>
          <a style={{display: "none"}}
              download={this.state.filename}
              href={this.state.url}
              ref={e=>this.dofileDownload = e}
          >download</a>
      </div>
    );
  }
}

export default DownloadButton;