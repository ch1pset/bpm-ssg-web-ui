import React from "react"
import ReactMarkdown from "react-markdown"
import Styles from './tooltip.css'

export class Tooltip extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="tooltip" child="container"
                visible={this.props.tooltip !== undefined} style={Styles}>
                <ReactMarkdown 
                    className="tooltip content"
                    children={this.props.tooltip}/>
            </div>
        )
    }
}
