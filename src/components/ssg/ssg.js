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
        return (
            <div className="SSG" style={styles}>
                <div flex='row' spacing='around'>
                    <div flex='column'>
                        <div flex='row' spacing='around'>
                            <Dropdown className="ssg-opt" name="character" options={CHARACTERS}
                                tooltip={TOOLTIP.REQUIRED} onChange={this.handleChange}/>
                        </div>
                        <div flex='row' spacing='around'>
                            <Dropdown className="ssg-opt" name="difficulty" options={DIFFICULTIES}
                                tooltip={TOOLTIP.REQUIRED} onChange={this.handleChange}/>
                        </div>
                        <div flex='row' spacing='around'>
                            <SeedField className="ssg-opt" name="seed" seed={this.context.seed}
                                tooltip={`${TOOLTIP.REQUIRED}${TOOLTIP.SEED.join('\n')}`}
                                onChange={this.handleChange}/>
                        </div>
                        <div flex='row' spacing='around'>
                            <Dropdown className="ssg-opt" name="floor" options={FLOORS.map(([f, i]) => f)}
                                tooltip={`${TOOLTIP.OPTIONAL}${TOOLTIP.FLOOR}`}
                                onChange={this.handleChange}/>
                        </div>
                        <div flex='row' spacing='around' margin="bottom" pad="bottom">
                            <Checkbox className="top-radio" boxStyle="round" name="enhance" label="Enhanced Item Pools" 
                                tooltip={`${TOOLTIP.OPTIONAL}${TOOLTIP.ENHANCE.join('\n')}`}
                                onChange={this.handleChange}/>
                        </div>
                    </div>
                </div>
                <div flex='row' spacing='around' margin='bottom' pad='left-right-bottom-top'>
                    <div className="large-group" border='solid-left-right' pad='left-right-bottom-top' margin='bottom'>
                        <Expander className="large-expand" label='More Options' content={
                        <div flex='row' spacing='around' >
                            <div border='solid-top' flex='column'>
                                <div flex='row' spacing='around'>
                                    <div border='solid-bottom' pad='left-right-bottom-top' margin='bottom'>
                                    <Expander className='ssg-expand' label='Inventory' content={
                                        <div className="ssg-group" flex='row' spacing='even' wrap='normal' border='solid-top'>
                                            {STATS.slice(0, 3).map(([name, label]) => (
                                                <div flex='row' spacing='between'>
                                                    <NumberField className="number" name={name} label={label} hideCursor={true}
                                                        tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>
                                                </div>
                                            ))}
                                        </div>
                                    }/>
                                    </div>
                                </div>
                                <div flex='row' spacing='around'>
                                    <div border='solid-bottom' pad='left-right-bottom-top' margin='bottom'>
                                    <Expander className='ssg-expand' label='Stats' content={
                                        <div className="ssg-group" flex='row' spacing='even' wrap='normal' border='solid-top'>
                                            {STATS.slice(3).map(([name, label]) => (
                                                <div flex='row' spacing='between'>
                                                    <NumberField className="number" name={name} label={label} hideCursor={true}
                                                        tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>
                                                </div>
                                            ))}
                                        </div>
                                    }/>
                                    </div>
                                </div>
                                <div flex='row' spacing='around'>
                                    <div border='solid-bottom' pad='left-right-bottom-top' margin='bottom'>
                                    <Expander className="ssg-expand" label="Loadout" content={
                                        <div className="ssg-group" flex='column' border='solid-top'>
                                            <div className='ssg-group' flex='row' spacing='between'>
                                                <div flex='column'>
                                                    {Object.keys(LOADOUT).slice(0, 4).map((name) => (
                                                        <Dropdown className="selection" name={name} options={LOADOUT[name]}
                                                            tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>
                                                ))}
                                                </div>
                                                <div flex='column'>
                                                    {Object.keys(LOADOUT).slice(4, 8).map((name) => (
                                                        <Dropdown className="selection" name={name} options={LOADOUT[name]}
                                                            tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>
                                                ))}
                                                </div>
                                            </div>
                                            <div flex='row' spacing='around'>
                                                <div flex='column' margin='top-bottom'>
                                                    <label className="selection label">Curses</label>
                                                    <div flex='row' spacing='around'>
                                                        <Dropdown className="selection multiple" name="CURSES" options={LOADOUT.CURSE}
                                                            multiple={true} tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div flex='row' spacing='around'>
                                                <Checkbox className="radio" boxStyle="round" name="ultcharge" label="Ultimate Charged at Start"
                                                    tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                    }/>
                                    </div>
                                </div>
                                <div flex='row' spacing='around'>
                                    <div border='solid-bottom' pad='left-right-bottom-top' margin='bottom'>
                                        <Expander className='ssg-expand' label="Special Rooms" content={
                                            <div className="ssg-group" flex='column' border='solid-top'>
                                                <div className="ssg-group" margin="wide-left" flex='row' spacing='even' wrap='normal'>
                                                    {ROOMS.map(([name, label]) => (
                                                        <Checkbox className='radio' name={name} label={label} 
                                                            tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>
                                                    ))}
                                                </div>
                                            </div>
                                        }/>
                                    </div>
                                </div>
                                <div flex='row' spacing='around'>
                                    <div border='solid-bottom' pad='left-right-bottom-top' margin='bottom'>
                                        <Expander className="ssg-expand" label="Special Traits" content={
                                            <div className="ssg-group" flex='column' border='solid-top'>
                                                <div className="ssg-group" margin="wide-left" flex='row' spacing='even' wrap='normal'>
                                                    {TRAITS.map(([name, label]) => (
                                                        <Checkbox className="radio" name={name} label={label}
                                                            tooltip={TOOLTIP.OPTIONAL} onChange={this.handleChange}/>
                                                    ))}
                                                </div>
                                            </div>
                                        }/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }/>
                    </div>
                </div>
                <DownloadButton className="generate" onClick={this.handleClick} label="Generate Save"/>
                <div flex='row' spacing='around'>
                    <Expander className="ssg-expand version" onExpand={this.handleLoadChangelog} content={
                        <div flex='row' spacing='around'>
                            <ReactMarkdown className="changelog" children={this.Changelog}/>
                        </div>
                    } hideCaret={true} font='Verdana' label={`v${application.version}`}/>
                </div>
            </div>
        )
    }
}
