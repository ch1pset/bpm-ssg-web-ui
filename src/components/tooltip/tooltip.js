import React from "react"
import ReactMarkdown from "react-markdown"
import Styles from './tooltip.css'

class Tooltip extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={Styles}>
                <ReactMarkdown 
                    className={`tooltip${this.props.show ? '-visible': ''}`} 
                    children={this.props.tooltip}/>
            </div>
        )
    }
}

export default Tooltip;