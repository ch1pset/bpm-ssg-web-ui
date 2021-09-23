import React from "react"
import ReactMarkdown from "react-markdown"
import Styles from './tooltip.css'

class Tooltip extends React.Component {
    constructor(props) {
        super(props);
    }
    show() {
        return this.props.show && this.props.tooltip !== undefined
    }
    render() {
        return (
            <div style={Styles}>
                <ReactMarkdown 
                    className={`tooltip${this.show() ? '-visible': ''}`} 
                    children={this.props.tooltip}/>
            </div>
        )
    }
}

export default Tooltip;