import React from 'react';
import SeedField from '../seed/seedfield';
import DownloadButton from '../download/download';
import VersionInfo from '../version/version';
import styles from './ssg.css';
import Dropdown from '../dropdowns/dropdown';
import Checkbox from '../checkboxes/checkbox';
import application from '../../../package.json'
import bpmssg from 'bpm-ssg'

const CHARACTERS = [
    "Goll", "Freyr", "Hildr", "Njord", "Odr",
    "Skuld", "Geri", "Herfjoter", "Run", "Sanngridr"
]
const DIFFICULTIES = [
    "Easy", "Hard", "Hellish", "Practice"
]
const FLOORS = [
    ["Asgard I", '0'], ["Asgard II", '1'], ["Asgard Crypts", "Crypts"],
    ["Vanaheim I", '2'], ["Vanaheim II", '3'],
    ["Svartalfheim I", '4'], ["Svartalfheim II", '5'],
    ["Helheim I", '6'], ["Helheim II", '7']
]

class SSG extends React.Component {
    constructor() {
        super();
        this.state = {
            seed:"",
            char:"",
            diff:"",
            opts:{
                FLOORINDEX:0,
                ENHANCE:false
            }
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const isComponent = (name) => e.props.name === name;
        const getFloorIndex = (floor) => FLOORS.find(([f, i]) => f === floor)[1];
        let seed = e.state.seed;
        let sel = e.state.selection;
        let opt = e.state.checked;
        this.setState({
            seed:(isComponent('Seed') ? seed : this.state.seed),
            char:(isComponent('Character') ? sel : this.state.char),
            diff:(isComponent('Difficulty') ? sel : this.state.diff),
            opts:{
                FLOORINDEX:(isComponent('Floor') && e.valid() ? getFloorIndex(sel) : this.state.opts.FLOORINDEX),
                ENHANCE:(isComponent('Enhance') ? opt : this.state.opts.ENHANCE)
            }
        }, () => console.log(this.state));
    }
    handleClick(e) {
        let args = Object.keys(this.state);
        let arg_msg = {
            seed:'\tSeed\n',
            char:'\tCharacter\n',
            diff:'\tDifficulty\n'
        }
        if(this.validate(args)) {
            let data = bpmssg(this.state).serialize();
            let filename = 'ContinueStateV2.sav';
            e.activateDownload({data, filename});
        }
        else {
            let unset = args.map(k => this.state[k] === "" ? arg_msg[k] : '');
            window.alert(`The following options are required:\n${unset.join('')}`);
        }
    }
    validate(args) {
        let result = true;
        args.forEach(key => {
            if(key !== 'opts' && this.state[key] === "") {
                result = false;
            }
        });
        return result;
    }
    render() {
        return (
            <div className="SSG" style={styles}>
                
                <div className="ssg-opt">
                    <Dropdown name="Character" options={CHARACTERS}
                        onChange={this.handleChange}/>
                </div>
                <div className="ssg-opt">
                    <Dropdown name="Difficulty" options={DIFFICULTIES}
                        onChange={this.handleChange}/>
                </div>
                <div className="ssg-opt">
                    <Dropdown name="Floor" options={FLOORS.map(([f, i]) => f)}
                        onChange={this.handleChange}/>
                </div>
                <div className="ssg-opt">
                    <SeedField name="Seed" seed={this.state.seed}
                        onChange={this.handleChange}/>
                </div>
                <div className="ssg-opt">
                    <Checkbox name="Enhance" label="Enhanced Item Pools"
                        onChange={this.handleChange}/>
                </div>
                <div className="ssg-gen">
                    <DownloadButton onClick={this.handleClick} label="Generate Save"/>
                </div>
                <div>
                    <VersionInfo value={application.version}/>
                </div>
            </div>
        )
    }   
}
export default SSG;