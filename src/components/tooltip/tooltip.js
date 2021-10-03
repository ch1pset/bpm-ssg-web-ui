import React from "react"
import ReactMarkdown from "react-markdown"
import Styles from './tooltip.css'

export class Tooltip extends React.Component {
    constructor(props) {
        super(props);
    }
    show() {
        return this.props.show && this.props.tooltip !== undefined
    }
    render() {
        return (
            <div visible={`${this.show()}`} style={Styles}>
                <ReactMarkdown 
                    className="tooltip"
                    children={this.props.tooltip}/>
            </div>
        )
    }
}
