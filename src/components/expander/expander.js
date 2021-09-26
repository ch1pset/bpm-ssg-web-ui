import React from "react"
import styles from './expander.css'

class Expander extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            show:false
        }
    }
    handleClick(e) {
        this.setState({show:!this.state.show})
    }
    render() {
        return (
            <div style={styles}>
                <div className="expander-label" onClick={this.handleClick}>
                    <label>{`>>>${this.state.show ? 'Hide' : 'Show'} More<<<`}</label>
                </div>
                <div className={`expander-${this.state.show ? 'show' : 'hidden'}`}>
                    {this.props.content}
                </div>
            </div>
        )
    }
}

export default Expander;