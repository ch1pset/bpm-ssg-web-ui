import React from "react"
import styles from './expander.css'

export class Expander extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.state = {
            show:false,
            animation:'none',
            hover:false
        }
    }
    change(show, hover, animation, cb) {
        this.setState({show, hover, animation}, cb)
    }
    handleHover(e) {
        this.change(this.Expanded, !this.Hover, !this.Hover?'slide':'none');
    }
    handleClick(e) {
        let oldAnimation = this.Animation;
        let timeout = (ms, cb) => setTimeout(cb, ms);
        this.change(!this.Expanded, this.Hover, 'rotate',
            () => timeout(500, () => this.revertAnimation(oldAnimation)));
    }
    get Slide() {
        return !this.Hover ? 'slide' : 'none';
    }
    revertAnimation(oldAnimation) {
        this.change(this.Expanded, this.Hover, this.Hover ? oldAnimation : 'none')
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
    get Animation() {
        return this.state.animation;
    }
    render() {
        return (
            <div className="expander-wrapper" style={styles}>
                <div className="expander-label" onClick={this.handleClick}
                    onPointerEnter={this.handleHover} onPointerLeave={this.handleHover}>
                    <label>{`${this.props.label}`}</label>
                    <div className={'carot'} animation={this.Animation} direction={this.Direction}>
                        <label>{`${this.Expanded ? '˄' : '˅'}`}</label>
                    </div>
                </div>
                <div className={this.props.className} show={`${this.Expanded}`}>
                        {this.props.content}
                </div>
            </div>
        )
    }
}
