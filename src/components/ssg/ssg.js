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
    ARCHETYPES, DIFFICULTIES, FLOORS, 
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
        const name = e.props.name;
        const opts = this.context.opts;
        switch(name.toLowerCase()) {
            case 'seed':
                this.context.seed = e.state.seed;
                opts.NULLSEED = false;
                if(this.context.seed.toUpperCase() === 'NULL')
                    opts.NULLSEED = true;
        
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
                opts.FLOORINDEX = floor!==undefined ? floor[1] : 0;
                console.log(opts);
                break;
            case 'enhance': case 'choice':
            case 'stairs': case 'prestige':
            case 'blackmarket': case 'portal':
            case 'charge':
                opts[name.toUpperCase()] = e.state.checked;
                console.log(opts)
                break;
            case 'weapon': case 'mobility':
                opts[name] = e.state.selection;
                console.log(opts);
                break;
            case 'secondary': case 'ultimate':
                opts.ABILITIES[name] = e.state.selection;
                console.log(opts.ABILITIES);
                break;
            case 'head item': case 'arm item':
            case 'chest item': case 'leg item':
                opts.ITEMS[name.split(' ')[0]] = e.state.selection;
                console.log(opts.ITEMS);
                break;
            case 'curses':
                opts.CURSES = e.state.selection;
                console.log(opts.CURSES);
                break;
            case 'health': case 'shield':
            case 'coins': case 'keys':
                opts[name.toUpperCase()] = e.state.value;
                console.log(opts);
                break;
            case 'ammo':
                opts.AMMO = e.state.value;
                console.log(opts);
                break;
            case 'ability': case 'precision':
            case 'damage': case 'luck':
            case 'range': case 'speed':
                opts.STATS[name.toUpperCase()] = `${parseInt(e.state.value) + 1}`;
                console.log(opts.STATS);
                break;
            case 'clearall': case 'goldhealth':
            case 'small': case 'banks':
                opts.TRAITS[name.toUpperCase()] = e.state.checked;
                break;
            case 'noweapons': case 'nohealth':
            case 'noshops': case 'notreasure':
            case 'noarmory':
                opts.TRAITS[name.toUpperCase()] = !e.state.checked;
                break;
            default:
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
            alert(msg);
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
                    <div>
                    <Dropdown name="WEAPON" className="selection"
                        options={Dropdown.options("WEAPON",LOADOUT.WEAPON)}
                        tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>
                    <Dropdown name="MOBILITY" className="selection"
                        options={Dropdown.options("MOBILITY", LOADOUT.AUXILARY)}
                        tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>
                    <Dropdown name="SECONDARY" className="selection"
                        options={Dropdown.optgroups(LOADOUT.ABILITIES)}
                        tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>
                    <Dropdown name="ULTIMATE" className="selection"
                        options={Dropdown.optgroups(LOADOUT.ABILITIES)}
                        tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>
                    </div>
                    <div>
                    <Dropdown name="HEAD ITEM" className="selection"
                        options={Dropdown.optgroups(LOADOUT.ABILITIES)}
                        tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>
                    <Dropdown name="ARM ITEM" className="selection"
                        options={Dropdown.optgroups(LOADOUT.ABILITIES)}
                        tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>
                    <Dropdown name="CHEST ITEM" className="selection"
                        options={Dropdown.optgroups(LOADOUT.ABILITIES)}
                        tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>
                    <Dropdown name="LEG ITEM" className="selection"
                        options={Dropdown.optgroups(LOADOUT.ABILITIES)}
                        tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>
                    </div>
                </div>
                <Checkbox className="radio" boxStyle="round" name="charge"
                    label="Charge Abilities" tooltip={TOOLTIP.OPTIONAL+TOOLTIP.CHARGE}
                    onChange={this.handleChange}/>
                <label className="selection label">Curses</label>
                <Dropdown name="CURSES" className="selection multiple"
                    options={Dropdown.options("", LOADOUT.CURSE)}
                    multiple={true} size={8} tooltip={TOOLTIP.OPTIONAL}
                    onChange={this.handleChange}/>
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
                <Expander id="loadout" className="expand md" label="Loadout" content={LOADOUT_OPTIONS}/>
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
                <Dropdown name="Character" className="ssg-opt"
                    options={Dropdown.optgroups(ARCHETYPES)}
                    tooltip={TOOLTIP.REQUIRED} onChange={this.handleChange}/>
                <Dropdown name="Difficulty" className="ssg-opt"
                    options={Dropdown.options("Difficulty", DIFFICULTIES)}
                    tooltip={TOOLTIP.REQUIRED} onChange={this.handleChange}/>
                <SeedField className="ssg-opt" name="Seed" seed={this.context.seed}
                    tooltip={`${TOOLTIP.REQUIRED}${TOOLTIP.SEED.join('\n')}`}
                    onChange={this.handleChange}/>
                <Dropdown name="Floor" className="selection"
                    options={Dropdown.options("Floor", FLOORS.map(([f, i]) => f))}
                    tooltip={TOOLTIP.OPTIONAL+TOOLTIP.FLOOR} onChange={this.handleChange}/>
                <Checkbox className="top-radio" boxStyle="round" name="enhance"
                    label="Enhanced Item Pools"
                    tooltip={`${TOOLTIP.OPTIONAL}${TOOLTIP.ENHANCE.join('\n')}`}
                    onChange={this.handleChange}/>
                <Expander id="more" className="expand lg" label='More Options' content={MORE_OPTIONS}/>
                <DownloadButton className="generate" onClick={this.handleClick} label="Generate Save"/>
                <Expander id="version" className="expand md" onExpand={this.handleLoadChangelog}
                    content={<ReactMarkdown className="changelog" children={this.Changelog}/>} 
                    hideCaret={true} label={`v${application.version}`}/>
            </div>
        );
    }
}
