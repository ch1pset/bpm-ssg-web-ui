import React from 'react';
import SeedField from '../seed/seedfield';
import DownloadButton from '../download/download';
import VersionInfo from '../version/version';
import styles from './ssg.css';
import Dropdown from '../dropdowns/dropdown';
import Checkbox from '../checkboxes/checkbox';
import application from '../../../package.json'
import bpmssg from 'bpm-ssg'
import Expander from '../expander/expander';

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
const TOOTIP = {
    ENHANCE: "Complete rebalancing of item pools:\n"
            + "* Gold chests have mid-to-low tier items\n"
            + "* Shop only has low-tier, utility items\n"
            + "* Guaranteed high-tier items in Well Room\n"
            + "* More Boss chest loot(coin bags, precision up, health up)\n"
            + "* Angel/Devil Statues give mid-to-high tier loot\n"
            + "* Hero chests(wave 3/boss challenge) always give high-tier loot\n"
            + "* Library and Weapon pools are rebalanced\n"
            + "* Skeleton Key is now very rare, only in gold chests",
    FLOOR: "WARNING: Practice difficulty ends on Gullveig, even in Helheim",
    SEED: "All unicode characters valid\n\n"
            + "Special Seeds(experimental):\n"
            + "* `null`\n\t* No \"FloorSeeds\" are generated\n\t* Special Room and Item randomization seeded with a value of 0",
    REQUIRED: "*Required*\n\n",
    OPTIONAL: "*Optional*\n\n"
}

class SSG extends React.Component {
    constructor() {
        super();
        this.state = {
            seed:"",
            char:"",
            diff:"",
            opts:{
                FLOORINDEX:0,
                ENHANCE:false,
                CHOICE:false,
                STAIRS:false,
                PRESTIGE:false,
                BLACKMARKET:false,
                PORTAL:false
            },
            hidden:true
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleHidden = this.toggleHidden.bind(this);
    }
    handleChange(e) {
        const isComponent = (name) => e.props.name === name;
        const getFloorIndex = (floor) => FLOORS.find(([f, i]) => f === floor)[1];
        let seed = e.state.seed;
        let sel = e.state.selection;
        let opt = e.state.checked;
        let hidden = e.state.hidden;
        this.setState({
            seed:(isComponent('Seed') ? seed : this.state.seed),
            char:(isComponent('Character') ? sel : this.state.char),
            diff:(isComponent('Difficulty') ? sel : this.state.diff),
            opts:{
                FLOORINDEX:(isComponent('Floor') && e.valid() ? getFloorIndex(sel) : this.state.opts.FLOORINDEX),
                ENHANCE:(isComponent('Enhance') ? opt : this.state.opts.ENHANCE),
                CHOICE:(isComponent('Choice') ? opt : this.state.opts.CHOICE),
                STAIRS:(isComponent('Stairs') ? opt : this.state.opts.STAIRS),
                PRESTIGE:(isComponent('Prestige') ? opt : this.state.opts.PRESTIGE),
                BLACKMARKET:(isComponent('BlackMarket') ? opt : this.state.opts.BLACKMARKET),
                PORTAL:(isComponent('Portal') ? opt : this.state.opts.PORTAL),
                NULLSEED:isComponent('Seed') ? (seed.toUpperCase()==="NULL" ? true : false) : this.state.seed,
            },
            hidden:hidden!==undefined ? hidden : this.state.hidden
        });
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
    toggleHidden(e) {
        this.handleChange({state:{hidden:!this.state.hidden},props:{}});
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
                        tooltip={TOOTIP.REQUIRED}
                        onChange={this.handleChange}/>
                </div>
                <div className="ssg-opt">
                    <Dropdown name="Difficulty" options={DIFFICULTIES}
                        tooltip={TOOTIP.REQUIRED}
                        onChange={this.handleChange}/>
                </div>
                <div className="ssg-opt">
                    <SeedField name="Seed" seed={this.state.seed}
                        tooltip={`${TOOTIP.REQUIRED}${TOOTIP.SEED}`}
                        onChange={this.handleChange}/>
                </div>

                <div className="ssg-opt">
                    <Dropdown name="Floor" options={FLOORS.map(([f, i]) => f)}
                        tooltip={`${TOOTIP.OPTIONAL}${TOOTIP.FLOOR}`}
                        onChange={this.handleChange}/>
                </div>
                <div className="ssg-opt">
                    <Checkbox name="Enhance" label="Enhanced Item Pools" 
                        tooltip={`${TOOTIP.OPTIONAL}${TOOTIP.ENHANCE}`}
                        onChange={this.handleChange}/>
                </div>
                <Expander label="Click to Expand Options" 
                    content={
                    <div>
                        <div className="ssg-opt">
                            <Checkbox name="Choice" label="Force Well Room" 
                                tooltip={TOOTIP.OPTIONAL}
                                onChange={this.handleChange}/>
                            <Checkbox name="Stairs" label="Force Stairs Room" 
                                tooltip={TOOTIP.OPTIONAL}
                                onChange={this.handleChange}/>
                            <Checkbox name="Prestige" label="Force Prestige Room" 
                                tooltip={TOOTIP.OPTIONAL}
                                onChange={this.handleChange}/>
                        </div>
                        <div className="ssg-opt">
                            <Checkbox name="BlackMarket" label="Force Black Market Room" 
                                tooltip={TOOTIP.OPTIONAL}
                                onChange={this.handleChange}/>
                            <Checkbox name="Portal" label="Force Portal Room" 
                                tooltip={TOOTIP.OPTIONAL}
                                onChange={this.handleChange}/>
                        </div>
                    </div>}/>
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