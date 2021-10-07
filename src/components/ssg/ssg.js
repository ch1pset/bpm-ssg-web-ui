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
        this.handleLoadChangelog = this.handleLoadChangelog.bind(this);
        this.state = {
            bMissingRequisites:true,
            bTooManyStatPoints:false,
            changelog:""
        }
    }
    get bMissingRequisites() {
        return this.state.bMissingRequisites;
    }
    get bTooManyStatPoints() {
        return this.state.bTooManyStatPoints;
    }
    get Changelog() {
        return this.state.changelog;
    }
    set Changelog(changelog) {
        this.setState({changelog})
    }
    handleLoadChangelog(e) {
        if(this.state.changelog === "")
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
                this.context.opts[e.props.name] = e.state.selection;
                console.log(this.context.opts);
                break;
            case 'head item': case 'arm item':
            case 'chest item': case 'leg item':
                this.context.opts[e.props.name.split(' ')[0]] = e.state.selection;
                console.log(this.context.opts);
                break;
            case 'curses':
                this.context.opts.CURSES = e.state.selection;
                console.log(this.context.opts.CURSES);
                break;
            case 'health': case 'shield':
            case 'coins': case 'keys':
                this.context.opts[e.props.name.toUpperCase()] = e.state.value;
                console.log(this.context.opts);
                break;
            case 'ammo':
                this.context.opts.AMMO = e.state.value;
                console.log(this.context.opts);
                break;
            case 'ability': case 'precision':
            case 'damage': case 'luck':
            case 'range': case 'speed':
                let name = e.props.name.toUpperCase();
                this.context.opts.STATS[name] = `${parseInt(e.state.value) + 1}`;
                console.log(this.context.opts.STATS);
                break;
            case 'clearall': case 'goldhealth':
            case 'small': case 'banks':
                this.context.opts.TRAITS[e.props.name.toUpperCase()] = e.state.checked;
                break;
            case 'noweapons': case 'nohealth':
            case 'noshops': case 'notreasure':
            case 'noarmory':
                this.context.opts.TRAITS[e.props.name.toUpperCase()] = !e.state.checked;
                break;
        }
        this.validate();
    }
    handleClick(e) {
        if(!this.bMissingRequisites && !this.bTooManyStatPoints){
            let data = bpmssg(this.context).serialize();
            let filename = 'ContinueStateV2.sav';
            e.activateDownload({data, filename});
        }
        else {
            let msg = "";
            let args = Object.keys(this.context);
            let arg_msg = {
                seed:'\tSeed\n',
                char:'\tCharacter\n',
                diff:'\tDifficulty\n'
            }
            if(this.bMissingRequisites) {
                let unset = args.map(k => this.context[k] === "" ? arg_msg[k] : '');
                msg += `The following options are required:\n${unset.join('')}\n\n`
            }
            if(this.bTooManyStatPoints) {
                msg += `Stat points other than Health/Shield cannot be greater than 9\n\n`
            }
            window.alert(msg);
        }
    }
    validate() {
        let stats = this.context.opts.STATS;
        let [bMissingRequisites, bTooManyStatPoints] = [false, false]
        Object.keys(this.context).forEach(key => {
            if(key !== 'opts' && this.context[key] === "") {
                bMissingRequisites = true;
            }
        });
        Object.keys(stats).every(s => {
            let result = stats[s] < 10
            console.log(result);
            return result;
        })
        if(Object.keys(stats).some(s => stats[s] > 10))
            bTooManyStatPoints = true;

        this.setState({
            bMissingRequisites,
            bTooManyStatPoints
        });
    }
    render() {
        const LOADOUT_OPTIONS = (
            <div className="group md">
                <div id="items">
                {Object.keys(LOADOUT).slice(0, 2).map((name) => (
                    <Dropdown className="selection" name={name} options={LOADOUT[name]}
                        tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>))}
                </div>
                <div id="items">
                {Object.keys(LOADOUT.ABILITIES).map((name) => (
                    <Dropdown className="selection" name={name} options={LOADOUT.ABILITIES}
                        tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>))}
                </div>
                {Object.keys(LOADOUT.ITEMS).map((name) => (
                    <Dropdown className="selection" name={name} options={LOADOUT.ITEMS}
                        tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>))}
                <Checkbox className="radio" boxStyle="round" name="ultcharge"
                    label="Charge Ultimate" tooltip={TOOLTIP.OPTIONAL+TOOLTIP.ULTCHARGE}
                    onChange={this.handleChange}/>
                <label className="selection label">Curses</label>
                <Dropdown className="selection multiple" name="CURSES"
                    options={LOADOUT.CURSE} multiple={true} size={8}
                    tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>
            </div>
        );
        const MORE_OPTIONS = (
            <div className="group lg">
                <Expander id="inventory" className='expand md' label='Inventory' 
                    content={STATS.slice(0, 3).map(([name, label]) => (
                        <NumberField className="number" name={name} label={label}
                            hideCursor={true} tooltip={TOOLTIP.OPTIONAL}
                            onChange={this.handleChange}/>))}/>
                <Expander id="stats" className='expand md' label='Stats' 
                    content={STATS.slice(3).map(([name, label]) => (
                        <NumberField className="number" name={name} label={label}
                            hideCursor={true} tooltip={TOOLTIP.OPTIONAL}
                            onChange={this.handleChange}/>))}/>
                <Expander id="loadout" className="expand md" label="Loadout"
                    content={LOADOUT_OPTIONS}/>
                <Expander id="rooms" className='expand md' label="Special Rooms" 
                    content={ROOMS.map(([name, label]) => (
                        <Checkbox className='radio' name={name} label={label} 
                            tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>))}/>
                <Expander id="traits" className="expand md" label="Special Traits" 
                    content={TRAITS.map(([name, label]) => (
                        <Checkbox className="radio" name={name} label={label}
                            tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>))}/>
            </div>
        );
        return (
            <div className="SSG" style={styles}>
                <Dropdown className="ssg-opt" name="Character" options={CHARACTERS}
                    tooltip={TOOLTIP.REQUIRED} onChange={this.handleChange}/>
                <Dropdown className="ssg-opt" name="Difficulty" options={DIFFICULTIES}
                    tooltip={TOOLTIP.REQUIRED} onChange={this.handleChange}/>
                <SeedField className="ssg-opt" name="Seed" seed={this.context.seed}
                    tooltip={`${TOOLTIP.REQUIRED}${TOOLTIP.SEED.join('\n')}`}
                    onChange={this.handleChange}/>
                <Dropdown className="selection" name="Floor" options={FLOORS.map(([f, i]) => f)}
                    tooltip={`${TOOLTIP.OPTIONAL}${TOOLTIP.FLOOR}`}
                    onChange={this.handleChange}/>
                <Checkbox className="top-radio" boxStyle="round" name="enhance"
                    label="Enhanced Item Pools" 
                    tooltip={`${TOOLTIP.OPTIONAL}${TOOLTIP.ENHANCE.join('\n')}`}
                    onChange={this.handleChange}/>
                <Expander id="more" className="expand lg" label='More Options' 
                    content={MORE_OPTIONS}/>
                <DownloadButton className="generate" onClick={this.handleClick} label="Generate Save"/>
                <Expander id="version" className="expand md" onExpand={this.handleLoadChangelog}
                    content={<ReactMarkdown className="changelog" children={this.Changelog}/>} 
                    hideCaret={true} label={`v${application.version}`}/>
            </div>
        );
    }
}
