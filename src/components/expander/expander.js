import React from "react"
import styles from './expander.css'

export class Expander extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
        this.state = {
            show:false, hover:false,
            caretAnimation:'none',
            expandAnimation:'none',
        }
    }
    handleHover(e) {
        this.setState({
            hover:!this.Hover,
            caretAnimation:!this.Hover ? 'slide' : 'none'
        });
    }
    handleClick(e) {
        this.setState({
            show:!this.Expanded,
            caretAnimation:'rotate',
            expandAnimation:!this.Expanded ? 'open' : 'close'
        }, () => this.props.onExpand ? this.props.onExpand(this) : undefined);
    }
    handleAnimationEnd(e) {
        this.setState({
            caretAnimation:this.Hover ? 'slide' : 'none',
            expandAnimation:'none'
        })
    }
    get Slide() {
        return !this.Hover ? 'slide' : 'none';
    }
    get Hover() {
        return this.state.hover;
    }
    get Expanded() {
        return this.state.show;
    }
    get Direction() {
        return this.Expanded ? 'up' : 'down';
    }
    get CaretAnimation() {
        return this.state.caretAnimation;
    }
    get ExpandAnimation() {
        return this.state.expandAnimation
    }
    render() {
        const UP = '˄';
        const DOWN = '˅';
        return (
            <div id={this.props.id} className={this.props.className} style={styles}>
                <div className="expander" child="label-container" 
                    onClick={this.handleClick}
                    onPointerEnter={this.handleHover} onPointerLeave={this.handleHover}>
                    <label className="expander" child="label">{`${this.props.label}`}</label>
                    <div className="expander" child="caret" 
                        style={{display:`${this.props.hideCaret?'none':'block'}`}}
                        animation={this.CaretAnimation} direction={this.Direction}>
                        <label>{`${this.Expanded ? UP : DOWN}`}</label>
                    </div>
                </div>
                <div className="expander" child="content-container"
                    onAnimationEnd={this.handleAnimationEnd}
                    animation={this.ExpandAnimation} expand={`${this.Expanded}`}>
                    {this.props.content}
                </div>
            </div>
        )
    }
}
