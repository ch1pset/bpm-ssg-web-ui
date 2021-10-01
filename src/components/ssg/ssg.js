import React from 'react';
import ReactMarkdown from 'react-markdown';
import SeedField from '../seed';
import DownloadButton from '../download';
import styles from './ssg.css';
import Dropdown from '../dropdowns';
import Checkbox from '../checkboxes';
import application from '../../../package.json'
import bpmssg from 'bpm-ssg'
import Expander from '../expander';
import SsgContext from './context';
import NumberField from '../numberfield';
import { 
    CHARACTERS, DIFFICULTIES, FLOORS, 
    LOADOUT, TOOLTIP, STATS, ROOMS, TRAITS 
} from './data.json'
import API from '../../api';

const gistId = 'af22f4d07c0720cd7cceb3d41d8fdd73'

export class SSG extends React.Component {
    static contextType = SsgContext;
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            bMissingRequisites:true,
            bTooManySelectedCurses:false,
            bTooManyStatPoints:false,
            changelog:""
        }
    }
    get Changelog() {
        return this.state.changelog;
    }
    set Changelog(changelog) {
        this.setState({
            bMissingRequisites:this.state.bMissingRequisites,
            bTooManySelectedCurses:this.state.bTooManySelectedCurses,
            bTooManyStatPoints:this.state.bTooManyStatPoints,
            changelog
        })
    }
    componentDidMount() {
      fetch(`${API.gist}/${gistId}`)
          .then(r => r.text())
          .then(text => {
            this.Changelog = JSON.parse(text).files['changelog.md'].content;
          })
    }
    handleChange(e) {
        switch(e.props.name.toLowerCase()) {
            case 'seed':
                this.context.seed = e.state.seed;
                this.context.opts.NULLSEED = false;
                if(this.context.seed.toUpperCase() === 'NULL')
                    this.context.opts.NULLSEED = true;
        
                console.log(this.context);
                break;
            case 'character':
                this.context.char = e.state.selection;
                console.log(this.context)
                break;
            case 'difficulty':
                this.context.diff = e.state.selection;
                console.log(this.context)
                break;
            case 'floor':
                let floor = FLOORS.find(([f, i]) => f === e.state.selection);
                this.context.opts.FLOORINDEX = floor!==undefined ? floor[1] : 0;
                console.log(this.context.opts);
                break;
            case 'enhance': case 'choice':
            case 'stairs': case 'prestige':
            case 'blackmarket': case 'portal':
            case 'ultcharge':
                this.context.opts[e.props.name.toUpperCase()] = e.state.checked;
                console.log(this.context.opts)
                break;
            case 'weapon': case 'auxilary':
            case 'secondary': case 'ultimate':
                this.context.opts[e.props.name.toUpperCase()] = e.state.selection;
                console.log(this.context.opts);
                break;
            case 'curse':
                this.context.opts.CURSES = e.state.selection;
                console.log(this.context.opts.CURSES);
                break;
            case 'health': case 'shield':
            case 'coins': case 'keys':
                this.context.opts[e.props.name.toUpperCase()] = e.state.value;
                console.log(this.context.opts);
                break;
            case 'ammo':
                this.context.opts.STATS.AMMO = e.state.value;
                console.log(this.context.opts.STATS);
                break;
            case 'ability': case 'precision':
            case 'damage': case 'luck':
            case 'range': case 'speed':
                let name = e.props.name.toUpperCase();
                this.context.opts.STATS[name] = e.state.value;
                console.log(this.context.opts.STATS);
                break;
            case 'clearall': case 'goldhealth':
            case 'small': case 'banks':
            case 'noweapons': case 'nohealth':
            case 'noshops': case 'notreasure':
            case 'noarmory':
                this.context.opts.TRAITS[e.props.name.toUpperCase()] = e.state.checked;
                break;
        }
    }
    handleClick(e) {
        this.validate(() => {
            let data = bpmssg(this.context).serialize();
            let filename = 'ContinueStateV2.sav';
            e.activateDownload({data, filename});
        });
    }
    validate(cb) {
        let args = Object.keys(this.context);
        let stats = this.context.opts.STATS;
        let [bMissingRequisites, bTooManySelectedCurses, bTooManyStatPoints] = [false, false, false]
        args.forEach(key => {
            if(key !== 'opts' && this.context[key] === "") {
                bMissingRequisites = true;
            }
        });
        if(this.context.opts.CURSES.length > 4)
            bTooManySelectedCurses = true;
        Object.keys(stats).every(s => {
            let result = stats[s] < 10
            console.log(result);
            return result;
        })
        if(!Object.keys(stats).every(s => stats[s] <= 10))
            bTooManyStatPoints = true;

        this.setState({
            bMissingRequisites, 
            bTooManySelectedCurses,
            bTooManyStatPoints
        }, () => {
            if(!bMissingRequisites && !bTooManySelectedCurses && !bTooManyStatPoints)
                cb();
            else {
                let msg = "";
                let arg_msg = {
                    seed:'\tSeed\n',
                    char:'\tCharacter\n',
                    diff:'\tDifficulty\n'
                }
                if(this.state.bTooManySelectedCurses) {
                    msg += `Only up to 4 Curses can be selected\n\n`
                }
                if(this.state.bTooManyStatPoints) {
                    msg += `Stat points cannot be greater than 10\n\n`
                }
                if(this.state.bMissingRequisites) {
                    let unset = args.map(k => this.context[k] === "" ? arg_msg[k] : '');
                    msg += `The following options are required:\n${unset.join('')}\n\n`
                }
                window.alert(msg);
            }
        });
    }
    render() {
        return (
            <div className="SSG" style={styles}>
                <Dropdown className="ssg-opt" name="character" options={CHARACTERS}
                    tooltip={TOOLTIP.REQUIRED} onChange={this.handleChange}/>
                <Dropdown className="ssg-opt" name="difficulty" options={DIFFICULTIES}
                    tooltip={TOOLTIP.REQUIRED} onChange={this.handleChange}/>
                <SeedField className="ssg-opt" name="seed" seed={this.context.seed}
                    tooltip={`${TOOLTIP.REQUIRED}${TOOLTIP.SEED.join('\n')}`}
                    onChange={this.handleChange}/>
                <Dropdown className="ssg-opt" name="floor" options={FLOORS.map(([f, i]) => f)}
                    tooltip={`${TOOLTIP.OPTIONAL}${TOOLTIP.FLOOR}`}
                    onChange={this.handleChange}/>
                <Checkbox className="ssg-opt" name="enhance" label="Enhanced Item Pools" 
                    tooltip={`${TOOLTIP.OPTIONAL}${TOOLTIP.ENHANCE.join('\n')}`}
                    onChange={this.handleChange}/>
                <Expander className="ssg-expand" label="Special Room Options" font='Norse' content={
                    <div className="ssg-group">
                        {ROOMS.map(
                        ([name, label]) => <Checkbox className="radio" name={name} label={label} 
                                                tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>)}
                    </div>
                }/>
                <Expander className="ssg-expand" label="Character/Challenge Traits" font='Norse' content={
                    <div className="ssg-group">
                        {TRAITS.map(
                        ([name, label]) => <Checkbox className="radio" name={name} label={label}
                                                tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>)}
                    </div>
                }/>
                <Expander className="ssg-expand" label="Loadout Options" font='Norse' content={
                    <div className="ssg-group vertical">
                        {Object.keys(LOADOUT).map(
                        (name) => <Dropdown className="dropdown" name={name} options={LOADOUT[name]}
                                    multiple={name==='CURSE'} tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>)}                                        
                        <Checkbox className="dropdown" name="ultcharge" label="Ultimate Charged at Start"
                            tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>
                    </div>
                }/>
                <Expander className="ssg-expand" label="Stats/Inventory Options" font='Norse' content={
                    <div className="ssg-group">
                        {STATS.map(
                        ([name, label]) => <NumberField className="number" name={name} label={label} hideCursor={true}
                                                tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>)}
                    </div>
                }/>
                <DownloadButton onClick={this.handleClick} label="Generate Save"/>
                <Expander className="ssg-expand version" hideCaret={true}
                    font='Verdana' label={`v${application.version}`} 
                    content={<ReactMarkdown className="changelog" children={this.Changelog}/>}/>
            </div>
        )
    }   
}
